FROM postgres:14

COPY init.sql /docker-entrypoint-initdb.d/

COPY init_db.sh /usr/local/bin/

RUN chmod +x /usr/local/bin/init_db.sh

CMD ["/usr/local/bin/init_db.sh"]
