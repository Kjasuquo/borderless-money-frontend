# Build Stage
FROM node:18-alpine AS build

WORKDIR /app
COPY . .

# Install dependencies and build the React app
RUN npm install
RUN npm run build

# Serve Stage
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Copy a custom Nginx config (optional, if needed)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
