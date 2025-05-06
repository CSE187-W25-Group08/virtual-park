FROM node:23-alpine
EXPOSE 3003

WORKDIR /home/app

COPY package.json /home/app/
COPY package-lock.json /home/app/
COPY .env /home/app/

# Microservices
COPY Microservices/AuthService/build/ /home/app/Microservices/AuthService/build/
COPY Microservices/AuthService/package.json /home/app/Microservices/AuthService/
COPY Microservices/AuthService/package-lock.json /home/app/Microservices/AuthService/

COPY Microservices/PermitService/build/ /home/app/Microservices/PermitService/build/
COPY Microservices/PermitService/package.json /home/app/Microservices/PermitService/
COPY Microservices/PermitService/package-lock.json /home/app/Microservices/PermitService/

COPY Microservices/TicketService/build/ /home/app/Microservices/TicketService/build/
COPY Microservices/TicketService/package.json /home/app/Microservices/TicketService/
COPY Microservices/TicketService/package-lock.json /home/app/Microservices/TicketService/

COPY Microservices/VehicleService/build/ /home/app/Microservices/VehicleService/build/
COPY Microservices/VehicleService/package.json /home/app/Microservices/VehicleService/
COPY Microservices/VehicleService/package-lock.json /home/app/Microservices/VehicleService/

# NextJS Apps
COPY Apps/admin/.next/ /home/app/Apps/admin/.next/
COPY Apps/admin/package.json /home/app/Apps/admin/
COPY Apps/admin/package-lock.json /home/app/Apps/admin/
COPY Apps/admin/next.config.ts /home/app/Apps/admin/

COPY Apps/driver-parking/.next/ /home/app/Apps/driver-parking/.next/
COPY Apps/driver-parking/package.json /home/app/Apps/driver-parking/
COPY Apps/driver-parking/package-lock.json /home/app/Apps/driver-parking/
COPY Apps/driver-parking/next.config.ts /home/app/Apps/driver-parking/

COPY Apps/enforcement/.next/ /home/app/Apps/enforcement/.next/
COPY Apps/enforcement/package.json /home/app/Apps/enforcement/
COPY Apps/enforcement/package-lock.json /home/app/Apps/enforcement/
COPY Apps/enforcement/next.config.ts /home/app/Apps/enforcement/

RUN npm run cis

CMD [ "npm", "start" ]