# AWS Setup Guide
Author: Jin Le
### Steps
- Create account at [aws amazon](https://aws.amazon.com/) and then sign into console as root user
### Creating EC2 Security Group
#### What is EC2
- is a web service that provides secure, resizable compute capacity in the cloud. It allows users to access virtual servers, called instances, on demand, which they can then use to run applications. (summary ig)
	- SSH 
- Virtual server 
[EC2 video](https://www.youtube.com/watch?v=eaicwmnSdCs)
- [Creating EC2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/creating-security-group.html)

- Waffle Icon -> Compute -> EC2 
![](assets/73b3c2b3e2102265b17073d6e84337ea.png)
- Launch instance
![](assets/12c9918405292032fa56079ac2b65265.png)

### Launch Instance Settings

![](assets/32037e2e3ed06424c2ba2a6df4bb5922.png)
![](assets/2d23ae30af973a6544111c505ec902fc.png)

![](assets/b1d5a12114e2328237343ed006525666.png)
### Summary
![](assets/6f44a3a7f43c2ef58b68ef0e896c8035.png)
After clicking launch instance
![](assets/88d55c7e71956fc577d6d7ef3bbf8d65.png)
![](assets/5d35598957fea692962f755011f149e5.png)
- with the key you download and then run the following commands
- If you are on windows you will have to use WSL
	- Place pem key into root directory or directory outside of windows
	- This works because WSL treats files in your **Linux home directory** (`~`) with proper Unix-style permissions. (chatgpt debugged this )
```
chmod 0400 {keyname}.pem
ssh -i parking-permit-app-key.pem ubuntu@54.183.145.14
```

### what everyone else has to proably do
- We will have to create IAM accounts and create our own access keys