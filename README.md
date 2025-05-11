# E-Commerce Application

A modern, full-stack e-commerce application built with React, Firebase, and containerized with Docker for easy deployment with Kubernetes.

![E-Commerce Platform](https://via.placeholder.com/800x400?text=E-Commerce+Platform)

## Features

- **User Authentication**: Secure login, registration, and profile management
- **Product Management**: Browse, search, and filter products by categories
- **Shopping Cart**: Add, remove, and update quantities of products
- **Checkout Process**: Streamlined checkout with shipping and payment options
- **Admin Dashboard**: Complete product, category, and order management
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: 
  - React.js (v19)
  - React Router v7
  - Tailwind CSS
  - Material UI components

- **Backend/Database**: 
  - Firebase Authentication
  - Firestore Database
  - Firebase Storage (for product images)

- **DevOps**:
  - Docker for containerization
  - Kubernetes for orchestration
  - GitHub Actions for CI/CD

## Project Structure

```
/
├── app/                          # Main application code
│   ├── client/                   # Frontend React application
│   │   ├── src/
│   │   │   ├── components/       # Reusable UI components
│   │   │   ├── contexts/         # React context providers
│   │   │   ├── firebase/         # Firebase configuration and utilities
│   │   │   ├── pages/            # Application pages
│   │   │   │   ├── admin/        # Admin dashboard pages
│   │   │   │   ├── auth/         # Authentication pages
│   │   │   │   ├── shop/         # Shop pages
│   │   │   │   └── user/         # User profile pages
│   │   │   └── utils/            # Helper functions
│   │   ├── public/               # Static assets
│   │   ├── Dockerfile            # Docker configuration for frontend
│   │   └── nginx.conf            # Nginx configuration for serving React app
├── deployment.yaml               # Kubernetes deployment configuration
├── service.yaml                  # Kubernetes service configuration
└── .github/                      # GitHub Actions workflows
    └── workflows/
        └── deploy.yml            # CI/CD pipeline configuration
```

## Prerequisites

- Node.js (v18+)
- npm or yarn
- Docker and Docker Compose (for containerized development)
- Kubernetes cluster (for deployment)
- Firebase account

## Getting Started

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Safi1000/SCDProj.git
   cd SCDProj
   ```

2. **Frontend Setup**
   ```bash
   cd app/client
   npm install
   npm start
   ```
   
   The application will be available at `http://localhost:3000`

### Docker Development

Run the frontend in a Docker container:

```bash
cd app/client
docker build -t ecommerce-client .
docker run -p 3000:80 ecommerce-client
```

Access the application at `http://localhost:3000`

### Using Pre-built Image

You can also run the application using the pre-built Docker image:

```bash
docker run -p 3000:80 i222401/ecommerce:latest
```

## Deployment

### Kubernetes Deployment

1. **Apply the Kubernetes configurations**:
   ```bash
   kubectl apply -f deployment.yaml
   kubectl apply -f service.yaml
   ```

2. **Access the application**:
   The application will be available at `http://<node-ip>:30007`

### GitHub Actions CI/CD

The repository includes a GitHub Actions workflow that:
1. Builds the Docker image
2. Pushes it to Docker Hub
3. Deploys to a Kubernetes cluster

## Pushing Code to GitHub

1. **Initialize Git Repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit with app and Dockerfile"
   ```

2. **Add Remote Repository**:
   ```bash
   git remote add origin https://github.com/Safi1000/SCDProj.git
   git push -u origin main
   ```

3. **Verify** that your code, including the Dockerfile and Kubernetes files, is visible in the GitHub repository.

## Troubleshooting

### Common Issues

1. **White Screen in Browser**
   - Check browser console for JavaScript errors
   - Verify that nginx is correctly serving static files
   - Ensure the correct base path is set in the React application

2. **Firebase Authentication Issues**
   - Verify that your Firebase configuration is correct
   - Check that authentication is enabled in your Firebase project

3. **Docker/Kubernetes Issues**
   - Ensure Docker is running and has sufficient resources
   - Check pod logs with `kubectl logs [pod-name]`
   - Verify that services are correctly configured

## Acknowledgments

- [React](https://reactjs.org/)
- [Firebase](https://firebase.google.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Docker](https://www.docker.com/)
- [Kubernetes](https://kubernetes.io/) 