Cypress.Commands.add("login", (email, password) => {
    cy.get('#email-login').type(email);
    cy.get('#-password').type(password)
    cy.get('[type="submit"]').click();
})

Cypress.Commands.add("generateUniqueEmail", () => {
    const timestamp = Date.now();
    const registrationEmail = 'user${timestamp}@example.com';
  
    return registrationEmail;
  });

  Cypress.Commands.add("successLogin", () => {
    const email = 'alina.dudzic@gmail.com';
    const password = 'Testowe123456';
  
    cy.visit('/');
    cy.get('#email-login').type(email);
    cy.get('#-password').type(password);
    cy.get('[type="submit"]').click();
  });

  Cypress.Commands.add("logout", () => {
    cy.contains('h6', 'alina.dudzic@gmail.com').click({ force: true })
    cy.contains('span', 'Logout').click({ force: true });
  })

  Cypress.Commands.add("clearLoginData", () => {
    cy.get('#-password').clear();
    cy.get('#email-login').clear();
  })

  Cypress.Commands.add("sensorView", () => {
      cy.successLogin()
      cy.get('h6.MuiTypography-root.MuiTypography-h6.css-nm9qzb').should('be.visible').contains('Devices').click();
      cy.get('a[href="/device/509fed1c-1ec3-480f-9675-ba0fbd261b00"]').click();
      cy.get('a[href="/sensor/13983e07-5379-4e85-8a27-93fcf26a5ebf"]').click();
      })
