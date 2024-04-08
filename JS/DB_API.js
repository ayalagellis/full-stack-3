class DB_API{
 user={
    type:"user",
    username:'',
    password:'',
    userTasks:[]
}

 task = {
       type:"task",
        taskId: "", //title
        text:"",
        isDone: '',
        date:""
    }

 
 current_user=null;



 static addUser(user) {
    // Retrieve existing user data from local storage or initialize an empty array
    const users = JSON.parse(localStorage.getItem('users')) || []; //array of users
    if(!users.find(u => u.username === user.username))
    {
    // Add the new user object to the array
    users.push(user);
    // Store the updated user data back to local storage
    localStorage.setItem('users', JSON.stringify(users));
    }
    else{
        console.log("user already exist");
    }


    //user_current=JSON.parse(localStorage.getItem("current_user")); //who is currently connected
    //current_user = user; //the new added user is now the current_user
    /*if(user_current!=null){ //checks if there was a previously stored current user
        localStorage.removeItem("current_user");
        localStorage.setItem("current_user", JSON.stringify(current_user))
    }
    else{
        localStorage.setItem("current_user", JSON.stringify(current_user));
    }*/
    
    localStorage.setItem("current_user", JSON.stringify(user))
}

// Function to retrieve a user object from local storage by username
static getUser(username) {
    // Retrieve user data from local storage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Find the user with the matching username
    const user = users.find(u => u.username === username);

    // Return the found user object, or null if not found
    return user || null;
}


static userLogout(){

    localStorage.setItem("current_user","");
    var currentUser = localStorage.getItem("current_user");
    if (currentUser == ""){          
        return true;
    }
    else{
        return false;
    }
    
}


 static addTaskToUser(task){
    //var user = getUser(current_user.username)
    var currentUser = JSON.parse(localStorage.getItem("current_user"));

    if(currentUser === null){
        return false; // user not found;
    }
    else{
        currentUser.userTasks.push(task);
        DB_API.saveUser(currentUser); //saves updated user in local storage
        return true;
    }
}

static saveUser(currentUser){
    localStorage.setItem("current_user", JSON.stringify(currentUser)); //updates current user
    const allUsers = JSON.parse(localStorage.getItem("users"));
    const userIndex = allUsers.findIndex(user => user.username === currentUser.username);
    allUsers[userIndex] = currentUser;
    localStorage.setItem("users", JSON.stringify(allUsers)); //updates list of users
}


static removeTask(userTaskID){
    var currentUser = JSON.parse(localStorage.getItem("current_user"));
    var indexToDelete = currentUser.userTasks.findIndex(item => item.taskId === userTaskID);

    if(indexToDelete <= -1){
        return false; // task not found;
    }
    else{
        currentUser.userTasks.splice(indexToDelete, 1);
        DB_API.saveUser(currentUser); //saves updated user in local storage
        return true;
    }
}

static updateTask(task){
    var currentUser = JSON.parse(localStorage.getItem("current_user"));
    let old_task = task[0];
    let new_task = task[1];

    var indexToUpdate = currentUser.userTasks.findIndex(item => item.taskId === old_task.taskId);

    if(indexToUpdate <= -1){
        return false; // task not found;
    }
    else{
        //curentUser.userTasks.splice(indexToUpdate, 1);
        //currentUser.userTasks.push(task);
        currentUser.userTasks[indexToUpdate] = new_task;
        DB_API.saveUser(currentUser); //saves updated user in local storage
        return true;
    }
}

static getTask(taskId){
    var currentUser = JSON.parse(localStorage.getItem("current_user"));
        // Check if current user exists
        if (!currentUser || !currentUser.userTasks) {
            console.error("Current user or user tasks not found");
            return null; // Return null if current user or user tasks are not found
        }
        // Find the task with the specified taskId in the userTasks array
        var task = currentUser.userTasks.find(task => task.taskId === taskId);   
        return task; // Return the found task or null if not found
    
}

static getAllTasks(){
    var currentUser = JSON.parse(localStorage.getItem("current_user"));
        // Check if current user exists and userTasks array is present
        if (!currentUser || !currentUser.userTasks) {
            console.error("Current user or user tasks not found");
            return []; // Return an empty array if current user or user tasks are not found
        } 
        // Return all tasks belonging to the current user
        return currentUser.userTasks;    
}

}




