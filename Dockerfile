FROM node:26-alpine3.23

VOLUME [ "/game" ]

RUN npm i -g mvix

WORKDIR /game

CMD [ "mvix" ]
