import React from "react";
import AceEditor from "react-ace";
import "./Editor.css";

import "brace/mode/javascript";
import "brace/theme/github";
import "brace/theme/monokai";


const Editor = (props) => (
    <div className="editorWrapper" onKeyDown={props.keySubmit}>
      <AceEditor
          mode="javascript"
          theme="monokai"
          name="editor"
          onLoad={this.onLoad}
          onChange={props.change}
          fontSize={18}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          width="100%"
          height="400px"
          value={props.code}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: false,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2,
          }}/>
      <button className="submitCode" onClick={props.submit}>Submit (ctrl +
        enter)
      </button>
    </div>
);

export default Editor;
