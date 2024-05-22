FROM node:alpine
WORKDIR /lab-order-ftp
COPY . /lab-order-ftp/
RUN npm install
EXPOSE 4553
CMD [ "node","index.js" ]
