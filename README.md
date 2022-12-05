# Padel_App

| Server Routes | HTTP Verb | Description | 
| ------ | ------ | --------- | 
| /signup | POST | New user |
| /login | POST | Log in |
| /verify | GET | Verify user and session |
| /getProducts | GET | Product's List |
| /getOneProduct/:product_id | GET | Product's details |
| /saveProduct | POST | Create a new product |
| /editProduct/:product_id | PUT | update a product |
| /deleteProduct/:product_id | DELETE | delete a product |


| Client Routes | HTTP Verb | Description | Protected |
| ------- | -------- | ---------- | --------- |
| / | GET | Index Page |    |
| /registro | GET | Sign in | |
| /iniciar-sesion | GET | Log in |  |
| /cerrar-sesion | GET | Log out| |
| /perfil | GET | User's profile | YES |
| /productos | GET | Product's list | YES |
| /productos/:id/detalles| GET | Product's details | YES |
| /productos/crear | GET | Create new product | YES |
| /productos/crear | POST | Show new product created | YES |
| /productos/:id/editar | GET | Update a product | YES |
| /productos/:id/editar | POST | Show updated product | YES |
| /productos/:id/delete | POST | Delete a product | YES |
