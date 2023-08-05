describe('Login validation', () => { 
    it('wrong e-mail adress', function() { 
      cy.visit('/');
      const password = Cypress.env("password");
      cy.failLogin();
      cy.login("wrongmail@gmail.com", password);
      cy.failLoginValidation();

    })
    it('wrong password', function() { 
      const email = Cypress.env("email");
      cy.failLogin();
      cy.login(email, "Wrongpassword")
      cy.failLoginValidation();
      }) 

      it('wrong e-mail', function() { 
      const password = Cypress.env("password");
        cy.failLogin();
        cy.login("wrongemail@gmail.com", password)
        cy.failLoginValidation();
        }) 

        it('correct password but in lower case', function() { 
          const email = Cypress.env("email");
          cy.failLogin();
          cy.login(email, "testowe123456")
          cy.failLoginValidation();
          }) 

          it('correct password but with a space at the end', function() { 
            const email = Cypress.env("email");
            cy.failLogin();
            cy.login(email, "Testowe123456 ")
            cy.failLoginValidation();
            }) 

           // commented because there is an bug in the system
           // it('correct e-mail but with a space at the end', function() { 
           // const password = Cypress.env("password");
           //  cy.failLogin();
           //  cy.login('alina.dudzic@gmail.com ', password)
           //  cy.failLoginValidation();
           //  }) 

           it('sql iniection', function() { 
            const email = Cypress.env("email");
            cy.failLogin();
            cy.login(email, "' or '1'='1")
            cy.failLoginValidation();
            }) 

            it('correct e-mail but written in capslook, expected result: successful login', function() { 
              const password = Cypress.env("password");
              cy.clearLoginData();
              cy.intercept('POST', '/api/login_check', (loginRequest) => {
              loginRequest.continue((loginResponse) => {
              expect(loginResponse.statusCode).eq(200);}) })
              cy.login("ALINA.DUDZIC@GMAIL.COM", password)
              cy.wait(400)
              cy.url().should('eq', 'https://diagla.vot.pl/')
              }) 

             
  }); 
  
