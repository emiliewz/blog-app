import ReactDOM from 'react-dom/client';

import App from './app/App.tsx';
import store from './app/store.tsx';

import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
