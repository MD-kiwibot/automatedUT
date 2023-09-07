//Constantes
const ENDPOINT = "https://kairos-rim-gw.kiwibot.com/";
const ENDPOINT_ASSIGN = "https://api.staging.kiwibot.com";
const REQUESTER_ID = "596ebac2-6df5-425b-99e9-2c60d37f4251";
const API_KEY = "AIzaSyAcHXXoFMB7loup88TnSx8GpAMbWfQ_S8Y";
const STATUS_CREATED = 201;
const STATUS_OK = 200;
//Creacion de URL
function setUrl(url) {
  return `${ENDPOINT}/${url ? url : ""}?key=${API_KEY}`;
}

describe("getRobotParamUT", () => {
  it("should get the delivery", () => {
    const GETQUOTE_URL = setUrl(`/params/kiwibot4X001`);
    cy.request("GET", GETQUOTE_URL).then((response) => {
      expect(response.status).to.eq(STATUS_OK);
    });
  });
});