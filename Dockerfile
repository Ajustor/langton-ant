# Dockerfile
FROM oven/bun as build

WORKDIR /app

# Copie les fichiers de configuration
COPY package.json bun.lockb tsconfig.json ./

# Installe les dépendances
RUN bun install

# Copie le reste du projet
COPY . .

# Build le projet
RUN bun run build-nolog

FROM joseluisq/static-web-server

# Copy the static website
# Use the .dockerignore file to control what ends up inside the image!
COPY --from=build /app/dist .

ARG SERVER_PORT=3000
ENV SERVER_PORT=${SERVER_PORT}
# Expose port
EXPOSE ${SERVER_PORT}

# Run BusyBox httpd
CMD ["static-web-server", "--port", ${SERVER_PORT}, "--root", "."]