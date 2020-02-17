container_name=mysql-employees

if [ ! "$(docker ps -q -f name=${container_name})" ]; then
    if [ "$(docker ps -aq -f status=exited -f name=${container_name})" ]; then
        echo "Cleaning up old container..."
        docker rm ${container_name}
    fi

    echo "Starting container ${container_name}"
    docker run -d \
      --name ${container_name} \
      -p 3306:3306 \
      -e MYSQL_ROOT_PASSWORD=college \
      -v $PWD/data:/var/lib/mysql \
      genschsa/${container_name}
else 
  echo "Container ${container_name} is already up"
fi
