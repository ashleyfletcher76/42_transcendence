FROM postgres:14

<<<<<<< HEAD
COPY init.sql /docker-entrypoint-initdb.d/

COPY init_db.sh /usr/local/bin/

# generate self signed SSL certificates
RUN apt-get update && apt-get install -y openssl && \
	openssl req -new -x509 -days 365 -nodes \
	-out /var/lib/postgresql/server.crt -keyout /var/lib/postgresql/server.key -subj "/CN=localhost" && \
	chmod 600 /var/lib/postgresql/server.key && \
	chown postgres:postgres /var/lib/postgresql/server.key /var/lib/postgresql/server.crt

RUN chmod +x /usr/local/bin/init_db.sh
=======
# copy init scripts
COPY init.sql /docker-entrypoint-initdb.d/
COPY init_db.sh /usr/local/bin/

RUN apt-get update && \
	apt-get install -y openssl iputils-ping net-tools && \
	openssl req -new -x509 -days 365 -nodes \
	-out /var/lib/postgresql/server.crt -keyout /var/lib/postgresql/server.key -subj "/CN=localhost" && \
	chmod 600 /var/lib/postgresql/server.key && \
	chown postgres:postgres /var/lib/postgresql/server.key /var/lib/postgresql/server.crt && \
	chmod +x /usr/local/bin/init_db.sh && \
	apt-get clean && rm -rf /var/lib/apt/lists/*
>>>>>>> 5ddfb023e39d84034fad469785bb1d39fbc66034

CMD ["/usr/local/bin/init_db.sh"]
