FROM node:22

ARG BACKEND_PORT
ARG FRONTEND_PORT

WORKDIR /app

RUN npm install -g serve

# backend dependencies
COPY backend/package.json backend/package-lock.json ./backend/
RUN npm install --prefix backend

# # frontend dependencies
# COPY frontend/package.json frontend/package-lock.json ./frontend/
# RUN npm install --prefix frontend

# # build frontend
# COPY frontend ./frontend
# RUN npm run build --prefix frontend

# copy backend files
COPY backend ./backend 

EXPOSE ${BACKEND_PORT} ${FRONTEND_PORT}

# CMD ["sh", "-c", "serve -s frontend/build -l 3000 & npm --prefix backend run start"]
CMD ["npm", "--prefix", "backend", "run", "start"]