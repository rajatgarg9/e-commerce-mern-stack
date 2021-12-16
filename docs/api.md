# REST API

## Common Object

### **`Product Object`**

```js
     {
       id:string,
       sellerId:string,
       name:string,
       imageUrl:string,
       price:{
           amount:number,
           currency:string
       },
       availableQuantity:number,
       createdAt:Date(ISO string),
       lastUpdatedAt:Date(ISO string)
     }
```

### **`Cart Product Object`**

```js
     {
       id:string,
       name:string,
       imageUrl:string,
       selectedQuantity:number,
       price:{
           amount:number,
           currency:string
       },
       addedAt:Date(ISO string),
       lastUpdatedAt:Date(ISO string)
     }
```

### **`Order Object`**

```js
     {
       id:string,
       orderedAt:Date(ISO string),
       address:string,
       paid:{
           amount:number,
           currency:string
        }
       products:[{
         name:string,
         imageUrl:string,
          price:{
           amount:number,
           currency:string
          },
          selectedQuantity:number,
        }]
     }
```

### **`Order Product Object`**

```js
     {
       id:string,
       name:string,
       imageUrl:string,
       price:{
           amount:number,
           currency:string
       },
       selectedQuantity:number,
       addedAt:Date(ISO string),
       lastUpdatedAt:Date(ISO string)
     }
```

## `1. /api/v1/auth/sign-up`

**Request:**  
&nbsp;&nbsp;**Method:** `POST`  
&nbsp;&nbsp;**Body:**

```js
   {
       name:string,
       email:string,
       password:string
   }
```

**Response:**

```js
{
    accessToken:string,
    refreshToken:string,
    expiresIn:string(seconds)
    tokenType:string(Bearer)
}
```

## `2. /api/v1/auth/login`

**Request:**  
&nbsp;&nbsp;**Method:** `POST`  
&nbsp;&nbsp;**Body:**

```js
   {
       email:string,
       password:string
   }
```

**Response:**

```js
{
     id:string,
     name:string,
     email:string
}
```

## `3. /api/v1/auth/token/refresh`

**Request:**  
&nbsp;&nbsp;**Method:** `POST`  
&nbsp;&nbsp;**Header:**

```js
{
  refresh_token: string;
}
```

**Response:**

```js
{
    accessToken:string,
    refreshToken:string,
    expiresIn:string(seconds)
    tokenType:string(Bearer)
}
```

## `4. /api/v1/auth/logout`

**Request:**  
&nbsp;&nbsp;**Method:** `POST`  
&nbsp;&nbsp;**Header:**

```js
{
   authorization: 'Bearer <accessToken>',
   refresh_token: string
}
```

**Response:**

```js
{
}
```

## `5. /api/v1/users/@me`

**Request:**  
&nbsp;&nbsp;**Method:** `GET`  
&nbsp;&nbsp;**Header:**

```js
{
    authorization: Bearer <accessToken>
}
```

**Response:**  
&nbsp;&nbsp;**Success:**

```js
{
     id:string,
     name:string,
     email:string
}
```

&nbsp;&nbsp;**Fail:**  
&nbsp;&nbsp;&nbsp;&nbsp;**Status Code:** `401` (Unauthorized)

```js
{
  erros: [string];
}
```

## `6. /api/v1/public/products`

**Request:**  
&nbsp;&nbsp;**Method:** `GET`

&nbsp;&nbsp;**Query Params:**

```js
Page: number;
```

**Response:**  
&nbsp;&nbsp;**Success:**

```js
{
products:[Product Object],
pagination:{
    limit:number,
    lastPage:number,
    currentPage:number,
    total:number
   }
}
```

## `7. /api/v1/product`

**Request:**  
&nbsp;&nbsp;**Method:** `POST`  
&nbsp;&nbsp;**Header:**

```js
  auth header
```

&nbsp;&nbsp;**Body:**

```js
  Product Object without id
```

**Response:**  
&nbsp;&nbsp;**Success:**

```js
Product Object
```

## `8. /api/v1/products/:productId`

**Request:**  
&nbsp;&nbsp;**Method:** `GET`  
&nbsp;&nbsp;**Header:**

```js
  auth header
```

**Response:**  
&nbsp;&nbsp;**Success:**

```js
Product Object
```

## `9. /api/v1/products/:productId`

**Request:**  
&nbsp;&nbsp;**Method:** `PUT`  
&nbsp;&nbsp;**Header:**

```js
  auth header
```

&nbsp;&nbsp;**Body:**

```js
  Product Object
```

**Response:**  
&nbsp;&nbsp;**Success:**

```js
Product Object
```

## `10. /api/v1/products/:productId`

**Request:**  
&nbsp;&nbsp;**Method:** `DELETE`  
&nbsp;&nbsp;**Header:**

```js
  auth header
```

**Response:**  
&nbsp;&nbsp;**Success:**

```js
{
}
```

## `11. /api/v1/users/@me/cart`

**Request:**  
&nbsp;&nbsp;**Method:** `GET`  
&nbsp;&nbsp;**Header:**

```js
  auth header
```

**Response:**  
&nbsp;&nbsp;**Success:**

```js
[
    Cart Product Object
]
```

## `12. /api/v1/users/@me/cart/:productId`

**Request:**  
&nbsp;&nbsp;**Method:** `PATCH` , `POST`  
&nbsp;&nbsp;**Header:**

```js
  auth header
```

&nbsp;&nbsp;**Body:**

```js
{
  selectedQuantity: number;
}
```

**Response:**  
&nbsp;&nbsp;**Success:**

```js
[
    Cart Product Object
]
```

## `13. /api/v1/users/@me/cart`

**Request:**  
&nbsp;&nbsp;**Method:** `DELETE`  
&nbsp;&nbsp;**Header:**

```js
  auth header
```

&nbsp;&nbsp;**Body:**

```
productId=[id], if empty array then all products will be deleted
```

**Response:**  
&nbsp;&nbsp;**Success:**

```js
[
    Cart Product Object
]
```

## `14. /api/v1/users/@me/orders`

**Request:**  
&nbsp;&nbsp;**Method:** `GET`  
&nbsp;&nbsp;**Header:**

```js
  auth header
```

**Response:**  
&nbsp;&nbsp;**Success:**

```js
[
    Order Product Object
]
```

## `15. /api/v1/users/@me/order`

**Request:**  
&nbsp;&nbsp;**Method:** `POST`  
&nbsp;&nbsp;**Header:**

```js
  auth header
```

**Response:**  
&nbsp;&nbsp;**Success:**

```js
  Order Product Object
```
