class Server{
    static transfer_request(body, obj){

        switch(obj.method){
            case "POST":
            var data=JSON.parse(body)
            
            if(obj.url=="./user_logout"){ //logout
                DB_API.userLogout();
                obj.status=200;
                obj.readyState=4;
                return obj;
            }
            
            if(data.type=="user"){  //adding a user
                let exists = DB_API.addUser(data);
                obj.status=200;
                obj.readyState=4;
                obj.response=exists;
                return obj;
               
            }
            if(data.type=="task"){ //adding a task
                DB_API.addTaskToUser(data);
                obj.status=200;
                obj.readyState=4;
                return obj;          
            }
            break;
            
            case "GET":
            if(obj.url=="./GET_user"){  //returning a user
                var user=null;
                var data=JSON.parse(body)
                user=DB_API.getUser(data);
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
                task=DB_API.getTask(data.taskId);  
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

            if(obj.url=="./GET_user_list"){ //returning list of tasks of current user
                var list_tasks=null;
                list_tasks=DB_API.getAllTasks(data);
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
            var data=JSON.parse(body)
            DB_API.removeTask(data.taskId);
            obj.status=200;
            obj.readyState=4;
            obj.response=null;
            obj.responseText="";
            return obj;
            

            case "PUT": ///updating a task
            //var data=JSON.parse(body);
            DB_API.updateTask(body);
            obj.status=200;
            obj.readyState=4;
            obj.response=null;
            obj.responseText="";
            return obj;            
        }
    }
}

                   
