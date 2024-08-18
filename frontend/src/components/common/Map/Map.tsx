import { styled } from 'styled-components';
import { useEffect } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  latitude: number;
  longitude: number;
}

function Map(props: MapProps) {
  const setMap = () => {
    const mapScript = document.createElement('script');
    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=f7d4ebdd98b5b81712647b8f4f71e07b&autoload=false`;
    document.head.appendChild(mapScript);
    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('kakaoMap');
        const options = {
          center: new window.kakao.maps.LatLng(props.latitude, props.longitude),
        };
        const map = new window.kakao.maps.Map(container, options);
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
