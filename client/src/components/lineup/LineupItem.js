import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LineupContext from '../../context/lineup/lineupContext'
import { Card } from 'react-bootstrap'

class LineupItem extends Component {
  static contextType = LineupContext
  constructor(props) {
    super(props)
    this.onSelect = this.onSelect.bind(this)
    this.deSelect = this.deSelect.bind(this)
  }

  onSelect() {
    if (this.context.current === null) {
      this.context.setCurrent(this.props.player)
    } else
      this.context.switchPlayers(
        this.props.player,
        this.context.current,
        this.context.players
      )
  }

  deSelect() {
    this.context.clearCurrent(this.props.player)
  }

  render() {
    const { name } = this.props.player
    const { current } = this.context
    return (
      <Card
        bg={current !== null && current.name === name ? 'success' : 'light'}
        onClick={
          current !== null && current.name === name
            ? this.deSelect
            : this.onSelect
        }
      >
        <h3 className='text-primary text-center' style={{ fontSize: 'large' }}>
          <p>Name: {name}</p>
        </h3>
      </Card>
    )
  }
}

LineupItem.propTypes = {
  player: PropTypes.object.isRequired,
}

export default LineupItem
