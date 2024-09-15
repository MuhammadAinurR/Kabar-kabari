[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=15444495&assignment_repo_type=AssignmentRepo)
# P2-Challenge-1 News Portal (Server Side)

## RESTful endpoints

### Pub Routes
- [GET /pub/articles](#get-pubarticles) Get all articles
- [GET /pub/articles/:id](#get-pubarticlesid) Get specified article
- [GET /pub/categories](#get-pubcategories) Get all categories

### Article Routes
- [POST /articles](#post-articles) => Create new article
- [GET /articles](#get-articles) => Get all articles
- [GET /articles/:id](#get-articlesid) => Get article by id
- [PUT /articles/:id](#put-articlesid) => Edit article by id
- [DELETE /articles/:id](#delete-articlesid)  => Delete article by id

### Categories Routes
- [POST /categories](#post-categories) => Create new category
- [GET /categories](#get-categories) => Get all categories
- [PUT /categories](#put-categoriesid) => Edit category
- [DELETE /categories](#delete-categoriesid) => Delete category

### User Routes
- [POST /register](#user-routes-1) => Create new staff
- [POST /login](#post-login) => Login

## Pub Routes

### GET /pub/articles
> Get all articles

_Response (200 - OK)_
```json
[
  {
    "id": 3,
    "title": "Pororo",
    "content": "fish and turtle",
    "imgUrl": "this is image url",
    "categoryId": 1,
    "authorId": 2,
    "createdAt": "2024-07-26T01:43:42.060Z",
    "updatedAt": "2024-07-26T01:43:42.060Z",
    "User": {
      "id": 2,
      "username": null,
      "email": "ainurmohstaff@gmail.com",
      "role": "Staff",
      "phoneNumber": null,
      "address": null,
      "createdAt": "2024-07-26T01:43:14.039Z",
      "updatedAt": "2024-07-26T01:43:14.039Z"
    },
    "Category": {
      "id": 1,
      "name": "HotNews",
      "createdAt": "2024-07-26T01:43:14.044Z",
      "updatedAt": "2024-07-26T01:43:14.044Z"
    }
  },
  ...
]
```

---

### GET /pub/articles/:id

> Get article by id

_Response (200 - OK)_
```json
{
    "id": 1,
    "title": "<Article Title>",
    "content": "<Article Title>",
    "imgUrl": "<Article Image URL>",
    "categoryId": "<Article Category ID (INTEGER)>",
    "authorId": "<Article Author/User ID (INTEGER)>",
    "createdAt": "<given date by system>",
    "updatedAt": "<given date by system>"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Error not found"
}
```

---

### GET /pub/categories

> Get all categories

_Response (200 - OK)_
```json
[
  {
    "id": "<given id by system>",
    "name": "Category Name",
    "createdAt": "given date by system",
    "updatedAt": "given date by system"
  },
    ...
]
```

---

## Articles Routes

| Role  | Create | Read  | Update                             | Delete                             |
| ----- | ------ | ----- | ---------------------------------- | ---------------------------------- |
| Admin |    ✅  |   ✅  | ✅                                 | ✅                                |
| Staff |    ✅  |   ✅  | Hanya bisa menghapus miliknya.     |  Hanya bisa menghapus miliknya.   |


### POST /articles

> Create new article

_Request Body_
```json
{
  "title": "<article title>",
  "content": "<article content>",
  "imgUrl": "<article image URL>",
  "categoryId": "<articel category id (INTEGER)>"
}
```

_Response (201 - Created)_
```json
{
  "id": "<given id by system>",
  "title": "<article title>",
  "content": "<article content>",
  "imgUrl": "<article image URL>",
  "categoryId": "<articel category id (INTEGER)>",
  "authorId": "<articel author/user id (INTEGER)>",
  "createdAt": "<given date by system>",
  "updatedAt": "<given date by system>"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "<required attribute> should not empty"
}
```

---

### GET /articles

> Get all articles

_Response (200 - OK)_
```json
[
  {
    "id": 3,
    "title": "Pororo",
    "content": "fish and turtle",
    "imgUrl": "this is image url",
    "categoryId": 1,
    "authorId": 2,
    "createdAt": "2024-07-26T01:43:42.060Z",
    "updatedAt": "2024-07-26T01:43:42.060Z",
    "User": {
      "id": 2,
      "username": null,
      "email": "ainurmohstaff@gmail.com",
      "role": "Staff",
      "phoneNumber": null,
      "address": null,
      "createdAt": "2024-07-26T01:43:14.039Z",
      "updatedAt": "2024-07-26T01:43:14.039Z"
    },
    "Category": {
      "id": 1,
      "name": "HotNews",
      "createdAt": "2024-07-26T01:43:14.044Z",
      "updatedAt": "2024-07-26T01:43:14.044Z"
    }
  },
  ...
]
```

---

### GET /articles/:id

> Get article by id

_Response (200 - OK)_
```json
{
    "id": 1,
    "title": "<Article Title>",
    "content": "<Article Title>",
    "imgUrl": "<Article Image URL>",
    "categoryId": "<Article Category ID (INTEGER)>",
    "authorId": "<Article Author/User ID (INTEGER)>",
    "createdAt": "<given date by system>",
    "updatedAt": "<given date by system>"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Error not found"
}
```

---

### PUT /articles/:id

> Edit article by id

_Request Body_
```json
{
  "title": "Nea nea",
  "content": "ini adalah cerita tentang nea",
  "imgUrl": "image url",
  "categoryId": 1
}
```

_Response (200 - OK)_
```json
{
  "id": 2,
  "title": "Nea nea",
  "content": "ini adalah cerita tentang nea",
  "imgUrl": "image url",
  "categoryId": 1,
  "authorId": 2,
  "createdAt": "2024-07-26T01:43:37.299Z",
  "updatedAt": "2024-07-26T07:52:02.898Z"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Error not found"
}
```
_Response (400 - Bad Request)_
```json
{
  "message": [
    "Title should not empty",
    "Content should not empty"
  ]
}
```

---

### DELETE /articles/:id

> Delete article by id

_Response (200 - OK)_
```json
{
  "message": "<Article Title> success to delete"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "error not found"
}
```
---



## Categories Routes

### POST /categories

> Create new category

_Request Body_
```json
{
  "name": "<Category Name>"
}
```

_Response (201 - Created)_
```json
{
  "id": "<given id by system>",
  "name": "<Category Name>",
  "createdAt": "given date by system",
  "updatedAt": "given date by system"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "<empty required attributes>"
}
```

---

### GET /categories

> Get all categories

_Response (200 - OK)_
```json
[
  {
    "id": "<given id by system>",
    "name": "Category Name",
    "createdAt": "given date by system",
    "updatedAt": "given date by system"
  },
    ...
]
```

---

### PUT /categories/:id

> Edit categories by id

_Request Body_
```json
{
  "name": "<new value>"
}
```

_Response (200 - OK)_
```json
{
{
  "id": "<given id by system>",
  "name": "<new value>",
  "createdAt": "<given date by system>",
  "updatedAt": "<given date by system>"
}
}
```

_Response (404 - Not Found)_
```json
{
  "message": "error not found"
}
```
_Response (400 - Bad Request)_
```json
{
  "message": "Validation notEmpty on name failed",
  "type": "Validation error",
  "path": "name",
  "value": "",
  "origin": "FUNCTION",
  "instance": {
    "id": "<Category Id>",
    "name": "",
    "createdAt": "<given date by system>",
    "updatedAt": "<given date by system>"
  },
  "validatorKey": "notEmpty",
  "validatorName": "notEmpty",
  "validatorArgs": [
    true
  ],
  "original": {
    "validatorName": "notEmpty",
    "validatorArgs": [
      true
    ]
  }
}
```

---

### DELETE /categories/:id

> Delete categories by id

_Response (200 - OK)_
```json
{
  "message": "<Category Name> success to delete"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "error not found"
}
```
---

## User Routes

### POST /register

> Create new staff

_Request Body_
```json
{
  "email": "asdfasdf@mail.com",
  "password": "nea123456"
}
```

---

_Response (200 - OK)_
```json
{
  "message": {
    "role": "Staff",
    "id": 5,
    "email": "asdfasdf@mail.com",
    "updatedAt": "2024-07-26T09:37:01.994Z",
    "createdAt": "2024-07-26T09:37:01.994Z",
    "username": null,
    "phoneNumber": null,
    "address": null
  }
}
```

---

### POST /login

> Login

_Request Body_
```json
{
  "email": "asdfasdf@mail.com",
  "password": "nea123456"
}
```

---

_Response (200 - OK)_
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzIxOTg2ODIwfQ.vux-8PO6wkV5FHSGaXP7-4uNpOWurtGrfheUgkebuRc",
  "email": "ainurmoh@gmail.com",
  "role": "Admin"
}
```

---

### Global Error
_Response (401 - Unauthorized)_
```json
{
  "message": "Error Authentication"
}
```
---
_Response (403 - Forbidden)_
```json
{
  "message": "Unauthorized Forbidden Error"
}
```
---
_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error."
}
```
---