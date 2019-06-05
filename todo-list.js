class ToDoList {
  constructor(obj) {
    this.id = obj.id;
    this.title = obj.title;
    this.tasks = obj.tasks || [];
    this.urgency = obj.urgency || false; 
  };

  saveToStorage(ToDoLists) {
    localStorage.setItem('toDoListArray', JSON.stringify(ToDoLists));
  };

  deleteFromStorage() {

  };

  updateToDo() {
    //(should update the todo's title and urgency)

  };

  updateTask() {
    //(should update a task's content and if it has been completed)
  };
};


