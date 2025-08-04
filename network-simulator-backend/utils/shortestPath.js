function findShortestPath(nodes, links, start, end) {
  const graph = {};
  nodes.forEach(n => graph[n] = []);
  links.forEach(l => {
    graph[l.from].push(l.to);
    graph[l.to].push(l.from); // bidirectional
  });

  const queue = [[start]];
  const visited = new Set();

  while (queue.length > 0) {
    const path = queue.shift();
    const node = path[path.length - 1];

    if (node === end) return path;

    if (!visited.has(node)) {
      visited.add(node);
      graph[node].forEach(neighbor => {
        queue.push([...path, neighbor]);
      });
    }
  }

  return null;
}

export { findShortestPath };
