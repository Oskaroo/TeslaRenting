# Step 1: Build the frontend
FROM node:16 AS builder
WORKDIR /app

# Copy the package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire frontend code and build it
COPY . .
RUN npm run build

# Step 2: Serve the frontend with NGINX
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy NGINX configuration (if custom config is needed, specify here)
# Ensure nginx.conf listens on port 80 inside the container
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
