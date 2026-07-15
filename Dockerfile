FROM node:22-alpine

# Tell Docker to put everything inside the /app directory
WORKDIR /app

COPY package*.json ./
RUN npm install

# Copy the rest of your frontend code (index.html, src, etc.)
COPY . .

# The -- --host flag is MANDATORY for Vite to work inside Docker
CMD ["npm", "run", "dev", "--", "--host"]