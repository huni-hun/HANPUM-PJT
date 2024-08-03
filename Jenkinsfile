pipeline {
    agent any

    environment {
        DOCKER_HUB_ID = 'o54711254'
        DOCKER_HUB_REPOSITORY = 'hanpum'
        GIT_URL = 'github.com/HANPUM-PJT/HANPUM-PJT.git'
        PROJECT_NAME = 'HANPUM-PJT'
        BACKEND_DIR = 'backend'
        FRONTEND_DIR = 'frontend'
    }

    stages {
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

        stage('Set Commit Message') {
            steps {
                script {
                    env.COMMIT_MESSAGE = sh(script: "cd ${PROJECT_NAME} && git log -1 --pretty=%B", returnStdout: true).trim()
                }
            }
        }

        stage('Set Environment Files') {
            when {
                branch 'develop'
            }
            steps {
                script {
                    withCredentials([string(credentialsId: 'github-token', variable: 'GITHUB_TOKEN')]) {
                        if (env.COMMIT_MESSAGE.contains("[BE]")) {
                            sh """
                                wget -O ${PROJECT_NAME}/${BACKEND_DIR}/src/main/resources/application.yml --header="Authorization: token ${GITHUB_TOKEN}" "https://raw.githubusercontent.com/HANPUM-PJT/config/main/application.yml"
                            """
                        } else if (env.COMMIT_MESSAGE.contains("[FE]")) {
                            sh """
                                wget -O ${PROJECT_NAME}/${FRONTEND_DIR}/.env --header="Authorization: token ${GITHUB_TOKEN}" "https://raw.githubusercontent.com/HANPUM-PJT/config/main/.env"
                            """
                        }
                    }
                }
            }
        }

        stage('Stop and Remove') {
            when {
                branch 'develop'
            }
            steps {
                script {
                    if (env.COMMIT_MESSAGE.contains("[BE]")) {
                        sh "docker rm -f hanpum-backend || true"
                        sh "docker rmi ${DOCKER_HUB_ID}/${DOCKER_HUB_REPOSITORY}-backend:latest || true"
                    } else if (env.COMMIT_MESSAGE.contains("[FE]")) {
                        sh "docker rm -f hanpum-frontend || true"
                        sh "docker rmi ${DOCKER_HUB_ID}/${DOCKER_HUB_REPOSITORY}-frontend:latest || true"
                    }
                }
            }
        }

        stage('Build and Push Docker Image') {
            when {
                branch 'develop'
            }
            steps {
                script {
                    def imageName = ''
                    if (env.COMMIT_MESSAGE.contains("[BE]")) {
                        dir("${PROJECT_NAME}/${BACKEND_DIR}") {
                            imageName = "${DOCKER_HUB_ID}/${DOCKER_HUB_REPOSITORY}-backend"
                            sh "docker build -t ${imageName}:${env.BUILD_NUMBER} ."
                            sh "docker tag ${imageName}:${env.BUILD_NUMBER} ${imageName}:latest"
                            docker.withRegistry('', 'dockerhub-credentials') {
                                sh "docker push ${imageName}:${env.BUILD_NUMBER}"
                                sh "docker push ${imageName}:latest"
                            }
                        }
                    } else if (env.COMMIT_MESSAGE.contains("[FE]")) {
                        dir("${PROJECT_NAME}/${FRONTEND_DIR}") {
                            imageName = "${DOCKER_HUB_ID}/${DOCKER_HUB_REPOSITORY}-frontend"
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

        stage('Deploy') {
            when {
                branch 'develop'
            }
            steps {
                script {
                    def imageName = ''
                    if (env.COMMIT_MESSAGE.contains("[BE]")) {
                        imageName = "${DOCKER_HUB_ID}/${DOCKER_HUB_REPOSITORY}-backend"
                        sh "docker pull ${imageName}:latest"
                        sh "docker run -d --rm --network hanpum --name hanpum-backend -p 8080:8080 ${imageName}:latest"
                        sh "docker rmi ${imageName}:${env.BUILD_NUMBER}"
                    } else if (env.COMMIT_MESSAGE.contains("[FE]")) {
                        imageName = "${DOCKER_HUB_ID}/${DOCKER_HUB_REPOSITORY}-frontend"
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
                    if (env.COMMIT_MESSAGE.contains("[BE]")) {
                        echo "BE build and deployment succeeded! Commit by: ${GIT_COMMIT_AUTHOR} Build Number: ${env.BUILD_NUMBER}"
                    } else if (env.COMMIT_MESSAGE.contains("[FE]")) {
                        echo "FE build and deployment succeeded! Commit by: ${GIT_COMMIT_AUTHOR} Build Number: ${env.BUILD_NUMBER}"
                    }
                    // slackSend(channel: env.SLACK_CHANNEL, message: "Build and deployment succeeded! Commit by: ${GIT_COMMIT_AUTHOR} Build Number: ${env.BUILD_NUMBER}", tokenCredentialId: env.SLACK_CREDENTIAL_ID)
                }
            }
            deleteDir()
        }
        failure {
            script {
                dir("${PROJECT_NAME}") {
                    def GIT_COMMIT_AUTHOR = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
                    echo "Build or deployment failed! Commit by: ${GIT_COMMIT_AUTHOR}"
                    // slackSend(channel: env.SLACK_CHANNEL, message: "Build or deployment failed! Commit by: ${GIT_COMMIT_AUTHOR}", tokenCredentialId: env.SLACK_CREDENTIAL_ID)
                }
            }
            deleteDir()
        }
    }
}
