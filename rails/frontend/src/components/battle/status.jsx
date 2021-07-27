import React, {useState, useEffect} from "react";
import "../../stylesheets/battle/status.scss"
export const renderStatus = (hp, name) => {
  return(
    <div id="status-container">
      <h2 id="name">{name}</h2>
      <h2 id="hp">HP: {hp}</h2>
    </div>
  )
}
