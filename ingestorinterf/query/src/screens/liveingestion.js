 


import React, { useState ,useEffect} from "react";
import { Link } from 'react-router-dom';
import './realhome.css';

const LiveIngestion = () => {
  const getInitialDarkMode = () => {
    return JSON.parse(localStorage.getItem('darkMode')) || false;
  };
  const [logData, setLogData] = useState({
    level: "",
    message: "",
    resourceId: "",
    timestamp: "",
    traceId: "",
    spanId: "",
    commit: "",
    metadata: {
      parentResourceId: "",
    },
  });
  const [darkMode, setDarkMode] = useState(getInitialDarkMode);

  useEffect(() => {
    document.body.classList.toggle('dark-mode-variables', darkMode);
  }, [darkMode]);

  useEffect(() => {
    // Listen for changes to dark mode from the Home page
    window.addEventListener('storage', handleStorageChange);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStorageChange = () => {
    // Update the dark mode state when it changes in local storage
    setDarkMode(getInitialDarkMode());
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "parentResourceId") {
      setLogData((prevData) => ({
        ...prevData,
        metadata: {
          ...prevData.metadata,
          parentResourceId: value,
        },
      }));
    } else {
      setLogData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/ingest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([logData]),
      });

      if (response.ok) {
        alert("Log ingestion successful");
      } else {
        const errorData = await response.json();
        alert(`Log ingestion failed: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while ingesting the log.");
    }
  };

  // const handleBack = () => {
  //   window.history.back();
  // };

  return (
    <div className="container mt-4 d-flex justify-content-center">
      <div style={{ width: '400px' }} className="shadow p-4 rounded">
      <Link to='/'>
            <button type="button" className="btn btn-primary"><i className="bi bi-arrow-left-circle"></i></button>
          </Link>
        
        <h2 className="mb-4" style={{ display: 'flex', justifyContent: "center" }}>Log Ingestion Form</h2>
        <form >
<div className="form-group">
    <label htmlFor="level">Log Level:</label>
    <input
        type="text"
        className="form-control"
        id="level"
        name="level"
        value={logData.level}
        onChange={handleChange}
        required
    />
</div>

<div className="form-group">
    <label htmlFor="message">Message:</label>
    <input
        type="text"
        className="form-control"
        id="message"
        name="message"
        value={logData.message}
        onChange={handleChange}
        required
    />
</div>

<div className="form-group">
    <label htmlFor="resourceId">Resource ID:</label>
    <input
        type="text"
        className="form-control"
        id="resourceId"
        name="resourceId"
        value={logData.resourceId}
        onChange={handleChange}
        required
    />
</div>

<div className="form-group">
    <label htmlFor="timestamp">Timestamp:</label>
    <input
        type="datetime-local"
        className="form-control"
        id="timestamp"
        name="timestamp"
        value={logData.timestamp}
        onChange={handleChange}
        required
    />
</div>

<div className="form-group">
    <label htmlFor="traceId">Trace ID:</label>
    <input
        type="text"
        className="form-control"
        id="traceId"
        name="traceId"
        value={logData.traceId}
        onChange={handleChange}
        required
    />
</div>

<div className="form-group">
    <label htmlFor="spanId">Span ID:</label>
    <input
        type="text"
        className="form-control"
        id="spanId"
        name="spanId"
        value={logData.spanId}
        onChange={handleChange}
        required
    />
</div>

<div className="form-group">
    <label htmlFor="commit">Commit:</label>
    <input
        type="text"
        className="form-control"
        id="commit"
        name="commit"
        value={logData.commit}
        onChange={handleChange}
        required
    />
</div>

<div className="form-group">
    <label htmlFor="parentResourceId">Parent Resource ID:</label>
    <input
        type="text"
        className="form-control"
        id="parentResourceId"
        name="parentResourceId"
        value={logData.metadata.parentResourceId}
        onChange={handleChange}
    />
</div>

    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <button
            onClick={() => handleSubmit()}
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
            
            <span>Submit</span>
        </button>
    </div>
</form>
      </div>
    </div>
  );
};

export default LiveIngestion;
