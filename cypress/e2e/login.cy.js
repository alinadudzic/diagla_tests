describe('Succes login', () => { 
  it('verify all elements on login page', () => {
    cy.visit('/');
    cy.get('#email-login').should('have.attr', 'placeholder', 'Enter email address');
    cy.get('#-password').should('have.attr', 'placeholder', 'Enter password');
    cy.get('label').eq(0).should('contain', 'Email Address');
    cy.get('label').eq(1).should('contain', 'Password');
    cy.get('h3').should('contain', 'Login')
    cy.get('.MuiTypography-root.MuiTypography-body1.css-lv3i5e').should('contain', "Don't have an account?").and('have.attr', 'href', '/register');
    cy.get('.MuiTypography-root.MuiTypography-h6.css-14bbaup').should('contain', 'Keep me sign in');
    cy.get('input[type="checkbox"]').should('not.be.checked');
    cy.get('a[href="/login"]').should('have.text', 'Forgot Password?');
    cy.get('button[type="submit"]').should('have.css', 'background-color', 'rgb(24, 144, 255)').should('have.css', 'color', 'rgb(255, 255, 255)');
  })
  
  it('succes login on diagla', function() {  
    const password = Cypress.env("password");
    const email = Cypress.env("email");
    cy.login(email, password);
      cy.url().should('eq', 'https://diagla.vot.pl/')

      cy.logout();

       });
    }) 