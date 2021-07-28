import React, {useReducer} from 'react'
import reducer from './reducer'
const [IN_BATTLE, CLEARED, GAME_OVER, NOT_IN_BATTLE] = [1,2,3,4]

const initialState = {
  user : {
    name: "",
    hp: 100
  },
  battle_status: NOT_IN_BATTLE
}

const Store = React.createContext()

const Provider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return <Store.Provider value={{state, dispatch}}>{children}</Store.Provider>
}

export { Store, Provider }