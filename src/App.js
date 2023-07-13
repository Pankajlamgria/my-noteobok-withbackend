import './App.css';
import Navbar from './component/Navbar';
import Home from './component/Home';
import About from './component/About';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} 
from "react-router-dom";
import Notestate from './context/notestate';
import Editpage from './component/Editpage';
import Login from './component/Login'
import Signin from './component/Signin'


function App() {
    document.title="MyNotebook";
    return (
    <div>
      <Notestate>
      <Router>
        <Navbar/>
        <Switch>
          <Route exact path="/"><Home/></Route>
          <Route exact path="/about"><About/></Route>
          <Route exact path="/editpage"><Editpage/></Route>
          <Route exact path="/login"><Login/></Route>
          <Route exact path="/signin"><Signin/></Route>
         
        </Switch>
        </Router>
        </Notestate>
    </div>  
  );
}

export default App;
