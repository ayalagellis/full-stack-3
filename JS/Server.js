class Server{
    static carry_request(body, obj){

        switch(obj.method){
            case "POST":
            var data=JSON.parse(body)
            
            if(data.type=="user"){  //adding a user
                addUser(body)
                obj.status=200;
                obj.readyState=4;
                return obj;
               
            }
            if(data.type=="task"){ //adding a task
                addTaskToUser(body)
                obj.status=200;
                obj.readyState=4;
                return obj;          
            }
            break;
            
            case "GET":
            if(obj.type=="user"){  //returning a user
                var user=null;
                user=getUser(body.username)
                if(user!=null){
                    obj.status=200;
                    obj.readyState=4;
                    obj.response=user;
                    obj.responseText=JSON.stringify(user);
                    return obj;

                }
                else{
                    obj.status=404;
                    obj.readyState=4;
                    obj.response=user;
                    obj.responseText="";
                    return obj;
                }

            }

            if(obj.url=="./GET_task"){  //returning a task
                var task=null;
                task=getTask(body.taskId);  
                if(task!=null)
                {
                    obj.status=200;
                    obj.readyState=4;
                    obj.response=task;
                    obj.responseText=JSON.stringify(task);
                    return obj;
                }else{
                    obj.status=404;
                    obj.readyState=4;
                    obj.response=guest;
                    obj.responseText="";
                    return obj;
                }
  
            }

            if(obj.url=="./GET_user"){ //returning list of tasks of current user
                var list_tasks=null;
                list_tasks=getAllTasks(body);
                if(list_tasks!=null){
                    obj.status=200;
                    obj.readyState=4;
                    obj.response=list_tasks;
                    obj.responseText=JSON.stringify(list_tasks);
                   return obj;
                    
                }else{
                    obj.status=404;
                    obj.readyState=4;
                    obj.response=list_tasks;
                    obj.responseText="";
                    return obj;

                }
            }
            
            case "DELETE": //deleting a task
            removeTask(body.taskId);
            obj.status=200;
            obj.readyState=4;
            obj.response=null;
            obj.responseText="";
            return obj;
            

            case "PUT": ///updating a task
            updateTask(body);
            obj.status=200;
            obj.readyState=4;
            obj.response=null;
            obj.responseText="";
            return obj;            
        }
    }
}

                   
