document.addEventListener("DOMContentLoaded", function () {
    const addForm = document.getElementById("add-todo-form");
    const addTextField = document.getElementById("add-todo-text-field");
    const todoList = document.getElementById("todo-list");

    addForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let todoText = addTextField.value.trim();
        addTextField.classList.remove("invalid");

        if (todoText.length === 0) {
            addTextField.classList.add("invalid");
            return;
        }

        const newTodoListItem = document.createElement("li");
        newTodoListItem.classList.add("todo-item");
        todoList.append(newTodoListItem);

        (function setViewMode(){
            newTodoListItem.innerHTML = `                
                <span class="todo-text">${todoText}</span>
                <button type="button" class="edit-button">Редактировать</button>
                <button type="button" class="delete-button">Удалить</button>
            `;

            newTodoListItem.querySelector(".delete-button").addEventListener("click",function (){
                newTodoListItem.remove();
            });

            function editStart(){
                newTodoListItem.innerHTML = `
                    <form class="edit-todo-form">
                        <div>
                            <input class="edit-todo-text-field todo-text">
                            <div class="error-message">Необходимо указать текст</div>
                        </div>                        
                        <button class="save-button">Сохранить</button>
                        <button type="button"  class="cancel-button">Отменить</button>
                    </form>
                `;

                const editField =  newTodoListItem.querySelector(".edit-todo-text-field");
                editField.value = todoText;

                newTodoListItem.querySelector(".cancel-button").addEventListener("click",function (){
                    setViewMode();
                });

                newTodoListItem.querySelector(".edit-todo-form").addEventListener("submit",function (e){
                    e.preventDefault();

                    const changedTodoText = editField.value.trim();
                    editField.classList.remove("invalid");

                    if(changedTodoText.length === 0){
                        editField.classList.add("invalid");
                        return;
                    }

                    todoText = changedTodoText;
                    setViewMode();
                });

                editField.focus();
            }

            newTodoListItem.querySelector(".todo-text").addEventListener("click", editStart);
            newTodoListItem.querySelector(".edit-button").addEventListener("click",editStart);
        })();

        addTextField.value = "";
        addTextField.focus();
    });
});