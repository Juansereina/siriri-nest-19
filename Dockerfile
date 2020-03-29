FROM node:13.12.0

# Optimizes the installation
COPY ["package.json", "package-lock.json", "/usr/src/"]

WORKDIR /usr/src

RUN npm install

COPY [".", "/usr/src/"]

EXPOSE 3000

# Default command for production mode
CMD ["node", "index.js"]
