
//This class represents an XMLHttpRequest object, which is used to simulate communication between client and server

class FXMLHttpRequest{
    response=null;
    responseText="";
    readyState=0;//connection state 
    status=0; // HTTP response status code 
    onload=null;// verify response status and return the response - callback function that is called when the request completes successfully
    async=true; //request should be asynchronous
    method=''; //specifies the HTTP method to use for the request (e.g., 'GET', 'POST', etc.).
    url=''; // specifies the URL to which the request will be sent

     open(method, url, async){ // initialize fields of objects and prepare it for sending a request
        this.readyState=1; //request has been initialized
        this.async=async;
        this.method=method;
        this.url=url;
       
        if(this.async==true){ //request is asyncronous
            // the onload is called when the request is received at the server
            this.onload=(e) => {  // If asynchronous, set up onload event listener
                if (this.readyState === 4) { //the operation is complete
                     if (this.status === 200) { //200 represents a successful response
                       return this.response;
                     } 
                    else { // If the status is not 200-non-successful responses
                    console.log("Error: ", this.status);
                    }
              }
            };

         }
        else{  //request is syncronous
            this.onload =()=>{
    
            if (this.status === 200) { // a successful response
                return this.response;}
            else{
                console.log("Error: ", this.status); // // If the status is not 200-non-successful responses
            }
        };
        }

    }

    send(body){ //send request to network
    var fxmlhttp=null;
    fxmlhttp=Network.send(body, this); //It passes the body parameter(data) and the current instance of FXMLHttpRequest (this) to the Network
    //send method. The Network send method simulates sending the request to the server and returns an XMLHttpRequest object.

    this.readyState=fxmlhttp.readyState; //readyState property of the current instance of FXMLHttpRequest to the readyState of the XMLHttpRequest object returned by Network send. This indicates the state of the request.
    this.status=fxmlhttp.status;
    this.response=fxmlhttp.response;     
    }
    
}