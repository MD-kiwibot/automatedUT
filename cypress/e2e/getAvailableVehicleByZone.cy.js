//Constantes
const ENDPOINT = "https://api.staging.kiwibot.com/v1/requester";
const REQUESTER_ID = "7783d005-9b1c-45aa-b06f-d230eafeddfb";
const API_KEY = "AIzaSyA8YwcT58Q12vahiwaZhZIRxBlkmbI3i2c";
const ZONE_ID = "1daa4d1c-d296-4fe5-8f1a-b0b9aaf62a7f";
const STATUS_OK = 200;

function setUrl(url) {
    return `${ENDPOINT}/${REQUESTER_ID}${url ? url : ""}?key=${API_KEY}`;
  }
  

//Get available bots by zone test
describe("getAvailableVehicleByZoneUT", () => {
    it("should get the available vehicles in zone", () => {
      const GETQUOTE_URL = setUrl(`/zones/${ZONE_ID}/vehicle/available`);
      cy.request("GET", GETQUOTE_URL).then((response) => {
        expect(response.status).to.eq(STATUS_OK);
      });
    });
  });

