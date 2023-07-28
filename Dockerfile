FROM node:16-slim as development

WORKDIR /code

COPY package*.json ./
COPY tsconfig.json ./
COPY .env ./

RUN npm install 

COPY prisma/ /code/prisma
COPY src/ /code/src 

RUN npx prisma generate
CMD npx prisma migrate dev && npm run dev

