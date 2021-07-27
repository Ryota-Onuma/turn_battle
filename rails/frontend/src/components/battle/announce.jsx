import React, { useEffect } from "react";
import "../../stylesheets/battle/announce.scss"
const Announce = (props) => {

  return(
    <div id="battle-announce">
      { props.messages.map((message,key) => {
        return <p className="battle-message" key={message + key}>{ message }</p>
      })}
    </div>
  )
}

export default Announce 