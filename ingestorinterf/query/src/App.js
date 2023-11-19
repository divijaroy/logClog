 
import Home from './screens/home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Dashboard from './screens/Dashboard';
import LiveIngestion from './screens/liveingestion';
function App() {
  return (
    <>
     
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/dashboard" element={<Dashboard/>} />
            <Route exact path="/liveingestion" element={<LiveIngestion/>} />
          

          </Routes>
        </Router>
      
    </>
  );
}

export default App;
