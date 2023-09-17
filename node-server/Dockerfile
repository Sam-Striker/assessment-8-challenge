FROM node:18.1.0-alpine
WORKDIR /src/app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 4000
RUN chown -R node /src/app
USER node
CMD ["npm", "start"]
