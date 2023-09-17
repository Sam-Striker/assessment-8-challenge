FROM node:18.1.0-alpine
WORKDIR /src/app
COPY ["package.json", "yarn.lock*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3000
RUN chown -R node /src/app
USER node
CMD ["npm", "start"]
