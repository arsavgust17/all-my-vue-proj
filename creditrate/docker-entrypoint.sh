#!/bin/sh
IP_ADDR=`awk 'END{print $1}' /etc/hosts`
CONTAINER_ID=`cut -c9-20 < /proc/1/cpuset`
sed "s~<hostname>~$HOSTNAME~g; s~<service_name>~$HOSTNAME~g; s~<ip_address>~$IP_ADDR~g" /www_root/consul/service.json > /www_root/consul/service/service.json
sed -i "s/<IP_ADDR>/$IP_ADDR/g; s/<NODE_ID>/$HOSTNAME-$CONTAINER_ID/g" /etc/supervisor/conf.d/supervisord.conf
sleep 3
exec "$@"