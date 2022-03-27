# REST API

## Common Object

### **`Product Object`**

```js
     {
       id:string,
       seller:{
         id:string,
         name:string,
       },
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

### **`Cart Object`**

```js
     {
       id:string,
       lastUpdatedAt:Date(ISO string),
       products:[{
          id: string,
          name: string,
          seller: {
              id: string,
              name: string,
            },
          imageUrl:string,
          addedAt:Date(ISO string),
          selectedQuantity: number,
          availableQuantity: number,
          price:{
              amount:number,
              currency:string
            }
         }],
     }
```

### **`Order Object`**

```js
     {
       id:string,
       createdAt:Date(ISO string),
       address:string,
       paid:{
           amount:number,
           currency:string
        },
       products:[{
         id:string,
         name:string,
         imageUrl:string,
         purchasedQuantity:number,
         price:{
           amount:number,
           currency:string
           },
         seller: {
              id: string,
              name: string,
            }
        }]
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
    accessToken:string,
    refreshToken:string,
    expiresIn:string(seconds)
    tokenType:string(Bearer)
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

## `6. /api/v1/products`

**Request:**  
&nbsp;&nbsp;**Method:** `GET`

&nbsp;&nbsp;**Query Params:**

```js
{
   page: number,
   limit: number;
}
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

## `7. /api/v1/products/product`

**Request:**  
&nbsp;&nbsp;**Method:** `POST`  
&nbsp;&nbsp;**Header:**

```js
  auth header
```

&nbsp;&nbsp;**Body:**

```js
  {
    name:string,
    imageUrl:string,
    availableQuantity: number,
    price:{
           amount:number,
           currency:string
       }
  }
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
&nbsp;&nbsp;**Method:** `PATCH`  
&nbsp;&nbsp;**Header:**

```js
  auth header
```

&nbsp;&nbsp;**Body:**

```js
  {
    // all are optionals
    name:string,
    imageUrl:string,
    availableQuantity: number,
    price:{
           amount:number,
           currency:string
       }
  }
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
    Cart Object
 ]
```

## `12. /api/v1/users/@me/cart/:productId`

**Request:**  
&nbsp;&nbsp;**Method:** `POST`  
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
{
    ...Cart Object
}
```

## `13. /api/v1/users/@me/empty-cart`

**Request:**  
&nbsp;&nbsp;**Method:** `PUT`  
&nbsp;&nbsp;**Header:**

```js
  auth header
```

**Response:**  
&nbsp;&nbsp;**Success:**

```js
[];
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
    Order Object
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
  Order Object
```
