const socket=io()
let data;
let textarea=document.querySelector('#textarea');
let messageArea=document.querySelector('.container');
do{
    data=prompt('Enter Your Name:');
}while(!data)
textarea.addEventListener('keyup',(e)=>{
    if(e.keyCode==13){
        sendMessage(e.target.value);
    }
})
function sendMessage(message){
    let msg={
        user:data,
        message:message.trim()
    }
    appendMessage(msg,'right')
    
    textarea.value=''
    scrollToBottom();
    socket.emit('message',msg)
}
function appendMessage(msg,type){
    let mainDiv=document.createElement('div');
    let className=type
    mainDiv.classList.add(className,'message')
    let markup=`
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML=markup
    messageArea.appendChild(mainDiv);
}


socket.on('message',(msg)=>{
    appendMessage(msg,'left')
    scrollToBottom();
})
function scrollToBottom(){
    messageArea.scrollTop=messageArea.scrollHeight
}