import React, { useLayoutEffect, useRef, useContext} from "react";
import { Store } from '../../stores/store'
import "../../stylesheets/battle/announce.scss"
const Announce = (props) => {
  const {state, dispatch} = useContext(Store)  
  const scrollBottomRef = useRef()
  useLayoutEffect(() => {
    scrollBottomRef?.current?.scrollIntoView();
  },[props.messages])
  
  return(
    <div id="battle-announce">
      <p>カワウソが現れた。</p>
      <p>{state.user.name}はどうする？</p>
      { props.messages.map((message,key) => {
        return <p className="battle-message" key={message + key}>{ message }</p>
      })}
      <div ref={scrollBottomRef}/>
    </div>
  )
}

export default Announce 