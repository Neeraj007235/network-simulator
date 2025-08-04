export const nodes = ['A', 'B', 'C', 'D', 'E'];

export const trafficRates = {
  A: 50,
  B: 30,
  C: 40,
  D: 20,
  E: 60,
};

export const links = [
  { from: 'A', to: 'B', capacity: 100 },
  { from: 'A', to: 'C', capacity: 50 },
  { from: 'B', to: 'D', capacity: 80 },
  { from: 'C', to: 'D', capacity: 70 },
  { from: 'D', to: 'E', capacity: 100 },
];
