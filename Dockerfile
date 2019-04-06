FROM node
WORKDIR /app
COPY . /app
RUN npm install
EXPOSE 8000
ENV SERVER_PORT 8000
ENV DB_NAME hogwarts_library
ENV DB_USERNAME harry_potter
ENV DB_PASSWORD nsW2!xmZ
ENV DB_HOST postgres
CMD ["npm", "run", "start"]
