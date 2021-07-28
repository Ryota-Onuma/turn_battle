import React, { useLayoutEffect, useRef} from "react";
import "../../stylesheets/battle/announce.scss"
const Announce = (props) => {
  const scrollBottomRef = useRef()
  useLayoutEffect(() => {
    scrollBottomRef?.current?.scrollIntoView();
  },[props.messages])
  
  return(
    <div id="battle-announce">
      { props.messages.map((message,key) => {
        return <p className="battle-message" key={message + key}>{ message }</p>
      })}
      <div ref={scrollBottomRef}/>
    </div>
  )
}

export default Announce 