import { styled } from 'styled-components';
import { useEffect } from 'react';
import { colors } from '@/styles/colorPalette';

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  latitude: number;
  longitude: number;
  linePath?: any[];
}

function Map(props: MapProps) {
  const setMap = () => {
    const mapScript = document.createElement('script');
    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_MAP_KEY}&autoload=false`;
    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('kakaoMap');
        const options = {
          center: new window.kakao.maps.LatLng(props.latitude, props.longitude), // 남한 전체가 보이도록 중앙 좌표 설정
          level: 8, // 줌 레벨을 설정 (7-8 정도가 남한 전체를 보여줌)
        };
        const map = new window.kakao.maps.Map(container, options);

        // Polyline 설정
        if (props.linePath && props.linePath.length > 0) {
          const polyLine = new window.kakao.maps.Polyline({
            path: props.linePath.map(
              (point) => new window.kakao.maps.LatLng(point.lat, point.lng),
            ),
            strokeWeight: 7,
            strokeColor: colors.main,
            strokeOpacity: 0.7,
            strokeStyle: 'solid',
          });
          polyLine.setMap(map);
        }
      });
    };

    mapScript.addEventListener('load', onLoadKakaoMap);

    return () => mapScript.removeEventListener('load', onLoadKakaoMap);
  };

  useEffect(() => {
    setMap();
  }, []);

  return <MapContainer id="kakaoMap"></MapContainer>;
}

export default Map;

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;
