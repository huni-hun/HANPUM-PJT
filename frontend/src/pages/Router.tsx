import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Header from '@/components/common/Header/Header';

import {
  LoginPage,
  MainPage,
  ScheduleMainPage,
  AddSchedulePage,
  RouteList,
  MeetPage,
  MeetDetailPage,
  RouteAddPlacePage,
  RouteAddMainPage,
  RouteDetailPage,
  RouteAddDetailPage,
} from './index'; // index.tsx에서 컴포넌트를 가져옵니다.
import SignupPage from './Auth/SignupPage';
import FindPage from './Auth/FindPage';
import { useEffect, useState } from 'react';

export default function Router() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      if (token != null) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    };
    checkAuth();

    window.addEventListener('storage', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth); // 컴포넌트 언마운트 시 이벤트 제거
    };
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isAuth ? <MainPage /> : <Navigate to={'login'} replace={true} />
          }
        />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="find/:account" element={<FindPage />} />

        <Route path="schedule/main" element={<ScheduleMainPage />} />
        <Route path="schedule/addSchedule" element={<AddSchedulePage />} />

        <Route path="route/list" element={<RouteList />} />
        <Route path="route/detail" element={<RouteDetailPage />} />
        <Route path="route/addMain" element={<RouteAddMainPage />} />
        <Route path="route/addDetail" element={<RouteAddDetailPage />} />
        <Route path="route/add" element={<RouteAddPlacePage />} />

        <Route path="meet" element={<MeetPage />} />
        <Route path="meet/:id" element={<MeetDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
