pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
    }

    stages {

        stage('Checkout Code') {
            steps {
                // Make sure this matches your GitHub branch name (master/main)
                git branch: 'master', url: 'https://github.com/DevaPrasanth44/Chat_App'
            }
        }

        stage('Install Client Dependencies') {
            steps {
                dir('client') {
                    bat 'npm install'
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

        stage('Install Server Dependencies') {
            steps {
                dir('server') {
                    bat 'npm install'
                }
            }
        }

        stage('Backend Ready') {
            steps {
                echo '✅ Backend installed successfully'
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
