pipeline {
    agent any

    tools {
        nodejs 'node18' // NodeJS 18 installed in Jenkins Global Tool Config
    }

    environment {
        CI = 'true'
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'master',
                    url: 'https://github.com/DevaPrasanth44/Chat_App'
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('server') {
                    echo 'Installing backend dependencies...'
                    bat 'npm install'
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('client') {
                    echo 'Installing frontend dependencies...'
                    bat 'npm install'
                }
            }
        }

        stage('Backend Health Check') {
            steps {
                dir('server') {
                    echo 'Checking Node version...'
                    bat 'node -v'
                }
            }
        }

        stage('Run Frontend Tests') {
            steps {
                dir('client') {
                    echo 'Running frontend tests...'
                    bat 'npm test -- --watchAll=false'
                }
            }
        }

        stage('Build React App') {
            steps {
                dir('client') {
                    echo 'Building React app...'
                    bat 'npm run build'
                }
            }
        stage('Run Frontend Tests') {
    steps {
        dir('client') {
            echo 'Running frontend tests...'
            bat 'npm test -- --watchAll=false'
        }
    }
}
        }
    }

    post {
        success {
            echo '✅ Build and Test completed successfully!'
        }
        failure {
            echo '❌ Build or Test failed!'
        }
    }
}
