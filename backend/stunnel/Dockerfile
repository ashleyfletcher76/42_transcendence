FROM alpine:latest

# install stunnel and openssl for certificate generation
RUN apk add --no-cache stunnel openssl redis

# create the necessary directory for stunnel config
RUN mkdir -p /etc/stunnel

# generate self signed certificate
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
	-keyout /etc/stunnel/stunnel.key \
	-out /etc/stunnel/stunnel.crt \
	-subj "/CN=localhost"

# copy the stunnel config
COPY stunnel.conf /etc/stunnel/stunnel.conf

# set the entrypoint to stunnel with our config
ENTRYPOINT ["stunnel", "/etc/stunnel/stunnel.conf"]
