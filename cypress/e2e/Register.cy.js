/// <reference types="cypress" />

describe('Website accessibility', () => { 
    it('wisiting on diagla website', () => { 
      cy.visit('/');
      cy.contains("Don't have an account?").click();
      cy 
    
    }) 
  }); 
  