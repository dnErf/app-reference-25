FROM node:current-slim AS build

WORKDIR /ng
COPY ["/ng-bidstur", "."]

RUN npm install
RUN npm install -g @angular/cli
RUN ng build --configuration=production

FROM nginx:latest
COPY --from=build ng/dist/ng-bidstur/browser /usr/share/nginx/html
EXPOSE 80
