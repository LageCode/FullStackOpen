# FullStackOpen  
Full Stack Open Submissions  

## Summary

### Part 3

It is possible to make a backend with *node js*, runtime based on Google's Chrome V8 JS engine. Browsers don't yet support the newest features so that the code must be transpiled with e.g. *babel*. The situation with JavaScript running in the backend is different. The  newest version of Node supports a large majority of the latest features  of JavaScript, so that, the latest features can be used without having to transpile the code.

#### Simple web server

> [!NOTE]
>
> Applications and exercises in this part are not all React applications, `vite@latest -- --template react` utility won't be used for initializing the project for this application.

1) Create a new npm application: `npm init`

2) In `package.json` change *scripts* object by adding a new script command: `"start": "node index.js",`

3) To initialize a web server, edit index.js as follow:

   ```javascript
   import http from 'http'
   
   const app = http.createServer((request, response) => {
     response.writeHead(200, { 'Content-Type': 'text/plain' })
     response.end('Hello World')
   })
   
   const PORT = 3001
   app.listen(PORT)
   console.log(`Server running on port ${PORT}`)
   ```

4. Run application: `npm start`

5. Make web server offering raw data in JSON format:

   ```javascript
   import http from 'http'
   
   let notes = [{    
           id: "1",    
           content: "HTML is easy",    
           important: true  
       },  
       {    
           id: "2",    
           content: "Browser can execute only JavaScript",    
           important: false  
       },  
       {    
           id: "3",    
           content: "GET and POST are the most important methods of HTTP protocol",    
           important: true  
   }]
   
   const app = http.createServer((request, response) => {  
       response.writeHead(200, { 'Content-Type': 'application/json' })
       response.end(JSON.stringify(notes))
   })
   
   const PORT = 3001
   app.listen(PORT)
   console.log(`Server running on port ${PORT}`)
   ```

6. Restart server: `ctrl+c`, `npm start`

#### Express

Install express: `npm i express`

```javascript
import express from 'express'

const app = express()

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})
```

