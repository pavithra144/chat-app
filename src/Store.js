import React from "react";
import io from "socket.io-client";

//create context
export const CTX = React.createContext();

//state stucture:
// state{
//   general: [
//     {msg},{msg},{msg}
//   ]
// topic: [
//   {msg},{msg},{msg}
// ]
// }

//initial state
const initState = {
  general: [
    { from: "aaron", msg: "hi" },
    { from: "aaron", msg: "hi" },
  ],
  topic1: [{ from: "pavi", msg: "hello aaron" }],
};

//reducer func
function reducer(state, action) {
  //const { from, msg, topic } = action.payload;

  switch (action.type) {
    case "RECEIVE_MESSAGE":
      return {
        ...state,
        [action.payload.topic]: [
          ...state[action.payload.topic],
          {
            from: action.payload.from,
            msg: action.payload.msg,
          },
        ],
      };
    default:
      return state;
  }
}

let socket;

function sendChatAction(value) {
  console.log(value);
  socket.emit("chat message", value);
}

export default function Store(props) {
  //create reducer
  const [allChats, dispatch] = React.useReducer(reducer, initState);
  //checking for socket started,if not started, setting manually to 5000
  if (!socket) {
    socket = io(":5000");
    socket.on("chat message", function (msg) {
      dispatch({ type: "RECEIVE_MESSAGE", payload: msg });
      console.log({ msg });
    });
  }
  const user = "pavithra" + Math.random(100).toFixed(2);

  // console.log(allChats);

  return (
    <CTX.Provider value={{ allChats, sendChatAction, user }}>
      {props.children}
    </CTX.Provider>
  );
}
