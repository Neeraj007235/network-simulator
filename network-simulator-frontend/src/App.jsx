import React, { useEffect, useState } from 'react';
import axios from 'axios';

import NetworkGraph from './components/NetworkGraph';
import NodeInfo from './components/NodeInfo';
import LinkUsageChart from './components/LinkUsageChart';

import './styles.css';

const nodes = ['A', 'B', 'C', 'D', 'E'];
const links = [
  { from: 'A', to: 'B', capacity: 100 },
  { from: 'A', to: 'C', capacity: 50 },
  { from: 'B', to: 'D', capacity: 80 },
  { from: 'C', to: 'D', capacity: 70 },
  { from: 'D', to: 'E', capacity: 100 },
];

const API_BASE =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:5000/api'
    : '/api';

function App() {
  const [state, setState] = useState({
    queues: {},
    linkUsage: {},
  });
  const [loading, setLoading] = useState(false);

  // Polling simulation state every second
  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        axios.get(`${API_BASE}/state`)
          .then(res => setState(res.data))
          .catch(err => console.error(err));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [loading]);

  // Start simulation
  const startSimulation = () => {
    setLoading(true);
    axios.post(`${API_BASE}/start`)
      .then(() => {
        console.log('Simulation started');
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h2>Network Traffic Simulator</h2>
        <button className="button" onClick={startSimulation} disabled={loading}>
          {loading ? 'Running...' : 'Start Simulation'}
        </button>
      </header>

      <div className="simulation-container">
        <div className="graph-section">
          <h3 className="section-title">Network Topology</h3>
          <NetworkGraph nodes={nodes} links={links} linkUsage={state.linkUsage} />
        </div>
        
        <div className="data-section">
          <div className="info-card">
            <NodeInfo queues={state.queues} />
          </div>
          <div className="info-card">
            <LinkUsageChart links={links} linkUsage={state.linkUsage} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
