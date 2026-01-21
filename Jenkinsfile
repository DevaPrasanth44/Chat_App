pipeline {
    agent any

    tools {
        nodejs 'node18' // NodeJS installation configured in Jenkins
    }

    environment {
        CI = 'true'
    }

    options {
        timestamps()
        ansiColor('xterm')
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/DevaPrasanth44/Chat_App'
            }
        }

        stage('Install Dependencies') {
            parallel {
                stage('Install Backend Dependencies') {
                    steps {
                        dir('server') {
                            bat 'npm install'
                        }
                    }
                }
                stage('Install Frontend Dependencies') {
                    steps {
                        dir('client') {
                            bat 'npm install'
                        }
                    }
                }
            }
        }

        stage('Backend Tests') {
            steps {
                dir('server') {
                    bat 'npm test'
                }
            }
        }

        stage('Frontend Tests') {
            steps {
                dir('client') {
                    bat 'npm test -- --watchAll=false'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('client') {
                    bat 'npm run build'
                }
            }
        }
    }

    post {
        always {
            echo '📌 Pipeline finished'
        }
        success {
            echo '✅ Build & Tests completed successfully'
        }
        failure {
            echo '❌ Build or Tests failed'
        }
    }
}
