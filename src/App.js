import './App.css';
import Collection from './Collections';
import CreateCollection from './CreateCollection';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './Nav';
import EditComponent from './editCollection';
import Fourofour from './fof';

function App(props) {
  return (
    <div className="App">
      <Router>
      <Nav/>
        <Routes>
          <Route path="/" exact element={<Collection {...props}/>}/>
          <Route path="/create" exact element={<CreateCollection {...props}/>}/>
          <Route path="/show/:id" exact element={<EditComponent {...props}/>}/>
          <Route path=":any" element={<Fourofour/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
