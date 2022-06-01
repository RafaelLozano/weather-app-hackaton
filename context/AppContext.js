import * as React from 'react';

const ConfigContext = React.createContext();
const initialState = {
  language: 'es',
  wheaterUnit: 'celsius'
};

function configReducer(state, action) {
  switch (action.type) {
    case 'update_wheater_unit': {
      return { wheaterUnit: action.payload };
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function ConfigProvider({ children }) {
  const [state, dispatch] = React.useReducer(configReducer, initialState);
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, dispatch };
  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  );
}

function useConfig() {
  const context = React.useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  }
  return context;
}

export { ConfigProvider, useConfig };
