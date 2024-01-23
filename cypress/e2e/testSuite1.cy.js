describe('upravljanje izdelka', () => {
  const product = 'Tartufi'
  const minTemp = 1
  const maxTemp = 4

  beforeEach(() => {
    cy.visit('http://localhost:3000/products')
  })

  it('dodaj-izdelek', () => {
      cy.get('tbody tr').children('[id^="productsTableBodyName"]').contains(product).should('not.exist') // [] iskanje po atributih značk, ^= delno ujemanje
      cy.get('#addNewProductButton').click()
      cy.get('#addProductNameInput').type(product)
      cy.get('#addProductMaxInput').type(`${minTemp}`) // Za uporabo spremenljivk ${} mora bit string deklariran z ` (AltGr + 7), njihove komande {enter} etc. delajo tudi z navadnim '
      cy.get('#addProductMinInput').type(`${maxTemp}`)
      cy.get('#addProductButton').click()
      cy.get('tbody tr').children('[id^="productsTableBodyName"]').contains(product).should('exist')
  })

  it('uredi-izdelek', () => {
      const minTempN = 0
      const maxTempN = 5
      let nameCell = cy.get('tbody tr').children('[id^="productsTableBodyName"]').contains(product)
      nameCell.should('exist')
      nameCell.parent().find('[id^="productsTableBodyEdit"] button').click()
      cy.get('#editProductMinInput').clear().type(`${minTempN}`)
      cy.get('#editProductMaxInput').type(`{backspace}{backspace}${maxTempN}`)
      cy.get('#editProductIdButton').click()

      nameCell = cy.get('tbody tr').children('[id^="productsTableBodyName"]').contains(product) 
      nameCell.parent().children('[id^="productsTableBodyMin"]').should('have.text', `${minTempN}`) 
      nameCell.parent().children('[id^="productsTableBodyMax"]').should('have.text', `${maxTempN}`) 
  })

  it('brisi-izdelek', () => {
      const productCell = cy.get('tbody tr').children('[id^="productsTableBodyName"]').contains(product)
      productCell.should('exist')
      productCell.parent().find('[id^="productsTableBodyDelete"]').click()
      productCell.should('not.exist')
  })
})