# Use the official Node.js image
FROM mcr.microsoft.com/playwright:v1.44.1-jammy

# Create a directory for the app
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app files
COPY . .

# Install Playwright dependencies
RUN npx playwright install --with-deps

# Command to run the tests
RUN ./run-tests.sh