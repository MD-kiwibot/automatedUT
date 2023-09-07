//Constantes
const ENDPOINT = "https://api.staging.kiwibot.com/v1/requesters";
const REQUESTER_ID = "596ebac2-6df5-425b-99e9-2c60d37f4251";
const API_KEY = "AIzaSyA8YwcT58Q12vahiwaZhZIRxBlkmbI3i2c";
const STATUS_OK = 200;
const STATUS_CREATED = 201;

function setUrl(url) {
  return `${ENDPOINT}/${REQUESTER_ID}${url ? url : ""}?key=${API_KEY}`;
}

// objeto de token
const TOKEN_OBJECT = {
  username: "sdsddsdsds",
  email: "pamela.ramirezTestingUT@kiwibot.com",
  password: "hello11",
};


//Tocken Generation test
describe("tokenGenerationUT", () => {
    beforeEach(function () {
        const GETQUOTE_URL = setUrl(`/auth/token`);
        cy.request("POST", GETQUOTE_URL, TOKEN_OBJECT).then((response) => {
          expect(response.status).to.eq(STATUS_CREATED);
          this.refreshTokenSaved = response.body.refreshToken;
        });
      });

      it("token gneration", () => {
        const GETQUOTE_URL = setUrl(`/auth/token`);
        cy.request("POST", GETQUOTE_URL, TOKEN_OBJECT).then((response) => {
          expect(response.status).to.eq(STATUS_CREATED);
         
        });
        
      });
 
  it("refesh token", function () {
    // objeto de refresh token
    const REFRESHTOKEN_OBJECT = {
        refresh_token: this.refreshTokenSaved
      };
    const GETQUOTE_URL = setUrl(`/auth/token`);
    cy.request("POST", GETQUOTE_URL, REFRESHTOKEN_OBJECT).then((response) => {
      expect(response.status).to.eq(STATUS_OK);
    });
  });
});
