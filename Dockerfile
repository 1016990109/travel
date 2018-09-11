FROM nginx
COPY dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY travel.key /etc/nginx/certs/travel.key
COPY travel.crt /etc/nginx/certs/travel.crt