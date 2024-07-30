export const getRoutePolyline = async (start, end) => {
    return new Promise((resolve, reject) => {
      if (!window.ymaps) {
        reject(new Error("Yandex Maps API is not loaded"));
        return;
      }
  
      window.ymaps.ready(() => {
        const route = new window.ymaps.route([start, end], {
          mapStateAutoApply: true
        }, {
          boundsAutoApply: true
        });
  
        route.events.add('load', () => {
          const polyline = route.getPaths().get(0).getSegments().map(segment => segment.geometry.getCoordinates());
          resolve(polyline);
        });
  
        route.events.add('error', (error) => {
          reject(error);
        });
      });
    });
  };