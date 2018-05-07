import React from 'react';
import {Motion, spring} from '../../src/react-motion';

const springSettings = {stiffness: 170, damping: 26};
const NEXT = 'show-next';

export default class InstructionsText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instructions: ["Step1", "Step2", "Step3", "Step4", "Step5", "Step6"],
      currInstruction: 0,
    };
  };

  handleChange = ({target: {value}}) => {
    this.setState({currInstruction: value});
  };

  clickHandler = (btn) => {
    let photoIndex = btn === NEXT ? this.state.currInstruction+1 : this.state.currInstruction-1;

    photoIndex = photoIndex >= 0 ? photoIndex : this.state.instructions.length - 1;
    photoIndex = photoIndex >= this.state.instructions.length ? 0 : photoIndex;

    this.setState({
      currInstruction: photoIndex
    })
  };

  render() {
    const {instructions, currInstruction} = this.state;
    const [currWidth, currHeight] = instructions[currInstruction];

    const widths = instructions.map(([origW, origH]) => currHeight / origH * origW);

    const leftStartCoords = widths
      .slice(0, currInstruction)
      .reduce((sum, width) => sum - width, 0);

    let configs = [];
    instructions.reduce((prevLeft, [origW, origH], i) => {
      configs.push({
        left: spring(prevLeft, springSettings),
        height: spring(currHeight, springSettings),
        width: spring(widths[i], springSettings),
      });
      return prevLeft + widths[i];
    }, leftStartCoords);

    return (
      <div>
        <div>Scroll Me</div>
        <button onClick={this.clickHandler.bind(null, '')}>Previous</button>
        <input
          type="range"
          min={0}
          max={instructions.length - 1}
          value={currInstruction}
          onChange={this.handleChange} />
        <button onClick={this.clickHandler.bind(null, NEXT)}>Next</button>
        <div className="demo4">
          <Motion style={{height: spring(currHeight), width: spring(currWidth)}}>
            {container =>
              <div className="demo4-inner" style={container}>
                {configs.map((style, i) =>
                  <Motion key={i} style={style}>
                    {style =>
                    //   <img className="demo4-photo" src={`./${i}.jpg`} style={style} />
                      <p>{this.state.instructions[{i}]}</p>
                    }
                  </Motion>
                )}
              </div>
            }
          </Motion>
        </div>
      </div>
    );
  };
}