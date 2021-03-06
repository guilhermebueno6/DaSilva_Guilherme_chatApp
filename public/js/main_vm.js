// imports always go first - if we're importing anything
import ChatMessage from './modules/ChatMessage.js';

var objDiv = document.querySelector(".messages");
objDiv.scrollTop = objDiv.scrollHeight;
var today = new Date();
var now = today.getHours() + ":" + today.getMinutes();


const socket = io();

function setUserId({sID, message}) {
    vm.socketID = sID;
    let messageField = document.querySelector("section.messages");
    messageField.innerHTML += `<p class="server-message">a user has connected</p>`;
}



function runDisconnectMessage(packet){
    let messageField = document.querySelector("section.messages");
    messageField.innerHTML += `<p class="server-message">${vm.nickName} has disconnected</p>`;
    console.log(packet);
    // vm.messages.push(msg);
}


function appendNewMessage(msg) {
    vm.messages.push(msg);
}




const vm = new Vue({
    
    data: {
        socketID: "",
        messages: [],
        message: "",
        nickName: "",
        time: "",
        isActive: true
    },
    methods: {
        makeIdle: function(event){
            this.isActive = false;
         },

         typing: function(event){
             debugger;
            let messageField = document.querySelector("section.messages");
            messageField.innerHTML += `<h1 class="server-message">${vm.nickName} is typing...</h1>`;
         },

         toggle: function(event){
            this.isActive = !this.isActive;
         },

        dispatchMessage() {
            var today = new Date();
            now = today.getHours() + ":" + today.getMinutes();
            console.log('handle send message');

            socket.emit('chat_message', { 
                content: this.message,
                name: this.nickName || "anonymous",
                time: now
                // || is called a doyble pipe and works as an OR operator
            })

            this.message = ""
        }
    },
    components:{
        newmessage: ChatMessage
    },

    mounted: function() {
        console.log('mounted');
    }
}).$mount("#app");


//sme event handling -> these events are coming from the server
socket.addEventListener('connected', setUserId);
socket.addEventListener('user_disconnect', runDisconnectMessage);
socket.addEventListener('new_message', appendNewMessage);
socket.addEventListener('new_message', updateTime);
