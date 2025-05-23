pipeline {
  agent any

  environment {
    DOCKER_IMAGE = "shreeshailk09/my-next-app"
    DOCKER_TAG = "latest"
  }

  stages {
    stage('Checkout') {
      steps {
        git 'https://github.com/shreeshailk09/feedback_collector_Devops.git'
      }
    }

    stage('Prepare env file') {
      steps {
        withCredentials([file(credentialsId: 'firebase-env', variable: 'ENV_LOCAL')]) {
          // Copy the secret env file to workspace as .env.local using Windows copy command
          bat 'copy /Y "%ENV_LOCAL%" ".env.local"'
        }
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
          docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
        }
      }
    }

    stage('Push Docker Image') {
      steps {
        script {
          docker.withRegistry('https://registry.hub.docker.com', 'dockerhub-credentials') {
            docker.image("${DOCKER_IMAGE}:${DOCKER_TAG}").push()
          }
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG')]) {
          // Use Windows batch commands for kubectl
          bat """
            kubectl --kubeconfig="%KUBECONFIG%" apply -f k8s\\deployment.yaml
            kubectl --kubeconfig="%KUBECONFIG%" apply -f k8s\\service.yaml
          """
        }
      }
    }
  }

  post {
    success {
      echo "Deployment successful! 🎉"
    }
    failure {
      echo "Deployment failed. Check logs."
    }
  }
}
