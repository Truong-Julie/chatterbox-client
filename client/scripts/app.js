// YOUR CODE HERE:

var Message = function(messageText, userName, roomName) {
  this.text = messageText;
  this.username = userName;
  this.roomname = roomName;
};

$.ajaxSetup({
  dataFilter: function(data) {
    var data = JSON.parse(data);
    // put filtering here
    return JSON.stringify(data);
  }
});

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

    // Grabs user input 
    var userMessage = $(':input:odd').val();
    var userName = window.location.search.split('=')[2];
    var roomName = $(':input:first').val();

    app.handleSubmit(userMessage, userName, roomName);
    // event.preventDefault();
    // console.log(userMessage);
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

// app.send(message);
var rawData;

/*********** OG Fetch Function **************/
app.fetch = function() {
  // $.ajax(app.server);
  $.get(app.server, function(data) { 
    rawData = data['results'];
    _.each(rawData, function(item) {
      app.addMessage(item);
      console.log('item object', item);
    });
    console.log('inner function', rawData[0]);
    // data['results'] <-- array of all messages
    // return data;
  });
};
/****************** Test Fetch Function ************************/
// Goal to return text instead of a JSON file

app.fetch = function() {
  $.ajax({
    url: app.server,
    dataType: 'text',
    type: 'GET',
    async: true,
    statusCode: {
      404: function (response) {
        alert(404);
      },
      200: function (response) {
        // filtering
          //for the block of text if we encounter < replace with 
          // replace for <, &, >, and 
          // response.sp
        // console.log(response);

        var escapedResponse = response.replace(/</gi, '&lt;');
        escapedResponse = escapedResponse.replace(/>/gi, '&gt;');
        escapedResponse = escapedResponse.replace(/&/gi, '&amp;');
        // console.log(response.replace(/results/gi, "resmults"));
        console.log(escapedResponse);    



      }
    },
    error: function (jqXHR, status, errorThrown) {
      alert('error');
    }
  });
};


app.clearMessages = function() {
  $('#chats').children().remove();
};


var message = {
  username: 'temp',
  text: 'test',
  roomname: 'test'
};
/*
{createdAt: "2016-08-09T03:04:03.556Z", objectId: "KAHVFZjZ4U", roomname: "Room 9", text: "hello", updatedAt: "2016-08-09T03:04:03.556Z"…}
*/

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

app.handleSubmit = function(messageText, userName, roomName) {
  var newMessage = new Message(messageText, userName, roomName);
  console.log(newMessage);
  app.send(newMessage);
  // make addMessage() <-- add to the DOM
};





$(document).ready(function() {
  app.init();
});


// $(document).   ready(app.init.bind(app));
