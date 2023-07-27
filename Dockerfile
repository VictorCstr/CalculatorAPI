FROM node:16-slim as development
WORKDIR /code
COPY back/package*.json ./
COPY back/tsconfig.json ./
COPY back/.env ./
RUN apt-get update -y && apt-get install -y openssl
RUN npm install 
COPY back/prisma/ /code/prisma
COPY back/src/ /code/src 
RUN npx prisma generate
CMD npx prisma migrate dev && npm run dev

