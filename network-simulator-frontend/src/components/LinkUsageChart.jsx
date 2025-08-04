import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const LinkUsageChart = ({ links, linkUsage }) => {
  const labels = links.map(({ from, to }) => `${from}-${to}`);
  const data = {
    labels,
    datasets: [
      {
        label: 'Link Utilization (%)',
        data: links.map(({ from, to, capacity }) => {
          const key = [from, to].sort().join('-');
          const load = linkUsage[key] || 0;
          return Math.round((load / capacity) * 100);
        }),
        backgroundColor: '#3b82f6',
      },
    ],
  };

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Link Utilization</h3>
      <Bar data={data} options={{ responsive: true, plugins: { legend: { display: false } } }} />
    </div>
  );
};

export default LinkUsageChart;
