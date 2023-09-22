import React from "react";
import "./uiComponents_cover.css";

export function Cover({ children, coverId = "uiCover", state, message, coverStyle={}, messageStyle = {}, coverBackgroundStile = {}  }) {
  let coverSTL = "uicover_background";
  let messageSTL = "uiMessage";
  let messageState = ""
  switch (state) {
    case "loading":
      coverSTL += " uicover_animation";
      messageSTL += " uiMessage_loading";
      messageState = "Loading ..."
      break;
    case "error":
      coverSTL += " uicover_error";
      messageSTL += " uiMessage_error";
      messageState = "UPS :( Error"
      break;
    case "die":
      messageSTL += " uiMessage_die";
      messageState = "Sorry but ..."
      coverSTL += " uicover_die";
      break;
    default:
      break;
  }
  return (
    <div id={coverId} style={{width: "100%", ...coverStyle}}>
      <div className={messageSTL} >
        {messageState}
      </div>
      <div  className={coverSTL} style={coverBackgroundStile} >
        {children}
      </div>
      <div style={messageStyle} >
        {message}
      </div>
    </div>
  );
}
