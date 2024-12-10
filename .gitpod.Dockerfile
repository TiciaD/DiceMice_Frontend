# Start from the backend's base image
FROM gitpod/workspace-dotnet-8

# Ensure the environment supports both frontend and backend needs
ENV PATH="$PATH:/home/gitpod/.dotnet/tools"
