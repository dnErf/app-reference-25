FROM node:lts as runtime
WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

ENV HOST=0.0.0.0
ENV PORT=11011
EXPOSE 11011
CMD node ./dist/server/entry.mjs