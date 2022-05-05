import { Map } from 'maplibre-gl';

export type ScaleUnit = 'nautical-miles' | 'miles' | 'feet' | 'kilometers' | 'meters';

export type ScaleType = 'imperial' | 'metric' | 'nautical';

/**
 * Get the ratio of a distance on the map to the corresponding distance on the ground.
 *
 * A horizontal scale is imagined to be present at center of the map container with maximum length (Default) as 100px.
 * Using spherical law of cosines approximation, the real distance is found between the two coordinates.
 */
export function getScale({
  map,
  type = "metric",
  maxWidth = 100
}: {
  map: Map;
  /**
   * Unit of the distance (`'imperial'`, `'metric'` or `'nautical'`).
   * 
   * Default "metric"
   */
  type?: ScaleType;
  /** The maximum length of the scale control in pixels */
  maxWidth?: number;
}) {
  const y = map.getContainer().clientHeight / 2;
  const left = map.unproject([0, y]);
  const right = map.unproject([maxWidth, y]);
  const maxMeters = left.distanceTo(right);

  // The real distance corresponding to 100px scale length is rounded off to
  // near pretty number and the scale length for the same is found out.
  if (type === "imperial") {
    const maxFeet = 3.2808 * maxMeters;
    if (maxFeet > 5280) {
      const maxMiles = maxFeet / 5280;
      return calculateScale(maxMiles, "miles");
    } else {
      return calculateScale(maxFeet, "feet");
    }
  } else if (type === "nautical") {
    const maxNauticals = maxMeters / 1852;
    return calculateScale(maxNauticals, "nautical-miles");
  } else if (maxMeters >= 1000) {
    return calculateScale(maxMeters / 1000, "kilometers");
  } else {
    return calculateScale(maxMeters, "meters");
  }
}

function calculateScale(maxDistance: number, unit: ScaleUnit) {
  const distance = getRoundNum(maxDistance);
  const ratio = distance / maxDistance;

  return {
    distance,
    ratio,
    unit
  };
}

function getDecimalRoundNum(d) {
  const multiplier = Math.pow(10, Math.ceil(-Math.log(d) / Math.LN10));
  return Math.round(d * multiplier) / multiplier;
}

function getRoundNum(num) {
  const pow10 = Math.pow(10, `${Math.floor(num)}`.length - 1);
  let d = num / pow10;

  d =
    d >= 10
      ? 10
      : d >= 5
      ? 5
      : d >= 3
      ? 3
      : d >= 2
      ? 2
      : d >= 1
      ? 1
      : getDecimalRoundNum(d);

  return pow10 * d;
}
