// pipeline {
//     agent any

//     tools {
//         nodejs 'node18'
//     }

//     environment {
//         CI = 'true'
//         NODE_ENV = 'test'
//     }

//     stages {

//         stage('Checkout Code') {
//             steps {
//                 git branch: 'master',
//                     url: 'https://github.com/DevaPrasanth44/Chat_App'
//             }
//         }

//         stage('Install Backend Dependencies') {
//             steps {
//                 dir('server') {
//                     bat 'npm ci'
//                 }
//             }
//         }

//         stage('Run Backend Tests') {
//             steps {
//                 dir('server') {
//                     bat 'npm test'
//                 }
//             }
//         }

//         stage('Install Frontend Dependencies') {
//             steps {
//                 dir('client') {
//                     bat 'npm ci'
//                 }
//             }
//         }

//         stage('Run Frontend Tests') {
//             steps {
//                 dir('client') {
//                     bat 'npm test -- --watchAll=false --runInBand'
//                 }
//             }
//         }

//         stage('Build React App') {
//             steps {
//                 dir('client') {
//                     bat 'npm run build'
//                 }
//             }
//         }

//         stage('Archive Build Artifacts') {
//             steps {
//                 archiveArtifacts artifacts: 'client/build/**', fingerprint: true
//             }
//         }
//     }

//     post {
//         success {
//             echo '✅ All Tests Passed & Build Successful'
//         }
//         failure {
//             echo '❌ Tests Failed or Build Error'
//         }
//         always {
//             cleanWs()
//         }
//     }
// }

pipeline {
    agent any

    tools {
        nodejs 'node18'
    }

    options {
        timestamps()
        timeout(time: 30, unit: 'MINUTES')
        disableConcurrentBuilds()
    }

    environment {
        CI = 'true'
        NODE_ENV = 'test'
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/master']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/DevaPrasanth44/Chat_App'
                    ]]
                ])
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('server') {
                    retry(2) {
                        bat 'npm ci'
                    }
                }
            }
        }

        stage('Run Backend Tests') {
            steps {
                dir('server') {
                    bat 'npm test'
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('client') {
                    retry(2) {
                        bat 'npm ci'
                    }
                }
            }
        }

        stage('Run Frontend Tests') {
            steps {
                dir('client') {
                    bat 'npm test -- --watchAll=false --runInBand'
                }
            }
        }

        stage('Build React App') {
            steps {
                dir('client') {
                    bat 'npm run build'
                    stash name: 'react-build', includes: 'build/**'
                }
            }
        }

        stage('Archive Build Artifacts') {
            steps {
                unstash 'react-build'
                archiveArtifacts artifacts: 'build/**', fingerprint: true
            }
        }
    }

    post {
        success {
            echo '✅ All Tests Passed & Build Successful'
        }
        failure {
            echo '❌ Tests Failed or Build Error'
        }
        always {
            cleanWs(deleteDirs: true)
        }
    }
}
