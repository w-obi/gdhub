# Stage 1: Build the .NET app
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copy the project file and restore dependencies
COPY gdhub.csproj ./
RUN dotnet restore

# Copy the rest of the code and publish
COPY . .
RUN dotnet publish -c Release -o /app/publish

# Stage 2: Run the app
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app/publish .

# Tell .NET to listen on port 8000 (to match your docker-compose file)
ENV ASPNETCORE_HTTP_PORTS=8000

# IMPORTANT: Change "backend.dll" to match whatever your .csproj file is named!
# Example: If your file is gdhub.csproj, this must be gdhub.dll
ENTRYPOINT ["dotnet", "gdhub.dll"]