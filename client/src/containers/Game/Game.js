import React, { Component } from 'react';

class Game extends Component {
    state = {
        admin: '',
        players: [],
        question: null,
        occupancy: 0,
        active: false
    }

    startGame = () => {
        this.state.active = true;
        

    }


}