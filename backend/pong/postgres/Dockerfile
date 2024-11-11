FROM postgres:14

COPY init_db.sh /usr/local/bin/

# generate self signed SSL certificates
RUN apt-get update && apt-get install -y openssl && \
	openssl req -new -x509 -days 365 -nodes \
	-out /var/lib/postgresql/server.crt -keyout /var/lib/postgresql/server.key -subj "/CN=localhost" && \
	chmod 600 /var/lib/postgresql/server.key && \
	chown postgres:postgres /var/lib/postgresql/server.key /var/lib/postgresql/server.crt

RUN chmod +x /usr/local/bin/init_db.sh

CMD ["/usr/local/bin/init_db.sh"]
