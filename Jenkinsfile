pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "nextjs-app"
        EC2_INSTANCE_IP = "3.111.255.131"
        SSH_CREDENTIALS_ID = "ec2-ssh-key"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Retrieve .env.local') {
            steps {
                script {
                    // This step fetches the .env.local file from Jenkins' Config File Management
                    configFileProvider([configFile(fileId: '0ed26678-a0d7-4f76-afdb-75435d534b7a', variable: 'ENV_FILE')]) {
                        // Ensure the file is copied to the workspace
                        sh 'cp $ENV_FILE ./.env.local'
                        sh 'ls -la .env.local || echo "Missing .env.local!"'

                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo "Building Docker image..."

                    // Build Docker image using the .env.local credentials
                    sh 'docker build -t $DOCKER_IMAGE .'  // Build Docker image
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    echo "Pushing Docker image to Docker Hub..."
                    sh 'docker push $DOCKER_IMAGE'
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                script {
                    echo "Deploying to EC2 instance..."

                    withCredentials([sshUserPrivateKey(credentialsId: "$SSH_CREDENTIALS_ID", keyFileVariable: 'SSH_KEY')]) {
                        sh '''
                            ssh -o StrictHostKeyChecking=no -i $SSH_KEY ubuntu@$EC2_INSTANCE_IP << 'EOF'
                            docker pull $DOCKER_IMAGE  # Pull the Docker image from registry
                            docker run -d -p 80:3000 $DOCKER_IMAGE  # Run Docker container
                            EOF
                        '''
                    }
                }
            }
        }
    }
}
