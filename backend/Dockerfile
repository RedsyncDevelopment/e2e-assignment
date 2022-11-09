# add docker image
FROM node:16-alpine

# setup working dir
WORKDIR /app

# copy starting files
COPY package.json package-lock.json ./
COPY prisma ./prisma
COPY .env ./

# install dependencies
RUN npm install

# initialize prisma
RUN npx prisma generate

# copy other needed files (middlewares, configs..)
COPY tsconfig.json ./
COPY . .

EXPOSE 3001
CMD npm run dev