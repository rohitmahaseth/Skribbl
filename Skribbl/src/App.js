import './App.css';
import { BrowserRouter, Switch } from 'react-router-dom'
import { Route } from 'react-router-dom';
import Home from './Components/Home';
import Play from './Components/Play';
import { Provider } from "react-redux"
import store from './redux/store';
import './index.css';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={Home}></Route>
          <Route path='/play' exact component={Play}></Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

