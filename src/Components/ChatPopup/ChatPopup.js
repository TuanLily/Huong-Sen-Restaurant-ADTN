import React, { useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  TextField,
  Button,
  Paper,
  Avatar,
  Slide,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { deepOrange } from "@mui/material/colors";

function ChatPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Tựu trường deal cực chiến, giảm sốc tới 60% cho S-student. Chat với e ngay hoặc xem chi tiết tại https://cps.onl/back-to-school",
      timestamp: new Date(),
      role: "admin",
    },
    {
      text: "XIN CHÀO",
      timestamp: new Date(),
      role: "customer",
    },
  ]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { text: newMessage, timestamp: new Date(), role: "customer" },
      ]);
      setNewMessage("");
    }
  };

  const sortedMessages = [...messages].sort(
    (a, b) => b.timestamp - a.timestamp
  );

  return (
    <>
      {!isOpen && (
        <Box
          sx={{
            position: "fixed",
            bottom: -10,
            right: 0,
            backgroundColor: "#FEA115",
            color: "white",
            borderRadius: "8px 8px 0 0",
            cursor: "pointer",
            boxShadow: "0 2px 4px #8a8a8a",
            zIndex: 1000,
            width: "350px",
            display: "flex",
            alignItems: "center",
            padding: "10px 15px",
          }}
          onClick={() => setIsOpen(true)}
        >
          <ChatIcon sx={{ mr: 1, fontSize: "15px" }} />
          <Typography
            variant="body2"
            sx={{
              fontSize: "14px",
              color: "#000000",
            }}
          >
            {" "}
            {/* Giảm kích thước font */}
            Chat với nhân viên tư vấn
          </Typography>
        </Box>
      )}

      {isOpen && (
        <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit>
          <Paper
            sx={{
              position: "fixed",
              bottom: 0,
              right: 0,
              width: "350px",
              height: "500px",
              borderRadius: "8px 8px 0 0",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              zIndex: 999,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
            elevation={3}
          >
            <Box
              sx={{
                backgroundColor: "#FEA115",
                color: "white",
                padding: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar sx={{ bgcolor: deepOrange[500], marginRight: "10px" }}>
                  OP
                </Avatar>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "white" }}
                  >
                    Xin chào!
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "black", fontSize: "12px" }}
                  >
                    Mình cần nhà hàng hỗ trợ gì ạ?
                  </Typography>
                </Box>
              </Box>
              <IconButton
                sx={{ color: "white" }}
                onClick={() => setIsOpen(false)}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <Box
              className="messages"
              sx={{
                flexGrow: 1,
                overflowY: "auto",
                padding: "10px",
                display: "flex",
                flexDirection: "column-reverse",
              }}
            >
              {sortedMessages.map((message, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    mb: 4,
                    p: 2,
                    borderRadius: 1,
                    backgroundColor:
                      message.role === "admin" ? "#f0f0f0" : "#FEA115",
                    alignSelf:
                      message.role === "admin" ? "flex-start" : "flex-end",
                    textAlign: message.role === "admin" ? "left" : "right",
                    maxWidth: "80%",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    position: "relative",
                    wordBreak: "break-word",
                    overflowWrap: "break-word",
                  }}
                >
                  {message.role === "admin" && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 1,
                        alignSelf: "flex-start",
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: deepOrange[500],
                          mr: 1,
                        }}
                      >
                        OP
                      </Avatar>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: "bold", color: "#ffa724" }}
                      >
                        Nhà Hàng Hương Sen
                      </Typography>
                    </Box>
                  )}
                  <Typography
                    variant="body1"
                    sx={{ wordBreak: "break-word", overflowWrap: "break-word" }}
                  >
                    {message.text}
                  </Typography>

                  <Typography
                    variant="caption"
                    sx={{
                      position: "absolute",
                      bottom: -30,
                      right: 2,
                      color: "gray",
                      width: "80px",
                      textAlign: "right",
                    }}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Box
              sx={{
                display: "flex",
                padding: "10px",
                borderTop: "1px solid #ddd",
              }}
            >
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Nhập nội dung..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
                sx={{ mr: 1 }}
              />
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#FEA115",
                  color: "#000000",
                  "&:hover": {
                    backgroundColor: "#ffcb70",
                  },
                  borderRadius: "8px",
                }}
                onClick={handleSendMessage}
              >
                <SendIcon sx={{ color: "#000000" }} />
              </Button>
            </Box>
          </Paper>
        </Slide>
      )}
    </>
  );
}

export default ChatPopup;
