FROM node:9.11

ENV NODE_ENV=dev \
    PROCESS_TYPE='scraper-api' \
    NIGHTMARE_SHOW=false \
    NIGHTMARE_IMAGES=false \
    APP_PORT=9000

RUN apt-get update \
  && apt-get install -y \
    xvfb \
    x11-xkb-utils \
    xfonts-100dpi \
    xfonts-75dpi \
    xfonts-scalable \
    xfonts-cyrillic \
    x11-apps \
    clang \
    libdbus-1-dev \
    libgtk2.0-dev \
    libnotify-dev \
    libgnome-keyring-dev \
    libgconf2-dev \
    libasound2-dev \
    libcap-dev \
    libcups2-dev \
    libxtst-dev \
    libxss1 \
    libnss3-dev \
    gcc-multilib \
    g++-multilib \
  && npm install -g pm2 \
  && mkdir -p /app

  COPY entrypoint.sh /
  ENTRYPOINT ["/entrypoint.sh"]