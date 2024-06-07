# Use the official Node.js image
FROM mcr.microsoft.com/playwright:v1.44.1-jammy

# Create a directory for the app
WORKDIR /app

# Copy the package.json, package-lock.json and tsconfig.json files
COPY package*.json ./


# Install dependencies
RUN npm install
RUN npm install -g typescript

# Copy the rest of the app files
COPY . .

# Install Playwright dependencies
RUN npx playwright install --with-deps

# Command to run the parser
RUN tsc
CMD ["./run-parser.sh"]