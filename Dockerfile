FROM node:23-alpine
EXPOSE 3000

WORKDIR /home/app

COPY package.json /home/app/
COPY package-lock.json /home/app/
COPY .env /home/app/

# Microservices
COPY MicroServices/AuthService/build/ /home/app/Microservices/AuthService/build/
COPY MicroServices/AuthService/package.json /home/app/Microservices/AuthService/
COPY MicroServices/AuthService/package-lock.json /home/app/Microservices/AuthService/

COPY MicroServices/PermitService/build/ /home/app/Microservices/PermitService/build/
COPY MicroServices/PermitService/package.json /home/app/Microservices/PermitService/
COPY MicroServices/PermitService/package-lock.json /home/app/Microservices/PermitService/

COPY MicroServices/TicketService/build/ /home/app/Microservices/TicketService/build/
COPY MicroServices/TicketService/package.json /home/app/Microservices/TicketService/
COPY MicroServices/TicketService/package-lock.json /home/app/Microservices/TicketService/

COPY MicroServices/VehicleService/build/ /home/app/Microservices/VehicleService/build/
COPY MicroServices/VehicleService/package.json /home/app/Microservices/VehicleService/
COPY MicroServices/VehicleService/package-lock.json /home/app/Microservices/VehicleService/

# NextJS Apps
COPY Apps/admin/.next/ /home/app/Apps/admin/.next/
COPY Apps/admin/package.json /home/app/Apps/admin/
COPY Apps/admin/package-lock.json /home/app/Apps/admin/
COPY Apps/admin/next.config.ts /home/app/Apps/admin/
COPY Apps/admin/public/ /home/app/Apps/admin/public/

COPY Apps/driver-parking/.next/ /home/app/Apps/driver-parking/.next/
COPY Apps/driver-parking/package.json /home/app/Apps/driver-parking/
COPY Apps/driver-parking/package-lock.json /home/app/Apps/driver-parking/
COPY Apps/driver-parking/next.config.ts /home/app/Apps/driver-parking/
COPY Apps/driver-parking/public/ /home/app/Apps/driver-parking/public/

COPY Apps/enforcement/.next/ /home/app/Apps/enforcement/.next/
COPY Apps/enforcement/package.json /home/app/Apps/enforcement/
COPY Apps/enforcement/package-lock.json /home/app/Apps/enforcement/
COPY Apps/enforcement/next.config.ts /home/app/Apps/enforcement/
COPY Apps/enforcement/public/ /home/app/Apps/enforcement/public/

RUN npm run cis

CMD [ "npm", "start" ]