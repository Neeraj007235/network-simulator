import { nodes, trafficRates, links } from '../models/network.js';
import { findShortestPath } from '../utils/shortestPath.js';

let state = {
  packets: [], // { id, from, to, path, position }
  queues: {},  // { nodeName: [packet1, packet2, ...] }
  linkUsage: {}, // {'A-B': 0, ...}
};

let packetId = 0;

// Initialize queues and linkUsage
nodes.forEach(n => (state.queues[n] = []));
links.forEach(l => {
  const key = [l.from, l.to].sort().join('-');
  state.linkUsage[key] = 0;
});

function simulateStep() {
  // Reset link usage
  for (let key in state.linkUsage) state.linkUsage[key] = 0;

  // Generate new packets
  nodes.forEach(node => {
    const rate = trafficRates[node];
    for (let i = 0; i < rate; i++) {
      const dest = getRandomNodeExcept(node);
      const path = findShortestPath(nodes, links, node, dest);
      if (path) {
        const packet = { id: packetId++, from: node, to: dest, path, position: 0 };
        state.queues[node].push(packet);
      }
    }
  });

  // Move packets
  nodes.forEach(node => {
    const queue = state.queues[node];
    const newQueue = [];

    while (queue.length) {
      const packet = queue.shift();
      const nextNode = packet.path[packet.position + 1];

      if (!nextNode) continue; // already at destination

      const linkKey = [packet.path[packet.position], nextNode].sort().join('-');
      const link = links.find(l =>
        (l.from === packet.path[packet.position] && l.to === nextNode) ||
        (l.to === packet.path[packet.position] && l.from === nextNode)
      );

      if (state.linkUsage[linkKey] < link.capacity) {
        // Send packet
        state.linkUsage[linkKey]++;
        packet.position++;
        if (packet.position < packet.path.length - 1) {
          // Not yet at destination, add to next node's queue
          state.queues[nextNode].push(packet);
        }
      } else {
        // Link is full, keep in current queue
        newQueue.push(packet);
      }
    }

    state.queues[node] = newQueue;
  });
}

function getState() {
  return {
    queues: state.queues,
    linkUsage: state.linkUsage,
    totalPackets: packetId,
  };
}

function getRandomNodeExcept(node) {
  let otherNodes = nodes.filter(n => n !== node);
  return otherNodes[Math.floor(Math.random() * otherNodes.length)];
}

export { simulateStep, getState };
