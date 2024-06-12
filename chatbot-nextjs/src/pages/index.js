import Image from "next/image";
import { Inter } from "next/font/google";
import { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });
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
    setInput("");
    console.log(history);
  };
  return (
    <>
      <h1>Chat GPT Bot</h1>
      {history.map((message, index) => (
        <div key={index}>{message.message}</div>
      ))}
      <form onSubmit={handleSubmit}>
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
