# Cloning the Repo on EC2

**Author:** Hamza Bassal  
**Last Updated:** April 26, 2025

---

## To Clone the Repo into EC2
*(Initial setup – already done, but kept here for future reference.)*

Clone the repository:
```bash
git clone [REPO_URL]
```
### Authentication Required

*❗(I saved my username and PAT in EC2, so I don't think we need another member authenticating)*

**Username**: Your GitHub username


**Password**: Your GitHub Personal Access Token (PAT)


## How to Generate a Personal Access Token (PAT)
*❗(I saved my username and PAT in EC2, so I don't think we need another member generating PAT)*

1. Go to GitHub → Settings → Developer Settings → Personal Access Tokens → Tokens (classic).

2. Click "Generate new token (classic)".

3. Name the token something like "EC2 Access Token".

4. Set an expiration date (e.g., 30 days).

5. Select the scope: repo (full control of private repositories).

6. Click Generate Token.

7. Copy the token immediately — you won't be able to view it again later.

8. Use this token as the password when Git asks for authentication.

Now your EC2 instance can pull/push code securely.

## After Cloning
Install project dependencies and prepare for production:
```bash
cd project-repo-name
npm install
npm run build
nohup npm start &
```

- ```bash nohup npm start &``` starts the app in the background (keeps it running even if you logout).

# Update the App After Pushing New Changes
1. SSH into EC2 and navigate to the project folder:
```bash
cd project-repo-name
``` 


2. Pull the latest code from GitHub:
```bash
git pull
```
*(You may be asked for your GitHub username and PAT again if caching isn't set up.)*


3. Rebuild the app:
```bash
npm run build
```

4. Kill the old running app:
```bash
ps aux | grep node
```
Find the Process ID (PID) of your npm start, then stop it:
```bash
kill PID
```

5. Restart the app:
```bash
nohup npm start &
```

The updated version of the app will now be live at https://virtual-park.net.


# Important Notes
- Public IP of EC2: To find your EC2's public IP, run:
```bash
curl ifconfig.me
```
- View website access logs: (user visits, IP addresses)
```bash
sudo tail -f /var/log/nginx/access.log
```
- Clear nohup logs if needed:
```bash
> nohup.out
```
