import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
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
  const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false);
  const [kakaoMap, setKakaoMap] = useState<any>(null); // 스크립트 로드 상태 관리

  const setMap = () => {
    const mapScript = document.createElement('script');
    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_MAP_KEY}&autoload=false`;
    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        setIsMapLoaded(true); // 스크립트가 로드되면 상태 업데이트
      });
    };

    mapScript.addEventListener('load', onLoadKakaoMap);

    return () => mapScript.removeEventListener('load', onLoadKakaoMap);
  };

  useEffect(() => {
    setMap();
  }, []);

  useEffect(() => {
    if (isMapLoaded) {
      const mapContainer = document.getElementById('kakaoMap');
      const mapOptions = {
        center: new window.kakao.maps.LatLng(props.latitude, props.longitude),
        level: 8,
      };

      const map = new window.kakao.maps.Map(mapContainer, mapOptions);
      setKakaoMap(map); // 맵 객체를 상태로
    }
  }, [isMapLoaded, props.latitude, props.longitude]);

  useEffect(() => {
    if (props.linePath !== undefined) {
      if (kakaoMap && props.linePath.length > 0) {
        const polyLine = new window.kakao.maps.Polyline({
          path: props.linePath, // 전달받은 linePath 사용
          strokeWeight: 7,
          strokeColor: colors.main,
          strokeOpacity: 0.7,
          strokeStyle: 'solid',
        });
        polyLine.setMap(kakaoMap); // Polyline을 지도에 추가

        const bounds = new window.kakao.maps.LatLngBounds();
        props.linePath.forEach((line) => {
          bounds.extend(line); // 각 LatLng 객체를 bounds에 추가
        });

        // 지도의 범위를 해당 경계 영역으로 설정
        kakaoMap.setBounds(bounds);
      }
    }
  }, [kakaoMap, props.linePath]);
  return <MapContainer id="kakaoMap"></MapContainer>;
}

export default Map;

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;
