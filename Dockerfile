FROM node:16-slim as development

WORKDIR /code

COPY package*.json ./
COPY tsconfig.json ./
COPY .env ./

RUN apt-get update -y && apt-get install -y openssl
RUN npm install 

COPY prisma/ /code/prisma
COPY src/ /code/src 

RUN npx prisma generate
CMD npx prisma db push --preview-feature && npm run dev

