
import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

Given('user performs get operation to retrieve multiple users', (table) => {
    let i = 0;
    table.hashes().forEach(tableDataRow => {
    //const url = `${Cypress.env('URL')}${tableDataRow.uri}`

    const url = Cypress.env('URL') + tableDataRow.uri;
    
    cy.request('GET', url).as('multipleUsers')

        cy.get('@multipleUsers').should((response) => {
            assert.equal(response.body.data[i].email, tableDataRow.email)
            assert.equal(response.body.data[i].first_name, tableDataRow.firstname)
            assert.equal(response.body.data[i].last_name, tableDataRow.lastname)
            assert.equal(response.body.data[i].avatar, tableDataRow.avatar)
            assert.equal(response.status, tableDataRow.statuscode)
            i = i + 1;
           

        });
    });
});

Given(/^user performs get operation to retrieve a single user$/, (table) => {

    table.hashes().forEach(tableDataRow => {
    const url = `${Cypress.env('URL')}${tableDataRow.uri}`
    
    cy.request('GET', url).as('singleUser')

        cy.get('@singleUser').should((response) => {
            assert.equal(response.body.data.email, tableDataRow.email)
            assert.equal(response.body.data.first_name, tableDataRow.firstname)
            assert.equal(response.body.data.last_name, tableDataRow.lastname)
            assert.equal(response.body.data.avatar, tableDataRow.avatar)
            assert.equal(response.status, tableDataRow.statuscode)
           

        });
    });
});


Given(/^user performs post operation to create a user$/, (table) => {

    table.hashes().forEach(tableDataRow => {
    const url = `${Cypress.env('URL')}${tableDataRow.uri}`
    
    cy.request('POST', url, tableDataRow.payload).as('newCreatedUser')

        cy.get('@newCreatedUser').should((response) => {
            assert.equal(response.status, tableDataRow.statuscode)
            assert.isNotEmpty(response.body.createdAt)          
          
        });
    });
});

Given(/^user performs put operation to update a user$/, (table) => {

    table.hashes().forEach(tableDataRow => {
    const url = `${Cypress.env('URL')}${tableDataRow.uri}`
    
    cy.request('PUT', url, tableDataRow.payload).as('updatedOldUser')

        cy.get('@updatedOldUser').should((response) => {
            assert.equal(response.status, tableDataRow.statuscode)            
            assert.isNotEmpty(response.body.updatedAt)        
          
        });
    });
});

Given(/^user performs patch operation to update a user$/, (table) => {

    table.hashes().forEach(tableDataRow => {
    const url = `${Cypress.env('URL')}${tableDataRow.uri}`
    
    cy.request('PATCH', url, tableDataRow.payload).as('updatedOldUser')

        cy.get('@updatedOldUser').should((response) => {
            assert.equal(response.status, tableDataRow.statuscode)            
            assert.isNotEmpty(response.body.updatedAt)        
          
        });
    });
});

Given(/^user performs delete operation to delete a user$/, (table) => {

    table.hashes().forEach(tableDataRow => {
    const url = `${Cypress.env('URL')}${tableDataRow.uri}`
    
    cy.request('DELETE', url).as('deleteUser')

        cy.get('@deleteUser').should((response) => {
            assert.equal(response.status, tableDataRow.statuscode)                    
          
        });
    });
});

Given(/^user performs get operation and verify data from fixture$/, () => {

    cy.fixture('/data/userdata').then((data) => {
        cy.log(data.uri)
        const url = `${Cypress.env('URL')}${data.uri}`
        cy.log("First URL")
        cy.log(url)
    
        // const str = Cypress.env('URL') + data.uri;
        // cy.log("Second URL")
        // cy.log(str)
    
        cy.request('GET', url).as('singleUser')

        cy.get('@singleUser').then((response) => {
            expect(response.status).to.eq(200)	
            assert.equal(response.body.data.first_name,data.first_name)
            assert.equal(response.body.data.last_name,data.last_name)
            assert.equal(response.body.data.email,data.email)
    
        });

    });

});