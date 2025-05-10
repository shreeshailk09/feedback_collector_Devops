pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "nextjs-app"
        EC2_INSTANCE_IP = "3.110.103.184"
        SSH_CREDENTIALS_ID = "ec2-ssh-key" 
         agent any
   
      
        FIREBASE_API_KEY = credentials('FIREBASE_API_KEY')
        FIREBASE_AUTH_DOMAIN = credentials('FIREBASE_AUTH_DOMAIN')
        FIREBASE_PROJECT_ID = credentials('FIREBASE_PROJECT_ID')
        FIREBASE_STORAGE_BUCKET = credentials('FIREBASE_STORAGE_BUCKET')
        FIREBASE_MESSAGING_SENDER_ID = credentials('FIREBASE_MESSAGING_SENDER_ID')
        FIREBASE_APP_ID = credentials('FIREBASE_APP_ID')
        FIREBASE_MEASUREMENT_ID = credentials('FIREBASE_MEASUREMENT_ID')
    
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
