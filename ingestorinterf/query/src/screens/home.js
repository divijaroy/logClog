import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './realhome.css';

const Home = () => {
  const getInitialDarkMode = () => {
    // Use the stored value if it exists, otherwise default to false
    return JSON.parse(localStorage.getItem('darkMode')) || false;
  };

  const [logs, setLogs] = useState([]);
  const [darkMode, setDarkMode] = useState(getInitialDarkMode);

  // Update local storage whenever darkMode changes
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    // Add dark-mode-variables class to body when darkMode is true
    document.body.classList.toggle('dark-mode-variables', darkMode);
  }, [darkMode]);
  const fetchLogs = async () => {
    try {
      let url = 'http://localhost:3000/api/alllogs';

      // If timestamps are chosen, modify the URL 
      const response = await fetch(url);
      const data = await response.json();
      setLogs(data);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const toggleDarkMode = () => {
    // Use the previous value of darkMode directly without a function argument
    setDarkMode(!darkMode);
  };


  return (
    <div className="container">
      <aside>
        
          <div  className="title"style={{display:"flex",justifyContent:"space-between"}}>
            <p style={{ fontSize: "38px",marginBottom:"0px" }}>Log</p>
            <p style={{ fontSize: "40px" ,marginBottom:"0px",color: "#FF0060"}}>Clog</p>
          </div>
         
        

        <div className="sidebar">
          <Link to="/Dashboard"  style={{ textDecoration: 'none' }}>
           <div><span style={{ fontSize:'20px'}}>Filters</span></div> 
          </Link>
          <Link to="/liveingestion"  style={{ textDecoration: 'none' }}>
            <span style={{ fontSize:'20px'}}>Ingestion</span>
          </Link>
        </div>
      </aside>

      <main>
        <div style={{marginTop:"45px", display:"flex",justifyContent:'space-between'}}>
        <div>
        <p style={{ fontSize: "28px"  }}>Analytics</p>
        <p style={{ fontSize: "38px" ,color:"#28cb8b",marginBottom:"0px"}}>{logs.length}</p>
        </div>
        <div className="toggle" onClick={toggleDarkMode}>
          
          <button className="dark-mode-toggle">
    {darkMode ? (
        // Moon character for dark mode
        <span role="img" aria-label="moon"  style={{ fontSize: "20px",backgroundColor: " #f6f6f9" ,border:"0px",margin:"0px"}}>&#127769;</span>
    ) : (
        // Sun character for light mode
        <span role="img" aria-label="sun"  style={{backgroundColor: "#f6f6f9" , fontSize: "32px" }}>&#9728;</span>
    )}
        </button>
        </div>
        
        </div>
        <div className="recent-orders">
          <table>
            <thead>
              <tr>
                <th>Level</th>
                <th>Message</th>
                <th>Resource ID</th>
                <th>Timestamp</th>
                <th>Trace ID</th>
                <th>Span ID</th>
                <th>Commit</th>
                <th>Metadata</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <tr key={index}>
                  <td>{log.level}</td>
                  <td>{log.message}</td>
                  <td>{log.resourceId}</td>
                  <td>{log.timestamp}</td>
                  <td>{log.traceId}</td>
                  <td>{log.spanId}</td>
                  <td>{log.commit}</td>
                  <td>{JSON.stringify(log.metadata)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Home;
