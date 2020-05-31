describe('Form inputs', () => {
    it('can navigate to the site', () => {
        cy.visit('http://localhost:3000')
        cy.url().should('include', 'localhost')
      })

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

    it('checkbox verification', ()=>{
        cy.get('[type="checkbox"]').check()
            
    })

    it('submit form verification', ()=>{
        cy.get('form').submit()
            
    })

    

})

describe('Form validation', () => {
    it('validates username correctly', () => {

        cy.get('input[name="username"]').type('')

    })
})

