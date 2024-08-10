"use client";

import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";

const App = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [copied, setCopied] = useState(false);

  const genQuote = async () => {
    try {
      const res = await fetch("https://type.fit/api/quotes");
      const quoteList = await res.json();
      const randomIdx = Math.floor(Math.random() * quoteList.length);
      const quoteText = quoteList[randomIdx].text;
      const auth = quoteList[randomIdx].author || "Anonymous";
      setQuote(quoteText);
      setAuthor("~ " + auth);
    } catch (error) {
      console.error("error fetching quote", error);
    }
  };

  useEffect(() => {
    genQuote();
  }, []);

  const copyToClipboard = () => {
    const textArea = document.createElement("textarea");
    textArea.value = quote;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center m-auto bg-[#f5f2e9]">
      <div className="mx-10 p-10 rounded-xl w-90 flex flex-col items-center shadow-2xl bg-[#e8e3d0] border-4 border-[#a28a67]">
        <h1 className="text-center text-2xl font-serif mb-2 text-[#4f3b2c]">
          {quote}
        </h1>
        <p className="author mt-5 text-lg italic text-[#6a5036]" id="author">
          {author}
        </p>
        <hr className="w-full mt-4 border-[#a28a67]" />
        <div className="mt-5 flex flex-row justify-evenly items-center w-full">
          <button
            className="text-xl font-bold border-0 rounded-lg cursor-pointer px-4 py-2 text-[#fff] bg-[#bfa980] hover:bg-[#a28a67] transition-all shadow-md"
            onClick={copyToClipboard}
            disabled={copied}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
          <button
            className="text-xl font-bold border-0 rounded-lg cursor-pointer px-4 py-2 text-[#fff] bg-[#bfa980] hover:bg-[#a28a67] transition-all shadow-md"
            onClick={genQuote}
          >
            Next quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
