import React from "react";
import "../src/popup.css";
import { useState } from "react";

function Popup() {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="popup-widget">
      <button onClick={togglePopup} className="popup-button">
        Open Pop-up
      </button>
      {isOpen && (
        <div className="popup-content">
          {/* Content of your pop-up goes here */}
          <p>This is the pop-up content.</p>
          <button onClick={togglePopup} className="popup-close-button">
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default Popup;
