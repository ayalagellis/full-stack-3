//Network class is responsible for sending requests to the server and receiving responses from the server

class Network{
    static send(body, obj){ //simulates sending a request to the server - this function is called from the fxhttp class
        obj.readyState=2;  //request received by server
        let fxhttp=null; //the XMLHttpRequest object
        fxhttp=Server.transfer_request(body, obj); //simulate carrying the request to the server and processing it
        return fxhttp; //contains the response from the server   
    }
}