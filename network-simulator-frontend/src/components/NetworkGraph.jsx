// src/components/NetworkGraph.js
import React from 'react';

const NetworkGraph = ({ nodes, links, linkUsage }) => {
  // Simple horizontal layout A - B - D - E with C under A and B for clarity

  const nodePositions = {
    A: { top: 20, left: 50 },
    B: { top: 20, left: 200 },
    C: { top: 100, left: 100 },
    D: { top: 20, left: 350 },
    E: { top: 20, left: 500 },
  };

  // Render nodes with enhanced styling
  const nodeElements = nodes.map(node => {
    // Generate a unique color for each node based on its name
    const nodeColors = {
      A: '#4361ee',
      B: '#3a0ca3',
      C: '#7209b7',
      D: '#f72585',
      E: '#4cc9f0'
    };
    
    return (
      <div
        key={node}
        className="node"
        style={{ 
          position: 'absolute', 
          top: nodePositions[node].top, 
          left: nodePositions[node].left,
          backgroundColor: nodeColors[node] || '#007bff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {node}
      </div>
    );
  });

  // Render links with enhanced usage visualization
  const linkElements = links.map(({ from, to, capacity }) => {
    const linkKey = [from, to].sort().join('-');
    const load = linkUsage[linkKey] || 0;
    const percentLoad = Math.round((load / capacity) * 100);

    // Better line representation
    const fromPos = nodePositions[from];
    const toPos = nodePositions[to];
    const midTop = (fromPos.top + toPos.top) / 2;
    const midLeft = (fromPos.left + toPos.left) / 2;
    
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
      <div
        key={linkKey}
        className="link"
        style={{ 
          position: 'absolute', 
          top: midTop + 40, 
          left: midLeft, 
          width: 140,
          transition: 'all 0.3s ease'
        }}
        title={`${from} - ${to}: ${load}/${capacity} packets`}
      >
        <div style={{ 
          fontSize: 13, 
          fontWeight: 500,
          marginBottom: 4,
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <span>{from}–{to}:</span> 
          <span>{load}/{capacity} ({percentLoad}%)</span>
        </div>
        <div style={{ position: 'relative', height: '8px', backgroundColor: '#e9ecef', borderRadius: '4px' }}>
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
      </div>
    );
  });

  return (
    <div style={{ position: 'relative', height: 180, marginBottom: 80, marginTop: 20 }}>
      {/* Draw lines between nodes (behind nodes) */}
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        {links.map(({ from, to }) => {
          const fromPos = nodePositions[from];
          const toPos = nodePositions[to];
          return (
            <line 
              key={`${from}-${to}-line`}
              x1={fromPos.left + 40} 
              y1={fromPos.top + 40} 
              x2={toPos.left + 40} 
              y2={toPos.top + 40}
              stroke="#dee2e6"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
          );
        })}
      </svg>
      
      {/* Nodes and link info (in front) */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {nodeElements}
        {linkElements}
      </div>
    </div>
  );
};

export default NetworkGraph;
