function t(t){var i=t.map,r=t.type,a=void 0===r?"metric":r,n=t.maxWidth,o=void 0===n?100:n,u=i.getContainer().clientHeight/2,c=i.unproject([0,u]),l=i.unproject([o,u]),h=c.distanceTo(l);if("imperial"===a){var m=3.2808*h;return m>5280?e(m/5280,"miles"):e(m,"feet")}return"nautical"===a?e(h/1852,"nautical-miles"):h>=1e3?e(h/1e3,"kilometers"):e(h,"meters")}function e(t,e){var i,r,a,n=(i=t,(r=Math.pow(10,(""+Math.floor(i)).length-1))*(a=(a=i/r)>=10?10:a>=5?5:a>=3?3:a>=2?2:a>=1?1:function(t){var e=Math.pow(10,Math.ceil(-Math.log(t)/Math.LN10));return Math.round(t*e)/e}(a)));return{distance:n,ratio:n/t,unit:e}}export{t as getScale};
//# sourceMappingURL=index.module.js.map
