import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import MainPage from "./MainPage";
import ScheduleMainPage from "./ScheduleMainPage";
import RouteList from "./RouteList";
import RouteAddPlacePage from "./RouteAddPlacePage";
import RouteAddMainPage from "./RouteAddMainPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={"/login"} replace={true} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/schedule/main" element={<ScheduleMainPage />} />
        <Route path="/route/list" element={<RouteList />} />
        <Route path="/route/addMain" element={<RouteAddMainPage />} />
        <Route path="/route/add" element={<RouteAddPlacePage />} />
      </Routes>
    </BrowserRouter>
  );
}
