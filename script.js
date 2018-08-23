let todoList = JSON.parse(localStorage.getItem('allItems'));
let taskinput = document.getElementById('input');
let maxlenghtinp= 20;
taskinput.setAttribute('maxlength', maxlenghtinp);
let list = document.getElementById('list');

//options for sorting by date (reverse)
let options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
};

if (todoList) {
    open();
}

function open() {
    todoList.forEach(function (element, i) {
        let div = document.createElement('div');
        let p = document.createElement('p');
        let taskname = document.createElement('p');
        let h2 = document.createElement('h2');
        div.setAttribute('id', i);
        div.setAttribute('class', 'todo');
        taskname.setAttribute('class','todo-p');
        p.innerText = element.date;
        h2.innerText = element.text;
        h2.setAttribute('id', 'text-task');
        let deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete';
        let editButton = document.createElement('button');
        editButton.innerText = 'Edit';

        taskname.append(h2);
        div.append(taskname);
        list.append(div);
        div.append(deleteBtn);
        div.append(editButton);
        div.append(p);

        deleteBtn.onclick = function (e) {
            e.target.parentNode.remove();
            todoList.splice(parseInt(e.target.parentNode.id), 1);
            localStorage.setItem('allItems', JSON.stringify(todoList));
            window.location.reload();
        };

        editButton.onclick = function (e) {
            let editDiv = document.createElement('div');
            let input = document.createElement('input');
            let saveButton = document.createElement('button');
            let editId = e.target.parentNode.id;
            input.setAttribute('class', 'input');
            editDiv.setAttribute('class', 'edit');
            console.log(e.target.parentNode);
            // console.log(e.target.parentNode.childNodes[0].innerText);
            input.value = e.target.parentNode.childNodes[0].innerText;

            saveButton.innerText = 'Save';

            editDiv.append(input);
            editDiv.append(saveButton);

            list.replaceChild(editDiv, e.target.parentNode);

            saveButton.onclick = function () {
                e.target.parentNode.childNodes[0].innerText = input.value;
                list.replaceChild(e.target.parentNode, editDiv);
                todoList[editId].text = input.value;
                localStorage.setItem('allItems', JSON.stringify(todoList));
            };
        };
    })
}

function addTask() {
    if (!taskinput.value) {
        alert('input can\'t be empty');
        return;
    }

    if (!todoList) {
        todoList = [];
    }

    let todo = {
        text: taskinput.value,
        date: new Date().toLocaleString("en", options)
    };

    todoList.push(todo);

    localStorage.setItem('allItems', JSON.stringify(todoList));
    window.location.reload();
}

function reverse() {
    todoList.reverse();
    localStorage.setItem('allItems', JSON.stringify(todoList));
    window.location.reload();
}

let button = document.getElementById('button');
let reverseButton = document.getElementById('reverseButton');
reverseButton.addEventListener('click', reverse);
button.addEventListener('click', addTask);

let searchBtn = document.getElementById('searchbtn');
searchBtn.setAttribute('class' , 'search-btn');

function searchTask() {
    let inputsearch = document.getElementById("searchbtn");

    searchBtn.onclick = function () {
        let filter = inputsearch.value.toUpperCase();
        let p = list.getElementsByTagName("p")[0].innerHTML.toUpperCase() ;
        for (i = 0; i < p.length; i++) {
            let h2 = p.getElementsByTagName('h2')[0];
            if (h2.indexOf(filter) > -1) {
                p[i].style.display= '';
            } else {
                debugger;
                p[i].style.display = "none";
            }
        }
    };
}
// function searchTask() {
//     let inputsearch = document.getElementById("searchbtn");
//
//     searchBtn.onclick = function () {
//         let filter = inputsearch.value.toUpperCase();
//         let h2 = document.getElementsByTagName("h2")[0].innerHTML.toUpperCase() ;
//         console.log(h2);
//
//         for (i = 0; i < h2.length; i++) {
//             if (h2.indexOf(filter) > -1) {
//                 h2[i].style.display = "";
//             } else {
//                 h2[i].style.display = "none";
//             }
//         }
//     };
// }
searchBtn.addEventListener('click', searchTask);

function compareName(taskA, taskB) {
    return taskA.text.localeCompare(taskB.text);
}
todoList.sort(compareName);

for(var i = 0; i < todoList.length; i++) {
    alert(todoList[i].text);

}