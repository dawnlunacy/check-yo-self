 //A ToDoList Class
class ToDoList {
  constructor(id, title, tasksArray, urgency) {
    this.id = id;
    this.title = title;
    this.tasks = tasksArray || [];
    this.urgency = urgency || false; 
  };

  saveToStorage() {

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


class ToDoTask {
  constructor(id, task) {
    this.id = id;
    this.task = task;
    this.complete = false;
  };

  saveToStorage() { 
  
  };
};



 //methods must include but are not limited to: 
  //1. constructor
  //2. saveToStorage
  //3. deleteFromStorage
  //4. updateToDo(should update the todo's title and urgency)
  //5. updateTask(should update a task's content and if it has been completed)

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


    // Object:   A bundle of behavior (methods) and state (properties)
    // Key:   The name used to reference a Value on an Object
    //Value:   The data referenced by a Key
    //Property:   Another word for the ‘Key’ portion of a key-value pair on an object
    //Method:   A function on an Object
    //Dot Notation:   Notation to access a Value on an Object, explicitly specifies the Key
    //Bracket Notation:   Notation to access a Value on an Object, usually specifies a Key via a variable
    //this:  A variable that changes depending on the context in which it’s used
    //class:  A constructor that allows us to create multiple instances
    //instance:   An object of a certain type

//     There are several ways to create an object, and the easiest and most popular is literal notation. The only thing you need in javascript to declare an object is curly braces {}. I swear. Although, it makes things a bit easier if you at least assign it to a variable, like so: var emptyObject = {};

// Objects are a collection of key-value pairs surrounded by curly braces. A key is just a name that holds a value. That sounds familiar, doesn’t it? You’re actually used to working with key-value pairs already, because a key-value pair in an object is essentially a variable. In the context of objects, that variable is called a property of the object. Each property in an object must be unique. You cannot have two properties with the same name. When we assign a function as the value to one of our keys (remember that a function is a tool we use to return a value!), we call that function a method.

// Let’s look at an example:
// var objectName = {
//   property1: value1,
//   property2: value2,
//   method1: function() {
//     return "I'm a method, because I am a function!";
//   }
// };

