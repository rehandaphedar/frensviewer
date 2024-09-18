FROM node:alpine AS build

WORKDIR /app
COPY . .
RUN yarn
RUN yarn build


FROM node:alpine

WORKDIR /app
COPY --from=build /app/package.json .
COPY --from=build /app/build .
RUN yarn --prod && yarn cache clean --all
