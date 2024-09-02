const inputBar = document.querySelector('#input-task');

const addTaskButton = document.querySelector('.task-button');

const taskListContainer = document.querySelector('.task_list_container');

const myAryData = JSON.parse(localStorage.getItem('myLocalData')) || [];

function renderList() {
    taskListContainer.innerHTML = '';

    myAryData.forEach((item, index) => {

        const taskBoxDiv = document.createElement('div');
        taskBoxDiv.classList.add('task-box');

        const checkMark = document.createElement('div');
        checkMark.classList.add('check_mark');
        if (myAryData[index].completed) {
            checkMark.classList.add('active');

        }
        checkMark.innerHTML = `<i class="fa-solid fa-check"></i>`;
        const taskName = document.createElement('p');
        taskName.classList.add('task_name');
        taskName.innerText = item.text;
        if (myAryData[index].completed) {
            taskName.classList.add('active');

        }

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.innerText = 'Delete'
        deleteButton.dataset.index = index;

        taskBoxDiv.appendChild(checkMark);
        taskBoxDiv.appendChild(taskName);
        taskBoxDiv.appendChild(deleteButton);

        taskListContainer.appendChild(taskBoxDiv);

        checkMark.addEventListener('click', () => {
            checkMark.classList.toggle('active');
            taskName.classList.toggle('active');

            myAryData[index].completed = checkMark.classList.contains('active');
            localStorage.setItem('myLocalData', JSON.stringify(myAryData));

        })


        deleteButton.addEventListener('click', (e) => {
            e.preventDefault();
            const index = e.currentTarget.dataset.index;
            const delPass = "Jstar123";
            const userInput = prompt('Enter password')
            if (userInput == delPass) {

                myAryData.splice(index, 1);
                localStorage.setItem('myLocalData', JSON.stringify(myAryData));
                renderList();
            } else {
                alert('Wrong!! try again')
            }

        });
    });

};

renderList();

addTaskButton.addEventListener('click', (e) => {
    e.preventDefault();
    const inputValue = inputBar.value.trim();
    if (inputValue != '') {

        if (myAryData.some(item => item.text == inputValue)) {
            alert('This Task is already added')
        } else {

            myAryData.push({ text: inputValue, completed: false });
            localStorage.setItem('myLocalData', JSON.stringify(myAryData));
            inputBar.value = '';
            renderList();
        }
    } else {
        alert('Please add a Task')
    }
})



