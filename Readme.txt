Below is the installation process for profile builder.
1. Clone the repository and download to your system.
2. In the project directory –
	o For client (Frontend)
		- run "npm install" or "yarn install" to install client, then
		- run "npm start" or "yarn" start to start client.
 	Open http://localhost:8081 to view it in the browser.
	o For server (Backend)
		- run "npm install" or "yarn install" to install client, then
		- create a database in MySQL with the name "testdb", then
		- run "node server.js" to start client.
3. After successfully running the client & server, open the browser and navigate to http://localhost:8081/addsuperadmin for creating a superadmin. Fill up the form with a role, username, email, and a password.
4. After successfully creating a superadmin, you will be redirected to admin login page.
5. Log in with the username and password.
6. Now you can access all features available for superadmin.
7. Superadmin can now create new region heads, city heads and assign them tasks.

Some important url= http://localhost:8081 are
	- url+/ addsuperadmin for creating a superadmin.
	- url+/ adminlogin for superadmin, region heads, city heads login.
	- url+/ login for campus ceo’s login.
	- url+/ home for home page.
	- url+/ profile for profile page.