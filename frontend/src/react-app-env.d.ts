/// <reference types="react-scripts" />

declare namespace NodeJS {
  export interface ProcessEnv {
    REACT_APP_MAP_KEY: string;
    REACT_APP_BASEURL: string;
  }
}
