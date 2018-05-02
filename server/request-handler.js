/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'application/json'
};

var sendResponse = function(response, data, statuscode) {
  statuscode = statuscode || 200;
  response.writeHead(statuscode, headers);
  response.end(JSON.stringify(data));
};

var collectData = function(request, callback) {
  var data = '';
  request.on('data', function(chunk) {
    data += chunk;
  });
  request.on('end', function() {
    callback(JSON.parse(data));
  });
};

var messages = [
  { text: 'hello world',
    username: 'Whitney'
  }
];

var actions = {
  'GET': function(request, response) {
    sendResponse(response, {results: messages});
  },
  'POST': function(request, response) {
    collectData(request, function(message) {
      message;
      sendResponse(response, 'Ahoy!');
    });
  },
  'OPTIONS': function(request, response) {
    sendResponse(response, 'Ahoy!');
  }
};

module.exports = function(request, response) {
  // Request and Response come from node's http module. They include information about both the incoming request, such as headers and URL, and about the outgoing response, such as its status and content.
  //
  // Documentation for both request and response can be found in the HTTP section at http://nodejs.org/documentation/api/ Do some basic logging.

  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  var action = actions[request.method];
  if (action) {
    action(request, response);
  } else {
    //TODO error handling
  }
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html, which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.

// exports.requestHandler = requestHandler;
