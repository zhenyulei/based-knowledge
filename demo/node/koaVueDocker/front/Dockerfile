FROM nginx

COPY ./dist /usr/share/nginx/html

RUN ls -la /usr/share/nginx/html

EXPOSE 80

CMD ["nginx","-g","daemon off;"]