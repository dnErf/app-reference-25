FROM node:lts-slim AS runtime
WORKDIR /app
COPY ["/e2ee-client", "."]
RUN npm install
RUN npm run build

FROM node:lts-slim
ENV HOST=0.0.0.0
ENV PORT=11011
EXPOSE 11011
WORKDIR /app
COPY --from=runtime /app/dist .
CMD node ./server/entry.mjs