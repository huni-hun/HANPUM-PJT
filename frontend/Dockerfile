FROM node:18.17.1-alpine AS builder

# step 1 빌드를 하기 위한 과정
# 컨테이너 내부 작업 디렉토리 설정
WORKDIR /usr/src/app

# 컨테이너 내부로 package.json 파일들 복사
# RUN mkdir -p /usr/src/app
COPY package* .

# package.json 및 package-lock.json 파일에 명시된 의존성 패키지들을 설치
RUN npm install

# 소스를 작업폴더로 복사하고 빌드
COPY . .

RUN npm run-script build

CMD [ "npm", "start" ]

