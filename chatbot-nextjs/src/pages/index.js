import Image from "next/image";
import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
//Testing
export default function Home() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setHistory((prevResponse) => [
      ...prevResponse,
      { type: "user", message: input },
    ]);
    sendMessage(input);
    setInput("");
    console.log(history);
  };

  const sendMessage = (message) => {
    console.log(process.env.OPEN_API);
    const url = "https://api.openai.com/v1/chat/completions";
    const headers = {
      "Content-type": "application/json",
      Authorization: `Bearer ${process.env.OPEN_API}`,
    };
    const data = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    };
    setLoading(true);
    axios
      .post(url, data, { headers: headers })
      .then((response) => {
        console.log(response);
        setHistory((prevResponse) => [
          ...prevResponse,
          { type: "bot", message: response.data.choices[0].message.content },
        ]);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  };
  return (
    <>
      <h1>Chat GPT Bot</h1>
      {history.map((message, index) => (
        <div key={index}>{message.message}</div>
      ))}
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type Something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></input>
        <button type="submit">Send</button>
      </form>
    </>
  );
}
