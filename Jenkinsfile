pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "nextjs-app"
        EC2_INSTANCE_IP = "3.110.103.184"
        SSH_CREDENTIALS_ID = "ec2-ssh-key"  // Use the ID you set when uploading the key
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm  // Checkout your Git repository
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t $DOCKER_IMAGE .'  // Build the Docker image
                }
            }
        }
        stage('Deploy to EC2') {
            steps {
                script {
                    // Use the SSH key for deployment
                    withCredentials([sshUserPrivateKey(credentialsId: "$SSH_CREDENTIALS_ID", keyFileVariable: 'SSH_KEY')]) {
                        sh '''
                            echo "Deploying to EC2 instance"
                            ssh -o StrictHostKeyChecking=no -i $SSH_KEY ubuntu@$EC2_INSTANCE_IP "docker run -d -p 80:3000 $DOCKER_IMAGE"
                        '''
                    }
                }
            }
        }
    }
}
