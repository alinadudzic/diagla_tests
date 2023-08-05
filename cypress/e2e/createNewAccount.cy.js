function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
  
    return result;
  }
  
  const randomEmail = generateRandomString(12);


describe('Succes registration', () => { 

    before(() => {
    cy.go2register();
  
    })

    it('verify all elements on login page', () => { 
      cy.get('h3').contains('Sign up').should('be.visible').its('length').should('eq', 1);
      cy.get('a').contains("Already have an account?").should('have.attr', 'href', '/login');
      cy.get('#email-login').should('have.attr', 'placeholder', 'demo@company.com').should('have.prop', 'tagName', 'INPUT').as('emailInput');
      cy.get('#password-signup').should('have.attr', 'placeholder', '******').should('have.prop', 'tagName', 'INPUT').as('passwordInput');
      cy.get('a').contains("Terms of Service").should('have.attr', 'href', '/register');
      cy.get('a').contains("Privacy Policy").should('have.attr', 'href', '/register');
      cy.get('button').contains('Create Account').should('have.css', 'background-color', 'rgb(24, 144, 255)')

    })

    it('verify inputs obligatory', () => {
    cy.get('button').contains('Create Account').click();
    cy.get('#helper-text-email-signup').contains('Email is required').should('have.css', 'color', 'rgb(255, 77, 79)')
    cy.get('#helper-text-password-signup').contains('Password is required').should('have.css', 'color', 'rgb(255, 77, 79)')

    })

    it('succes register', () => {
    cy.get('#email-login').type(`${randomEmail}@gmail.com`)
    cy.get('#password-signup').type('Testowe123456!')
    cy.get('button').contains('Create Account').click()
    cy.url('/login')
    cy.successLogin(`${randomEmail}@gmail.com`,'Testowe123456!')
    cy.url('/')
    })


             
  }); 