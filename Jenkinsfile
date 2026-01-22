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

        stage('Install Backend Dependencies') {
            steps {
                dir('server') {
                    bat 'npm ci'
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('client') {
                    bat 'npm ci'
                }
            }
        }

        stage('Run Frontend Tests') {
            steps {
                dir('client') {
                    bat 'npm test -- --watch=false --runInBand'
                }
            }
        }

        stage('Build React App') {
            steps {
                dir('client') {
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
