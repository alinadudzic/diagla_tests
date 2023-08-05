

function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
  
    return result;
  }
  
  const randomEmail = generateRandomString(12);

describe('Registration validation', () => { 

    before(() => {
    cy.go2register();

    })

    it('registration with already registered data: email and password', () => { 
    const email = Cypress.env("email");
    const password = Cypress.env("password");
    cy.registration(email, password)
    cy.get('p.css-g22f5i').contains('Użytkownik z adresem email alina.dudzic@gmail.com istnieje w systemie.')
    })

    it('password has less than 6 characters', () => { 
        cy.clearRegisterData();
        cy.registration(`${randomEmail}@gmail.com`, 'aBc12')
        cy.get('p.css-g22f5i').contains('password: Ta wartość jest zbyt krótka. Powinna mieć 6 lub więcej znaków. password:')
        })

        it('extra-long password', () => { 
            cy.clearRegisterData();
            cy.registration(`${randomEmail}@gmail.com`, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
            cy.get('p.css-g22f5i').contains('password must be at most 255 characters')
            })

         it('extra-long e-mail', () => { 
            const password = Cypress.env("password");
            cy.clearRegisterData();
            cy.registration(`${randomEmail}${randomEmail}${randomEmail}${randomEmail}${randomEmail}${randomEmail}${randomEmail}${randomEmail}${randomEmail}${randomEmail}${randomEmail}${randomEmail}${randomEmail}${randomEmail}${randomEmail}${randomEmail}${randomEmail}${randomEmail}${randomEmail}${randomEmail}${randomEmail}${randomEmail}${randomEmail}${randomEmail}${randomEmail}${randomEmail}${randomEmail}${randomEmail}${randomEmail}@gmail.com`, password)
            cy.get('p.css-g22f5i').contains('email must be at most 255 characters')
            })

            it('password that was revealed', () => { 
                cy.clearRegisterData();
                cy.registration(`${randomEmail}@gmail.com`, 'password')
                cy.get('p.css-g22f5i').contains('password: To hasło wyciekło w wyniku naruszenia danych i nie może być użyte. Proszę użyć innego hasła.')
                })

             it('mail without @', () => { 
            const password = Cypress.env("password");
             cy.clearRegisterData();
             cy.registration(`${randomEmail}[at]gmail.com`, 'password')
             cy.get('p.css-g22f5i').contains('Must be a valid email')
             })

             it('mail without domain in address', () => { 
                const password = Cypress.env("password");
                 cy.clearRegisterData();
                 cy.registration(`${randomEmail}@gmail`, 'password')
                 cy.get('p.css-g22f5i').contains('Must be a valid email')
                 })
            
            it('mail with space', () => {
            const password = Cypress.env("password");
            cy.clearRegisterData();
            cy.registration(`${randomEmail} 1@gmail`, 'password')
            cy.get('p.css-g22f5i').contains('Must be a valid email')
                 })
        
})
