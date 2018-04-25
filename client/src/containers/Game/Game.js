import React, { Component } from 'react';

class Game extends Component {
    state = {
        admin: '',
        players: [],
        question: null,
        occupancy: 0,
        active: false
    }

    startGame = (players) => {
        this.setState({

        })
        this.state.active = true;   
        this.state.players.push(players);
    }

    render() {
        
    }


}