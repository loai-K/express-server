FROM node:alpine
LABEL authors="Loai Kanou"

# sets the working directory for any RUN, CMD, COPY command
WORKDIR /usr/express_app
# Copies package.json, package-lock.json, tsconfig.json, .env to the root of WORKDIR
COPY ["package.json", "package-lock.json", "tsconfig.json", "database.json", ".env", "./"]
# Copies everything in the src directory to WORKDIR/src
#COPY ./src ./src
COPY ./ ./
# Installs all packages
RUN npm install
# Runs the dev npm script to build & start the server
CMD npm run migrate:run
CMD npm run build
CMD npm start

#ENTRYPOINT ["top", "-b"]