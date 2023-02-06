import React from "react";

export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#B7B78A" : "transparent",
  };
  return (
    <div className="die-face" onClick={props.holdDice} style={styles}>
      <h2 className="die-num">{props.value}</h2>
    </div>
  );
}
