document.addEventListener('DOMContentLoaded', function() {
    const chatbot = document.getElementById('chatbot');
    const chatToggle = document.getElementById('chat-toggle');

    chatToggle.addEventListener('click', function() {
        chatbot.classList.toggle('open');
    });
});
function openChatbox() {
    document.querySelector('.chatbox').style.display = 'block';
  }
  
  function closeChatbox() {
    document.querySelector('.chatbox').style.display = 'none';
    document.getElementById('chat-body').innerHTML = ''; // Clear chat history
  }
  
  function sendMessage() {
    // Add functionality to send messages
  }
  