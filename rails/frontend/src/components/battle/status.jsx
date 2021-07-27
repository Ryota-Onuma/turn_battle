import React, {useState, useEffect} from "react";

export const renderStatus = () => {
  const [hp, setHP] = useState(100)
  return(
    <div id="status-container">
      <h2>HP: {hp}</h2>
    </div>
  )
}