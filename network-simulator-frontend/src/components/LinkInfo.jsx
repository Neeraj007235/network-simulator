// src/components/LinkInfo.js
import React from 'react';

const LinkInfo = ({ links, linkUsage }) => {
  // Generate a unique color for each node based on its name (same as in NetworkGraph)
  const nodeColors = {
    A: '#4361ee',
    B: '#3a0ca3',
    C: '#7209b7',
    D: '#f72585',
    E: '#4cc9f0'
  };

  return (
    <div className="link-info">
      <h3 className="section-title">Link Usage</h3>
      <table>
        <thead>
          <tr>
            <th>Link</th>
            <th>Capacity</th>
            <th>Current Load</th>
            <th>Utilization</th>
          </tr>
        </thead>
        <tbody>
          {links.map(({ from, to, capacity }) => {
            const key = [from, to].sort().join('-');
            const load = linkUsage[key] || 0;
            const percentLoad = Math.round((load / capacity) * 100);
            
            // Determine color based on load percentage
            let loadColor;
            if (percentLoad > 80) {
              loadColor = '#e63946'; // Red for high load
            } else if (percentLoad > 50) {
              loadColor = '#ffb703'; // Yellow for medium load
            } else {
              loadColor = '#2a9d8f'; // Green for low load
            }
            
            return (
              <tr key={key}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span 
                      style={{ 
                        display: 'inline-block', 
                        width: '12px', 
                        height: '12px', 
                        borderRadius: '50%', 
                        backgroundColor: nodeColors[from] || '#007bff' 
                      }}
                    ></span>
                    <span>{from}</span>
                    <span style={{ margin: '0 4px' }}>-</span>
                    <span 
                      style={{ 
                        display: 'inline-block', 
                        width: '12px', 
                        height: '12px', 
                        borderRadius: '50%', 
                        backgroundColor: nodeColors[to] || '#007bff' 
                      }}
                    ></span>
                    <span>{to}</span>
                  </div>
                </td>
                <td>{capacity} pkts</td>
                <td>{load} pkts</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ 
                      position: 'relative', 
                      height: '8px', 
                      backgroundColor: '#e9ecef', 
                      borderRadius: '4px',
                      width: '60px',
                      overflow: 'hidden'
                    }}>
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          height: '100%',
                          backgroundColor: loadColor,
                          width: `${percentLoad}%`,
                          borderRadius: '4px',
                          transition: 'width 0.5s ease-out, background-color 0.5s ease'
                        }}
                      ></div>
                    </div>
                    <span>{percentLoad}%</span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LinkInfo;
