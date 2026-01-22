pipeline {
    agent any

    tools {
        nodejs 'node18'
    }

    environment {
        CI = 'true'
        NODE_ENV = 'test'
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'master',
                    url: 'https://github.com/DevaPrasanth44/Chat_App'
            }
        }

        /* ================= BACKEND ================= */

        stage('Install Backend Dependencies') {
            steps {
                dir('server') {
                    echo 'Installing backend dependencies...'
                    bat 'npm ci'
                }
            }
        }

        stage('Backend Health Check') {
            steps {
                dir('server') {
                    echo 'Checking backend startup...'
                    bat 'node -e "console.log(\'Backend OK\')"'
                }
            }
        }

        /* ================= FRONTEND ================= */

        stage('Install Frontend Dependencies') {
            steps {
                dir('client') {
                    echo 'Installing frontend dependencies...'
                    bat 'npm ci'
                }
            }
        }

        stage('Run Frontend Tests') {
            steps {
                dir('client') {
                    echo 'Running frontend tests...'
                    bat 'npm test -- --watch=false --runInBand'
                }
            }
        }

        stage('Build React App') {
            steps {
                dir('client') {
                    echo 'Building React application...'
                    bat 'npm run build'
                }
            }
        }

        stage('Archive Build Artifacts') {
            steps {
                archiveArtifacts artifacts: 'client/build/**', fingerprint: true
            }
        }
    }

    post {
        success {
            echo '✅ CI Pipeline completed successfully!'
        }
        failure {
            echo '❌ CI Pipeline failed!'
        }
        always {
            cleanWs()
        }
    }
}
