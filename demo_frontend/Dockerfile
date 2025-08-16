FROM node:20

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000

# The command will be overridden by docker-compose
CMD ["npm", "run", "dev"]