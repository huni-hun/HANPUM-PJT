import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { GlobalStyle } from './styles/GlobalStyles';
import { RecoilRoot } from 'recoil';
import { AlertProvider } from './components/common/Modal/AlertProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const client = new QueryClient({
  defaultOptions: {},
});

root.render(
  <>
    <GlobalStyle />
    <RecoilRoot>
      <QueryClientProvider client={client}>
        <AlertProvider>
          <App />
        </AlertProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </>,

  // 추후에 배포할 때 주석 해제
  // <React.StrictMode>
  // </React.StrictMode>
);

serviceWorkerRegistration.unregister();

reportWebVitals();
