FROM node:18-alpine


WORKDIR /app/frontend
COPY ./frontend ./

WORKDIR /app/backend

COPY ./backend/package*.json ./

RUN npm install

COPY ./backend ./

USER node

EXPOSE 3000



CMD [ "npm", "start"]
