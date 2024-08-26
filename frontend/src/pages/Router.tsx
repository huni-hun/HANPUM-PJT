import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';

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
import useIsAuth from '@/hooks/auth/useIsAuth';
import MyPage from './My/MyPage';
import ActivityLayout from '@/components/My/ActivityLayout';
import ReviewPage from './My/ReviewPage';
import MyProfilePage from './My/MyProfilePage';
import CategoryLayout from '@/components/My/CategoryLayout';

export default function Router() {
  const isAuthEnticated = useIsAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* {isAuthEnticated ? (
          <>
            <Route path="/" element={<MainPage />} />
            <Route path="/schedule/main" element={<ScheduleMainPage />} />
            <Route path="/schedule/addSchedule" element={<AddSchedulePage />} />

            <Route path="/route/list" element={<RouteList />} />
            <Route path="/route/detail" element={<RouteDetailPage />} />
            <Route path="/route/addMain" element={<RouteAddMainPage />} />
            <Route path="/route/addDetail" element={<RouteAddDetailPage />} />
            <Route path="/route/add" element={<RouteAddPlacePage />} />

            <Route path="/meet" element={<MeetPage />} />
            <Route path="/meet/:id" element={<MeetDetailPage />} />

            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/find/:account" element={<FindPage />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )} */}

        <Route path="/" element={<MainPage />} />
        <Route path="/schedule/main" element={<ScheduleMainPage />} />
        <Route path="/schedule/addSchedule" element={<AddSchedulePage />} />

        <Route path="/route/list" element={<RouteList />} />
        <Route path="/route/detail" element={<RouteDetailPage />} />
        <Route path="/route/addMain" element={<RouteAddMainPage />} />
        <Route path="/route/addDetail" element={<RouteAddDetailPage />} />
        <Route path="/route/add" element={<RouteAddPlacePage />} />

        <Route path="/meet" element={<MeetPage />} />
        <Route path="/meet/:id" element={<MeetDetailPage />} />

        <Route path="*" element={<Navigate to="/" />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/find/:account" element={<FindPage />} />

        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/:active" element={<ActivityLayout />} />

        <Route path="/mypage/review/:course_id" element={<ReviewPage />} />
        <Route path="/myprofile" element={<MyProfilePage />} />
        <Route path="/myprofile/:category" element={<CategoryLayout />} />
        {/* <Route path="*" element={<Navigate to="/login" />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
