//main.js file should contain all DOM related javascript

//Query Selectors//

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
var filterByUrgencyBtn = document.getElementById('filter-btn');
var cardDisplayArea = document.querySelector('.card-display-area');
var hiddenMsg = document.querySelector('.hidden-msg');
var cardTemplate = document.querySelector('.card-template');
var cardTemplateUrgent = document.getElementById('card-template-urgent');
var cardTitle = document.querySelector('.card-title');
var cardTitleUrgent = document.getElementById('card-title-urgent');
var cardMain = document.querySelector('.card-main');
var cardTaskList = document.querySelector('card-task-list');
var cardFooter = document.querySelector('.card-footer');
var cardUrgentBtn = document.querySelector('.card-urgent-btn');
var cardDeleteBtn = document.querySelector('.card-delete-btn');



//task List Array 
var taskListArray = [];
var toDoListArray = JSON.parse(localStorage.getItem('toDoListArray')) || [];


//Event Listeners

window.addEventListener('load', pageLoadHelper);
addPreviewTaskItemBtn.addEventListener('click', previewTaskItemHelper);
addPreviewTaskItemContainer.addEventListener('click', deletePreviewTaskItemFromDom);
taskItemInput.addEventListener('keyup', disableAddPreviewTaskBtn);
taskTitleInput.addEventListener('keyup', disableMakeTaskListBtn);
makeTaskListBtn.addEventListener('click', makeTaskList);
clearAllBtn.addEventListener('click', clearAllBtnHelper);
// taskItemInput.addEventListener('keyup', disableAddPreviewTaskBtn)




//functions


function pageLoadHelper() {
  disableMakeTaskListBtn()
  repopulateCardsinfo()
};

 
function repopulateCardsinfo() {
  var existingCards = toDoListArray;
  console.log("existingInfo", existingCards);
  var freshCardsInfo = existingCards.map(function(cardInfo) {
   return cardInfo = new ToDoList(cardInfo);

  });
    console.log("reload", freshCardsInfo)
    toDoListArray = freshCardsInfo;
    repopulateCards(toDoListArray);
};

function repopulateCards(toDoListArray) {
  toDoListArray.forEach(function(cardInfo) {
    appendToDoListToDom(cardInfo);
  });
};

  //check todolist array from local storage and reinstantiate that array
  //reappend cards to dom by passing the reinstatiated array info to createToDoList()
  //run hiddenMsgHelper()
  //ensure fields are empty and buttons are disabled

function previewTaskItemHelper(e) {
  e.preventDefault()
  disableAddPreviewTaskBtn()
  var taskPreviewId = Date.now()
  var taskPreview = taskItemInput.value
  appendPreviewTaskItem(taskPreviewId, taskPreview)
};


function appendPreviewTaskItem(id, task) {
    var previewToAppend = 
    `<li class="preview-task-item" data-id=${id} >
        <img src="images/delete-list-item.svg" class="preview-checkbox-img" alt="empty preview task item checkbox">
          ${task}
      </li>`
    addPreviewTaskItems.insertAdjacentHTML('beforeend', previewToAppend);
    taskItemInput.value = '';
    disableAddPreviewTaskBtn()
};


function deletePreviewTaskItemFromDom(e) {
  if(e.target.closest('.preview-checkbox-img')) {
   e.target.closest('.preview-task-item').remove()
  };
};


function disableAddPreviewTaskBtn() {
if (taskItemInput.value !== '') {
    addPreviewTaskItemBtn.disabled = false;
    addPreviewTaskItemBtn.classList.remove('disabled')
    addPreviewTaskItemBtnImg.classList.remove('disabled')
  } else {
    addPreviewTaskItemBtn.disabled = true;
    addPreviewTaskItemBtn.classList.add('disabled')
    addPreviewTaskItemBtnImg.classList.add('disabled')
  };
  disableMakeTaskListBtn()
};


function disableMakeTaskListBtn() {
  
if (addPreviewTaskItems.innerHTML !== '' && taskTitleInput.value !== '') {
    makeTaskListBtn.disabled = false;
    makeTaskListBtn.classList.remove('disabled')
  } else {
    makeTaskListBtn.disabled = true;
    makeTaskListBtn.classList.add('disabled')
  };
};

