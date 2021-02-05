import React from "react";
import { Col, Container, Label, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faRedo,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timer: 1500,
      inSession: false,
      intervalFunc: "",
      breakLabel: false,
    };
    this.getTimer = this.getTimer.bind(this);
    this.reset = this.reset.bind(this);
    this.breakDecrement = this.breakDecrement.bind(this);
    this.breakIncrement = this.breakIncrement.bind(this);
    this.sessionIncrement = this.sessionIncrement.bind(this);
    this.sessionDecrement = this.sessionDecrement.bind(this);
    this.startStopTimer = this.startStopTimer.bind(this);
    this.decreaseTimer = this.decreaseTimer.bind(this);
  }

  reset() {
    if (this.state.intervalFunc !== "") {
      this.stopTimer();
    }
    this.StopBeep();
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      timer: 1500,
      inSession: false,
      intervalFunc: "",
      breakLabel: false,
    });
  }

  breakDecrement() {
    const breakLength = this.state.breakLength;
    if (breakLength > 1) {
      this.setState({ breakLength: breakLength - 1 });
    }
  }

  breakIncrement() {
    const breakLength = this.state.breakLength;
    if (breakLength < 60) {
      this.setState({ breakLength: breakLength + 1 });
    }
  }

  sessionDecrement() {
    const sessionLength = this.state.sessionLength;
    if (sessionLength > 1) {
      this.setState({
        sessionLength: sessionLength - 1,
        timer: (sessionLength - 1) * 60,
      });
    }
  }

  sessionIncrement() {
    const sessionLength = this.state.sessionLength;
    if (sessionLength < 60) {
      this.setState({
        sessionLength: sessionLength + 1,
        timer: (sessionLength + 1) * 60,
      });
    }
  }

  startStopTimer() {
    if (!this.state.inSession) {
      this.playTimer();
      this.setState({ inSession: !this.state.inSession });
    } else {
      this.stopTimer();
      this.setState({ inSession: !this.state.inSession });
    }
  }

  playTimer() {
    const interval = setInterval(this.decreaseTimer, 1000);
    this.setState({ inSession: true, intervalFunc: interval });
  }

  stopTimer() {
    clearInterval(this.state.intervalFunc);
  }

  decreaseTimer() {
    if (this.state.timer > 0) {
      this.setState({ timer: this.state.timer - 1 });
    } else if (this.state.timer === 0) {
      this.setState({
        timer: this.state.breakLength * 60,
        breakLabel: !this.state.breakLabel,
      });
      this.PlayBeep();
    }
  }

  PlayBeep() {
    const alarm = document.getElementById("beep");
    alarm.loop = "true";
    alarm.src =
      "https://res.cloudinary.com/djiuzmp1e/video/upload/v1612314359/samples/mixkit-repeating-arcade-beep-1084_nz4wjf.wav";
    alarm.play();
    setTimeout(this.StopBeep, 6200);
  }

  StopBeep() {
    const alarm = document.getElementById("beep");
    alarm.pause();
    alarm.currentTime = 0;
  }

  getTimer() {
    let minutes = Math.floor(this.state.timer / 60);
    let seconds = this.state.timer - minutes * 60;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return `${minutes}:${seconds}`;
  }

  render() {
    console.log(this.state);
    return (
      <div className="main">
        <Container className="timer">
          <Row className="justify-content-center">
            <h1 className="title">25 + 5 Clock</h1>
          </Row>
          <div className="display-and-control-timer">
            <section className="display-timer">
              <Row>
                <Col>
                  <Row className="justify-content-center">
                    <h3 id="timer-label">
                      {this.state.breakLabel ? "Break" : "Session"}
                    </h3>
                  </Row>
                  <Row className="justify-content-center">
                    <div id="time-left">{this.getTimer()}</div>
                  </Row>
                </Col>
              </Row>
              <audio id="beep" src=""></audio>
            </section>
            <section className="control-timer">
              <Row className="justify-content-center">
                <button
                  id="start_stop"
                  className="control-timer-btn"
                  onClick={this.startStopTimer}
                >
                  <FontAwesomeIcon icon={faPlay} />
                  <FontAwesomeIcon icon={faPause} />
                </button>
                <button
                  id="reset"
                  className="control-timer-btn"
                  onClick={this.reset}
                >
                  <FontAwesomeIcon icon={faRedo} />
                </button>
              </Row>
            </section>
          </div>
          <section className="config-timer">
            <Row className="justify-content-beetwen">
              <Col>
                <Label id="break-label">Break</Label>
              </Col>
              <Col>
                <Label id="session-label">Session</Label>
              </Col>
            </Row>
            <Row>
              <Col>
                <Row className="align-items-center justify-content-center">
                  <button
                    id="break-decrement"
                    className="config-timer-btn"
                    onClick={this.breakDecrement}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <div id="break-length">{this.state.breakLength}</div>
                  <button
                    id="break-increment"
                    className="config-timer-btn"
                    onClick={this.breakIncrement}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </Row>
              </Col>
              <Col>
                <Row className="align-items-center justify-content-center">
                  <button
                    id="session-decrement"
                    onClick={this.sessionDecrement}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <div id="session-length">{this.state.sessionLength}</div>
                  <button
                    id="session-increment"
                    onClick={this.sessionIncrement}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </Row>
              </Col>
            </Row>
          </section>
          <Row className='author justify-content-center'><p>By Bruno Umbelino</p></Row>
        </Container>
      </div>
    );
  }
}

export default Main;
