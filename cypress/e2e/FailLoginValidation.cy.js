/// <reference types="cypress" />

describe('Login validation', () => { 
    it('wrong e-mail adress', function() { 
      cy.visit('/');
      cy.intercept('POST', '/api/login_check', (loginRequest) => {
        loginRequest.continue((loginResponse) => {
          expect(loginResponse.statusCode).to.eq(401);
        });
      });
      cy.login("wrongmail@gmail.com", "Testowe123456");
      cy.wait(400)
      cy.get('.MuiFormHelperText-root.Mui-error.css-g22f5i').should('be.visible').and('have.text', 'Nieprawidłowe dane.').and('have.css', 'color', 'rgb(255, 77, 79)');

    })
    it('wrong password', function() { 
      cy.clearLoginData();
      cy.intercept('POST', '/api/login_check', (loginRequest) => {
        loginRequest.continue((loginResponse) => {
          expect(loginResponse.statusCode).to.eq(401);
        });
      });
      cy.login("alina.dudzic@gmail.com", "Wrongpassword")
        cy.wait(400)
      cy.get('.MuiFormHelperText-root.Mui-error.css-g22f5i').should('be.visible').and('have.text', 'Nieprawidłowe dane.').and('have.css', 'color', 'rgb(255, 77, 79)');
      }) 
  }); 
  
