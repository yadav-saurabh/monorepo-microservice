# Monorepo Microservice

Monorepo Microservices using nestjs kafka and docker, k8s

## Getting Started

To get a local copy up and running, please follow these simple steps.

### Prerequisites

Here is what you need.

### Prerequisite

- [Node.js](https://nodejs.org/en)  (Version: >= 20.x)
- [docker](https://docs.docker.com/engine/install/), [docker-compose (if not using k8s)](https://docs.docker.com/compose/install/) (Version: >= 26.x, 2.x)

#### If using k8s

- [minikube](https://minikube.sigs.k8s.io/docs/start/) (Version > v1.33.1)
- [minikube ingress addon](https://minikube.sigs.k8s.io/docs/handbook/addons/ingress-dns/)
- [skaffold](https://skaffold.dev/docs/install/#standalone-binary) (Version > v2.10.0)
- [helm](https://helm.sh/) (Version > v3.14.3)

## Setup (development)

- Setup Node If your Node version does not meet the project's requirements as instructed by the docs, either [manually](https://nodejs.org/dist/latest-v20.x/) or using a tool like [nvm](https://github.com/nvm-sh/nvm) or [volta](https://volta.sh/) (recommended)

- Clone the repo

    ```bash
    git clone git@github.com:yadav-saurabh/monorepo-microservice.git
    ```

- Go to the project folder

    ```bash
    cd monorepo-microservice
    ```

### Using docker and docker-compose

- Install packages with yarn

    ```bash
    npm i
    ```

- Set up your `.env` file

  - Duplicate `.env.example` to `.env`
  - Configure environment variables in the `.env` file. Replace the placeholder values with their applicable values

- Run docker compose to get all the services up and running

    ```bash
    docker-compose --env-file .env -f ./infra/compose.yaml up
    ```

- Run npm command `dev` it will start dev script for all the services and packages

    ```bash
    npm run dev
    ```

### Using kubernetes (minikube)

- Start minikube `minikube start`
  
- Get minikube ip and add it to hosts `minikube ip` to get the IP then edit the `/etc/hosts` files and add `<minikube ip>  <ingress host>`

    ```txt
    192.168.49.2  microservices.test
    ```

- Run skaffold command `dev` it will run the skaffold in dev mode

    ```bash
    skaffold dev -f ./infra/skaffold.yaml --tail=true
    ```
