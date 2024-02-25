# Backend Serverless Tokenization Process
## Architecture
![Imagen BFF](./assets/diagram.png "architecture")

## Setup Project Local

### Requeriments:
- **Node 18.x** or higher
- Docker

To run Serverless server you should to execute the next commands:

### Steps for run server:
1. Setup Redis
    ```
    $ docker run --name some-redis -p 6379:6379 -d redis redis-server --requirepass root
    ```
2. Install dependencies
    ```
    $ npm i
    ```
3. Run server
    ```
    $ npm run dev
    ```

### Tests:
1. Run Unit Tests
    ```
    $ npm run test
    ```

## λ Lambda Functions

### 1. Create Token
- Request:
    ```
    curl --request POST \
      --url http://localhost:3000/create-token \
      --header 'Authorization: pk_test_BuyK6NguwyPEuD33' \
      --header 'Content-Type: application/json' \
      --header 'User-Agent: Postman/8.6.0' \
      --data '{
      "card_number": "4222525676096126",
      "cvv": "232",
      "expiration_month": "12",
      "expiration_year": "2025",
      "email": "victor@yahoo.es"
    }'
    ```
- Response:
    ```
    {
      "token": "GNiEepkoV74k8kaj"
    }
    ```
### 2. Get card information
- Request:
    ```
    curl --request GET \
      --url http://localhost:3000/card-information/GNiEepkoV74k8kaj \
      --header 'Authorization: pk_test_BuyK6NguwyPEuD33' \
      --header 'Content-Type: application/json' \
      --header 'User-Agent: Postman/8.6.0'
    ```
- Response:
    ```
    {
      "card_number": "4222525676096126",
      "email": "victor@yahoo.es",
      "expiration_month": "12",
      "expiration_year": "2025"
    }
    ```
## AWS endpoints
- Create token: **post ->** https://qd3akdblli.execute-api.us-east-2.amazonaws.com/create-token example:
  ```
  curl --request POST \
  --url https://qd3akdblli.execute-api.us-east-2.amazonaws.com/create-token \
  --header 'Authorization: pk_test_BuyK6NguwyPEuD33' \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: Postman/8.6.0' \
  --data '{
	 "card_number": "4222525676096126",
   "cvv": "232",
   "expiration_month": "12",
   "expiration_year": "2024",
   "email": "victor@yahoo.es"
  }'
  ```
- Get card information: **get ->** https://qd3akdblli.execute-api.us-east-2.amazonaws.com/card-information/{token} example:
  ```
  curl --request GET \
  --url https://qd3akdblli.execute-api.us-east-2.amazonaws.com/card-information/gIeQ3n1CzkY74kT9 \
  --header 'Authorization: pk_test_BuyK6NguwyPEuD33' \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: Postman/8.6.0'
  ```