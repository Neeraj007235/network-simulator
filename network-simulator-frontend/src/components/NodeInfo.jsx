import React from 'react';

const NodeInfo = ({ queues }) => {
  // Generate a unique color for each node based on its name (same as in NetworkGraph)
  const nodeColors = {
    A: '#4361ee',
    B: '#3a0ca3',
    C: '#7209b7',
    D: '#f72585',
    E: '#4cc9f0'
  };

  return (
    <div className="node-info">
      <h3 className="section-title">Node Queues</h3>
      <table>
        <thead>
          <tr>
            <th>Node</th>
            <th>Packets in Queue</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(queues).map(([node, queue]) => {
            // Determine queue status
            let status = 'Normal';
            let statusColor = '#2a9d8f';
            
            if (queue.length > 10) {
              status = 'High Load';
              statusColor = '#e63946';
            } else if (queue.length > 5) {
              status = 'Medium Load';
              statusColor = '#ffb703';
            }
            
            return (
              <tr key={node}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span 
                      style={{ 
                        display: 'inline-block', 
                        width: '16px', 
                        height: '16px', 
                        borderRadius: '50%', 
                        backgroundColor: nodeColors[node] || '#007bff' 
                      }}
                    ></span>
                    <span style={{ fontWeight: 500 }}>{node}</span>
                  </div>
                </td>
                <td>{queue.length}</td>
                <td>
                  <span 
                    style={{ 
                      display: 'inline-block',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      backgroundColor: statusColor,
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: 500
                    }}
                  >
                    {status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default NodeInfo;
