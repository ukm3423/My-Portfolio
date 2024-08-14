pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS_ID = 'docker-hub-credentials-id'
        GITHUB_CREDENTIALS_ID = 'github-credentials-id'
        DOCKER_IMAGE_NAME = 'umeshkumarchamp/my-portfolio'
        NODE_VERSION = '20.x'
        NETLIFY_AUTH_TOKEN = 'netlify-auth-token-id'
        NETLIFY_SITE_NAME = 'ukm' // Optional: You can specify a desired site name
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', credentialsId: "${GITHUB_CREDENTIALS_ID}", url: 'https://github.com/ukm3423/My-Portfolio.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    bat 'yarn install'
                }
            }
        }

        stage('Build Application') {
            steps {
                script {
                    bat 'yarn build'
                }
            }
        }

        stage('Create or Retrieve Netlify Site') {
            steps {
                script {
                    // Install Netlify CLI if not already installed
                    bat 'npm install -g netlify-cli'

                    // Create a new Netlify site if one doesn't exist and capture the Site ID
                    def siteInfo = bat(script: '''
                        netlify sites:create --name %NETLIFY_SITE_NAME% --auth=%NETLIFY_AUTH_TOKEN% --json
                    ''', returnStdout: true).trim()
                    
                    // Extract Site ID from the siteInfo JSON output
                    def siteId = readJSON(text: siteInfo).site_id

                    // Save Site ID as an environment variable for further steps
                    env.NETLIFY_SITE_ID = siteId
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    bat '''
                        docker build -t %DOCKER_IMAGE_NAME% .
                    '''
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    withDockerRegistry([credentialsId: "$DOCKER_CREDENTIALS_ID", url: 'https://index.docker.io/v1/']) {
                        bat 'docker push %DOCKER_IMAGE_NAME%'
                    }
                }
            }
        }

        stage('Deploy to Netlify') {
            steps {
                script {
                    bat '''
                        netlify deploy --prod --dir=dist --auth=$NETLIFY_AUTH_TOKEN --site=$NETLIFY_SITE_ID
                    '''
                }
            }
        }
    }

    post {
        always {
            bat 'docker system prune -af'
        }
    }
}
