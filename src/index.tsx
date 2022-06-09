import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/style/style.scss';
import {Provider} from 'react-redux';
import store from './store';
import {QueryClientProvider, QueryClient} from "react-query";
import {HashRouter as Router} from "react-router-dom";
import {RootCmp} from "./RootCmp";

const reactQueryClient = new QueryClient()

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <QueryClientProvider client={reactQueryClient}>
        <Provider store={store}>
            <React.StrictMode>
                <Router>
                    <RootCmp/>
                </Router>
            </React.StrictMode>
        </Provider>
    </QueryClientProvider>
)
;
