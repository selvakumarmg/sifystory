import React from 'react';
import Navigator from './src/navigators';
import {Provider} from 'react-redux';
import store from './src/services/store';

const App = () => {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
};

export default App;
