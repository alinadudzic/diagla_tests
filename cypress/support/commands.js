Cypress.Commands.add("login", (email, password) => {
    cy.get('#email-login').type(email);
    cy.get('#-password').type(password)
    cy.get('[type="submit"]').click();
})

  Cypress.Commands.add("successLogin", () => {
    const email = Cypress.env("email");
    const password = Cypress.env("password");
  
    cy.visit('/');
    cy.get('#email-login').type(email);
    cy.get('#-password').type(password);
    cy.get('[type="submit"]').click();
  });

  Cypress.Commands.add("logout", () => {
    const email = Cypress.env("email");
    cy.contains('h6', email).click()
    cy.contains('span', 'Logout').click();
  })

  Cypress.Commands.add("clearLoginData", () => {
    cy.get('#-password').clear();
    cy.get('#email-login').clear();
  })


  Cypress.Commands.add("failLoginValidation", () => {
  cy.wait(400)
  cy.get('.MuiFormHelperText-root.Mui-error.css-g22f5i').should('be.visible').and('have.text', 'Invalid JWT Refresh Token').and('have.css', 'color', 'rgb(255, 77, 79)');
              cy.url().should('eq', 'https://diagla.vot.pl/login')
  })

  Cypress.Commands.add("failLoginApiResponse", () => {
  cy.clearLoginData();
  cy.intercept('POST', '/api/login_check', (loginRequest) => {
  loginRequest.continue((loginResponse) => {
  expect(loginResponse.statusCode).eq(401);
})
    }) })

    Cypress.Commands.add("registration", (email, password) => {
      cy.get('#email-login').type(email);
      cy.get('#password-signup').type(password)
      cy.get('button').contains('Create Account').click();
  })

  Cypress.Commands.add("go2register", () => {
  cy.visit('/');
    cy.get('a').contains("Don't have an account?").click();
    cy.url('/register')
  })

  Cypress.Commands.add("clearRegisterData", () => {
    cy.get('#password-signup').clear();
    cy.get('#email-login').clear();
  })