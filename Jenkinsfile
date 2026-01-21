pipeline {
    agent any

    tools {
        nodejs 'node18' // Make sure NodeJS 18 is installed in Jenkins Global Tool Configuration
    }

    environment {
        CI = 'true'
    }

    stages {

        stage('Checkout Code') {
            steps {
                // Explicitly checkout master branch
                git branch: 'master',
                    url: 'https://github.com/DevaPrasanth44/Chat_App'
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('server') {
                    echo 'Installing backend dependencies...'
                    sh 'npm install'
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('client') {
                    echo 'Installing frontend dependencies...'
                    sh 'npm install'
                }
            }
        }

        stage('Backend Health Check') {
            steps {
                dir('server') {
                    echo 'Checking Node version...'
                    sh 'node -v'
                }
            }
        }

        stage('Run Frontend Tests') {
            steps {
                dir('client') {
                    echo 'Running frontend tests...'
                    sh 'npm test -- --watchAll=false'
                }
            }
        }

        stage('Build React App') {
            steps {
                dir('client') {
                    echo 'Building React app...'
                    sh 'npm run build'
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
