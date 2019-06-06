var taskTitleInput = document.querySelector('.task-title-input');
var taskItemInput = document.querySelector('.task-item-input');
var previewTaskItem = document.querySelector('.preview-task-item');
var previewTaskItemDeleteBtn = document.querySelector('.preview-checkbox-img')
var addPreviewTaskItemBtn = document.querySelector('.add-preview-task-item-btn');
var addPreviewTaskItemBtnImg = document.querySelector('.add-preview-task-item-img')
var addPreviewTaskItemContainer = document.querySelector('.preview-task-items-container');
var addPreviewTaskItems = document.querySelector('.preview-task-items')
var makeTaskListBtn = document.getElementById('make-task-list-btn');
var clearAllBtn = document.getElementById('clear-all-btn');
var cardDisplayArea = document.querySelector('.card-display-area');
var hiddenMsg = document.querySelector('.hidden-msg');
var cardTemplate = document.querySelector('.card-template');


var toDoListArray = JSON.parse(localStorage.getItem('toDoListArray')) || [];


window.addEventListener('load', pageLoadHelper);
clearAllBtn.addEventListener('click', clearAllBtnHelper);
addPreviewTaskItemBtn.addEventListener('click', previewTaskItemHelper);
addPreviewTaskItemContainer.addEventListener('click', deletePreviewTaskItemFromDom);
taskItemInput.addEventListener('keyup', btnsHelper);
taskTitleInput.addEventListener('keyup', btnsHelper);
makeTaskListBtn.addEventListener('click', makeTaskList);
cardDisplayArea.addEventListener('click', toggleCheckBox);
cardDisplayArea.addEventListener('click', cardBtnsHelper);



function toggleCheckBox(e) {
  if(e.target.classList.contains('card-checkbox-img')) {
    var targetCard = findCardId(e);
    var targetTaskId = findTaskIdFromArray(e);
    var targetCardIndex = findCardIndex(targetCard.id);
    console.log("TargetBiotch", targetCardIndex);
    var taskToSelectObj = findTask(targetTaskId, targetCard.tasks);
    targetCard.updateTask(taskToSelectObj);
    console.log("hello", taskToSelectObj);
    toggleCheckBoxOnDom(e, taskToSelectObj);
  };
};

function toggleCheckBoxOnDom(e, taskToSelectObj) {
  if(taskToSelectObj.checked === true) {
    e.target.setAttribute('src', 'images/checkbox-active.svg');
  } else {
    e.target.setAttribute('src', 'images/checkbox.svg');
  };
  toggleCheckBoxStyle(e);
};

function toggleCheckBoxStyle(e) {
  var checkBoxText = e.target.closest('li').querySelector('.task-list-items');
  checkBoxText.classList.toggle('check-box-text-active');
  checkBoxText.classList.toggle('check-box-text-inactive');
  };

function findCardId(e) {
  var cardId = e.target.closest('article').getAttribute('data-id');
  var targetCard = findToDoCard(cardId);
    return targetCard;
  };

function findToDoCard(idOfCard) {
  return toDoListArray.find(function(instanceOfCard) {
    return instanceOfCard.id == idOfCard;
    });
  };

function findTaskIdFromArray(e) {
  var taskId = e.target.closest('li').getAttribute('data-id');
    return taskId;
  };

  function findTask(targetTaskId, targetCardTaskArray) {
    return targetCardTaskArray.find(function(task) {
      return task.taskId == targetTaskId;
    });
  };

  function findCardIndex(targetCard) {
    return toDoListArray.findIndex(function(toDo) {
      return toDo.id === parseInt(targetCard);
    });
  };
  

function pageLoadHelper() {
  disableMakeTaskListBtn();
  repopulateCardsinfo();
  toggleHiddenMsg();
};

function toggleHiddenMsg() {
  if (toDoListArray.length === 0) {
    hiddenMsg.innerText = "Keeping track of all of your ToDos can be a tricky task. Enter a list to be accomplished on the left, and give it a title to get started!";
    hiddenMsg.classList.remove('hidden');
    } else {
      hiddenMsg.innerText = " ";
      hiddenMsg.classList.add('hidden');
    };
};

function repopulateCardsinfo() {
  var existingCards = toDoListArray;
  var freshCardsInfo = existingCards.map(function(cardInfo) {
    return cardInfo = new ToDoList(cardInfo);
  });
    toDoListArray = freshCardsInfo;
    repopulateCards(toDoListArray);
};

function repopulateCards(toDoListArray) {
  toDoListArray.forEach(function(cardInfo) {
    appendToDoListToDom(cardInfo);
  });
};

function previewTaskItemHelper(e) {
  e.preventDefault();
  disableAddPreviewTaskBtn();
  var taskPreviewId = Date.now();
  var taskPreview = taskItemInput.value;
  appendPreviewTaskItem(taskPreviewId, taskPreview);
};

