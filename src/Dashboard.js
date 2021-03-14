import React from "react";
import Paper from "@material-ui/core/Paper";
import {
  makeStyles,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
  Button,
  TextField,
} from "@material-ui/core";
import { CTX } from "./Store";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "50px",
    padding: theme.spacing(3, 2),
  },
  flex: {
    display: "flex",
    alignItems: "center",
  },
  topicsWindow: {
    width: "20%",
    height: "300px",
    borderRight: "1px solid gray",
  },
  chatWindow: {
    width: "70%",
    height: "300px",
  },
  chatBox: {
    width: " 85%",
  },
  button: {
    width: "15%",
  },
}));

export default function Dashboard() {
  const classes = useStyles();

  //context store
  const { allChats, sendChatAction, user } = React.useContext(CTX);

  console.log(allChats);
  const topics = Object.keys(allChats);

  //state
  const [activeTopic, changeActiveTopic] = React.useState(topics[0]);
  const [textValue, setTextValue] = React.useState("");

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h3" component="h3">
          Chat app
        </Typography>
        <Typography variant="h5" component="h3">
          {activeTopic}
        </Typography>
        <div className={classes.flex}>
          <div className={classes.topicsWindow}>
            {topics.map((topic, idx) => {
              return (
                <List component="nav" key={idx}>
                  <ListItem
                    button
                    onClick={(e) => changeActiveTopic(e.target.innerText)}
                  >
                    <ListItemText primary={topic} />
                  </ListItem>
                </List>
              );
            })}
          </div>
          <div className={classes.chatWindow}>
            {allChats[activeTopic].map((chat, i) => {
              return (
                <div className={classes.flex} key={i}>
                  <Chip label={chat.from} className={classes.chip} />
                  <Typography variant="body1" gutterBottom>
                    {chat.msg}
                  </Typography>
                </div>
              );
            })}
          </div>
        </div>
        <div className={classes.flex}>
          <TextField
            label="send a message"
            className={classes.chatBox}
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
          ></TextField>

          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              sendChatAction({
                from: user,
                msg: textValue,
                topic: activeTopic,
              });
              setTextValue("");
            }}
          >
            Send
          </Button>
        </div>
      </Paper>
    </div>
  );
}
