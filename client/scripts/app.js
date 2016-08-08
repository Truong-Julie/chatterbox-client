// YOUR CODE HERE:




var app = {
  server: 'https://api.parse.com/1/classes/messages'
};

app.init = function() {
// what happens when the window loads
  $(document).ready(

    $('.username').on('click', function () {
      app.addFriend(this);
    }),

    // $('#send .submit').on('submit', function () {
    //   app.handleSubmit(this);
    // })

    $('#send .submit').on('submit', function (event) {
      console.log('fire', event);
      app.handleSubmit(event);
      event.preventDefault();
    })
  );
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
};

// $('.username').on

app.addRoom = function(roomName) {
  $('#roomSelect').append('<option value=' + roomName + '>' + roomName + '</option>');   
};

app.addFriend = function() {

};

app.handleSubmit = function() {
  console.log("handleSubmit");
};