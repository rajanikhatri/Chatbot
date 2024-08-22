"use client";
import Image from "next/image";
import { useState } from "react";
import { Box, TextField, Button, Stack, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';


export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello, how can I help you today?",
    },
  ]);

  const [message, setMessage] = useState("");

  const sendMessage = async()=>{
    setMessage("");
    setMessages((messages) => [
      ...messages,
      {
        role: "user",
        content: message,
      },
      {
        role: "assistant",
        content: "",
      },
    ]); 

    const response = fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([...messages, { role: "user", content: message }]),
    }).then(async(res)=>{ 
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let result = "";
      return reader.read().then(function processText({ done, value }) {
        if (done) return result;
        const text = decoder.decode(value || new Int8Array(), { stream: true });
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1];
          let otherMessages = messages.slice(0, messages.length - 1);
          return[
            ...otherMessages,
            { ...lastMessage, 
              content: lastMessage.content + text 
            },
          ];
        });
        return reader.read().then(processText);
      });
    })

    
        
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        direction="column"
        width={{ xs: "100%", sm: "600px" }}
        height={{ xs: "90vh", sm: "700px" }}
        border="1px solid black"
        p={2}
        spacing={2}
      >
        <Stack
          direction="column"
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
          p={2}
        >
          {messages.map((message, index) => (
            <Box
  key={index}
  display="flex"
  justifyContent={message.role === "assistant" ? "flex-start" : "flex-end"}
  mb={1}
>
  <Box
    bgcolor={message.role === "assistant" ? "#e0e0e0" : "#1976d2"} // Assistant: light gray, User: blue
    color={message.role === "assistant" ? "black" : "white"} // Text color adjustment
    borderRadius={3}
    p={2} // Reduced padding for better readability
    mb={3}

      style={{ maxWidth: "75%", wordWrap: "break-word", overflowX: "auto" }}  // Limit width for better flow of text
  >
      <ReactMarkdown
        components={{
          h1: ({ children }) => <Typography variant="h4" gutterBottom>{children}</Typography>,
          h2: ({ children }) => <Typography variant="h5" gutterBottom>{children}</Typography>,
          h3: ({ children }) => <Typography variant="h6" gutterBottom>{children}</Typography>,
          p: ({ children }) => <Typography variant="body1" paragraph>{children}</Typography>,
          ul: ({ children }) => <Box component="ul" pl={2} mb={2}>{children}</Box>,
          ol: ({ children }) => <Box component="ol" pl={2} mb={2}>{children}</Box>,
          li: ({ children }) => <Typography component="li" variant="body1" gutterBottom>{children}</Typography>,
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const codeString = String(children).replace(/\n$/, '');

            return !inline && match ? (
              <Box mb={2}>
                <SyntaxHighlighter
                  style={materialDark}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {codeString}
                </SyntaxHighlighter>
              </Box>
            ) : (
              <Box
                component="code"
                bgcolor="#eee"
                p={1}
                borderRadius={4}
                style={{ fontFamily: 'monospace' }}
                {...props}
              >
                {children}
              </Box>
            );
          },
        }}
      >
        {message.content}
      </ReactMarkdown>
  </Box>
</Box>

          ))}
        </Stack>
        <Stack direction="row" spacing={2} padding={1}>
          <TextField
            fullWidth
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..." 
          />
          
          <Button variant="contained" color="primary" onClick={sendMessage} style={{ height: "56px" }} >
            Send
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}