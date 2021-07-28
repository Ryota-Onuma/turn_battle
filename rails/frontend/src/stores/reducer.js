
const reducer = (state, action) => {
  switch(action.type) {
    case 'drainHp':
    const drained_result = state.user.hp - action.drain_hp_value
    if(drained_result >= 1) {
      return {
        user : {
          hp: drained_result,
          name: state.user.name
        }
      }
    } else {
      return {
        user : {
          hp: 0,
          name: state.user.name
        }
      }
    }
    case 'setName':
      const new_user = {
        name: action.name,
        hp: state.user.hp
      }
      return {
        user : new_user
      }

    case 'setBattleStatus':
      const [IN_BATTLE, CLEARED, GAME_OVER, NOT_IN_BATTLE] = [1,2,3,4]
      const new_battle_status = checkValidBattleStatus(action.battle_status) ? action.battle_status : NOT_IN_BATTLE
      return {
        battle_status: new_battle_status
      }
    default:
      return state
  }
}

const checkValidBattleStatus = (battle_status) => {
  return (battle_status === IN_BATTLE || battle_status === CLEARED || battle_status === GAME_OVER || battle_status ===NOT_IN_BATTLE)
}
export default reducer