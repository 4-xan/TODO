const textarea = document.querySelector('textarea')
const addBtn = document.getElementById('addBtn')
const tc = document.querySelector('.tc')

let todoList = []

function initialLoad(){
    if(!localStorage.getItem('todo')) {return}
    todoList = JSON.parse(localStorage.getItem('todo')).todoList
    updateUI()
}

initialLoad()

function addTodo() {
    const todo = textarea.value
    if(!todo){return}

    console.log('Add todo : ', todo)
    todoList.push(todo)
    textarea.value = '' //reset to empty
    updateUI()
}

function editTodo(index) {
    textarea.value = todoList[index]
    todoList = todoList.filter((element, elementIndex) => {
        if (index === elementIndex) {return false}
        return true
    })

    updateUI()
}

function deleteTodo(index) {
    todoList = todoList.filter((element, elementIndex) => {
        if (index === elementIndex) {return false}
        return true
    })

    updateUI()
}

function updateUI() {

    let newInnerHTML = ''
    todoList.forEach((todoElement, todoIndex) => {
        newInnerHTML += `
        <div class="todo">
            <p>${todoElement}</p>
                <div class="bc">
                    <button class="ib" onclick="editTodo(${todoIndex})"><i class="fa-solid fa-pen"></i></button>
                    <button class="ib" onclick="deleteTodo(${todoIndex})"><i class="fa-solid fa-xmark"></i></button>
                </div>
        </div>
        `
    })

    tc.innerHTML = newInnerHTML

    //save to local storage
    localStorage.setItem('todo', JSON.stringify({todoList}))
}

addBtn.addEventListener('click', addTodo)