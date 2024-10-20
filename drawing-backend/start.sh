if [ ! -f .env.$1 ]; then
    echo .env.$1: No such file
    exit 1
fi

set -o allexport && source .env.$1 && set +o allexport
java -Duser.timezone=UTC -jar target/multiplayer-drawing-app-1.0.jar