// YOUR CODE HERE:




var app = {
  server: 'https://api.parse.com/1/classes/messages'
};

app.init = function() {
// what happens when the window loads
  // $('.username').on('click', function (data) {
  //   console.log('Username clicked!');
  //   app.addFriend(this);
  // });

  $('body').on('click', '.username', function (data) {
    console.log('Username clicked!');
    app.addFriend(this);
  });

  $('#send .submit').on('click', function (event) {  // #send .submit
    // console.log('Submit clicked: ', event);
    // console.log(document.getElementById('messageBox').value); 
    var userMessage = $(":input:odd").val();
    console.log(userMessage);
    app.handleSubmit(userMessage);
    // event.preventDefault();
  });

};


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


var message = {
  username: 'temp',
  text: 'test',
  roomname: 'test'
};

app.addMessage = function(message) {
  $('#chats').append('<div class="message">' + '<span class="username">' + message.username + '</span>' + ': ' + message.text + '</div>'); // '</div><div class="message">'
  
  // $('.username').on('click', function() {
  //   console.log('Initiated username');
  // });
};

// $('.username').on

app.addRoom = function(roomName) {
  $('#roomSelect').append('<option value=' + roomName + '>' + roomName + '</option>');   
};

app.addFriend = function() {

};

app.handleSubmit = function(event) {
  // console.log(event);
};





$(document).ready(function() {
  app.init();
});


// $(document).   ready(app.init.bind(app));
