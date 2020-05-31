import { GET_LINEUP, CONTACT_ERROR, SET_CURRENT, CLEAR_CURRENT } from '../types'

export default (state, action) => {
  switch (action.type) {
    case GET_LINEUP:
      return {
        ...state,
        goalkeeper: action.payload.goalkeeper,
        defenders: action.payload.defenders,
        midfielders: action.payload.midfielders,
        forwards: action.payload.forwards,
        subs: action.payload.subs,
        players: action.payload.players,
      }
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      }
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      }
    case CONTACT_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}
