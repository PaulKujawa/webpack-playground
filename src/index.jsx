import React from "react";
import ReactDOM from "react-dom";

import './index.css'
import ImageDogeUrl from './assets/doge.jpg';
import(/* webpackPreload: true */ 'lodash');

const App = () => {
    const [input, setInput] = React.useState('');

    const onClick = () => {
        // dynamic import for code splitting, i.e. creates a separate bundle for lodash.
        import(/* webpackPreload: true */ 'lodash').then(({default: _}) => {
            const msg = _.join(['this', 'actually', 'worked']);
            console.log(msg);
        })
    }

    return <div className="root">
        <div className="header">Hello Webpack</div>

        <img style={{height: '400px', width: '400px'}} src={ImageDogeUrl} />
        <input value={input} onChange={event => setInput(event.target.value)} />

        <button onClick={() => onClick()}>clicky</button>
    </div>
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);