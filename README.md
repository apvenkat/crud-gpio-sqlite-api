## crud-gpio-sqlite-api
Create Read Update Delete(CRUD) API for sqlite database using nodejs - Raspberry Pi GPIO control

## How to Install
```sh
$ git clone https://github.com/apvenkat/crud-gpio-sqlite-api
$ cd crud-gpio-sqlite-api
$ npm install 
$ node crud.js 
```

The server will be running on port 4300

Once you execute, under your db folder a sqlite database table will be generated automatically. All your CRUD requests will takes place here only.
------------
## How to use

### POST
* **Add a new device:**
```
http://localhost:4300/api/
```
Sending a JSON body:
```javascript
{
"name": "LED 1",
"description": "an led device",
"pin": 4,  
"type": "Input Device",    
"value": "true"
}
```
---------------------------------------------

### GET
* **Get devices by ID:**
```
http://localhost:4300/api/id/$id
```
example: http://localhost:4300/api/id/1
_____

* **Load all products:**
```
http://localhost:4300/api/
```
______
---------------------------------------------

### DELETE
* **Delete a device:**
```
http://localhost:4300/api/delete/$id

example: http://localhost:4300/api/delete/1
```
**ID is the only MANDATORY**

```
---------------------------------------------
### PUT
* **Update a device:**
```
http://localhost:4300/api/id/$id

example : example: http://localhost:4300/api/id/1
```
Sending a JSON body: **ID is the only MANDATORY**
```javascript

change the json values as needed
 {
     "id": 1,
     "name": "LED 5",
     "description": "an led device",
     "pin": 18,
     "type": "Input Device",
     "value": "true"
  }
```

## SQLite database
The database will be initially empty and you can add, delete,update or read data as per your requirement

## Application
This API can be used for several applications like IoT device Managment, book records, personal check list and so on
