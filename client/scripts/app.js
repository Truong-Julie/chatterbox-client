// YOUR CODE HERE:
var app = {
  server: 'https://api.parse.com/1/classes/messages',
  messages: [],
  allRooms: {},
  roomName: 'lobby',
};

app.init = function() {
  
  // listeners
  $('#roomSelect').on('change', app.handleRoomChange);

  $('body').on('click', '.username', function (data) {
    app.addFriend(this);
  });

  $('#send .submit').on('click', function (event) {  // #send .submit

    // Grabs user input 
    var userMessage = $(':input:odd').val();
    var userName = window.location.search.split('=')[2];
    var roomName = $(':input:first').val();

    app.handleSubmit(userMessage, userName, roomName);
    // event.preventDefault();
    // console.log(userMessage);
  });

  // begin auto-fetching
  app.fetch();
  setInterval(app.fetch, 6000);

};




// **************** AJAX ******************* // 

app.fetch = function() {
  $.ajax({
    url: app.server,
    // set ajax response to text
    contentType: 'application/json',  // dataType: 'text',
    data: { order: '-createdAt'},
    type: 'GET',
    async: true,
    statusCode: {
      404: function (response) {
        alert(404);
      },
      200: function (response) {
        app.messages = response['results'];

        // process to render messages
        app.renderMessages(app.messages);
      }
    },
    error: function (jqXHR, status, errorThrown) {
      alert('error', errorThrown);
    }
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
      console.log('chatterbox: Message sent', data);
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};



// *************** Messages ***************//

var Message = function(messageText, userName, roomName) {
  this.text = messageText;
  this.username = userName;
  this.roomname = roomName;
};

app.clearMessages = function() {
  $('#chats').children().remove();
};

app.renderMessages = function(messages) {
  app.clearMessages();
  messages
    .filter(function(message) { 
      if (app.roomName === 'lobby' && !message.roomname) { 
        return true; 
      } else if (message.roomname === app.roomName) {
        return true;
      } else {
        return false;
      }
    })
    .forEach(function(item) {
      app.addMessage(item);
    });

  // iterate through each new message and...
  // messages.forEach(function(item) {
  //   app.addMessage(item);
  // });
  
  app.renderRoomList(messages);
};

app.addMessage = function(message) {

  var $chat = $('<div class="chat" />');

  var $username = $('<span class="username" />');
  $username
    .text(message.username + ': ')
    .attr('data-username', message.username)
    .appendTo($chat);

  var $message = $('<br><span/>');
  $message
    .text(message.text)
    .appendTo($chat);

  $('#chats').append($chat);

};

app.handleSubmit = function(messageText, userName, roomName) {
  var newMessage = new Message(messageText, userName, roomName);
  console.log(newMessage);
  app.send(newMessage);
  // add message immediately 
  app.addMessage(newMessage);
  // make addMessage() <-- add to the DOM
};


// ******************** Rooms **********************// 

app.addRoom = function(roomName) {
  $('#roomSelect').append('<option value=' + roomName + '>' + roomName + '</option>');   
};

app.renderRoomList = function(messages) {
  console.log('renderRoomList run');
  // for each message
  messages.forEach(function(message) {
    // add a key to a obj, to remove duplicate rooms
    app.allRooms[message.roomname] = true;
  });
  // for unique room call addRoom on room
  $('#roomSelect').html('');
  $('#roomSelect').append('<option selected value="">Select a room</option>');
  $('#roomSelect').append('<option value="Add Room">Add New Room</option>');
  for (var room in app.allRooms) {
    app.addRoom(room);
  }
};

app.handleRoomChange = function() {
  $('#roomSelect').prop('selectedIndex');
};

// ******************* Friends ******************// 

app.addFriend = function() {
  // click on a name

};