function clearAllBtnHelper() {
if (addPreviewTaskItems.innerHTML !== '' || taskTitleInput.value !== '') {
    clearAllBtn.disabled = false;
    clearAllBtn.classList.remove('disabled')
  } else if (taskTitleInput.value !== '') {
    clearAllBtn.disabled = false;
    clearAllBtn.classList.remove('disabled')
  } else {
    clearAllBtn.disabled = true;
    clearAllBtn.classList.add('disabled')

  }
};


function makeTaskList() {
    createNewToDoList() 
    taskTitleInput.value = '';
    addPreviewTaskItems.innerHTML = '';
}

function tasksToObjects() {
  var tasks = document.querySelectorAll('.preview-task-item')
  var taskItems = [];
  tasks.forEach(function(task) {
    var taskItem = {
          taskID: task.dataset.id,
          taskBody: task.innerText,
          checked: false
    }
    taskItems.push(taskItem);
  });
  console.log("item-variable", taskItems);
  return taskItems
  };
  

function createNewToDoList() {
  var thisListTitle = taskTitleInput.value;
  console.log("tiittle", thisListTitle)
  var tasksToAppend = tasksToObjects();
  console.log("BOYA", tasksToAppend)
  var newToDoList = new ToDoList({
    id: Date.now(),
    title: thisListTitle,
    tasks: tasksToAppend,
    urgency: false
    });
  console.log("hiiii", newToDoList)
  toDoListArray.push(newToDoList);
  newToDoList.saveToStorage(toDoListArray)
  appendToDoListToDom(newToDoList)
}

function appendTaskToCard(newToDoList) {
  var sortTasksList = '';
  for (var i = 0; i < newToDoList.tasks.length; i++){
    sortTasksList += 
            `<img src="images/checkbox.svg" class="card-checkbox-img" alt="empty checkbox">
            <li class="card-task-list" data-id=${newToDoList.tasks[i].id}>
            ${newToDoList.tasks[i].taskBody}</li>`
            console.log("TASK", newToDoList.tasks[i].taskBody)
  } return sortTasksList;
}

function appendToDoListToDom(newToDoList) {
  console.log("HIYO", toDoListArray)
   var toDoList = 
       `<article class="card-template" id="card-template-urgent" data-id=${newToDoList.id}>
        <h2 class="card-title" id="card-title-urgent">${newToDoList.title}</h2>
        <main class="card-main">
          <ul class="card-tasks">
            ${appendTaskToCard(newToDoList)}
          </ul>
        </main>
        <footer class="card-footer" id="card-footer-urgent">
          <div class="card-urgent-btn"${newToDoList.urgency}>
            <img src="images/urgent.svg" class="footer-img" alt="urgency button">
            <p class="card-footer-text" id="card-footer-text-urgent">URGENT</p>
          </div>
          <div class="card-delete-btn">
            <img src="images/delete.svg" class="footer-img">
            <p class="card-footer-text" id="delete">DELETE</p>
          </div>
        </footer>
      </article>`

      cardDisplayArea.insertAdjacentHTML('beforeend', toDoList)
      // appendCardHelper(cardsToAppend); 
  };



  // function appendCardHelper(toDoListArray) {
  //   toDoListArray.forEach(function(toDoList){
  //       return cardDisplayArea.insertAdjacentHTML('beforeend', toDoList)
  //   })    
  // };





  
//   var cardToAppend =
//        `<article class="card-template" id="card-template-urgent" data-id=${toDoListArray.id}>
//         <h2 class="card-title" id="card-title-urgent">${toDoListArray.title}</h2>
//         <main class="card-main">
//           <ul class="card-tasks">
//             <img src="images/checkbox.svg" class="card-checkbox-img" alt="empty checkbox">
//             <li class="card-task-list">
//             ${toDoListArray.tasks.forEach(function(task){return task[this.tasks.forEach(function(task){return task[this.tasks]})]})}</li>
//           </ul>
//         </main>
//         <footer class="card-footer" id="card-footer-urgent">
//           <div class="card-urgent-btn"${newToDoList.urgency}>
//             <img src="images/urgent.svg" class="footer-img" alt="urgency button">
//             <p class="card-footer-text" id="card-footer-text-urgent">URGENT</p>
//           </div>
//           <div class="card-delete-btn">
//             <img src="images/delete.svg" class="footer-img">
//             <p class="card-footer-text" id="delete">DELETE</p>
//           </div>
//         </footer>
//       </article>`
//       cardDisplayArea.insertAdjacentHTML('beforeend', cardToAppend )
// }






