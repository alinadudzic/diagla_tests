/// <reference types="cypress" />

describe('Login walidation', () => { 
    it('wrong e-mail adress', function() { 
      cy.visit('/');
      cy.login("wrongmail@gmail.com", "Testowe123456");

    })
    it('wrong password', function() { 
        cy.visit('/');
        cy.login("alina.dudzic@gmail.com", "Wrongpassword")
      }) 
  }); 
  
  //tu moim problemem jest to, że testy przechodzą pomyślnie, chyba powinnam napisać jakąś asercję?