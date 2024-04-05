@echo off
cls && color 37

echo (*) Removing previously created images...&echo.
docker image rm 3076406132e5
docker image rm d45e9d259cfa
docker image rm 26d9494fa852
docker image rm 61c0cdbca233 
docker image rm 1f0815c1cb6e
docker image rm eb0ab2d55fdf 
docker image rm f757eaeab672
docker image rm be30be3101e0
docker image rm 6dfff71d95db

echo.&echo (*) Loading images from their respective binaries...&echo.
docker load -i client-api-service.tar
docker load -i cost-calculator-service.tar
docker load -i driver-api-service.tar
docker load -i order-service.tar
docker load -i postgres.tar
docker load -i redis.tar
docker load -i security-bridge.tar
docker load -i tracking-service.tar
docker load -i user-service.tar

echo.&echo (*) Assigning names to images...&echo.
docker tag 3076406132e5 taxi-platform/client-api-service
docker tag d45e9d259cfa taxi-platform/cost-calculator-service
docker tag 26d9494fa852 taxi-platform/driver-api-service
docker tag 61c0cdbca233 taxi-platform/order-service
docker tag 1f0815c1cb6e taxi-platform/postgres
docker tag eb0ab2d55fdf taxi-platform/redis
docker tag f757eaeab672 taxi-platform/tracking-service
docker tag be30be3101e0 taxi-platform/user-service
docker tag 6dfff71d95db taxi-platform/security-bridge

echo.&echo (*) Launching the Microservice Architecture Deployment Procedure...&echo.
color 07
docker-compose up -d

pause