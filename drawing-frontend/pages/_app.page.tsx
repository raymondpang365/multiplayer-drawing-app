import React from 'react';
import "styles/global.scss";
import { wrapper } from '@redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { useStore } from "react-redux";

const WrappedApp = (ctx) => {
  const { Component, pageProps, router } = ctx;
  const store: any = useStore();

  return (
    <PersistGate persistor={store.__persistor} loading={null}>
      <Component {...pageProps} key={router.route} />
    </PersistGate>
  )
};

export default wrapper.withRedux(WrappedApp);
