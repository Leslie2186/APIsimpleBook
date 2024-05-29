//const { expect } = require("chai");

describe('CRUD complet API Simple Book', () => {
  let token = null;
  let infoOrderId = "";

  before(() => {
    cy.request({
      method: "POST", 
      url: "https://simple-books-api.glitch.me/api-clients/",
      body: {
        "clientName": "Toto",
        "clientEmail": "totoTesteur17@gmail.com"
      }
    }).then((response) => {
      expect(response.status).eq(201);
      token = response.body.accessToken;
    })
  });

  it('GET Status', () => {
    cy.request({
      method: "GET", 
      url: "https://simple-books-api.glitch.me/status",
    }).then(response => {
      expect(response.status).eq(200);
    });
  });

  it('GET books', () => {
    cy.request({
      method: "GET", 
      url: "https://simple-books-api.glitch.me/books",
    }).then(response => {
      expect(response.status).eq(200);
    });
  });

  it('GET a book', () => {
    cy.request({
      method: "GET", 
      url: "https://simple-books-api.glitch.me/books/2",
    }).then(response => {
      expect(response.status).eq(200);
      expect(response.body).to.have.property("id", 2);
      expect(response.body).to.have.property("name", "Just as I Am");
    });
  });

  it('POST books', () => {
    cy.request({
      method: "POST", 
      url: "https://simple-books-api.glitch.me/orders",
      headers:{
        Authorization: `Bearer ${token}`
      },
      body: {
        "bookId": 1,
        "customerName": "Toto"
      }
    }).then(response => {
      expect(response.status).eq(201);
      expect(response.body).to.have.property("orderId");
      infoOrderId = response.body.orderId;
    });
  });

  it('PATCH books', () => {
    cy.request({
      method: "PATCH", 
      url: `https://simple-books-api.glitch.me/orders/${infoOrderId}`,
      headers:{
        Authorization: `Bearer ${token}`
      },
      body: {
        "customerName": "John"
      }
    }).then(response => {
      expect(response.status).eq(204);
    });
  });

  it('DELETE books', () => {
    cy.request({
      method: "DELETE", 
      url: `https://simple-books-api.glitch.me/orders/${infoOrderId}`,
      headers:{
        Authorization: `Bearer ${token}`
      },
    }).then(response => {
      expect(response.status).eq(204);
    });
  });
});