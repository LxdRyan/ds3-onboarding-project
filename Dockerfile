FROM node:22

WORKDIR /app

# backend dependencies
COPY backend/package.json backend/package-lock.json ./backend/
RUN npm install --prefix backend

# frontend dependencies
COPY frontend/package.json frontend/package-lock.json ./frontend/
RUN npm install --prefix frontend

# build frontend
COPY frontend ./frontend
RUN npm run build --prefix frontend

# copy backend files
COPY backend ./backend 

EXPOSE 3000 5000

CMD ["sh", "-c", "serve -s frontend/build -l 3000 & npm --prefix backend run start"]