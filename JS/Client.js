
let cur_user = null;

document.addEventListener("DOMContentLoaded", function () {
    let signInTemplate = document.getElementById("sign_in_template");
    let clone = signInTemplate.content.cloneNode(true);
    document.body.appendChild(clone);
});

function signIn_toDo() {
    
    let signInTemplate = document.getElementById("sign_in_div");

    let emailInput = signInTemplate.querySelector("#userMail").value;
    let userPassword = signInTemplate.querySelector("#userPw").value;

    let existing_user={
        type:"user",
        username:emailInput,
        password: userPassword,
        userTasks:[]
    }

    var existing_user_json=JSON.stringify(existing_user);
    var fxhttp=new FXMLHttpRequest();
    fxhttp.open("GET","./GET_user",false);  
    fxhttp.send(existing_user_json);
    var rep=fxhttp.onload();
    cur_user=rep;
   if(cur_user){
    if (signInTemplate) {
        signInTemplate.parentNode.removeChild(signInTemplate);
    }
    
    let toDoTemplate = document.getElementById("todo_list");
    let clone = toDoTemplate.content.cloneNode(true);
    document.body.appendChild(clone);
    getTaskList();
   }
   if(!cur_user){
       alert("User does not exist.")
   }

}

function signUp_toDo() {
    let signUpForm = document.getElementById("sign_up_div");

    let emailInput = signUpForm.querySelector("#email").value;
    let userPassword = signUpForm.querySelector("#pw").value;
    sign_up_input();
    let new_user={
        type:"user",
        username:emailInput,
        password: userPassword,
        userTasks:[]
    } 

    var new_user_json=JSON.stringify(new_user);
    var fxhttp=new FXMLHttpRequest();
    fxhttp.open("POST","./Add_new_user",false);  
    fxhttp.send(new_user_json);
    alert('Your account has been created');

    if (signUpForm) {
        signUpForm.parentNode.removeChild(signUpForm);
    }
    let toDoTemplate = document.getElementById("todo_list"); //adding new template
    let clone = toDoTemplate.content.cloneNode(true);
    document.body.appendChild(clone);
    getTaskList();
}


function signIn_signUp() {

    let signInTemplate = document.getElementById("sign_in_div");
    if (signInTemplate) {
        signInTemplate.parentNode.removeChild(signInTemplate);
    }

    let toDoTemplate = document.getElementById("sign_up");
    let clone = toDoTemplate.content.cloneNode(true);
    document.body.appendChild(clone);
}

function getTaskList(){
    var fxhttp=new FXMLHttpRequest();
    fxhttp.open("GET","./GET_user_list",false);
    user_task_list={
        type:"user",
        username:cur_user.username,
        password: cur_user.password,
        userTasks:cur_user.userTasks
    }
    var user_list=JSON.stringify(user_task_list); 
    fxhttp.send(user_list);
    let task_list=fxhttp.onload();
    if(task_list!=null){
        for(i=0;i<task_list.length;i++){
            let li = document.createElement("li");
            let item_value = task_list[i].taskId+" "+task_list[i].text;
            let x = document.createTextNode(item_value);
            li.setAttribute('class',"task_list")
            li.appendChild(x);
            let space1 = document.createTextNode("     ");
            li.appendChild(space1);
                
            let updatetask = task_list[i];
      
            let inputField = document.createElement("input");
                inputField.type = "text";
                inputField.className = "task-input";
                inputField.addEventListener("keypress", function(event) {
                    if (event.key === "Enter") {
                        event.preventDefault();
                        var currentDate = new Date();
                        new_task={
                            type: "task",
                            taskId: inputField.value, //title
                            text:inputField.value,
                            isDone:"false",
                            date: currentDate.toISOString()
                        };
                        let combinedString = [updatetask, new_task];
                        updateTask(combinedString);
                        
                        li.firstChild.nodeValue = inputField.value + " " + inputField.value;
                    }
                });
                li.appendChild(inputField);

            let closeButton = document.createElement("span");
            closeButton.innerHTML = "&times;";
            closeButton.className = "close-button";  
            let removedTask =  task_list[i];                           
            closeButton.onclick = function() {
                li.remove();
                removeTask(removedTask);
            };
            li.appendChild(closeButton);
            li.className = "task-list";    
            document.getElementById("todoList").appendChild(li);  
    }
   }
}

