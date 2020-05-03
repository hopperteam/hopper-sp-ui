FROM node:12-alpine AS runner
EXPOSE 80
COPY public /app/public
COPY lib /app/lib
COPY server.js /app/server.js
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
WORKDIR /app
RUN yarn install --production
ENTRYPOINT ["node", "."]
