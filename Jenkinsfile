pipeline {
    agent any

    environment {
        // Docker image and EC2 details
        DOCKER_IMAGE = "nextjs-app"
        EC2_INSTANCE_IP = "3.110.103.184"
        SSH_CREDENTIALS_ID = "ec2-ssh-key" 

        // Firebase credentials (stored as Jenkins credentials)
        FIREBASE_API_KEY = credentials('FIREBASE_API_KEY')
        FIREBASE_AUTH_DOMAIN = credentials('FIREBASE_AUTH_DOMAIN')
        FIREBASE_PROJECT_ID = credentials('FIREBASE_PROJECT_ID')
        FIREBASE_STORAGE_BUCKET = credentials('FIREBASE_STORAGE_BUCKET')
        FIREBASE_MESSAGING_SENDER_ID = credentials('FIREBASE_MESSAGING_SENDER_ID')
        FIREBASE_APP_ID = credentials('FIREBASE_APP_ID')
        FIREBASE_MEASUREMENT_ID = credentials('FIREBASE_MEASUREMENT_ID')
    }

    stages {
        // Stage to clone the repository
        stage('Checkout') {
            steps {
                checkout scm  // Checkout the latest code from the Git repository
            }
        }

        // Stage to build the Docker image
        stage('Build Docker Image') {
            steps {
                script {
                    echo "Building the Docker image..."
                    sh 'docker build -t $DOCKER_IMAGE .'  // Build the Docker image from the Dockerfile in the repo
                }
            }
        }

        // Stage to deploy to EC2 using SSH
        stage('Deploy to EC2') {
            steps {
                script {
                    echo "Deploying to EC2 instance..."

                    // Use SSH key for deployment
                    withCredentials([sshUserPrivateKey(credentialsId: "$SSH_CREDENTIALS_ID", keyFileVariable: 'SSH_KEY')]) {
                        sh '''
                            # Ensure the Docker image is pulled on the EC2 instance
                            ssh -o StrictHostKeyChecking=no -i $SSH_KEY ubuntu@$EC2_INSTANCE_IP << 'EOF'
                            docker pull $DOCKER_IMAGE  # Pull the Docker image from the registry
                            docker run -d -p 80:3000 $DOCKER_IMAGE  # Run the Docker container
                            EOF
                        '''
                    }
                }
            }
        }
    }
}