function addTask(){
    var fxhttp=new FXMLHttpRequest();
    fxhttp.open("POST","./add_task",true);
    var titleInput = document.getElementById("todoInput");
    var title = titleInput.value;
    titleInput.value = '';
    var text = title;
    var currentDate = new Date();


    new_task={
        type: "task",
        taskId: title, //title
        text:text,
        isDone:"false",
        date: currentDate.toISOString()
    }
    var list_to_search_json=JSON.stringify(new_task); 
    fxhttp.send(list_to_search_json);

    let li = document.createElement("li");
    let item_value = title+" "+text;
    let x = document.createTextNode(item_value);
    li.appendChild(x);
    let space1 = document.createTextNode("   ");
    li.appendChild(space1);
    
    let inputField = document.createElement("input");
    inputField.type = "text";
    inputField.className = "task-input";
    inputField.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            var currentDate = new Date();
            new_task2={
            type: "task",
            taskId: inputField.value, //title
            text:inputField.value,
            isDone:"false",
            date: currentDate.toISOString()
            };
            let combinedString = [new_task, new_task2];
            updateTask(combinedString);                      
            li.firstChild.nodeValue = inputField.value + " " + inputField.value;
            }});
            li.appendChild(inputField);
            
            let closeButton = document.createElement("span");
            closeButton.innerHTML = "&times;";
            closeButton.className = "close-button";  
            closeButton.onclick = function() {
                li.remove();
                removeTask(new_task);
            };
            li.appendChild(closeButton);
            li.className = "task-list";     
    document.getElementById("todoList").appendChild(li);

}

function removeTask(task){
    var fxhttp=new FXMLHttpRequest();
    fxhttp.open("DELETE","./remove_task",true);
    var task_to_remove=JSON.stringify(task); 
    fxhttp.send(task_to_remove);
}

function updateTask(task){
    var fxhttp=new FXMLHttpRequest();
    fxhttp.open("PUT","./update_task",true);
    fxhttp.send(task);
}

function LogOut_func(){
    cur_user=null; //for body parameter of send
    var fxhttp=new FXMLHttpRequest();
    fxhttp.open("POST","./user_logout",false);
    var user_json=JSON.stringify(cur_user); 
    fxhttp.send(user_json);
    let toDoTemplate = document.getElementById("todo_list_div");
    toDoTemplate.parentNode.removeChild(toDoTemplate);
    alert("You have been logged out");
    let sign_in_template = document.getElementById("sign_in_template");
   let clone = sign_in_template.content.cloneNode(true);
    document.body.appendChild(clone);
}

function handleInput(){
document.getElementById("searchInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent the default form submission behavior
        
        var inputValue = event.target.value.trim(); // Get the input value and remove leading/trailing whitespace
        var todoListItems = document.querySelectorAll("#todoList li"); // Get all <li> elements inside the todoList
        
        todoListItems.forEach(function(item) {
            var liText = item.textContent.trim().toLowerCase(); // Get the text content of the <li> element and convert to lowercase
            if (inputValue === "") {
                item.style.display = "block"; // Show the <li> element if input value is empty
            } else if (liText.includes(inputValue)) {
                item.style.display = "block"; // Show the <li> element if its text matches the input value
            } else {
                item.style.display = "none"; // Hide the <li> element otherwise
            }
        });
        
        // Clear the input field
        event.target.value = "";
    }
});
}

function sign_in_input(){
      
}

function sign_up_input(){
    let signUpForm = document.getElementById("sign_up_div");
    let emailInput = signUpForm.querySelector("#email").value;
    let userPassword = signUpForm.querySelector("#pw").value;
 //var email=document.getElementById('email');
        //var pw = document.getElementById('pw');
      
        var lowerCaseLetters = /[a-z]/g;
        var upperCaseLetters = /[A-Z]/g;
        var numbers = /[0-9]/g;
    
        if(userPassword.length == 0){
            alert('Please fill in password');
        
        }else if(!userPassword.match(numbers)){
            alert('please add 1 number');
    
        }else if(!userPassword.match(upperCaseLetters)){
            alert('please add 1 uppercase letter');
    
        }else if(!userPassword.match(lowerCaseLetters)){
            alert('please add 1 loeercase letter');
        }   
}


