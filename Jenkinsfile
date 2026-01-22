pipeline {
    agent any

    tools {
        nodejs 'node18' // Make sure NodeJS tool is configured in Jenkins
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

        stage('Install Backend Dependencies') {
            steps {
                dir('server') {
                    echo '📦 Installing backend dependencies...'
                    bat 'npm ci'
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('client') {
                    echo '📦 Installing frontend dependencies...'
                    bat 'npm ci'
                }
            }
        }

        stage('Run Frontend Tests') {
            steps {
                dir('client') {
                    echo '🧪 Running frontend tests...'
                    // Run Jest tests
                    bat 'npm test -- --watchAll=false --runInBand --passWithNoTests'
                }
            }
        }

        stage('Run Backend Tests') {
            steps {
                dir('server') {
                    echo '🧪 Running backend tests...'
                    bat 'npm test -- --watchAll=false --runInBand --passWithNoTests'
                }
            }
        }

        stage('Build React App') {
            steps {
                dir('client') {
                    echo '🚀 Building React app...'
                    bat 'npm run build'
                }
            }
        }

        stage('Archive Build Artifacts') {
            steps {
                echo '📦 Archiving build artifacts...'
                archiveArtifacts artifacts: 'client/build/**', fingerprint: true
            }
        }
    }

    post {
        success {
            echo '✅ Tests & Build Successful'
        }
        failure {
            echo '❌ Pipeline Failed'
        }
        always {
            cleanWs()
        }
    }
}
