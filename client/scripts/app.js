// YOUR CODE HERE:

var message = {
  username: 'temp',
  text: 'test',
  roomname: 'test'
};


var app = {
  server: 'https://api.parse.com/1/classes/messages'
};

app.init = function() {};

app.send = function(message) {
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent' + data);
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

// app.send(message);

app.fetch = function() {
  $.ajax(app.server);
};

app.clearMessages = function() {
  $('#chats').children().remove();
};

app.addMessage = function(message) {
  $('#chats').append('<div class="message">' + message.text + '</div>');
};

app.addRoom = function(roomName) {
  $('#roomSelect').append('<option value=' + roomName + '>' + roomName + '</option>'); 
  
  
  
  
};