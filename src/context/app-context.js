import React from 'react';

export function getDefaultContext() {
  // default value
  return { 
    authUserInfo: null, 
    appId: null
  }
}

export const AppContext = React.createContext({});
