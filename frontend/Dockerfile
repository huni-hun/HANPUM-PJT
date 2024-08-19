FROM node:18.17.1-alpine AS builder

# 작업 디렉토리를 /usr/src/app으로 설정
WORKDIR /usr/src/app

# .npmrc 파일과 package.json 파일들을 컨테이너 내부로 복사
COPY .npmrc ./
COPY package* ./

# 의존성 패키지들을 설치
RUN npm install

# 소스 코드 전체를 컨테이너 내부로 복사
COPY . .

# 빌드 실행
RUN npm run-script build

# .npmrc 파일을 삭제 (보안을 위해 빌드 후 삭제)
RUN rm -f .npmrc

# 기본적으로 npm start 명령어를 실행하도록 설정
CMD [ "npm", "start" ]