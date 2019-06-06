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
    this.urgency = !this.urgency;
    this.saveToStorage(toDoListArray);
    return "YOU MADE IT"
  };

  updateTask(taskObj) {
    taskObj.checked = !taskObj.checked;
    this.saveToStorage(toDoListArray);
  };
};


