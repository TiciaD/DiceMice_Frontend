# Start from the backend's base image
FROM gitpod/workspace-dotnet-8

# Add additional dependencies for the frontend
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g npm

# Ensure the environment supports both frontend and backend needs
ENV PATH="$PATH:/home/gitpod/.dotnet/tools"
