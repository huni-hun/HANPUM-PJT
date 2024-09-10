import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';

import {
  LoginPage,
  MainPage,
  ScheduleMainPage,
  AddSchedulePage,
  RouteList,
  MeetList,
  MeetDetailPage,
  RouteAddPlacePage,
  RouteAddMainPage,
  RouteDetailPage,
  RouteAddDetailPage,
  SearchPlacePage,
  RouteAddCompletePage,
  DetailMineSchedulePage,
  SuccessAddSchedulePage,
  RoteListMorePage,
  RouteListSearchPage,
  MeetFilterPage,
  MemberManageList,
  MeetManageRequest,
  RequestManageList,
  MeetManageAcceptPage,
  SignupPage,
  FindPage,
  MyPage,
  ActivityLayout,
  ReviewPage,
  MyProfilePage,
  CategoryLayout,
  MeetAddMainPage,
  EditMySchedulePage,
  ConfigLayout,
  RouteDetailRetouchPage,
  ConfigDetailPage,
  MeetAddSchedulePage,
  MeetAddDeadLinePage,
  MemberManageDetail,
  ScheduleMemoPage,
  MeetEditPage,
  MeetAddCompletePage,
} from './index'; // index.tsx에서 컴포넌트를 가져옵니다.
import useIsAuth from '@/hooks/auth/useIsAuth';
import { useEffect } from 'react';

// import useIsAuth from '@/hooks/auth/useIsAuth';

export default function Router() {
  const isAuth = useIsAuth();
  // console.log(isAuth);

  return (
    <BrowserRouter>
      <Routes>
        {!isAuth ? (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/find/:account" element={<FindPage />} />
            <Route
              path="/config/:category/detail/:id"
              element={<ConfigDetailPage />}
            />
            <Route path="/" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/home" element={<MainPage />} />
            {/* 기본 경로를 /home으로 리다이렉트 */}
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<MainPage />} />
            {/* 일정 */}
            <Route path="/schedule/main" element={<ScheduleMainPage />} />
            <Route path="/schedule/addSchedule" element={<AddSchedulePage />} />
            <Route
              path="/schedule/detail/mine"
              element={<DetailMineSchedulePage />}
            />
            <Route
              path="/schedule/success"
              element={<SuccessAddSchedulePage />}
            />
            <Route path="/schedule/memo" element={<ScheduleMemoPage />} />
            <Route path="/schedule/edit" element={<EditMySchedulePage />} />
            {/* 경로 */}
            <Route path="/route/list" element={<RouteList />} />
            <Route
              path="/route/detail/:routeid"
              element={<RouteDetailPage />}
            />
            <Route path="/route/addMain" element={<RouteAddMainPage />} />
            <Route path="/route/addDetail" element={<RouteAddDetailPage />} />
            <Route
              path="route/add/complete"
              element={<RouteAddCompletePage />}
            />
            <Route path="route/list/more" element={<RoteListMorePage />} />
            <Route path="route/list/search" element={<RouteListSearchPage />} />
            <Route
              path="/route/detail/retouch/:routeid"
              element={<RouteDetailRetouchPage />}
            />
            {/* 모임 */}
            <Route path="/meet/list" element={<MeetList />} />
            <Route path="/meet/detail" element={<MeetDetailPage />} />
            <Route path="/meet/filter" element={<MeetFilterPage />} />
            <Route
              path="/meet/requestManageList"
              element={<RequestManageList />}
            />
            <Route
              path="/meet/memberMangeList"
              element={<MemberManageList />}
            />
            <Route path="/meet/request" element={<MeetManageRequest />} />
            <Route path="/meet/accept" element={<MeetManageAcceptPage />} />
            <Route path="/meet/addMain" element={<MeetAddMainPage />} />

            <Route
              path="/meet/addMain/addSchedule"
              element={<MeetAddSchedulePage />}
            />
            <Route
              path="/meet/addMain/AddDeadline"
              element={<MeetAddDeadLinePage />}
            />
            <Route
              path="/meet/addMain/complete"
              element={<MeetAddCompletePage />}
            />
            <Route path="/meet/memberDetail" element={<MemberManageDetail />} />
            <Route path="/meet/edit" element={<MeetEditPage />} />

            {/* 로그인/ 회원가입/ 찾기 */}
            {/* <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/find/:account" element={<FindPage />} /> */}
            {/* <Route path="*" element={<Navigate to="/home" />} /> */}

            {/* 마이페이지 */}
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/mypage/:active" element={<ActivityLayout />} />
            <Route path="/mypage/review/:course_id" element={<ReviewPage />} />
            <Route path="/myprofile" element={<MyProfilePage />} />
            <Route path="/myprofile/:category" element={<CategoryLayout />} />
            <Route path="/config/:category" element={<ConfigLayout />} />
            <Route
              path="/config/:category/detail/:id"
              element={<ConfigDetailPage />}
            />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}
