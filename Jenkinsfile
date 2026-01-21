pipeline {
    agent any

    environment {
        NODE_ENV = 'test'
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'master',
                    url: 'https://github.com/DevaPrasanth44/Chat_App'
            }
        }

        /* ================= FRONTEND ================= */

        stage('Build Frontend (React)') {
            steps {
                dir('client') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        stage('Test Frontend') {
            steps {
                dir('client') {
                    // React tests (Jest)
                    bat 'npm test -- --watchAll=false'
                }
            }
        }

        /* ================= BACKEND ================= */

        stage('Build Backend (Node)') {
            steps {
                dir('server') {
                    bat 'npm install'
                }
            }
        }

        stage('Test Backend') {
            steps {
                dir('server') {
                    // Works if you have jest/mocha configured
                    bat 'npm test'
                }
            }
        }
    }

    post {
        success {
            echo '✅ Build & Tests completed successfully'
        }
        failure {
            echo '❌ Build or Tests failed'
        }
    }
}
