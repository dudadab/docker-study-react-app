# Memo App Frontend (Docker Study)

이 프로젝트는 팀원들과 **Docker 및 Docker Compose**를 스터디하기 위해 만들어진 간단한 메모장(Memo) 프론트엔드 애플리케이션입니다. [React](https://react.dev/)와 [Vite](https://vitejs.dev/)를 기반으로 작성되었으며, `nest-app` 백엔드 서버와 연동하여 동작합니다.

## 🚀 기술 스택

- **Framework**: React 19, Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Package Manager**: Yarn (Berry)
- **Containerization**: Docker

## 🐳 Docker로 컨테이너 실행하기 (과제)

이 프로젝트는 Docker 스터디를 위해 `Dockerfile`이 `.gitignore`에 추가되어 있어 저장소에 공유되지 않습니다.
여러분이 직접 `Dockerfile`을 작성하여 빌드하고 컨테이너 환경에서 실행해 보세요!

### 1. Dockerfile 작성하기

프로젝트 루트 디렉토리(`react-app`)에 `Dockerfile`을 생성하고, Node.js 환경에서 앱이 실행될 수 있도록 구성합니다. (또는 빌드된 결과물을 Nginx 등으로 서빙하도록 작성해도 좋습니다.)

### 2. Docker 이미지 빌드하기

작성한 `Dockerfile`을 바탕으로 다음 명령어를 실행하여 이미지를 빌드합니다.

```bash
docker build -t memo-frontend .
```

### 3. Docker 컨테이너 실행하기

빌드된 이미지를 기반으로 컨테이너를 실행합니다.

```bash
# 예시: 5173 포트를 사용할 경우
docker run -p 5173:5173 -d --name memo-frontend-container memo-frontend
```

---

## 💻 로컬(Local) 개발 환경에서 실행하기

Docker 환경이 아닌 로컬에서 직접 실행하는 방법입니다. Node.js 환경이 필요합니다.

### 1. 패키지 설치

이 프로젝트는 패키지 매니저로 Yarn을 사용합니다.

```bash
yarn install
```

### 2. 애플리케이션 실행

```bash
# 개발 서버 실행
yarn dev

# 빌드 및 프리뷰
yarn build
yarn preview
```

---

## 🎯 Docker Compose 스터디 목표 추천

프론트엔드(`react-app`)와 백엔드(`nest-app`)를 활용하여 팀원들과 다음과 같은 실습을 진행해 보세요!

1. **프론트엔드 컨테이너화**: 프론트엔드 전용 `Dockerfile` 완성하기
2. **멀티 컨테이너 구성 (Multi-container)**: 프론트엔드 컨테이너와 백엔드 컨테이너를 하나의 `docker-compose.yml` 파일로 묶어서 동시에 실행하기
3. **네트워크 설정 및 통신**: 브라우저에서 프론트엔드에 접속했을 때 컨테이너로 띄워진 백엔드 API 서버를 정상적으로 호출할 수 있도록 환경 변수 및 네트워크 구성하기
