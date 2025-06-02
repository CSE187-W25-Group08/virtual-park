FROM node:23-alpine

ENV NODE_OPTIONS=--max-old-space-size=4096

EXPOSE 3000

WORKDIR /home/app

COPY package.json /home/app/
COPY package-lock.json /home/app/

# Microservices
COPY Microservices/AuthService/tsoa.json /home/app/Microservices/AuthService/
COPY Microservices/AuthService/build/ /home/app/Microservices/AuthService/build/
COPY Microservices/AuthService/package.json /home/app/Microservices/AuthService/
COPY Microservices/AuthService/package-lock.json /home/app/Microservices/AuthService/

COPY Microservices/LotService/build/ /home/app/Microservices/LotService/build/
COPY Microservices/LotService/package.json /home/app/Microservices/LotService/
COPY Microservices/LotService/package-lock.json /home/app/Microservices/LotService/

COPY Microservices/PermitService/build/ /home/app/Microservices/PermitService/build/
COPY Microservices/PermitService/package.json /home/app/Microservices/PermitService/
COPY Microservices/PermitService/package-lock.json /home/app/Microservices/PermitService/

COPY Microservices/StripeService/build/ /home/app/Microservices/StripeService/build/
COPY Microservices/StripeService/package.json /home/app/Microservices/StripeService/
COPY Microservices/StripeService/package-lock.json /home/app/Microservices/StripeService/

COPY Microservices/WebhookService/build/ /home/app/Microservices/WebhookService/build/
COPY Microservices/WebhookService/package.json /home/app/Microservices/WebhookService/
COPY Microservices/WebhookService/package-lock.json /home/app/Microservices/WebhookService/

COPY Microservices/EmailService/build/ /home/app/Microservices/EmailService/build/
COPY Microservices/EmailService/package.json /home/app/Microservices/EmailService/
COPY Microservices/EmailService/package-lock.json /home/app/Microservices/EmailService/

COPY Microservices/TicketService/build/ /home/app/Microservices/TicketService/build/
COPY Microservices/TicketService/package.json /home/app/Microservices/TicketService/
COPY Microservices/TicketService/package-lock.json /home/app/Microservices/TicketService/

COPY Microservices/VehicleService/build/ /home/app/Microservices/VehicleService/build/
COPY Microservices/VehicleService/package.json /home/app/Microservices/VehicleService/
COPY Microservices/VehicleService/package-lock.json /home/app/Microservices/VehicleService/

COPY APIs/CampusPolice/build/ /home/app/APIs/CampusPolice/build/
COPY APIs/CampusPolice/package.json /home/app/APIs/CampusPolice/
COPY APIs/CampusPolice/package-lock.json /home/app/APIs/CampusPolice/

COPY APIs/Payroll/build/ /home/app/APIs/Payroll/build/
COPY APIs/Payroll/package.json /home/app/APIs/Payroll/
COPY APIs/Payroll/package-lock.json /home/app/APIs/Payroll/

COPY APIs/Registrar/build/ /home/app/APIs/Registrar/build/
COPY APIs/Registrar/package.json /home/app/APIs/Registrar/
COPY APIs/Registrar/package-lock.json /home/app/APIs/Registrar/

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