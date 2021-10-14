FROM node:16-alpine3.11 AS stage1

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:16-alpine3.11 as production

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production


COPY --from=stage1 /app/dist ./dist

CMD ["npm", "run" ,"start:prod"]