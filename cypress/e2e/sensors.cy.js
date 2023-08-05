function generateRandomDecimal(length) {
  let result = '';
  const characters = '123456789';

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return parseFloat(result) / 10; 
}

const randomValue = generateRandomDecimal(2); 
const formatedRandomValue = randomValue; 

function generateRandomType(length) {
  let result = '';
  const characters = 'ABC';

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

const randomType = generateRandomType(1);
const crypto = require('crypto');

describe('sensors API testing', () => {
  let apiUrl;
  let deviceShortId;
  let sensorId;
  let deviceToken;

  before(() => {
    cy.request({
      method: 'POST',
      url: 'https://diagla.vot.pl/api/time',
      body: {
        shortId: 'JNBHTGS55B5118ES9FT8N6MT5'
      },
      cache: false
    }).then((response) => {
      expect(response.status).eq(201);
      expect(response.body).have.property('date');
      const createdAt = response.body.date;

      const devicePassword = '8KD6LLMXEM9S87CJTK3YAZFC6'; 
      const shortId = 'JNBHTGS55B5118ES9FT8N6MT5'; 
      const tokenString = `${devicePassword}_${shortId}_${createdAt}`;
      deviceToken = crypto.createHash('sha256').update(tokenString).digest('hex');

      apiUrl = 'https://diagla.vot.pl';
      deviceShortId = shortId;
    });
  });

  it('Add sensor reading', () => {
    cy.request({
      method: 'GET',
      url: `${apiUrl}/api/devices/${deviceShortId}/list_sensors`,
      headers: {
        'X-Authentication-Token': deviceToken,
        'Accept': 'application/json'
      }
    }).then((response) => {
      console.log(response.body);
      expect(response.status).eq(200);
      expect(response.body).be.an('array');
      expect(response.body.length).be.greaterThan(0);
  
      const firstSensor = response.body[0];
      const sensorId = firstSensor.id; 
  
      const inputData = {
        value: formatedRandomValue,
        type: randomType
      };
      cy.request({
        method: 'PUT',
        url: `${apiUrl}/api/sensors/${sensorId}/add_reading`,
        headers: {
          'X-Authentication-Token': deviceToken,
          'Accept': 'application/json'
        },
        body: inputData
      }).then((response) => {
        expect(response.status).eq(204);



        cy.request(`${apiUrl}/api/sensors/${sensorId}/readings`)
        .its('body.hydra:member')
        .then((response) => {
          const dataWithRandomTypeName = response.filter((obj) => obj.name === randomType)[0].data;
          expect(dataWithRandomTypeName).be.an('array');
          expect(dataWithRandomTypeName).have.length.above(0);
          const lastYValueForRandomType = dataWithRandomTypeName[dataWithRandomTypeName.length - 1].y;
          expect(lastYValueForRandomType).equal(formatedRandomValue);
          

            });
        });
      });
      


    });
});