import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import { colors } from '@/styles/colorPalette';
import markersrc from '@/assets/img/Marker.png';
import attmarkersrc from '@/assets/img/AttMarker.png';
import { useNavigate } from 'react-router-dom';

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
  attrationmarker?: any[];
  infoBtn?: boolean;
  isSchdule?: boolean;
}

function Map(props: MapProps) {
  const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false);
  const [kakaoMap, setKakaoMap] = useState<any>(null);
  const [polyLine, setPolyLine] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]); // 마커 배열을 상태로 관리
  const [attmarkers, setAttMarkers] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navigate = useNavigate();

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
    // console.log(props.linePath);
    if (props.linePath !== undefined && kakaoMap) {
      if (polyLine) {
        polyLine.setMap(null);
      }

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

  useEffect(() => {
    if (props.attrationmarker !== undefined && kakaoMap) {
      attmarkers.forEach((marker) => marker.setMap(null));

      const newMarkers = props.attrationmarker.map((mar) => {
        const imgSrc = attmarkersrc;
        const imgSize = new window.kakao.maps.Size(32, 32);
        const imgOption = { offset: new window.kakao.maps.Point(10, 10) };
        const markerImg = new window.kakao.maps.MarkerImage(
          imgSrc,
          imgSize,
          imgOption,
        );
        const markerPosition = new window.kakao.maps.LatLng(mar.x, mar.y);

        const kakaoMarker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImg,
        });

        kakaoMarker.setMap(kakaoMap);
        return kakaoMarker;
      });

      setAttMarkers(newMarkers); // 새로운 마커 배열을 상태로 저장
    }
  }, [kakaoMap, props.attrationmarker]);

  return (
    <MapContainer
      id="kakaoMap"
      onClick={() => {
        if (props.isSchdule !== undefined) {
          if (props.isSchdule) {
            navigate('/route/list', { state: { type: 'schedule' } });
          }
        }
      }}
    >
      {props.infoBtn && (
        <InfoBox
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          ?
        </InfoBox>
      )}
      {isOpen && (
        <InfoModal>
          <InfoTitle>경로 주의사항</InfoTitle>
          <InfoText>경로 안내는 특정 지역만 제공해드립니다.</InfoText>
          <InfoBoldText>서울특별시, 수도권 시, 6대광역시, 제주도</InfoBoldText>
          <InfoBoldText>강원도</InfoBoldText>
          <InfoText>
            강릉시, 동해시, 삼첫기, 속초시, 원주시, 춘천시, 태백시 및 일부
            군지역
          </InfoText>
          <InfoBoldText>경상남도 </InfoBoldText>
          <InfoText>창원시, 거제시, 김해시, 양산시, 진주시, 통영시</InfoText>
          <InfoBoldText>경상북도 </InfoBoldText>
          <InfoText>
            경주시, 경산시, 구미시, 안동시, 포항시, 영덕군 일부
          </InfoText>
          <InfoBoldText>전라남도 </InfoBoldText>
          <InfoText>여수시, 목포시, 순천시</InfoText>
          <InfoBoldText>전라북도 </InfoBoldText>
          <InfoText>전주시, 군산시, 남원시, 익산시, 완주군</InfoText>
          <InfoBoldText>충청남도</InfoBoldText>
          <InfoText>천안시, 공주시, 논산시, 아산시</InfoText>
          <InfoBoldText>충청북도</InfoBoldText>
          <InfoText>청주시, 충주시, 단양군 일부</InfoText>
          <InfoLastText>
            ※ 서비스 제공 지역은 지속적으로 확대 추진하고 있습니다.
          </InfoLastText>
          <CloseBox
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            X
          </CloseBox>
        </InfoModal>
      )}
    </MapContainer>
  );
}

export default Map;

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  position: realtive;
`;

const InfoBox = styled.div`
  width: 3.3rem;
  height: 3.3rem;
  position: absolute;
  border-radius: 50%;
  z-index: 99;
  right: 1rem;
  top: 1rem;
  color: ${colors.grey2};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  background-color: ${colors.white};
  box-shadow: 0px 4px 4px 0 rgba(0, 0, 0, 0.25);
`;

const InfoModal = styled.div`
  width: 21.8rem;
  height: 23.4rem;
  position: absolute;
  background-color: ${colors.white};
  display: flex;
  flex-direction: column;
  top: 5rem;
  right: 1rem;
  z-index: 99;
  padding: 1.2rem 1.6rem 1.2rem 1.6rem;
  overflow-y: auto;
  box-shadow: 0px 4px 4px 0 rgba(0, 0, 0, 0.25);
  border-radius: 1.2rem;
`;

const InfoTitle = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const InfoText = styled.p`
  font-size: 1rem;
  margin-bottom: 1.2rem;
`;

const InfoBoldText = styled.p`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const InfoLastText = styled.p`
  font-size: 1rem;
  font-color: ${colors.grey2};
`;

const CloseBox = styled.div`
  width: 1rem;
  height: 1rem;
  color: ${colors.black};
  position: absolute;
  font-weight: bold;
  top: 1.2rem;
  right: 1.2rem;
`;
