import React, {Component} from "react";
import { Carousel } from 'react-responsive-carousel';
import './InstructionCarousel.css'

export default class InstructionCarousel extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showThumbs: false,
            autoPlay: true,
            interval: 8000,
            transitionTime: 1000,
            useKeyboardArrows: true
            // showStatus
            // showIndicators
            // thumbWidth
            // infiniteLoop
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
        >
            <div>
                <div className="instruction-bg">
                    <div className="instruction-txt">
                        Instruction 1
                    </div>
                </div>
            </div>
            <div>
                <div className="instruction-bg">
                    <div className="instruction-txt">
                        Instruction 2
                    </div>
                </div>
            </div>
            <div>
                <div className="instruction-bg">
                    <div className="instruction-txt">
                        Instruction 3
                    </div>
                </div>
            </div>
            <div>
                <div className="instruction-bg">
                    <div className="instruction-txt">
                        Instruction 4
                    </div>
                </div>
            </div>
            <div>
                <div className="instruction-bg">
                    <div className="instruction-txt">
                        Instruction 5
                    </div>
                </div>
            </div>
        </Carousel>
      );
    }
  }