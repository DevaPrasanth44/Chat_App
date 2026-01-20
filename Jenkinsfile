pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/DevaPrasanth44/Chat_App'
            }
        }

        stage('Install Client Dependencies') {
            steps {
                dir('client') {
                    sh 'npm install'
                }
            }
        }

        stage('Build React App') {
            steps {
                dir('client') {
                    sh 'npm run build'
                }
            }
        }

        stage('Install Server Dependencies') {
            steps {
                dir('server') {
                    sh 'npm install'
                }
            }
        }

        stage('Backend Ready') {
            steps {
                echo 'Backend installed successfully'
            }
        }
    }

    post {
        success {
            echo '✅ Build & setup successful'
        }
        failure {
            echo '❌ Build failed'
        }
    }
}
