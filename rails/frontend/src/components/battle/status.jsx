import React, {useContext} from "react";
import { Store } from '../../stores/store'
import "../../stylesheets/battle/status.scss"

export const renderStatus = () => {
  const {state, dispatch} = useContext(Store)  
  return(
    <div id="status-container">
      <h2 id="name">{state.user.name}</h2>
      <h2 id="hp">HP: {state.user.hp}</h2>
    </div>
  )
}
