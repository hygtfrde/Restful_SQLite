## Server Side Application
# SQL Database 
## TABLES
1) ANIMALS
Species Name
Life Expectancy
Animal ID

2) Habitats
Environment
Habitat ID

3) Lives_In
Animal ID
Habitat ID

4) Can Hunt
Animal Predator ID
Animal Prey ID

## Launch API
Download dependency packages with <br> 
$ npm i <br>
then initialize the database with the seed file with <br> 
$ node seed.js <br>  
then turn on server and listen for requests with <br> 
$ npm start <br> 
or instead of npm start in Terminal use <br> 
$ nodemon <br> 
-- local host is on port 9000

## CRUD OPERATIONS
1) GET
http://localhost:9000/ --> homepage
http://localhost:9000/animals --> Animals List
http://localhost:9000/habitats --> Habitats List
http://localhost:9000/animals/1 --> Animal # 1
http://localhost:9000/habitats/1 --> Habitat # 1

2) POST
http://localhost:9000/animals
OR
http://localhost:9000/habitats

Require JSON format in Body of HTTP request
{
  "species_name": "Some kind of test",
  "life_expectancy": 15
}

3) PUT
Also requires JSON format in request

http://localhost:9000/animals/1 --> Update Animal # 1
http://localhost:9000/habitats/1 --> Update Habitat # 1

4) DELETE

http://localhost:9000/animals/1 --> Delete Animal # 1
http://localhost:9000/habitats/1 --> Delete Habitat # 1

## Technologies and Tools Used
-- Express JS <br>
-- Node JS / Nodemon <br> 
-- Postman <br> 
-- SQLITE 3 <br> 
-- DB Browser <br> 

## Next Steps
-- Stretch 1) Add user front HTML/CSS <br>
-- Stretch 2) Implement synchronous seed file <br> 
-- Stretch 3) Put all HTTP verbs into separate routers / organize index.js <br>
