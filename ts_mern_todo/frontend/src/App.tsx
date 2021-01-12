import './App.css';

import { BrowserRouter as Router, Route } from "react-router-dom"
import TodosList from "./components/TodosList"
import CreateTodo from "./components/CreateTodo"
import EditTodo from "./components/EditTodo"
import Nav from "./components/Nav"
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

function App() {
  return (
  <Router>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>

    <div className="container">
      <Nav />
      <Route path="/" exact component={TodosList} />
      <Route path="/edit/:id" component={EditTodo} />
      <Route path="/create" component={CreateTodo} />
    </div>
    </MuiPickersUtilsProvider>
  </Router>
  );
}

export default App;
