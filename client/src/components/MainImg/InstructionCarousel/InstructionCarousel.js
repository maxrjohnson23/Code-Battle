import React, {Component} from "react";
import { Carousel } from 'react-responsive-carousel';
import {Link, withRouter} from "react-router-dom";
import './InstructionCarousel.css'

export default class InstructionCarousel extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showThumbs: false,
            autoPlay: true,
            interval: 8000,
            transitionTime: 1000,
            useKeyboardArrows: true,
            // showStatus
            // showIndicators
            // thumbWidth
            infiniteLoop:true
            // selectedItem
            // axis
            // verticalSwipe
            // onChange
            // onClickItem
            // onClickThumb
            // width
            // stopOnHover
            // swipeScrollTolerance
            // swipeable
            // dynamicHeight
            // emulateTouch
            // statusFormatter
            // centerMode
            // centerSlidePercentage
        }
    }
    render() {
  
      return (
        <Carousel
            autoPlay={this.state.autoPlay}
            showThumbs={this.state.showThumbs}
            interval={this.state.interval}
            transitionTime={this.state.transitionTime}
            useKeyboardArrows={this.state.useKeyboardArrows}
            infiniteLoop={this.state.infiniteLoop}
        >
            <div>
                <div className="instruction-bg">
                    <div className="instruction-txt">
                        <div className="heading">What is Code Battle?</div>
                        <br />
                        <div>A Platform to Compete in Multiplayer Coding Challenges Against The Clock</div>
                    </div>
                </div>
            </div>
            <div>
                <div className="instruction-bg">
                    <div className="instruction-txt">
                        <div className="heading">User Stats</div>
                        <div>Create a Username to Keep Track of Your Game Statistics</div>
                    </div>
                </div>
            </div>
            <div>
                <div className="instruction-bg">
                    <div className="instruction-txt">
                    <div className="heading">Leaderboard</div>
                        <div>Win Code Battles and Earn Points to Make it Into the Top 3</div>                        
                    </div>
                </div>
            </div>
            <div>
                <div className="instruction-bg">
                    <div className="instruction-txt">
                    <div className="heading">User Driven</div>
                        <div>Create Custom Challenges for The Community</div>
                    </div>
                </div>
            </div>
            <div>
                <div className="instruction-bg">
                    <div className="instruction-txt-final">
                        <div className="play-now">Click Login to Play Now!</div>
                    </div>
                </div>
            </div>
        </Carousel>
      );
    }
  }