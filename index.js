const input = document.querySelector('input')
const addButton = document.querySelector('button')
const todosArea = document.querySelector('.todo__items')

let todos = localStorage.getItem('todos')
  ? JSON.parse(localStorage.getItem('todos'))
  : []

addButton.addEventListener('click', () => {
  createTodo()
  renderTodo()
  updateLocalStorage()
})

class Todo {
  constructor(description) {
    this.description = description
    this.completed = false
  }
}

function createTodo() {
  if(input.value){
    todos.push(new Todo(input.value))
  }
}

function renderTodo(){
  todosArea.innerHTML = ''
  todos.forEach((todo, index) => {
    todosArea.innerHTML += createTemplateTodo(todo, index)
    input.value = ''
  })
}

function updateLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todos))
}

const stateChange = index => {
  todos[index].completed = !todos[index].completed
  renderTodo()
  updateLocalStorage()
}

const removeTodo = index => {
  todos.splice(index, 1)
  renderTodo()
  updateLocalStorage()
}

function createTemplateTodo(todo, index) {
  return `
    <div class="todo__item ${todo.completed ? 'checked' : ''}" >
        <h2 class="item__title">${todo.description}</h2>
        <div class="todo__buttons">
            <label>
                <input type="checkbox" class="todo__checkbox" onclick="stateChange(${index})" ${todo.completed ? 'checked' : ''}>
            </label>
            <span class="todo__button" onclick="removeTodo(${index})">&#10006;</span>
        </div>
    </div>
  `
}

renderTodo()