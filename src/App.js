import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider} from 'react-redux';
import { Container } from 'reactstrap';
import store from './store';

import { loadUserAH } from './actions/authActions';

import AppNavbar from './components/AppNavbar';
import Index from './components/Index';
import { useEffect } from 'react';
import Node from './components/nodes/Node';

function App() {
  useEffect(() => {
    store.dispatch(loadUserAH());
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <AppNavbar />
          <Container>
            <Switch>
              <Route path="/" exact component={Index} />
              <Route path="/node/:nodeid" component={Node} />
            </Switch>
          </Container>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
