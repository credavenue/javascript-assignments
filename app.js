'use strict';
const inputEle = document.getElementById('itemInput');
const addBtn = document.getElementById('addBtn');
const listEle = document.getElementById('todoList');
const completedListEle = document.getElementById('completedList');
const items = [];
var width=510;
const completedItems = [];
var flag=false;
listEle.addEventListener('click', (event) => {modifyList(event, false)});
listEle.addEventListener('change', completeList);
completedListEle.addEventListener('click', (event) => {modifyList(event, true)});


function addItem() {
    const item = inputEle.value;
	if(item)
    items.push(item);
    if(items.length+completedItems.length>3){
		width=width+30;
    	document.getElementById('main').style.height = width+"px"
    }
    
    inputEle.value = '';
	flag=true;
	flag=true;
    printList(items, false);
}

function printList(items, complete){
    if(complete) completedListEle.innerHTML = '';
    else listEle.innerHTML = '';
    for(const item in items) {
        const liEle  = document.createElement('li');
        const inputEle = document.createElement('input');
        const checkEle = document.createElement('input');
        const editBtn = document.createElement('button');
        const deleteBtn = document.createElement('button');
        editBtn.innerText = 'Edit';
        editBtn.id = (complete) ? item + '-editComplete' : item + '-edit';
        deleteBtn.innerText = 'Delete';
        deleteBtn.id = (complete) ? item + '-deleteComplete' : item + '-delete';
        inputEle.value = items[item];
        inputEle.id = (complete) ? item + '-inputComplete' : item + '-input';
        inputEle.type = 'text';
        inputEle.disabled = true;
        checkEle.type = 'checkbox';
        checkEle.checked = complete;
        checkEle.id = (complete) ? item + '-checkComplete' : item + '-check';
        liEle.appendChild(checkEle);
        liEle.appendChild(inputEle);
        liEle.appendChild(editBtn);
        liEle.appendChild(deleteBtn);
        if(!complete) {
            listEle.appendChild(liEle);
			
        } else {
            inputEle.setAttribute('class', 'strike');
            completedListEle.appendChild(liEle);
        }
        
    }
}

function modifyList(event, completed) {
    if(event.target.tagName !== 'BUTTON') return;
    const actionType = event.target.id;
    const elementId = actionType.split('-')[0];
    if(actionType.indexOf('edit') !== -1){
        if(event.target.innerText.indexOf('Edit') !== -1)
            editItem(elementId, event.target, completed);
        else 
            saveItem(elementId, event.target, completed);
    } 
    else if(actionType.indexOf('delete') !== -1)
        deleteItem(elementId, completed);
    
}

function completeList (event) {
    if(event.target.type !== 'checkbox')return;
    const elementId = event.target.id;
    const index = elementId.split('-')[0];
    const inputEle = document.getElementById(index + '-input');
    inputEle.setAttribute('class', 'strike');
    const completedItem = items.splice(parseInt(index),1);
    completedItems.push(completedItem);
    printList(items, false);
    printList(completedItems, true);
}

function editItem(id, ele, completed){
    let currentInput, editBtn;
    if(completed){
        currentInput = document.getElementById(id+ '-inputComplete');
        editBtn = document.getElementById(id + '-editComplete');
    }else  {
        currentInput = document.getElementById(id+ '-input');
        editBtn = document.getElementById(id + '-edit');
    }
        
    currentInput.removeAttribute('disabled');
    editBtn.innerText = 'Save';

}

function deleteItem(id, completed) {
    if(!completed) {
        items.splice(parseInt(id), 1);
        printList(items, false);    
    } else {
        completedItems.splice(parseInt(id), 1);
        printList(completedItems, true);
    }
	 if(items.length+completedItems.length>3){
		width=width-30;
    	document.getElementById('main').style.height = width+"px"
    }
}

function saveItem(id, ele, completed) {
    let currentInput;
    if(completed) {
        currentInput = document.getElementById(id+ '-inputComplete');
    } else {
        currentInput = document.getElementById(id+ '-input');
    }
    const newVal = currentInput.value;
    if(!completed) items[id] = newVal;
    else completedItems[id] = newVal;
    ele.innerText = 'Edit';
    currentInput.setAttribute('disabled', 'disabled');
}

function showTestResults(){
    const mochaDiv = document.getElementById('mocha');
    const classNames = mochaDiv.getAttribute('class');
    if(!classNames || classNames.length === 0) mochaDiv.setAttribute('class', 'hide')
    else mochaDiv.removeAttribute('class')
}
