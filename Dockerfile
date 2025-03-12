FROM node:22

ARG BACKEND_PORT
ARG FRONTEND_PORT

WORKDIR /app

RUN npm install -g serve

# backend dependencies
COPY backend/package.json backend/package-lock.json ./backend/
RUN npm install --prefix backend

# copy backend files
COPY backend ./backend 

EXPOSE ${BACKEND_PORT} ${FRONTEND_PORT}

CMD ["npm", "--prefix", "backend", "run", "start:dev"]