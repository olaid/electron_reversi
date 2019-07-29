describe('reversi', function() {
  it('initialize', function() {
    cy.visit('/dist/reversi.html')
    cy.get('canvas')
  })
})