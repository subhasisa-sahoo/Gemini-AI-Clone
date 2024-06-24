import React, { useContext, useEffect, useState } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";

export const Main = () => {
  const {
    input,
    setInput,
    recentquery,
    prevquery,
    showresult,
    loading,
    resdata,
    onSent,
    typingEffect,
  } = useContext(Context);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && input.trim()) {
      event.preventDefault();
      onSent(input);
      setInput("");
    }
  };

  const handleSendClick = () => {
    if (input.trim()) {
      onSent(input);
      setInput("");
    }
  };

  const handleCardClick = (query) => {
    setInput(query);
    // onSent(query);
  };

  //  OFFLINE/ONLINE SET UP
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const updateStatus = () => {
    setIsOffline(!navigator.onLine);
    if (navigator.onLine) {
      window.location.reload();
    }
  };

  useEffect(() => {
    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);

    return () => {
      window.removeEventListener("online", updateStatus);
      window.removeEventListener("offline", updateStatus);
    };
  }, []);

  return (
    <div className="main">
      <div className="nav">
        <h2>Gemini AI Clone</h2>
        {isOffline && <div className="offline-alert">No Internet Connection</div>}
        <img src="https://lordicon.com/icons/wired/flat/21-avatar.gif" alt="User Icon" />
      </div>
      <div className="container">
        {!showresult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Developer</span>
              </p>
              <p>Ask anything to Gemini AI Clone</p>
            </div>
            <div className="cards">
              <div className="card-item" onClick={() => handleCardClick("What is Gemini ai")}>
                <img src={assets.gemini_icon} alt="Gemini Icon" />
                <p>What is Gemini AI</p>
              </div>
              <div className="card-item" onClick={() => handleCardClick("Explain about Programming Language")}>
                <img src="https://img.icons8.com/?size=100&id=13679&format=png&color=000000" alt="Programming Icon" />
                <p>Explain about Programming Language</p>
              </div>
              <div className="card-item" onClick={() => handleCardClick("Explain Code")}>
                <img src="https://img.icons8.com/?size=100&id=48250&format=png&color=000000" alt="Code Icon" />
                <p>Explain Code</p>
              </div>
              <div className="card-item" onClick={() => handleCardClick("Latest Sports News")}>
                <img src="https://img.icons8.com/?size=100&id=JVvzoewCeEpk&format=png&color=000000" alt="Sports Icon" />
                <p>Sports</p>
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src="https://lordicon.com/icons/wired/flat/21-avatar.gif" alt="User Icon" />
              <p>{recentquery}</p>
            </div>
            <div className="result-data">
              {loading ? (
                <img src={assets.chatgif} alt="Loading" />
              ) : (
                <>
                  <img src="https://img.icons8.com/?size=100&id=CqdjikHRlU0f&format=png&color=000000" alt="Result Icon" />
                  <p dangerouslySetInnerHTML={{ __html: resdata }}></p>
                </>
              )}
            </div>
          </div>
        )}
        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              value={input}
              type="text"
              placeholder="Ask your query..."
            />
            <div>
              <img src={assets.gallery_icon} alt="Gallery Icon" id="input_img" />
              <img src={assets.mic_icon} alt="Mic Icon" id="input_img" />
              {input ? (
                <img onClick={handleSendClick} src={assets.send_icon} alt="Send Icon" />
              ) : (
                <img className="img-send" src={assets.send_icon} alt="Send Icon" />
              )}
            </div>
          </div>
          <div className="footer">
            <p>
              This may take some time to generate the response depend on Internet
              and may not be accurate.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
