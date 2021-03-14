var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);


io.on("connection", function (socket) {
  console.log("user connected");
  socket.on("chat message", function (msg) {
    console.log("message: " + JSON.stringify(msg));
    io.emit("chat message", msg);
  });
});
http.listen(5000, function () {
  console.log("listening port");
});
