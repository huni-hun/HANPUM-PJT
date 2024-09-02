// index.tsx
import LoginPage from '../pages/Auth/LoginPage';
import MainPage from '../pages/Main/MainPage';

/** 일정 */
import ScheduleMainPage from '../pages/Schedule/ScheduleMainPage';
import AddSchedulePage from '../pages/Schedule/AddSchedulePage';
import DetailMineSchedulePage from '../pages/Schedule/DetailMineSchedulePage';
import SuccessAddSchedulePage from './Schedule/SuccessAddSchedulePage';
import EditMySchedulePage from './Schedule/EditMySchedulePage';

/** 경로 */
import RouteList from '../pages/Route/RouteList';
import RouteAddPlacePage from '../pages/Route/RouteAddPlacePage';
import RouteAddMainPage from '../pages/Route/RouteAddMainPage';
import RouteAddDetailPage from './Route/RouteAddDetailPage';
import RouteDetailPage from './Route/RouteDetailPage';
import SearchPlacePage from './Route/SearchPlacePage';
import RouteAddCompletePage from './Route/RouteAddCompletePage';
import RoteListMorePage from './Route/RoteListMorePage';
import RouteListSearchPage from './Route/RouteListSearchPage';
import RouteDetailRetouchPage from './Route/RouteDetailRetouchPage';

/** 모임 */
import MeetList from '../pages/Meet/MeetList';
import MeetDetailPage from '../pages/Meet/MeetDetailPage';
import MeetFilterPage from '../pages/Meet/MeetFilterPage';
import RequestManageList from '../pages/Meet/RequestManageList';
import MemberManageList from '../pages/Meet/MemberManageList';
import MeetRequest from '../pages/Meet/MeetRequest';
import MeetAcceptPage from '../pages/Meet/MeetAcceptPage';
import MeetAddMainPage from '../pages/Meet/MeetAddMainPage';

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
};
