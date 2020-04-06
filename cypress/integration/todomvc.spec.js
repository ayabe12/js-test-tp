/// <reference types="Cypress" 

function initTodos(...todos){
    for(var i=0;i<todos.length;i++){
        cy.get('.new-todo').type(todos[i]+'{enter}')
    }
}

describe('todoMvc Tests', () => {
    beforeEach(() => {
        cy.visit('http://todomvc.com/examples/jquery/#/all')
    })

    it('should add a new todo', () => {
        cy.get('.todo-list li').should('not.exist')
        
        initTodos('Clean room')

        cy.get('.todo-list li').should('have.length',1)
        cy.get('.view').find('label').should('have.text', 'Clean room')
        cy.get('.toggle').should('not.be.checked')
    })

    it('should delete a todo', () => {
        initTodos('Do homework')

        cy.get('.destroy').click({ force: true })
        
        cy.get('.todo-list li').should('not.exist')
    })

    it('should delete all todos', () => {
        initTodos('Clean room','Go for a walk')

        cy.get('.toggle-all').click({force : true})
        cy.get('.clear-completed').click()
        
        cy.get('.todo-list li').should('not.exist')
    })

    
    it('should show all todos', () => {
        initTodos('Clean room','Go for a walk')
        cy.get('.toggle').eq(0).click()
        cy.contains('.todo-list li').eq(0).should('have.class', 'completed')

        cy.get('a').contains('All').click()
        
        cy.get('.todo-list li').should('have.length',2)
    })
    it('should show active todos', () => {
        initTodos('Clean room','Go for a walk')
        cy.get('.toggle').eq(0).click()
        cy.get('.todo-list li').eq(0).should('have.class', 'completed')
 
        cy.get('a').contains('Active').click()
 
        cy.get('.todo-list li').should('have.length',1)
    })
 
    it('should show completed todos', () => {
        initTodos('Clean room','Go for a walk')
        cy.get('.toggle').eq(0).click()
        cy.get('.todo-list li').eq(0).should('have.class', 'completed')
 
        cy.get('a').contains('Completed').click()
 
        cy.get('.todo-list li').should('have.length',1)
        cy.get('.toggle').should('be.checked')
    })

    
})