import React, { Component } from 'react'


class CreateGameButton extends Component {
  //determine if signed in

//   createGame () => {
    
//   }

  render() {

    return (
      <div className="CreateGameButton">
        <a 
            href="#" 
            class="button blue"
            onClick={this.createGame}
         >Create Game
        </a>
      </div>
    )
  }
}

export default CreateGameButton;