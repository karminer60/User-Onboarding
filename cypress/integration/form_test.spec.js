describe('Form inputs', () => {

    it('can type a username', () => {
        cy.get('input[name="username"]')
            .type('Lady Gaga')
            .should('have.value', 'Lady Gaga')
        
    })
    it('email input', ()=>{
        cy.get('input[name="email"]')
            .type('karina@ld.com')
            
    })

    it('password input', ()=>{
        cy.get('input[name="password"]')
            .type('12345')
            
    })
})

describe('Form validation', () => {
    it('validates username correctly', () => {

        cy.get('input[name="username"]').type('karina')

    })
})

