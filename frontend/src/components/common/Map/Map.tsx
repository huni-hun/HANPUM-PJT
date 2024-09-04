import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import { colors } from '@/styles/colorPalette';
import markersrc from '@/assets/img/Marker.png';

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  latitude: number;
  longitude: number;
  linePath?: any[];
  marker?: any[];
}

function Map(props: MapProps) {
  const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false);
  const [kakaoMap, setKakaoMap] = useState<any>(null);
  const [polyLine, setPolyLine] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]); // 마커 배열을 상태로 관리

  const setMap = () => {
    const mapScript = document.createElement('script');
    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_MAP_KEY}&autoload=false`;
    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        setIsMapLoaded(true);
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
      setKakaoMap(map);
    }
  }, [isMapLoaded, props.latitude, props.longitude]);

  useEffect(() => {
    if (props.linePath !== undefined && kakaoMap) {
      if (props.linePath.length > 0) {
        if (polyLine) {
          polyLine.setMap(null);
        }

        const newPolyLine = new window.kakao.maps.Polyline({
          path: props.linePath,
          strokeWeight: 7,
          strokeColor: colors.main,
          strokeOpacity: 0.7,
          strokeStyle: 'solid',
        });

        newPolyLine.setMap(kakaoMap);
        setPolyLine(newPolyLine);

        const bounds = new window.kakao.maps.LatLngBounds();
        props.linePath.forEach((line) => {
          bounds.extend(line);
        });
        kakaoMap.setBounds(bounds);
      }
    }
  }, [kakaoMap, props.linePath]);

  useEffect(() => {
    if (props.marker !== undefined && kakaoMap) {
      // 기존 마커 제거
      markers.forEach((marker) => marker.setMap(null));

      const newMarkers = props.marker.map((mar) => {
        const imgSrc = markersrc;
        const imgSize = new window.kakao.maps.Size(32, 32);
        const imgOption = { offset: new window.kakao.maps.Point(10, 10) };
        const markerImg = new window.kakao.maps.MarkerImage(
          imgSrc,
          imgSize,
          imgOption,
        );
        const markerPosition = new window.kakao.maps.LatLng(mar.y, mar.x);

        const kakaoMarker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImg,
        });

        kakaoMarker.setMap(kakaoMap);
        return kakaoMarker;
      });

      setMarkers(newMarkers); // 새로운 마커 배열을 상태로 저장
    }
  }, [kakaoMap, props.marker]);

  return <MapContainer id="kakaoMap"></MapContainer>;
}

export default Map;

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;
