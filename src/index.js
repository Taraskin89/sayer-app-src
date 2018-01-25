import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { AppContainer } from 'react-hot-loader';

import './styles/style.scss';

import App from './containers/App';

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <BrowserRouter>
                <Component />
            </BrowserRouter>
        </AppContainer>
        , document.querySelector('#app')
    )
}

render(App);

if (module.hot) {
    module.hot.accept('./containers/App', () => {
        render(App);
    })
}
