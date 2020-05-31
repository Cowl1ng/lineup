import React, { useReducer } from 'react'
import Axios from 'axios'
import LineupContext from './lineupContext'
import LineupReducer from './lineupReducer'
import { GET_LINEUP, CONTACT_ERROR, SET_CURRENT, CLEAR_CURRENT } from '../types'

const LineupState = (props) => {
  const initialState = {
    goalkeeper: [],
    defenders: [],
    midfielders: [],
    forwards: [],
    subs: [],
    players: [],
    current: null,
    comparison: null,
    filtered: null,
    error: null,
  }

  const [state, dispatch] = useReducer(LineupReducer, initialState)

  // Get lineup
  const getLineup = async () => {
    try {
      const res = await Axios.get('/api/lineup')

      dispatch({ type: GET_LINEUP, payload: res.data })
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error })
    }
  }

  // Set current player
  const setCurrent = (player) => {
    dispatch({ type: SET_CURRENT, payload: player })
  }

  // Clear current player
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT })
  }

  // Switch players
  const switchPlayers = (player, current, lineup) => {
    const goalkeeper = []
    const defenders = []
    const midfielders = []
    const forwards = []
    const subs = []

    // Populate position arrays
    lineup.forEach((player) => {
      if (player.position === 'Goalkeeper' && player.playing === true) {
        goalkeeper.push(player)
      } else if (player.position === 'Defender' && player.playing === true) {
        defenders.push(player)
      } else if (player.position === 'Midfielder' && player.playing === true) {
        midfielders.push(player)
      } else if (player.position === 'Forward' && player.playing === true) {
        forwards.push(player)
      } else {
        subs.push(player)
      }
    })

    // Check one is starter and 1 is sub
    if (player.playing !== current.playing) {
      if (player.position !== current.position) {
        // Check formation
        if (
          player.position === 'Goalkeeper' ||
          current.position === 'Goalkeeper'
        ) {
          clearCurrent()
          return
        } else if (defenders.length === 3) {
          if (player.playing === true && player.position === 'Defender') {
            clearCurrent()
            return
          } else if (
            current.playing === true &&
            current.position === 'Defender'
          ) {
            clearCurrent()
            return
          }
        }
        if (midfielders.length === 5) {
          if (player.playing === false && player.position === 'Midfielder') {
            clearCurrent()
            return
          } else if (
            current.playing === false &&
            current.position === 'Midfielder'
          ) {
            clearCurrent()
            return
          }
        }
        if (forwards.length === 3) {
          if (player.playing === false && player.position === 'Forward') {
            clearCurrent()
            return
          } else if (
            current.playing === false &&
            current.position === 'Forward'
          ) {
            clearCurrent()
            return
          }
        }
      }
      // Switch playing values
      const cPlaying = current.playing
      const pPLaying = player.playing
      let updatedPlayer = {}
      let updatedCurrent = {}

      lineup.forEach((item) => {
        if (item.name === player.name) {
          item.playing = cPlaying
          updatedPlayer = item
        } else if (item.name === current.name) {
          item.playing = pPLaying
          updatedCurrent = item
        }
      })
      // Repopulate arrays
      const newGoalkeeper = []
      const newDefenders = []
      const newMidfielders = []
      const newForwards = []
      const newSubs = []

      lineup.forEach((player) => {
        if (player.position === 'Goalkeeper' && player.playing === true) {
          newGoalkeeper.push(player)
        } else if (player.position === 'Defender' && player.playing === true) {
          newDefenders.push(player)
        } else if (
          player.position === 'Midfielder' &&
          player.playing === true
        ) {
          newMidfielders.push(player)
        } else if (player.position === 'Forward' && player.playing === true) {
          newForwards.push(player)
        } else {
          newSubs.push(player)
        }
      })

      const response = {
        goalkeeper: newGoalkeeper,
        defenders: newDefenders,
        midfielders: newMidfielders,
        forwards: newForwards,
        subs: newSubs,
        players: lineup,
      }

      dispatch({ type: GET_LINEUP, payload: response })
      lineupUpdate(updatedPlayer, updatedCurrent)
      // Set current to null
      clearCurrent()
      return
    } else {
      setCurrent(player)
      return
    }
  }

  // Update lineup
  const lineupUpdate = async (player1, player2) => {
    const changedPlayers = {
      player1,
      player2,
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    try {
      const updatedPLayers = await Axios.put(
        '/api/lineup',
        changedPlayers,
        config
      )
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg })
    }
  }

  return (
    <LineupContext.Provider
      value={{
        goalkeeper: state.goalkeeper,
        defenders: state.defenders,
        midfielders: state.midfielders,
        forwards: state.forwards,
        subs: state.subs,
        players: state.players,
        current: state.current,
        comparison: state.comparison,
        filtered: state.filtered,
        error: state.error,
        getLineup,
        setCurrent,
        clearCurrent,
        switchPlayers,
      }}
    >
      {props.children}
    </LineupContext.Provider>
  )
}

export default LineupState