//Data Model:
  //A to-do list has an id, title, tasks, and urgent property.
    // to-do list is an object with the properties listed above. 
      // The id property should be a unique identifier
          // use date.now()
      //title is a string
        //title = TitleText.innerText ( which is pulled with a query selector on class="task-title-input")
      //urgent is a boolean
        //urgentStatus = True || False  ( default of false)
      //tasks should be an array of objects
        //var tasks = []
          // var task = {}
              //need to be able to identify each task from one another
              // push task objects into an array of tasks, one tasks array for each card / to-do list


        //Each task in the array should be an object 
                 // will need to create a class to instantiate each instance of this object with it's properties
            //1.you'll need a way to identify these objects
                // create a date.now on this instance to identify. 
            //2.track whether the task has been completed
                // true or default false for the values of a key property of taskCompleted. 
            //3.and store the task's text..
                //use the method on this class to store the text into local storage
                //saveToStorage method
                //deleteFromStorage method
                //will need to store as a variable and have that variable set to the inner text of the list item 
                //will have to be able to clear/delete that item // removing it completely from the dom

  //Each to-do list on the page should be created as an instance of the ToDoList class

//Phase One:
  //When a user adds a new Task Item:
    // 1. The task is added to the bottom of the checklist between the Task Title and Task Item inputs 

            //will need to pass the variable of TaskTitle to the ToDoList Class 
            // Each potentialTaskItem will have to go into the class of potentialTaskItems before that array of potentialTaskItems can be passed as an argument as -tasksArray- to the NewInstantiation of ToDoList for the parameter associated with tasks



    // 2. Each task on the checklist should also be able to be removed by clicking the respective "delete" button.

            //need to add a query selector for the img on the left associated with where the user can potentially click to delete the individual task.
            //when clicked it should invoke the delete method on that object of task // clear that space entirely



    // 3. It should not add a task to the checklist if the input is empty.
            //will need a conditional that will not allow an empty string in the input to allow it to render to dom or instatitate itself




    // 4. Tasks on the checklist of the form DO NOT NEED TO PERSIST
          //when the card is created to the DOM, this entire array can be cleared. 

  //When a user clicks Make Task List: 
    //1. A new card with the provided title and tasks should appear in the todo list.
    //2. The text fields and checklist in the form should be cleared and ready to accept a new todo 
    //3. The Make Task List button should be disabled if either the title input or checklist is empty
    //4. The page should not reload.
    //5. The todo card should be persisted. It should still be present upon reloading the page. 
    //6. The todo should be added to localStorage using the saveToStorage method defined in the ToDoList Class

    //When a user clicks Clear All:
      //1. Both the title input and list of tasks should be cleared. 
      //2. The Clear ALl button should be disabled if both the title input and checklist are empty. 


  //Phase Two: Completing The MVP (Minimum Viable Product)
    //Checking Off A Task 
      //After a user has completed a task on their checklist, they should be able to check it off
          //1. There should be a visual cue so that the user knows what they have completed and what is left to do 
          //2. Tasks that are checked off should persist upon reloading the page. 
          //3. The update of the data model should occur in the updateTask method that is defined in the ToDoList class
          //4. How the DOM gets updated using javascript should happen in the main.js file

     //Deleting an Existing ToDo Card
        // After creating a todo card, the user should be able to remove it once they have completed their checklist. 
          //1.Each todo card on the todo list should have a button to remove it from both the data model and the DOM
          //2. The "Delete" button should only be enabled if all of the tasks on the checklist have been checked off
          //3. Upon clicking the "Delete" button, the appropriate todo list should be removed from the DOM 
          //4. The update of the data model should happen in the deleteFromStorage method that is defined in the ToDoList class
          //5. How the DOM gets updated using javascript should happen in the main.js file. 

     // Marking a ToDo Card Urgent
        // A user should be able to mark their todo cards urgent so that they know which they need to complete first. 
          //1. When the user clicks on the Urgent button, the button should stay in the active state. 
          //2. ToDo cards that are marked as urgent should persist upon reloading the page. 
          //3. This update of the data model should occur in the updateToDo method that is defined in the ToDoList class. 
          //4. How the DOM gets updated using javascript should happen in the main.js


