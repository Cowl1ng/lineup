import React, { useContext, useEffect, Fragment } from 'react'
import AuthContext from '../../context/auth/authContext'
import LineupContext from '../../context/lineup/lineupContext'

import LineupItem from '../lineup/LineupItem'
import Spinner from '../layout/Spinner'
import { Container, Row, Col, Button } from 'react-bootstrap'
import CurrentPlayer from '../lineup/CurrentPlayer'

const Lineup = () => {
  const lineupContext = useContext(LineupContext)
  const authContext = useContext(AuthContext)
  const {
    getLineup,
    goalkeeper,
    defenders,
    midfielders,
    forwards,
    subs,
    current,
  } = lineupContext
  const { loadUser } = authContext

  useEffect(() => {
    loadUser()
    getLineup()
  }, []) // eslint-disable-line

  const noCurrent = (
    <Container fluid>
      <Row>
        <Col></Col>
        <Col>
          <Row>
            <Col></Col>
            <Col>
              <Fragment>
                {goalkeeper !== null ? (
                  goalkeeper.map((goalkeeper) => (
                    <LineupItem player={goalkeeper} key={goalkeeper._id} />
                  ))
                ) : (
                  <Spinner />
                )}
              </Fragment>
            </Col>
            <Col></Col>
          </Row>
          <Row>
            <Fragment>
              {defenders !== null ? (
                defenders.map((defender) => (
                  <Col>
                    <LineupItem player={defender} key={defender._id} />
                  </Col>
                ))
              ) : (
                <Spinner />
              )}
            </Fragment>
          </Row>
          <Row>
            <Fragment>
              {midfielders !== null ? (
                midfielders.map((midfielder) => (
                  <Col>
                    <LineupItem player={midfielder} key={midfielder._id} />
                  </Col>
                ))
              ) : (
                <Spinner />
              )}
            </Fragment>
          </Row>
          <Row>
            <Fragment>
              {forwards !== null ? (
                forwards.map((forward) => (
                  <Col>
                    <LineupItem player={forward} key={forward._id} />
                  </Col>
                ))
              ) : (
                <Spinner />
              )}
            </Fragment>
          </Row>
          <Row>
            <h4>Subs</h4>
          </Row>

          <Row>
            <Fragment>
              {subs !== null ? (
                subs.map((sub) => (
                  <Col>
                    <LineupItem player={sub} key={sub._id} />
                  </Col>
                ))
              ) : (
                <Spinner />
              )}
            </Fragment>
          </Row>
        </Col>
      </Row>
    </Container>
  )

  const yesCurrent = (
    <Container fluid>
      <Row>
        <Col>
          <CurrentPlayer />
        </Col>
        <Col>
          <Row>
            <Col></Col>
            <Col>
              <Fragment>
                {goalkeeper !== null ? (
                  goalkeeper.map((goalkeeper) => (
                    <LineupItem player={goalkeeper} key={goalkeeper._id} />
                  ))
                ) : (
                  <Spinner />
                )}
              </Fragment>
            </Col>
            <Col></Col>
          </Row>
          <Row>
            <Fragment>
              {defenders !== null ? (
                defenders.map((defender) => (
                  <Col>
                    <LineupItem player={defender} key={defender._id} />
                  </Col>
                ))
              ) : (
                <Spinner />
              )}
            </Fragment>
          </Row>
          <Row>
            <Fragment>
              {midfielders !== null ? (
                midfielders.map((midfielder) => (
                  <Col>
                    <LineupItem player={midfielder} key={midfielder._id} />
                  </Col>
                ))
              ) : (
                <Spinner />
              )}
            </Fragment>
          </Row>
          <Row>
            <Fragment>
              {forwards !== null ? (
                forwards.map((forward) => (
                  <Col>
                    <LineupItem player={forward} key={forward._id} />
                  </Col>
                ))
              ) : (
                <Spinner />
              )}
            </Fragment>
          </Row>
          <Row>
            <h4>Subs</h4>
          </Row>

          <Row>
            <Fragment>
              {subs !== null ? (
                subs.map((sub) => (
                  <Col>
                    <LineupItem player={sub} key={sub._id} />
                  </Col>
                ))
              ) : (
                <Spinner />
              )}
            </Fragment>
          </Row>
        </Col>
      </Row>
    </Container>
  )

  return <div>{current === null ? noCurrent : yesCurrent}</div>
}

export default Lineup
