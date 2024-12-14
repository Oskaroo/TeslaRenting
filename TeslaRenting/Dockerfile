# Backend Dockerfile (OmniCatalogue.Backend/Dockerfile)
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env
WORKDIR /app

# Copy project files and restore dependencies
COPY *.csproj ./
RUN dotnet restore

# Copy the rest of the backend code and publish
COPY . ./
RUN dotnet publish -c Release -o /publish

# Run the app using a smaller runtime image
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /publish
COPY --from=build-env /publish .

# Expose port 5106 for backend service
EXPOSE 5106

ENTRYPOINT ["dotnet", "TeslaRenting.dll"]
