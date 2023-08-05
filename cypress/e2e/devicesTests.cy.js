function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
  
    return result;
  }
  
  const randomString = generateRandomString(5);

describe('add new device and sensors', () => { 
    it('add devices', function() { 
    cy.successLogin()
    cy.get('h6.MuiTypography-root.MuiTypography-h6.css-nm9qzb').should('be.visible').contains('Devices').click();
    cy.get('svg[data-testid="AddIcon"]').click();
    cy.get('#name').type(`device${randomString}`)
    cy.contains('button', 'Confirm').click()
    cy.contains('p', `device${randomString}`).click();
    cy.contains('div', `device${randomString}`)
    })

    it('add sensor', function () {
    cy.get('svg[data-testid="AddIcon"]').click();
    cy.get('#name').type(`sensor${randomString}`);
    cy.contains('button', 'Confirm').click();
    cy.contains('div', `sensor${randomString}`).click();
    cy.contains('div', `sensor${randomString}`)
   // cy.logout();
    })
})


 
