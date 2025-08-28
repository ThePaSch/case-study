# Nitrado Case Study App: Calendar

This is an implementation of the Nitrado case study/challenge. It takes the form of a simple calendar SPA that allows the user to create events at any given future date.

It is available for preview under https://thepasch.github.io/case-study/.

## Setup

Make sure to install dependencies:

```bash
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run generate
```

## Deploy using Helm

The repository contains a Helm chart that allows for quick deployment to a Kubernetes cluster.

Install the chart using the following commands:

```bash
cd helm
helm install nitrado-case-study .
```

If your machine does not have internet access, the Docker Image for this application cannot be pulled from the Docker Hub public repository. Build it locally first:

```bash
docker build -t thepasch/nitrado-case-study:master .
```

### Running locally

Wait until the pod is ready. Once this is the case, forward a local port to the running service (e.g. 8080):

```bash
kubectl port-forward svc/nitrado-case-study-service 8080:80
```

Access the application under that port.

## Enabling Ingress

The application makes use of the Nginx Ingress Controller.

Enable Ingress by changing `enabled: false` to `enabled: true` in the `ingress` section of `values.yaml`.

Once done, install the chart as usual. Once the Ingress is active, you can access the application under the hostname configured in `values.yaml`; by default, it is `calendar.local`.
