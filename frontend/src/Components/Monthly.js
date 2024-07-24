import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import 'chart.js/auto';

const Monthly = ({ id }) => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `http://localhost:8081/emp/task/${id}`;
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (!data || data.length === 0) {
          throw new Error('No data found');
        }

        const hoursPerMonth = data.reduce((acc, task) => {
          const date = new Date(task.date);
          const month = `${date.getFullYear()}-${date.getMonth() + 1}`;
          const startTime = new Date(`1970-01-01T${task.start}`);
          const endTime = new Date(`1970-01-01T${task.end}`);
          const duration = (endTime - startTime) / (1000 * 60 * 60);
          if (!acc[month]) {
            acc[month] = 0;
          }
          acc[month] += duration;

          return acc;
        }, {});

        const labels = Object.keys(hoursPerMonth);
        const dataSet = Object.values(hoursPerMonth);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Hours Worked Per Month',
              data: dataSet,
              backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        });

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Bar data={chartData} />
    </div>
  );
};

export default Monthly;
