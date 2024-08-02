pipeline {
    agent any

    environment {
        DOCKER_HUB_ID = 'o54711254'
        DOCKER_HUB_REPOSITORIE = 'hanpum'
        GIT_URL = 'github.com/HANPUM-PJT/HANPUM-PJT.git'
        PROJECT_NAME = 'HANPUM-PJT'
        BACKEND_DIR = 'backend'
        FRONTEND_DIR = 'frontend'
        // SLACK_CHANNEL = '#ci-cd-notifications'
        // SLACK_CREDENTIAL_ID = 'slack-token'
    }

    stages {
        // 깃 클론
        stage('Clone Repository') {
            when {
                branch 'develop'
            }
            steps {
                withCredentials([string(credentialsId: 'github-token', variable: 'GITHUB_TOKEN')]) {
                    sh "git clone https://oauth2:${GITHUB_TOKEN}@${GIT_URL} ${PROJECT_NAME}"
                }
            }
        }
        // 환경변수 파일 넣어주기
        stage('Set Environment Files') {
            when {
                branch 'develop'
            }
            steps {
                script {
                    withCredentials([string(credentialsId: 'github-token', variable: 'GITHUB_TOKEN')]) {
                        def commitMessage = sh(script: "git log -1 --pretty=%B", returnStdout: true).trim()
                        if (commitMessage.contains("[BE]")) {
                            sh """
                                mkdir -p ~/${PROJECT_NAME}/backend/src/main/resources
                                wget -O ~/${PROJECT_NAME}/backend/src/main/resources/application.yml --header="Authorization: token ${GITHUB_TOKEN}" "https://raw.githubusercontent.com/HANPUM-PJT/config/main/application.yml"
                            """
                        } else if (commitMessage.contains("[FE]")) {
                            sh """
                                wget -O ~/${PROJECT_NAME}/frontend/.env --header="Authorization: token ${GITHUB_TOKEN}" "https://raw.githubusercontent.com/HANPUM-PJT/config/main/.env"
                            """
                        }
                    }
                }
            }
        }

        // 기존 컨테이너 삭제
        stage('Stop and Remove') {
            when {
                branch 'develop'
            }
            steps {
                script {
                    def commitMessage = sh(script: "git log -1 --pretty=%B", returnStdout: true).trim()
                    def imageName = ''
                    if (commitMessage.contains("[BE]")) {
                        imageName = "${DOCKER_HUB_ID}/${DOCKER_HUB_REPOSITORIE}-backend"
                        sh "docker rm -f hanpum-backend || true"
                        sh "docker rmi ${imageName}:latest || true"
                    } else if (commitMessage.contains("[FE]")) {
                        imageName = "${DOCKER_HUB_ID}/${DOCKER_HUB_REPOSITORIE}-frontend"
                        sh "docker rm -f hanpum-frontend || true"
                        sh "docker rmi ${imageName}:latest || true"
                    }
                }
            }
        }

        // 이미지 도커 허브에 push
        stage('Build and Push Docker Image') {
            when {
                branch 'develop'
            }
            steps {
                script {
                    def commitMessage = sh(script: "git log -1 --pretty=%B", returnStdout: true).trim()
                    def imageName = ''
                    if (commitMessage.contains("[BE]")) {
                        dir("${PROJECT_NAME}/${BACKEND_DIR}") {
                            imageName = "${DOCKER_HUB_ID}/${DOCKER_HUB_REPOSITORIE}-backend"
                            sh "docker build -t ${imageName}:${env.BUILD_NUMBER} ."
                            sh "docker tag ${imageName}:${env.BUILD_NUMBER} ${imageName}:latest"
                            docker.withRegistry('', 'dockerhub-credentials') {
                                sh "docker push ${imageName}:${env.BUILD_NUMBER}"
                                sh "docker push ${imageName}:latest"
                            }
                        }
                    } else if (commitMessage.contains("[FE]")) {
                        dir("${PROJECT_NAME}/${FRONTEND_DIR}") {
                            imageName = "${DOCKER_HUB_ID}/${DOCKER_HUB_REPOSITORIE}-frontend"
                            sh "docker build -t ${imageName}:${env.BUILD_NUMBER} ."
                            sh "docker tag ${imageName}:${env.BUILD_NUMBER} ${imageName}:latest"
                            docker.withRegistry('', 'dockerhub-credentials') {
                                sh "docker push ${imageName}:${env.BUILD_NUMBER}"
                                sh "docker push ${imageName}:latest"
                            }
                        }
                    }
                }
            }
        }

        // 도커 허브의 이미지 pull 해서 run
        stage('Deploy') {
            when {
                branch 'develop'
            }
            steps {
                script {
                    def commitMessage = sh(script: "git log -1 --pretty=%B", returnStdout: true).trim()
                    def imageName = ''
                    if (commitMessage.contains("[BE]")) {
                        imageName = "${DOCKER_HUB_ID}/${DOCKER_HUB_REPOSITORIE}-backend"
                        sh "docker pull ${imageName}:latest"
                        sh "docker run -d --rm --network hanpum --name hanpum-backend -p 8080:8080 ${imageName}:latest"
                        sh "docker rmi ${imageName}:${env.BUILD_NUMBER}"
                    } else if (commitMessage.contains("[FE]")) {
                        imageName = "${DOCKER_HUB_ID}/${DOCKER_HUB_REPOSITORIE}-frontend"
                        sh "docker pull ${imageName}:latest"
                        sh "docker run -d --rm --network hanpum --name hanpum-frontend -p 3000:3000 ${imageName}:latest"
                        sh "docker rmi ${imageName}:${env.BUILD_NUMBER}"
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                dir("${PROJECT_NAME}") {
                    def GIT_COMMIT_AUTHOR = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
                    echo "Commit by: ${GIT_COMMIT_AUTHOR}"
                }
            }
        }
        success {
            script {
                dir("${PROJECT_NAME}") {
                    def GIT_COMMIT_AUTHOR = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
                    def commitMessage = sh(script: "git log -1 --pretty=%B", returnStdout: true).trim()
                    if (commitMessage.contains("[BE]")) {
                        echo "BE build and deployment succeeded! Commit by: ${GIT_COMMIT_AUTHOR} Build Number : ${env.BUILD_NUMBER}"
                    } else if (commitMessage.contains("[FE]")) {
                        echo "FE build and deployment succeeded! Commit by: ${GIT_COMMIT_AUTHOR} Build Number : ${env.BUILD_NUMBER}"
                    }
                    // slackSend(channel: env.SLACK_CHANNEL, message: "Build and deployment succeeded! Commit by: ${GIT_COMMIT_AUTHOR} Build Number : ${env.BUILD_NUMBER}", tokenCredentialId: env.SLACK_CREDENTIAL_ID)
                }
            }
            deleteDir()
        }
        failure {
            script {
                dir("${PROJECT_NAME}") {
                    def GIT_COMMIT_AUTHOR = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
                    def commitMessage = sh(script: "git log -1 --pretty=%B", returnStdout: true).trim()
                    echo "Build or deployment failed! Commit by: ${GIT_COMMIT_AUTHOR}"
                    // slackSend(channel: env.SLACK_CHANNEL, message: "Build or deployment failed! Commit by: ${GIT_COMMIT_AUTHOR}", tokenCredentialId: env.SLACK_CREDENTIAL_ID)
                }
            }
            deleteDir()
        }
    }
}
