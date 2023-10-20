# Use ARG to declare the build argument

# Use a builder stage to build your Next.js application
FROM node:18-alpine as builder
WORKDIR /my-space

ARG NEXT_PUBLIC_BACKEND_URL

# Set the environment variable using the build argument
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL

# Copy package.json and package-lock.json first to benefit from Docker layer caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of your application files
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine as runner
WORKDIR /my-space

# Copy the built artifacts from the builder stage
COPY --from=builder /my-space/package.json .
COPY --from=builder /my-space/package-lock.json .
COPY --from=builder /my-space/next.config.js ./
COPY --from=builder /my-space/public ./public
COPY --from=builder /my-space/.next/standalone ./
COPY --from=builder /my-space/.next/static ./.next/static

# Expose the port your application will run on
EXPOSE 3000

# Define the entry point for your application
ENTRYPOINT ["node", "server.js"]
