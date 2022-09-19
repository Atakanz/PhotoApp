import React from 'react';
import {MainStack} from './src/Navigation/MainStack';
import {store} from './src/Management/store';
import {Provider} from 'react-redux'

const App = () => {
  return (
    <Provider store={store}>
      <MainStack />
    </Provider>
  );
};

export default App;