function deletePreviewTaskItemFromDom(e) {
  if (e.target.closest('.preview-checkbox-img')) {
   e.target.closest('.preview-task-item').remove()


function btnsHelper() {
  disableAddPreviewTaskBtn();
  disableMakeTaskListBtn();
  enableClearAllBtn();
};

function disableAddPreviewTaskBtn() {
  if (taskItemInput.value !== '') {
    addPreviewTaskItemBtn.disabled = false;
    addPreviewTaskItemBtn.classList.remove('disabled');
    addPreviewTaskItemBtnImg.classList.remove('disabled');
  } else {
    addPreviewTaskItemBtn.disabled = true;
    addPreviewTaskItemBtn.classList.add('disabled');
    addPreviewTaskItemBtnImg.classList.add('disabled');
  };
};

function disableMakeTaskListBtn() {
  if (addPreviewTaskItems.innerHTML !== '' && taskTitleInput.value !== '') {
    makeTaskListBtn.disabled = false;
    makeTaskListBtn.classList.remove('disabled');
  } else {
    makeTaskListBtn.disabled = true;
    makeTaskListBtn.classList.add('disabled');
  };
};

function disableClearAllBtn() {
    clearAllBtn.disabled = true;
    clearAllBtn.classList.add('disabled');
};

function enableClearAllBtn() {
    clearAllBtn.disabled = false;
    clearAllBtn.classList.remove('disabled');
};

function clearAllBtnHelper() {
  taskTitleInput.value = '';
  taskItemInput.value = '';
  addPreviewTaskItems.innerHTML = '';
  disableClearAllBtn();
};

function makeTaskList() {
    createNewToDoList(); 
    clearAllBtnHelper();
    disableMakeTaskListBtn();
    disableClearAllBtn();
    toggleHiddenMsg()
};

function tasksToObjects() {
  var tasks = document.querySelectorAll('.preview-task-item');
  var taskItems = [];
  tasks.forEach(function(task) {
    var taskItem = {
          taskId: task.dataset.id,
          taskBody: task.innerText,
          checked: false
    }
  taskItems.push(taskItem);
  });
  return taskItems;
};
  
function createNewToDoList() {
  var thisListTitle = taskTitleInput.value;
  var tasksToAppend = tasksToObjects();
  var newToDoList = new ToDoList({
    id: Date.now(),
    title: thisListTitle,
    tasks: tasksToAppend,
    urgency: false
    });
  toDoListArray.push(newToDoList);

  newToDoList.saveToStorage(toDoListArray)
  appendToDoListToDom(newToDoList)

function appendTaskToCard(newToDoList) {
  var sortTasksList = '';
  for (var i = 0; i < newToDoList.tasks.length; i++){
    if(newToDoList.tasks[i].checked === true){
      checkBoxImg = "checkbox-active.svg";
      checkBoxText = "check-box-text-active";
    } else {
      checkBoxImg = "checkbox.svg"
      checkBoxText = "check-box-text-inactive"
    }
    sortTasksList += 

           `<li class="card-task-list" data-id=${newToDoList.tasks[i].taskId}>
              <img src="images/${checkBoxImg}" class="card-checkbox-img" alt="empty checkbox">
              <p class="task-list-items ${checkBoxText}">
            ${newToDoList.tasks[i].taskBody}
              </p>
            </li>`
  } return sortTasksList;
};

function appendToDoListToDom(newToDoList) {
  var urgencyImg = newToDoList ? 'urgent-active.svg' : 'urgent.svg';
  var urgencyBackground = newToDoList ? 'card-template-urgent' :'card-template';
  var urgencyBorderTop = newToDoList ? 'card-title-urgent': 'card-title';
  var urgencyBorderBottom = newToDoList ? 'card-footer-urgent' : 'card-footer';
  var urgencyText = newToDoList ? 'card-footer-text-urgent' : 'card-footer-text';
  var toDoList = 
       `<article class="card-template card-template-urgent" data-id=${newToDoList.id}>
        <h2 class="card-title card-title-urgent">${newToDoList.title}</h2>
        <main class="card-main">
          <ul class="card-tasks">
            ${appendTaskToCard(newToDoList)}
          </ul>
        </main>
        <footer class="card-footer card-footer-urgent">
          <div class="card-urgent-btn"${newToDoList.urgency}>
            <img src="images/${urgencyImg}" class="footer-img card-urgent-btn-img" alt="urgency button">
            <p class="card-footer-text card-footer-text-urgent">${urgencyText}</p>
          </div>
          <div class="card-delete-btn">
            <img src="images/delete.svg" class="footer-img">
            <p class="card-footer-text" id="delete">DELETE</p>
          </div>
        </footer>
      </article>`
      cardDisplayArea.insertAdjacentHTML('beforeend', toDoList);
};

function appendPreviewTaskItem(id, task) {
    var previewToAppend = 
    `<li class="preview-task-item" data-id=${id} >
        <img src="images/delete-list-item.svg" class="preview-checkbox-img" alt="empty preview task item checkbox">
          ${task}
      </li>`
    addPreviewTaskItems.insertAdjacentHTML('beforeend', previewToAppend);
    taskItemInput.value = '';
    disableAddPreviewTaskBtn();
};

function toggleUrgency(e) {
  if (e.target.classList.contains('card-urgent-btn') || e.target.classList.contains('card-urgent-btn-img')) {
    var targetCard = findCardId(e);
    (console.log("targetCard", targetCard))
    targetCard.updateToDo();
    console.log('urgency', targetCard.updateToDo());
    var urgencyImg = targetCard.urgency ? 'images/urgent-active.svg' : 'images/urgent.svg';
    e.target.setAttribute('src', urgencyImg);
    toggleUrgencyStyle(e, targetCard);
  };
};

function toggleUrgencyStyle(e, targetToDoCard) {
  var urgencyCard = e.target.closest('article');
  var urgencyBorderTop = e.target.closest('article').querySelector('.card-title');
  var urgencyBorderBottom = e.target.closest('article').querySelector('.card-footer');
  var urgencyText = e.target.closest('article').querySelector('.card-footer-text');
  urgencyCard.classList.toggle('card-template-urgent');
  urgencyBorderTop.classList.toggle('card-title-urgent');
  urgencyBorderBottom.classList.toggle('card-footer-urgent');
  urgencyText.classList.toggle('card-footer-text-urgent');
};

function cardBtnsHelper(e) {
  toggleUrgency(e);
};

