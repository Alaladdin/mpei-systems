docker-compose down --volumes;
docker rmi $(docker images -a -q) -f;
docker-compose up -d;
sleep 10;
