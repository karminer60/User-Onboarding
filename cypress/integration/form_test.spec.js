describe('Form inputs', () => {
  
    it('can type a username', () => {
      cy.get('input[name="username"]')
        .type('Lady Gaga')
        
    })
})
  
  describe('Form validation', () => {
    it('validates username correctly', () => {
     
      cy.get('input[name="username"]').type('karina')
    
    })
  })
  
  