import React from "react";
import ReactDOM from "react-dom";
import ImageDogeUrl from "./assets/doge.jpg"; // includes domain and port
import "./index.css";

// see https://babeljs.io/docs/en/babel-polyfill
// import "core-js/stable";
import "regenerator-runtime/runtime";

import(/* webpackPreload: true */ "lodash");

const App = () => {
  const [input, setInput] = React.useState("");

  const onClick = async () => {
    const { default: _ } = await import(
      /* webpackChunkName: "lodash" */ "lodash"
    );

    const msg = _.join(["this", "actually", "worked"], " ");
    console.log(msg);
  };

  return (
    <div className="root">
      <div className="header">Hello Webpack</div>

      <img style={{ height: "400px", width: "400px" }} src={ImageDogeUrl} />
      <input value={input} onChange={(event) => setInput(event.target.value)} />

      <button onClick={() => onClick()}>clicky</button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
