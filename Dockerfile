FROM node:lts-alpine3.21

WORKDIR /app
EXPOSE 8000

COPY package*.json .
RUN npm install

COPY . .
# RUN npm run build

# CMD ["npm", "run", "start:prod"]
CMD ["npm", "run", "start:dev"]