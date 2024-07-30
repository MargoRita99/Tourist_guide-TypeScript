import React, { useState, useEffect } from 'react';
import { YMaps, Map, Polyline } from 'react-yandex-maps';
import { getRoutePolyline } from '../services/RouteApi'; // Импортируйте функцию

const RoutePage = () => {
    const [start, setStart] = useState([55.75, 37.57]); // Начальная точка (Москва)
    const [end, setEnd] = useState([55.80, 37.60]); // Конечная точка (пример)
    const [polyline, setPolyline] = useState([]);
  
    useEffect(() => {
      // При изменении start или end получаем новый маршрут
      const fetchPolyline = async () => {
        try {
          const polyline = await getRoutePolyline(start, end);
          setPolyline(polyline);
        } catch (error) {
          console.error('Error fetching route polyline:', error);
        }
      };
  
      fetchPolyline();
    }, [start, end]);
  
    return (
      <div>
        <h1>Create and Manage Routes</h1>
        <YMaps query={{ apikey: '007d0bbc-1ee4-4fdd-b42b-1ad239b11015' }}> {}
          <Map
            defaultState={{ center: [55.75, 37.57], zoom: 9 }}
            width="1000px" // Установите желаемую ширину карты
            height="700px" // Установите желаемую высоту карты
          >
            {polyline.length > 0 && (
              <Polyline
                geometry={polyline}
                options={{ strokeColor: '#0000FF', strokeWidth: 5 }}
              />
            )}
          </Map>
        </YMaps>
      </div>
    );
  };
  
  export default RoutePage;