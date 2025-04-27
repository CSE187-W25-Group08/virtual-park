# To install the Nginx
Author: Jackson Zheng

ssh -i name-access.pem ubuntu@virtual-park.net, use your own access key login in into the ec2 machine

command: sudo apt install nginx

You could run this command to check whether your neinx was active after you installed:
sudo systemctl status nginx

you could download the certificate and the bundle to any folder of the local machine 
and copy them to the ec2 by running(use your own private access key and path of the file location):
scp -i ~/person-access.pem /mnt/c/Users/public/cse187/cse187projectkey/virtual-park_net.crt ubuntu@virtual-park.net:~/
scp -i ~/person-access.pem /mnt/c/Users/public/cse187/cse187projectkey/virtual-park_net.ca-bundle ubuntu@virtual-park.net:~/

Then, go to the EC2 -> security group, and modify the inbound rules, add the 443 and 80 ports


Inside the /etc/nginx/, 
go to the sites-available -> default, and edit the configuration
command: sudo nano /etc/nginx/sites-available/default


run sudo nginx -t command to ensure the Nginx works correctly with the certificate and bundle

finally run: sudo systemctl reload nginx, in order to reload the configuration file





