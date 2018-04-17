import React from 'react';
import AceEditor from 'react-ace';

import "brace/mode/javascript";
import "brace/theme/github";
import "brace/theme/monokai";

let outputStyle = {
  float: 'right'
};

const Editor = (props) => (
  <AceEditor style={outputStyle}
             mode="javascript"
             theme="monokai"
             name="editor"
             onLoad={this.onLoad}
             onChange={props.change}
             fontSize={18}
             showPrintMargin={true}
             showGutter={true}
             highlightActiveLine={true}
             width="1000px"
             height="300px"
             value={props.code}
             setOptions={{
               enableBasicAutocompletion: true,
               enableLiveAutocompletion: false,
               enableSnippets: false,
               showLineNumbers: true,
               tabSize: 2,
             }}/>
);

export default Editor;
