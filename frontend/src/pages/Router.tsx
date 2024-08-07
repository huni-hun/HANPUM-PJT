import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {
  LoginPage,
  MainPage,
  ScheduleMainPage,
  AddSchedulePage,
  RouteList,
  RouteAddPlacePage,
  RouteAddMainPage,
} from './index';
import MeetPage from './Meet/MeetPage';
import MeetDetailPage from './Meet/MeetDetailPage';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={'/login'} replace={true} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        {/** 일정 */}
        <Route path="/schedule/main" element={<ScheduleMainPage />} />
        <Route path="/schedule/addSchedule" element={<AddSchedulePage />} />
        {/** 경로 */}
        <Route path="/route/list" element={<RouteList />} />
        <Route path="/route/addMain" element={<RouteAddMainPage />} />
        <Route path="/route/add" element={<RouteAddPlacePage />} />
        <Route path="/meet" element={<MeetPage />} />
        <Route path="/meet/:id" element={<MeetDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
