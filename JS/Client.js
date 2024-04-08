
let cur_user = null;

function signIn_toDo() {
    let signInForm = document.getElementById("sign_in_div");
    signInForm.classList.add("hidden"); // Add 'hidden' class to hide

    let signInTemplate = document.getElementById("sign_in_div");
    if (signInTemplate) {
        signInTemplate.parentNode.removeChild(signInTemplate);
    }
    let toDoTemplate = document.getElementById("todo_list");
    let clone = toDoTemplate.content.cloneNode(true);
    document.body.appendChild(clone);

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
    fxhttp.open("GET","./GET_user",true);  
    fxhttp.send(existing_user_json);
    var rep=fxhttp.onload();
    cur_user=rep;
   if(cur_user){
    getTaskList();
   }

}

function signUp_toDo() {
    let signUpForm = document.getElementById("sign_up_div");
    signUpForm.classList.add("hidden"); // Add 'hidden' class to hide

    let signUpTemplate = document.getElementById("sign_up"); //removing previous template
    if (signUpTemplate) {
        signUpTemplate.parentNode.removeChild(signUpTemplate);
    }

    let emailInput = signUpForm.querySelector("#email").value;
    let userPassword = signUpForm.querySelector("#pw").value;
    let new_user={
        type:"user",
        username:emailInput,
        password: userPassword,
        userTasks:[]
    } 

    var new_user_json=JSON.stringify(new_user);
    var fxhttp=new FXMLHttpRequest();
    fxhttp.open("POST","./Add_new_user",true);  
    fxhttp.send(new_user_json);
    //alert('Your account has been created');
    //var rep=fxhttp.onload();
    //cur_user=rep;
    //let toDoTemplate = document.getElementById("todo_list"); //adding new template
    //let clone = toDoTemplate.content.cloneNode(true);
    //document.body.appendChild(clone);
    //getTaskList();
}


function signIn_signUp() {
    let signInForm = document.getElementById("sign_in_div");
    signInForm.classList.add("hidden"); // Add 'hidden' class to hide

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
    fxhttp.open("GET","./GET_user_list",true);
    user_task_list={
        type:"user",
        username:cur_user.username,
        password: cur_user.password,
        userTasks:cur_user.userTasks
    }
    var list_to_search_json=JSON.stringify(user_task_list); 
    fxhttp.send(list_to_search_json);
    let task_list=fxhttp.onload();
    if(task_list!=null){
        for(i=0;i<task_list.length;i++){
            let li = document.createElement("li");
            let item_value = task_list[i].taskId+" "+task_list[i].text;
            let x = document.createTextNode(item_value);
            //li.setAttribute('id',task_list[i].mail)
            li.setAttribute('class',"task_list")
            li.appendChild(x);    
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
    li.setAttribute('class',"task_list")
    li.appendChild(x);       
    document.getElementById("todoList").appendChild(li);

}