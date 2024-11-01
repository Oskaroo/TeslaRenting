import React from "react";
import { IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";

const ChatButton = () => (
  <IconButton color="primary">
    <ChatIcon sx={{ fontSize: 32 }} />
  </IconButton>
);

export default ChatButton;
