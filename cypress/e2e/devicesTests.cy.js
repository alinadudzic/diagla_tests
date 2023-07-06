/// <reference types="cypress" />

describe('add new device and sensors', () => { 
    it('add devices', function() { 
    cy.successLogin()
    cy.get('h6.MuiTypography-root.MuiTypography-h6.css-nm9qzb').should('be.visible').contains('Devices').click();
    cy.get('svg[data-testid="AddIcon"]').click();
    cy.get('#name').type('device1')
    cy.contains('button', 'Confirm').click()
    cy.contains('p', 'device1');
    cy.get('a[href="/device/509fed1c-1ec3-480f-9675-ba0fbd261b00"]').click();
    cy.url('https://diagla.vot.pl/device/509fed1c-1ec3-480f-9675-ba0fbd261b00');
    })

    it('add sensor', function () {
        cy.get('svg[data-testid="AddIcon"]').click();
    cy.get('#name').type('sensor1');
    cy.contains('button', 'Confirm').click();
    cy.contains('div', 'sensor1');
    cy.get('a[href="/sensor/13983e07-5379-4e85-8a27-93fcf26a5ebf"]');
    cy.url('https://diagla.vot.pl/sensor/13983e07-5379-4e85-8a27-93fcf26a5ebf');
    cy.logout();
    })
})

 
