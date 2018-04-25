import React, { Component } from 'react';


class CreateGameButton extends Component {
  //determine if signed in

  createGame = (event) => {
    event.preventDefault();
    
  }

  render() {

    return (
      <div className="CreateGameButton">
        <div 
            href="#" 
            className="button blue"
            onClick={this.createGame}
         >Create Game
        </div>
      </div>
    )
  }
}

export default CreateGameButton;