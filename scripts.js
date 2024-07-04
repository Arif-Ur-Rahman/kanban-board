document.addEventListener('DOMContentLoaded', (event) => {
    let tasks = document.querySelectorAll('.task');
    let columns = document.querySelectorAll('.column');
    let addTaskButton = document.getElementById('add-task-button');
    let newTaskInput = document.getElementById('new-task-input');
    let assigneeInput = document.getElementById('assignee-input');

    addTaskButton.addEventListener('click', addTask);

    tasks.forEach(task => {
        task.addEventListener('dragstart', dragStart);
        task.addEventListener('dragend', dragEnd);
    });

    columns.forEach(column => {
        column.addEventListener('dragover', dragOver);
        column.addEventListener('drop', drop);
    });

    function addTask() {
        let taskText = newTaskInput.value;
        let assignee = assigneeInput.value;

        if (taskText.trim() === "") {
            alert("Task cannot be empty");
            return;
        }

        let task = document.createElement('div');
        task.classList.add('task');
        task.draggable = true;
        task.textContent = taskText;
        if (assignee) {
            let assigneeElement = document.createElement('div');
            assigneeElement.classList.add('assignee');
            assigneeElement.textContent = `Assigned to: ${assignee}`;
            task.appendChild(assigneeElement);
        }
        task.addEventListener('dragstart', dragStart);
        task.addEventListener('dragend', dragEnd);

        document.getElementById('todo').appendChild(task);
        newTaskInput.value = '';
        assigneeInput.value = '';
    }

    function dragStart(event) {
        event.dataTransfer.setData('text/plain', event.target.id);
        setTimeout(() => {
            event.target.classList.add('hide');
        }, 0);
    }

    function dragEnd(event) {
        event.target.classList.remove('hide');
    }

    function dragOver(event) {
        event.preventDefault();
    }

    function drop(event) {
        event.preventDefault();
        let id = event.dataTransfer.getData('text/plain');
        let task = document.querySelector('.hide');
        if (event.target.classList.contains('column')) {
            event.target.appendChild(task);
        } else {
            event.target.closest('.column').appendChild(task);
        }
        task.classList.remove('hide');
    }
});
