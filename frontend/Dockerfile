FROM node:18.17.1-alpine AS builder

# 컨테이너 내부 작업 디렉토리 설정
WORKDIR /usr/src/app

# .npmrc 파일을 먼저 복사
COPY .npmrc .npmrc

# package.json과 package-lock.json 파일 복사
COPY package*.json ./

# 의존성 패키지 설치
RUN npm ci --only=production

# 소스 코드 복사
COPY . .

# 빌드 실행
RUN npm run build

# 프로덕션을 위한 작은 이미지 생성
FROM node:18.17.1-alpine

WORKDIR /usr/src/app

# 빌드 결과물과 필요한 파일만 복사
COPY --from=builder /usr/src/app/build ./build
COPY --from=builder /usr/src/app/package*.json ./

# 프로덕션 의존성만 설치
RUN npm ci --only=production

# .npmrc 파일 제거 (보안상 권장)
RUN rm -f .npmrc

# 서버 실행
CMD ["npm", "start"]