//main.js file should contain all DOM related javascript

//Query Selectors//
//


//Data Model:
  //A to-do list has an id, title, tasks, and urgent property.
      // The id property should be a unique identifier
      //title is a string
      //urgent is a boolean
      //tasks should be an array of objects

        //Each task in the array should be an object
            //1.you'll need a way to identify these objects
            //2.track whether the task has been completed
            //3.and store the task's text..

  //Each to-do list on the page should be created as an instance of the ToDoList class

//Phase One:
  //When a user adds a new Task Item:
    // 1. The task is added to the bottom of the checklist between the Task Title and Task Item inputs 
    // 2. Each task on the checklist should also be able to be removed by clicking the respective "delete" button.
    // 3. It should not add a task to the checklist if the input is empty.
    // 4. Tasks on the checklist of the form DO NOT NEED TO PERSIST

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


