/// <reference types="Cypress" />

before(() => cy.visit('http://127.0.0.1:8080/'));

describe('giphy-party', () => {
  before(() =>
    cy.intercept(
      'GET',
      'https://api.giphy.com/v1/gifs/search?api_key=dyhxkzTTwEEMUNuC5zjFX5Hzt6bsClFU&q=dogs&limit=25&offset=0&rating=g&lang=en',
      { fixture: 'dogs.json' }
    )
  );

  it('Allows users to search a gif and see it on the screen', () => {
    cy.get('[data-cy="search-input"]').clear().type('dogs');
    cy.get('[data-cy="search-btn"]').click();

    cy.get('[data-cy="gifs-container"] > *').should(($gifs) => {
      expect($gifs).to.have.length(1);
      expect($gifs[0]).to.have.class('gif');
    });
  });

  it('Allows users to remove gifs from the screen', () => {
    cy.get('[data-cy="remove-all-btn"]').click();

    cy.get('[data-cy="gifs-container"] > *').should(($gifs) => {
      expect($gifs).to.have.length(0);
    });
  });

  it('Makes form to make it visible and displays a button to scroll to the top', () => {
    cy.get('[data-cy="search-input"]').clear().type('dogs');

    for (let i = 0; i < 10; i += 1) {
      cy.get('[data-cy="search-btn"]').click();

      cy.wait(3000);
    }

    cy.scrollTo('bottom');

    cy.get('#scroll-to-top').should('be.visible');
    cy.get('#scroll-to-top').should('have.text', '▲');
    cy.get('#scroll-to-top').should('have.class', 'scroll-btn');
    cy.get('[data-cy="form"]').should('be.visible');
  });

  it('Moves the search bar to its original place and removes the scroll to top button', () => {
    cy.get('#scroll-to-top').click();

    cy.wait(2000);

    cy.get('#scroll-to-top').should('not.exist');
    cy.get('[data-cy="form"]').should('have.css', 'position', 'static');
  });
});
