import React from 'react';
import "styles/global.scss";
import { wrapper } from '@redux/store';

const WrappedApp = (ctx) => {
  const { Component, pageProps, router } = ctx;

  return <Component {...pageProps} key={router.route} />
};

export default wrapper.withRedux(WrappedApp);
