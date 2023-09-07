//Constantes
const ENDPOINT = "https://api.staging.kiwibot.com/v1/requesters";
const ENDPOINT_ASSIGN = "https://api.staging.kiwibot.com";
const REQUESTER_ID = "596ebac2-6df5-425b-99e9-2c60d37f4251";
const API_KEY = "AIzaSyA8YwcT58Q12vahiwaZhZIRxBlkmbI3i2c";
const STATUS_CREATED = 201;
const STATUS_OK = 200;
//Creacion de URL
function setUrl(url) {
  return `${ENDPOINT}/${REQUESTER_ID}${url ? url : ""}?key=${API_KEY}`;
}

function setAssignUrl(url) {
  return `${ENDPOINT_ASSIGN }/${url ? url : ""}?key=${API_KEY}`;
}

//Objeto de la quote
const QUOTE_OBJECT = {
  sandbox: true,
  location_id: "",
  test: true,
  external_id: "hola",
  pickup: {
    lat: 47.920629,
    lon: -97.070812,
    street: "Sandbox test",
    city: "test",
    state: "test",
    country: "US",
    postal_code: "95110",
    instructions: "Use the sandbox",
    email: "",
    name: "",
    phone_number: "",
  },
  dropoff: {
    lat: 47.920629,
    lon: -97.070812,
    street: "Sandbox test PAMELA",
    phone_number: "+15555555555",
    city: "test",
    state: "test",
    country: "US",
    postal_code: "95112",
    instructions: "Use the sandbox",
    name: "Sandbox test",
    email: "test@gmail.com",
  },
  manifest: {
    description: "Sandbox",
    value: 0,
    items: [
      {
        name: "Pizza",
        value: 5.99,
        quantity: 1,
      },
      {
        name: "Cinnamon Roll",
        value: 3.99,
        quantity: 1,
      },
    ],
  },
  dropoff_time: "2023-06-22T23:59:05.000Z",
};
//creacion del path
const CREATE_QUOTE_URL = setUrl("/quotes");
const CREATE_DELIVERY_URL = setUrl("/deliveries");

//objeto del delivery
const CREATE_DELIVERY_OBJECT = {
  webhook_url: "https://delivery.jo30.com/webhook/delivery-status/kiwibot",
  external_id: "UTD001",
  test: true,
  sandbox: false,
};


//delivery ID
let DELIVERY_ID = {
  id: "",
};

// objeto de reasignacion
const REASSIGNATION_OBJECT = {
  worker_id: "kiwibot4X002",
  auto_assigned: false,
  re_assignation_reason: "any"

};



// Creatre Delivery test
describe("createDeliveyUT", () => {
  it("Create Quote", () => {
    cy.request("POST", CREATE_QUOTE_URL, QUOTE_OBJECT).then((response) => {
      expect(response.status).to.eq(STATUS_CREATED);
      expect(response.body).to.have.property("id");

      const quoteId = response.body.id;
      CREATE_DELIVERY_OBJECT.quote_id = quoteId;
    });
  });

  it("Create Delivery", () => {
    cy.request("POST", CREATE_DELIVERY_URL, CREATE_DELIVERY_OBJECT).then(
      (response) => {
        expect(response.status).to.eq(STATUS_CREATED);
        expect(response.body).to.have.property("id");

        DELIVERY_ID.id = response.body.id;
      }
    );
  });
});

//Get delivery test
describe("getDeliveryUT", () => {
  it("should get the delivery", () => {
    const GETQUOTE_URL = setUrl(`/deliveries/${DELIVERY_ID.id}`);
    cy.request("GET", GETQUOTE_URL).then((response) => {
      expect(response.status).to.eq(STATUS_OK);
    });
  });
});

//Get delivery status test
describe("getDeliveryEstatusUT", () => {
  it("should get the delivery status in the body", () => {
    const GETQUOTE_URL = setUrl(`/deliveries/${DELIVERY_ID.id}/status`);
    cy.request("GET", GETQUOTE_URL).then((response) => {
      expect(response.status).to.eq(STATUS_OK);
      expect(response.body).to.have.property("status");
    });
  });
});

//Get delivery history test
describe("getDeliveryHistorysUT", () => {
  it("should get the delivery history", () => {
    const GETQUOTE_URL = setUrl(`/deliveries/${DELIVERY_ID.id}/history`);
    cy.request("GET", GETQUOTE_URL).then((response) => {
      expect(response.status).to.eq(STATUS_OK);
    });
  });
});

//objeto del la asignacion del bot
const ASSIGNATION_OBJECT =[
  {
      "delivery_id": DELIVERY_ID.id,
      "worker_id": "kiwibot4X001"
  }
];

//assign bot to delivery test
describe("assignationUT", () => {
  it("should assign bot to the delivery", () => {
    const GETQUOTE_URL = setAssignUrl(`deliveries/assign`);
    cy.request("POST", GETQUOTE_URL, ASSIGNATION_OBJECT).then((response) => {
      expect(response.status).to.eq(STATUS_OK);
    });
  });
});


//Reassign bot to delivery test
describe("reAssignationUT", () => {
  it("should reassign bot to the delivery", () => {
    const GETQUOTE_URL = setAssignUrl(`delivery/${DELIVERY_ID.id}/vehicle`);
    cy.request("POST", GETQUOTE_URL, REASSIGNATION_OBJECT).then((response) => {
      expect(response.status).to.eq(STATUS_OK);
    });
  });
});

//Cancel delivery test
describe("cancelDeliveryUT", () => {
  it("should cancel the delivery", () => {
    const GETQUOTE_URL = setUrl(`/deliveries/${DELIVERY_ID.id}/cancel`);
    cy.request("POST", GETQUOTE_URL).then((response) => {
      expect(response.status).to.eq(STATUS_OK);
    });
  });
  it("should have the status in cancel", () => {
    const GETQUOTE_URL = setUrl(`/deliveries/${DELIVERY_ID.id}`);
    cy.request("GET", GETQUOTE_URL).then((response) => {
      expect(response.status).to.eq(STATUS_OK);
      expect(response.body).to.have.property("status").and.eq("canceled");
    });
  });

});