The event handler function accepts two parameters. The first [request](http://expressjs.com/en/4x/api.html#req) parameter contains all of the information of the HTTP request, and the second [response](http://expressjs.com/en/4x/api.html#res) parameter is used to define how the request is responded to.

#### Nodemon

*nodemon* will watch the files in the directory in which nodemon was  started, and if any files change, nodemon will automatically restart  your node application.

`npm install --save-dev nodemon`

 Dedicated *npm script* for it in the *package.json* file:

``````json
{
  // ..
  "scripts": {
    "start": "node index.js",

    "dev": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  // ..
}
``````

#### REST 

Representational State Transfer, aka REST, was introduced in 2000 in Roy Fielding's [dissertation](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm). REST is an architectural style meant for building scalable web applications.

One convention for creating unique addresses is to combine the name of the resource type with the resource's unique identifier.

| URL      | verb   | functionality                                                |
| -------- | ------ | ------------------------------------------------------------ |
| notes/10 | GET    | fetches a single resource                                    |
| notes    | GET    | fetches all resources in the collection                      |
| notes    | POST   | creates a new resource based on the request data             |
| notes/10 | DELETE | removes the identified resource                              |
| notes/10 | PUT    | replaces the entire identified resource with the request data |
| notes/10 | PATCH  | replaces a part of the identified resource with the request data |

##### Fetching a single resource

The unique address we will use for an individual note is of the form *notes/10*, where the number at the end refers to the note's unique id number.

The *id* parameter in the route of a request can be accessed through the [request](http://expressjs.com/en/api.html#req) object:

```javascript
app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const note = notes.find(note => note.id === id)
  
   if (note) {    
       response.json(note)  
   } else {    
       response.status(404).end()  
   }
})
```

Since no data is attached to the response, we use the [status](http://expressjs.com/en/4x/api.html#res.status) method for setting the status and the [end](http://expressjs.com/en/4x/api.html#res.end) method for responding to the request without sending any data.

> [!TIP]
>
> The if-condition leverages the fact that all JavaScript objects are [truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy), meaning that they evaluate to true in a comparison operation. However, *undefined* is [falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) meaning that it will evaluate to false.

##### Deleting resources 

 Deletion happens by making an HTTP DELETE request to the URL of the resource:

```javascript
app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})
```

There's no consensus on what status code should be returned to a DELETE request if the resource does not exist. For the sake of simplicity, the application will respond with 204 in both cases.

##### Receiving data

To access the data easily, we need the help of the Express [json-parser](https://expressjs.com/en/api.html) that we can use with the command `app.use(express.json())`.

```javascript
app.use(express.json())

app.post('/api/notes', (request, response) => {  
	const note = request.body  
    console.log(note)  
    response.json(note)
})
```

The event handler function can access the data from the *body* property of the *request* object.

> [!WARNING]
>
> A potential cause for issues is an incorrectly set *Content-Type* header in requests. This can happen with Postman if the type of body is not defined correctly

#### HTTP request types

HTTP standard:

- Safety: `GET` and `HEAD` methods should not have the significance of taking an action other than retrieval. By side effects, it means that the state of the database must not change  as a result of the request, and the response must only return data that already exists on the server.
- Idempotency: All HTTP requests except `POST` should be *idempotent*, it refers to the property where making the same request multiple times has  the same effect as making it once. This is important for ensuring that  repeated requests do not cause unintended side effects.

> [!TIP]
>
> `HEAD` should work exactly like `GET` but it does not return anything but  the status code and response headers. The response body will not be  returned when you make a `HEAD` request.

#### Middleware

Middleware are functions that can be used for handling *request* and *response* objects e.g. the previous `express.json()` parser is a middleware.

In practice, several middlewares can be used at the same time ; they're executed one by one in the order that they were listed in the application code.

Middleware is a function that receives three parameters: `(request, response, next)`. The `next` function yields control to the next middleware.

## Personal Notes  

- Part0:  
  - Vite: By default, `index.html` does not contain HTML markup visible by human.  
  - JS: ES6 introduced the arrow functions `const arrow = () => {}`.  

- Part1:  
  - JSX: Any JS code in curly brace in evaluated.  
  - JSX: Always render a root element.  
  - JS: The `reduce()` method executes a reducer function for array element, and it returns a single value: the function's accumulated result.
  - JS: Use `let` for reassignable variables and `const` for variables that shouldn’t change.
  - JS: Arrow functions are more concise and do not bind `this`.
  - JS: Key-value pairs: `{ key: value }`. Properties can be accessed using dot notation (`obj.key`) or bracket notation (`obj['key']`).
  - JS: Destructuring extracts values from arrays or objects into variables:
    - Arrays: const [a, b] = array.
    - Objects: const { key } = object.

- Part3:

  - 3.1:

    - Install *express*, *dotenv* (PORT variable in  `.env` file) and *nodemon* (as dev dependency).

    - Create `index.js` ; 

      - Create `contacts` list.
      
      - Create `app` object with `express()`
      
      - Create `get` route:
      
          ```javascript
          app.get('/api/persons', (req, res) => {
              res.json(contacts) // response.json -> a json object
          })
          ```
      
      -  And start listening:
      
          ```javascript
          app.listen(PORT, () => { // use port env variable 
          	console.log(`Server listening on port:${PORT}`)
          })
          ```
      
  
  - 3.2:
  
    - Create a second `get` route for the info endpoint and use the `send()` method (instead of `json()`) to return html content.
  
  - 3.3:
  
    - Create the third `get` route for displaying the data for a person if this one exists in the hardcoded list:
  
      ``` javascript
      app.get('/api/persons/:id', (req, res) => {
          const searchedId = req.params.id
          const searchedPerson = contacts.find(c => c.id === searchedId)
          if (searchedPerson) {
              res.json(searchedPerson) 
          } else {
              res.status(404).end()
          }
      })
      ```
  
    - Used system dynamic variables feature offered by REST client to generate random requests: `GET http://localhost:3000/api/persons/{{$randomInt 1 6}}`
  
  - 3.4:
  
    - Create `delete` route.
    - Fetch *id* param from `req.params` object.
    - Filter list based on this *id*.
    - Return status code 204.
  
  - 3.5: 
  
    - Use body parser:
  
      ```javascript
      const app = express() // use express
      app.use(express.json()) // use body parser (needed for POST)
      ```
  
    - The new generated ids will be of `Number` type. Since that, it's necessary to convert types before comparison e.g. 
  
      ```javascript
      app.get('/api/persons/:id', (req, res) => {
          const id = Number(req.params.id)
          const searchedPerson = contacts.find(c => Number(c.id) === id)
          if (searchedPerson) {
              res.json(searchedPerson) 
          } else {
              res.status(404).end()
          }
      })
      ```
  
  - 3.6:
  
    - Check manually business rules:
  
      ```javascript
      if (!req.body.name || !req.body.number) {
              return res.status(400).json({ error: 'name and number musn\'t be missing' })
          }
      
          if (contacts.filter(c => c.name === req.body.name).length > 0) {
              return res.status(400).json({ error: 'name must be unique' })
          }
      ```
  
  - 3.7:
  
    - Install and import *morgan*.
    - take morgan into use: `app.use(morgan('tiny')) // use morgan middleware`.
  
- Create *dev* script : `nodemon index.js` and run.