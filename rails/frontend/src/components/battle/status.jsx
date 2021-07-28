import React, {useState, useEffect, useContext} from "react";
import { Store } from '../../stores/store'
import "../../stylesheets/battle/status.scss"

const [IN_BATTLE, CLEARED, GAME_OVER, NOT_IN_BATTLE] = [1,2,3,4]

export const renderStatus = () => {
  const {state, dispatch} = useContext(Store)  
  return(
    <div id="status-container">
      <h2 id="name">{state.user.name}</h2>
      <h2 id="hp">HP: {state.user.hp}</h2>
    </div>
  )
}

export const inBattle = () => {
  // const {state, dispatch} = useContext(Store)
  return state.battle_status === IN_BATTLE
}
export const cleard = () => {
  // const {state, dispatch} = useContext(Store)
  return state.battle_status === CLEARED
}

export const gameOvered = () => {
  // const {state, dispatch} = useContext(Store)
  return state.battle_status === GAME_OVER
}
export const setGameOver = () => {
  // const {state, dispatch} = useContext(Store)
  if(!cleard()) {
    dispatch({ type : 'setBattleStatus' , battle_status: GAME_OVER})
  }
  return
}