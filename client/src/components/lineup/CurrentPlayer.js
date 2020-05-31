import React, { useContext, useEffect, useState } from 'react'
import LineupContext from '../../context/lineup/lineupContext'
import { Card, Button } from 'react-bootstrap'

const CurrentPlayer = () => {
  const lineupContext = useContext(LineupContext)

  const { current } = lineupContext

  useEffect(() => {
    if (current !== null) {
      setPlayer(current)
    } else
      setPlayer({
        name: '',
        country: '',
        captain: '',
        vice_captain: '',
        mvp_odds: '',
        fgoal_odds: '',
        playing: '',
        position: '',
      })
  }, [lineupContext, current])

  const [player, setPlayer] = useState({
    name: '',
    country: '',
    captain: '',
    vice_captain: '',
    mvp_odds: '',
    fgoal_odds: '',
    playing: '',
    position: '',
  })

  const {
    name,
    country,
    captain,
    vice_captain,
    mvp_odds,
    fgoal_odds,
    playing,
    position,
  } = player

  return (
    <div>
      <Card bg='light'>
        <h3
          className='text-primary text-center'
          style={{ fontSize: 'x-large' }}
        >
          {current !== null ? (
            <div>
              <p>Name: {name}</p>
              <p>position: {position}</p>
              <p>Playing: {playing ? 'Playing' : 'Sub'}</p>
            </div>
          ) : (
            <p>Select a player</p>
          )}
        </h3>
        <Button>Compare</Button>
        <Button></Button>
      </Card>
    </div>
  )
}

export default CurrentPlayer
