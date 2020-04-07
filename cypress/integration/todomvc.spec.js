function initTodos(...todos){
    todos.forEach((todo) => {
        cy.get('.new-todo').type(todo+'{enter}')
    })
}

function checkTodoListSize(size){
    cy.get('.todo-list li').should('have.length',size)
}

function initTwoTodosOneActiveAndOneCompleted(){
    initTodos('Clean room','Go for a walk')
    cy.get('.toggle').first().click()
    cy.get('.todo-list li').first().should('have.class', 'completed')
}

function showTodoListByCategory(category){
    cy.get('.filters li a').contains(category).click()
}

describe('todoMvc Tests', () => {
    beforeEach(() => {
        cy.visit('http://todomvc.com/examples/jquery/#/all')
    })

    it('should add a new todo', () => {
        cy.get('.todo-list li').should('not.exist')

        initTodos('Clean room')

        checkTodoListSize(1)
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
        initTwoTodosOneActiveAndOneCompleted()

        showTodoListByCategory('All')

        checkTodoListSize(2)
    })

    it('should show active todos', () => {
        initTwoTodosOneActiveAndOneCompleted()

        showTodoListByCategory('Active')

        checkTodoListSize(1)
    })

    it('should show completed todos', () => {
        initTwoTodosOneActiveAndOneCompleted()

        showTodoListByCategory('Completed')

        checkTodoListSize(1)
        cy.get('.toggle').should('be.checked')
    })

    it('should clear completed todos', () => {
        initTwoTodosOneActiveAndOneCompleted()

        cy.get('.clear-completed').click()

        checkTodoListSize(1)
        cy.get('.view > label').should('have.text', 'Go for a walk')
    })

})

