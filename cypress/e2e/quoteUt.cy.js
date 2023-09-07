const ENDPOINT = "https://api.staging.kiwibot.com/v1/requesters";
const REQUESTER_ID = "596ebac2-6df5-425b-99e9-2c60d37f4251";
const API_KEY = "AIzaSyA8YwcT58Q12vahiwaZhZIRxBlkmbI3i2c";

function setUrl(url) {
    return `${ENDPOINT}/${REQUESTER_ID}${url ? url : ""}?key=${API_KEY}`;
  }
  

const QUOTE_OBJECT = {
    "sandbox": true,
    "location_id": "",
    "test": true,
    "external_id": "hola",
    "pickup": {
        "lat": 47.920629,
        "lon": -97.070812,
        "street": "Sandbox test",
        "city": "test",
        "state": "test",
        "country": "US",
        "postal_code": "95110",
        "instructions": "Use the sandbox",
        "email": "",
        "name": "",
        "phone_number": ""
    },
    "dropoff": {
        "lat": 47.920629,
        "lon": -97.070812,
        "street": "Sandbox test PAMELA",
        "phone_number": "+15555555555",
        "city": "test",
        "state": "test",
        "country": "US",
        "postal_code": "95112",
        "instructions": "Use the sandbox",
        "name": "Sandbox test",
        "email": "test@gmail.com"
    },
    "manifest": {
        "description": "Sandbox",
        "value": 0,
        "items": [
            {
                "name": "Pizza",
                "value": 5.99,
                "quantity": 1
            },
            {
                "name": "Cinnamon Roll",
                "value": 3.99,
                "quantity": 1
            }
        ]
    },
    "dropoff_time": "2023-06-22T23:59:05.000Z"

};

const CREATE_QUOTE_URL = setUrl("/quotes");

describe('Endpoint API Testing with POST request', () => {

    it('Create Quote test', () => {
      cy.request("POST", CREATE_QUOTE_URL, QUOTE_OBJECT).then(response => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('id');
  
        const createDeliveryObject = {
          quote_id: response.body.id
        };
        
  
      });
    });
  
  });