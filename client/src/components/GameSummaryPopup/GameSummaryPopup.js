import React, {Component} from "react";
import {Link} from "react-router-dom";
import Modal from "../UI/Modal/Modal";
import Wrapper from "../../hoc/Wrapper/Wrapper";
import AceEditor from "react-ace";
import "./GameSummaryPopup.css";


class GameSummaryPopup extends Component {
  state = {
    currentCode: null
  };

  componentDidUpdate() {
    if (this.props.gameResults.length > 0) {
      if (this.state.currentCode === null) {
        this.setState({
          currentCode: this.props.gameResults[0].userCode
        });
      }
    }
  };

  showCodeHandler = (index) => {
    console.log(index);
    this.setState({
      currentCode: this.props.gameResults[index].userCode
    });
  };

  render() {
    let displayCode = null;
    if (this.state.currentCode) {
      displayCode = (
          <AceEditor
              mode="javascript"
              theme="monokai"
              name="editor"
              onLoad={this.onLoad}
              fontSize={18}
              showPrintMargin={false}
              showGutter={false}
              highlightActiveLine={true}
              width="100%"
              height="300px"
              value={this.state.currentCode}
              setOptions={{
                enableBasicAutocompletion: false,
                enableLiveAutocompletion: false,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 2,
                readOnly: true,
                fontSize: 16
              }}/>
      );
    }

    let gameSummary = null;

    if (this.props.gameResults.length !== 0) {
      gameSummary = (
          <Wrapper>
            <h1>Game Summary</h1>
            <div className="game-summary-results">
              <ul className="ranking-list">
                {
                  this.props.gameResults.map((result, index) => {
                    let sec = result.time / 1000;
                    let minutes = Math.floor(sec / 60);
                    sec = sec%60;
                    let time =  minutes.toString().padStart(2, "0") +":" + sec.toString().padStart(2,"0");
                    return (
                        <li key={result.username} className="rankings"
                            onClick={() => this.showCodeHandler(index)}>{index + 1}. {result.username}   -   {time}</li>
                    )
                  })
                }
              </ul>
              <div className="summary-editor">
                {displayCode}
              </div>
            </div>
          </Wrapper>
      );
    } else {
      gameSummary = (
          <h1>No winners!</h1>
      );
    }

    return (
        <div className="game-summary-modal">
          <Modal show={this.props.showSummary}>
            {gameSummary}
            <Link to="/lobby">
              <button className="lobby-button">Back to Lobby</button>
            </Link>
          </Modal>
        </div>

    );
  }
};

export default GameSummaryPopup;