 
import React, { useState, useEffect } from 'react';
import './home.css';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [searchQueries, setSearchQueries] = useState({
    'level': '',
    'message': '',
    'resourceId': '',
    'traceId': '',
    'spanId': '',
    'commit': '',
    'parentResourceId': '',
  });
  const [fromTime, setFromTime] = useState('');
  const [toTime, setToTime] = useState('');
  const [logs, setLogs] = useState([]);

 
  const fetchAllLogs = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/alllogs');
      const data = await response.json();
      setLogs(data);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  // Function to handle search
  const handleSearch = async () => {
    const query = `level=${searchQueries.level}&message=${searchQueries.message}&resourceId=${searchQueries.resourceId}&traceId=${searchQueries.traceId}&spanId=${searchQueries.spanId}&commit=${searchQueries.commit}&parentResourceId=${searchQueries.parentResourceId}&fromTime=${fromTime}&toTime=${toTime}`;

    try {
      const response = await fetch(`http://localhost:3000/api/search?${query}`);
      const data = await response.json();
      setLogs(data);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  useEffect(() => {
 
    fetchAllLogs();
  }, []);

  return (
    <div className ="div1" style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
     
      <div className ="div2"   style={{ flex: '0.2', overflowY: 'auto', padding: '20px'}}>
        <div  className ="div3" style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', justifyContent: 'space-between' }}>
          <h2 style={{ marginRight: '10px' }}>Logs filter</h2>
          <Link to='/'>
            <button type="button" className="btn btn-primary"><i className="bi bi-arrow-left-circle"></i></button>
          </Link>
        </div>

        <div className="accordion" id="accordionExample">
        {Object.keys(searchQueries).map((key) => (
            <div className="accordion-item " key={key} >
              <h2 className="accordion-header" >
                <button
                  className="accordion-button "
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${key.replace(/\s+/g, '')}`}
                  aria-expanded='true'
                  aria-controls={`collapse${key.replace(/\s+/g, '')}`}
                  onClick={() => handleSearch(key)}
                 
                >
                  {key}
                </button>
              </h2>
              <div id={`collapse${key.replace(/\s+/g, '')}`} className="accordion-collapse collapse" >
                <div className="accordion-body" style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="text"
                    placeholder={`Search ${key}`}
                    value={searchQueries[key]}
                    onChange={(e) => setSearchQueries({ ...searchQueries, [key]: e.target.value })}
                    style={{ marginRight: '8px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                timestamp
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse " data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <div>
                  <label htmlFor="fromTime" className="form-label">
                    From Time:
                  </label>
                  <input
                    type="datetime-local"
                    id="fromTime"
                    value={fromTime}
                    onChange={(e) => setFromTime(e.target.value)}
                    className="form-input"
                  />

                  <label htmlFor="toTime" className="form-label">
                    To Time:
                  </label>
                  <input
                    type="datetime-local"
                    id="toTime"
                    value={toTime}
                    onChange={(e) => setToTime(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <button
              onClick={() => handleSearch()}
              style={{
                marginLeft: '6px',
                padding: '8px',
                backgroundColor: '#007BFF',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                marginTop: '10px', // Add margin to separate from accordion items
              }}
            >
              <i className="bi bi-search" style={{ marginRight: '4px' }}></i>
              <span>Search</span>
            </button>
          </div>

        </div>
      </div>

      
      <div className="div4" style={{ flex: '0.8', overflowY: 'auto', padding: '20px', boxSizing: 'border-box' }}>
        <div>
          <div className="logs-container">
            {logs.length === 0 ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div className="text-center">
                  <h2 className="mt-5">Sorry, we couldn't find any results</h2>
                  <div className="mt-3">
                    <ul className="list-unstyled">
                      <li>Search tips:</li>
                      <li>Check your spelling and try again</li>
                      <li>Try a similar but different search term</li>
                      <li>Keep your search term simple as our search facility works best with shorter descriptions</li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="log-item">
                    <p>{`"level": "${log.level}"`}</p>
                    <p>{`"message": "${log.message}"`}</p>
                    <p>{`"resourceId": "${log.resourceId}"`}</p>
                    <p>{`"timestamp": "${log.timestamp}"`}</p>
                    <p>{`"traceId": "${log.traceId}"`}</p>
                    <p>{`"spanId": "${log.spanId}"`}</p>
                    <p>{`"commit": "${log.commit}"`}</p>
                    <p>{`"metadata": ${JSON.stringify(log.metadata)}`}</p>
                  </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
