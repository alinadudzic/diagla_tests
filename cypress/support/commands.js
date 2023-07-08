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