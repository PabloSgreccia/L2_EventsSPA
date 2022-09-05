
### Description
Events SPA where a user can create an event with start and end date, a location and a type, and share it with the world.
Others users can check check for upcoming events and indicate that they will participate in an event.
You also can visit a user profile and check all the events created by this user.  

### Authors:
    - Galetto, Adelmar
    - Sgreccia, Pablo

### Thechnologies:
    - Backend: NodeJs
    - Frontend: Angular + (HTML, CSS, Javascript)
    - Database: Mongo (NoSQL) / Sequelize (SQL)

### Steps to run the project (localhost):
    1. Download the code
    2. install packages: Run "npm i" in a terminal to dowload all required packages (do this twice, one in frontend folder and other in backend folder)
    3. setup backend environment variables:
        3.1: create a file called '.env' in './backend/'
        3.1: use the document './env-backend.txt' as an example of all the variables you have to configure 
    4. setup frontend environment variables:
        4.1: edit 'environment.ts' and 'environment.prod.ts' located in './frontend/src/app/environments/' whit the backend host
    5. setup and start DB: ensure you have a BD client running, then run in console at backend folder
        4.1: npx sequelize-cli db:create
        4.2: npx sequelize-cli db:migrate
    6. Run backend server: "npm start" (or "npm run dev" in developer mode) 
    7. Run frontend server: "ng serve"
    8. Open "http://localhost:4200" in a browser.
