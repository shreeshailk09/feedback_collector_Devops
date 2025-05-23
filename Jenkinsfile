pipeline {
  agent any

  environment {
    DOCKER_IMAGE = "shreeshailk09/my-next-app"
    DOCKER_TAG = "latest"
  }

  stages {
    stage('Checkout') {
      steps {
        echo "Checking out repo..."
        git 'https://github.com/shreeshailk09/feedback_collector_Devops.git'
      }
    }

    stage('Build Docker Image') {
      steps {
        echo "Building Docker image..."
        script {
          docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
        }
      }
    }

    stage('Push Docker Image') {
      steps {
        echo "Pushing Docker image to Docker Hub..."
        script {
          docker.withRegistry('https://registry.hub.docker.com', 'dockerhub-credentials.') {
            docker.image("${DOCKER_IMAGE}:${DOCKER_TAG}").push()
          }
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        echo "Deploying to Kubernetes..."
        withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG')]) {
          sh '''
            kubectl --kubeconfig=$KUBECONFIG apply -f k8s/deployment.yaml
            kubectl --kubeconfig=$KUBECONFIG apply -f k8s/service.yaml
          '''
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
