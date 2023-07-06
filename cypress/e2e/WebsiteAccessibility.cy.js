/// <reference types="cypress" />

describe('Website accessibility and https protocol', () => { 
    it('wisiting on diagla website', () => { 
      cy.visit('/');
      cy.url().should('eq', 'https://diagla.vot.pl/login')
      
    }) 
  }); 
  