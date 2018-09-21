import React from 'react'
import {Provider} from 'react-redux'
import App, {Container} from "next/app";
import withRedux from "next-redux-wrapper";
import createMyStore from "../src/store";
import reducer from '../src/reducer'

const makeStore = (initialState, options) => {
  return createMyStore(reducer, initialState);
};

export default withRedux(makeStore, {debug: true})(class MyApp extends App {

    static async getInitialProps({Component, ctx}) {
        return {
            pageProps: {
                // Call page-level getInitialProps
                ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
            }
        };
    }

    render() {
        const {Component, pageProps, store} = this.props;
        return (
            <Container>
                <Provider store={store}>
                    <Component {...pageProps} />
                </Provider>
            </Container>
        );
    }

});