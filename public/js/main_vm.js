// imports always go first - if we're importing anything
import ChatMessage from "./modules/ChatMessage.js"

const socket = io();

function setUserId({sID, message}) {
    vm.socketID = sID;
}

function runDisconnectMessage(packet){
    debugger;
    console.log(packet);
}

function appendNewMessage(msg) {
    vm.messages.push(msg);
}

const vm = new Vue({
    data: {
        socketID: "",
        messages: [],
        message: "",
        nickName: ""
    },
    methods: {
        dispatchMessage() {
            console.log('handle send message');

            socket.emit('chat_message', { 
                content: this.message,
                name: this.nickName || "anonymous"
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