import React, {Component} from "react";
import {Link} from 'react-router-dom';
import Modal from "../UI/Modal/Modal";
import AceEditor from "react-ace";


class GameSummaryPopup extends Component {
  state = {
    currentCode: null
  };

  componentDidUpdate() {
    if (this.props.gameResults.length > 0) {
      if (this.state.currentCode === null) {
        this.setState({
          currentCode: this.props.gameResults[0].userCode
        })
      }
    }
  };

  showCodeHandler = (index) => {
    console.log(index);
    this.setState({
      currentCode: this.props.gameResults[index].userCode
    })
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
              showPrintMargin={true}
              showGutter={true}
              highlightActiveLine={true}
              width="500px"
              height="600px"
              value={this.state.currentCode}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: false,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 2,
              }}/>
      )
    }

    return (
        <Modal show={this.props.showSummary}>
          <h1>Game Summary</h1>
          <Link to="/lobby">
            <button>Back to Lobby</button>
          </Link>
          {
            this.props.gameResults.map((result, index) => (
                <h4 onClick={() => this.showCodeHandler(index)}>{index + 1}.) {result.username} | {result.time / 1000}sec</h4>
            ))
          }
          {displayCode}
        </Modal>
    );
  }
};

export default GameSummaryPopup;