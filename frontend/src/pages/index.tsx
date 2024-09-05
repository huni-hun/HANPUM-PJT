// index.tsx
import LoginPage from '@pages/Auth/LoginPage';
import MainPage from '@pages/Main/MainPage';

/** 일정 */
import ScheduleMainPage from '@pages/Schedule/ScheduleMainPage';
import AddSchedulePage from '@pages/Schedule/AddSchedulePage';
import DetailMineSchedulePage from '@pages/Schedule/DetailMineSchedulePage';
import SuccessAddSchedulePage from '@pages/Schedule/SuccessAddSchedulePage';
import EditMySchedulePage from '@pages/Schedule/EditMySchedulePage';

/** 경로 */
import RouteList from '@pages/Route/RouteList';
import RouteAddPlacePage from '@pages/Route/RouteAddPlacePage';
import RouteAddMainPage from '@pages/Route/RouteAddMainPage';
import RouteAddDetailPage from '@pages/Route/RouteAddDetailPage';
import RouteDetailPage from '@pages/Route/RouteDetailPage';
import SearchPlacePage from '@pages/Route/SearchPlacePage';
import RouteAddCompletePage from '@pages/Route/RouteAddCompletePage';
import RoteListMorePage from '@pages/Route/RoteListMorePage';
import RouteListSearchPage from '@pages/Route/RouteListSearchPage';
import RouteDetailRetouchPage from '@pages/Route/RouteDetailRetouchPage';

/** 모임 */
import MeetList from '@pages/Meet/MeetList';
import MeetDetailPage from '@pages/Meet/MeetDetailPage';
import MeetFilterPage from '@pages/Meet/MeetFilterPage';
import RequestManageList from '@pages/Meet/RequestManageList';
import MemberManageList from '@pages/Meet/MemberManageList';
import MeetRequest from '@pages/Meet/MeetRequest';
import MeetAcceptPage from '@pages/Meet/MeetAcceptPage';
import MeetAddMainPage from '@pages/Meet/MeetAddMainPage';
import MeetAddSchedulePage from '@pages/Meet/MeetAddSchedulePage';
import MeetAddDeadLinePage from '@pages/Meet/MeetAddDeadLinePage';

/** 커뮤니티 */

/** 마이페이지 */
import SignupPage from '@pages/Auth/SignupPage';
import FindPage from '@pages/Auth/FindPage';
import MyPage from '@pages/My/MyPage';
import ActivityLayout from '@components/My/ActivityLayout';
import ReviewPage from '@pages/My/ReviewPage';
import MyProfilePage from '@pages/My/MyProfilePage';
import CategoryLayout from '@/components/My/edit/CategoryLayout';
import ConfigPage from '@pages/My/ConfigPage';
import ConfigLayout from '@components/My/config/ConfigLayout';
import ConfigDetailPage from '@pages/My/ConfigDetailPage';

export {
  LoginPage,
  MainPage,
  /** 일정 */
  ScheduleMainPage,
  AddSchedulePage,
  DetailMineSchedulePage,
  SuccessAddSchedulePage,
  EditMySchedulePage,
  /** 경로 */
  RouteList,
  RouteAddPlacePage,
  RouteAddMainPage,
  RouteDetailPage,
  RouteAddDetailPage,
  SearchPlacePage,
  RouteAddCompletePage,
  RoteListMorePage,
  RouteListSearchPage,
  RouteDetailRetouchPage,

  /** 모임 */
  MeetList,
  MeetDetailPage,
  MeetFilterPage,
  RequestManageList,
  MemberManageList,
  MeetRequest,
  MeetAcceptPage,
  MeetAddMainPage,
  MeetAddSchedulePage,
  MeetAddDeadLinePage,

  /** 마이페이지, 회원관련 */
  SignupPage,
  FindPage,
  MyPage,
  ActivityLayout,
  ReviewPage,
  MyProfilePage,
  CategoryLayout,
  ConfigPage,
  ConfigLayout,
  ConfigDetailPage,
};
