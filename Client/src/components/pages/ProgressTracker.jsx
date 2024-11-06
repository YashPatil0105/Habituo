import React, { useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

// Register the necessary components with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title
);

export const ProgressTracker = () => {
  const [data] = useState({
    dailyProgress: [5, 10, 15, 12, 20, 18, 22], // Sample daily progress data
    weeklyProgress: [50, 70, 90], // Sample weekly progress data
    completionRates: {
      challenge1: 80,
      challenge2: 65,
      challenge3: 90,
    },
  });

  // Data for bar chart (weekly progress)
  const barChartData = {
    labels: ['Week 1', 'Week 2', 'Week 3'],
    datasets: [
      {
        label: 'Progress',
        data: data.weeklyProgress,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Data for line chart (daily progress)
  const lineChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Daily Progress',
        data: data.dailyProgress,
        fill: false,
        borderColor: 'rgba(255, 99, 132, 1)',
        tension: 0.1,
      },
    ],
  };

  // Data for pie chart (task completion rates)
  const pieChartData = {
    labels: Object.keys(data.completionRates),
    datasets: [
      {
        data: Object.values(data.completionRates),
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
      },
    ],
  };

  // Calculate performance comparison
  const performanceComparison =
    data.weeklyProgress.length > 1
      ? data.weeklyProgress[2] > data.weeklyProgress[1]
        ? `${(((data.weeklyProgress[2] - data.weeklyProgress[1]) / data.weeklyProgress[1]) * 100).toFixed(2)}% better than last week`
        : `${(((data.weeklyProgress[1] - data.weeklyProgress[2]) / data.weeklyProgress[1]) * 100).toFixed(2)}% worse than last week`
      : '';

  return (
    <div className="min-h-screen p-5 bg-gray-900 text-white">
      <header className="mb-5">
        <h1 className="text-2xl font-bold">Progress Tracker</h1>
        <p className="text-gray-400">
          Track your progress over time and stay motivated!
        </p>
      </header>

      <section className="bg-gray-800 rounded-lg shadow-lg p-5 mb-5">
        <h2 className="text-xl font-semibold mb-4">Daily Progress Over Time</h2>
        <Line data={lineChartData} options={{ plugins: { legend: { display: true } } }} />
      </section>

      <section className="bg-gray-800 rounded-lg shadow-lg p-5 mb-5">
        <h2 className="text-xl font-semibold mb-4">Weekly Progress Comparison</h2>
        <Bar data={barChartData} options={{ plugins: { legend: { display: true } } }} />
        <p className="mt-3 text-sm text-gray-400">
          {performanceComparison}
        </p>
      </section>

      <section className="bg-gray-800 rounded-lg shadow-lg p-5 mb-5">
        <h2 className="text-xl font-semibold mb-4">Completion Rates</h2>
        <Pie data={pieChartData} options={{ plugins: { legend: { position: 'top' } } }} />
        <div className="mt-3">
          {Object.keys(data.completionRates).map((challenge) => (
            <div key={challenge} className="flex justify-between">
              <span className="text-gray-400">{challenge.replace('challenge', 'Challenge ')}:</span>
              <span className="text-white">{data.completionRates[challenge]}%</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// export default ProgressTracker;
