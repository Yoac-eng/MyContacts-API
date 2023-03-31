# MyContacts-API
 *This is a Node-based Rest API developed for managing contacts and categories. Through this API, it is possible to create, update, read, and delete (CRUD) contacts and category types stored in a database.*
 </br>

### Technologies

- Node.js
- Express.js
- PostgreSQL

> **_NOTE:_** An ORM like Prisma.js wasn't used because the queries were manually executed using the pg library.

## Installation and usage
1. Install project dependencies:

You can use the package manager that u prefer:

- Using npm: 
```bash
  npm install
  npm run dev
```
- Using yarn:
```bash
  yarn install
  yarn dev
```

2. Set up your PostgreSQL database using the pg cmd and the schema file in the project.

3. You'r ready to run the project and use it:

- Using npm: 
```bash
  npm run dev
```
- Using yarn:
```bash
  yarn dev
```

## Routes
### Categories
- GET /categories -> Returns all registered categories.
- POST /categories -> Creates a new category.
- GET /categories/:id -> Returns the category with the specified ID.
- PUT /categories/:id -> Updates the category with the specified ID.
- DELETE /categories/:id -> Deletes the category with the specified ID.

### Contacts
- GET /contacts -> Returns all registered contacts.
- POST /contacts -> Creates a new contact.
- GET /contacts/:id -> Returns the contact with the specified ID.
- PUT /contacts/:id -> Updates the contact with the specified ID.
- DELETE /contacts/:id -> Deletes the contact with the specified ID.
