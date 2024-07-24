import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import 'chart.js/auto';

// Helper function to get the ISO week number
const getISOWeek = (date) => {
  const tempDate = new Date(date.getTime());
  tempDate.setUTCDate(tempDate.getUTCDate() + 4 - (tempDate.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(tempDate.getUTCFullYear(), 0, 1));
  return Math.ceil(((tempDate - yearStart) / 86400000 + 1) / 7);
};

const Weekly = ({ id }) => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `http://localhost:8081/emp/task/${id}`;
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        console.log(response);
        const data = response.data;

        if (!data || data.length === 0) {
          throw new Error('No data found');
        }

        const hoursPerWeek = data.reduce((acc, task) => {
          const date = new Date(task.date);
          const year = date.getFullYear();
          const week = `${year}-W${getISOWeek(date)}`;
          const startTime = new Date(`1970-01-01T${task.start}`);
          const endTime = new Date(`1970-01-01T${task.end}`);
          const duration = (endTime - startTime) / (1000 * 60 * 60);
          if (!acc[week]) {
            acc[week] = 0;
          }
          acc[week] += duration;

          return acc;
        }, {});

        const labels = Object.keys(hoursPerWeek).sort();
        const dataSet = labels.map(label => hoursPerWeek[label]);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Hours Worked Per Week",
              data: dataSet,
              backgroundColor: [
                'rgba(255, 99, 132, 0.6)',  // Red
                'rgba(255, 159, 64, 0.6)',  // Orange
                'rgba(255, 205, 86, 0.6)',  // Yellow
                'rgba(75, 192, 192, 0.6)',  // Teal
                'rgba(54, 162, 235, 0.6)',  // Blue
                'rgba(153, 102, 255, 0.6)', // Purple
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',   // Red
                'rgba(255, 159, 64, 1)',   // Orange
                'rgba(255, 205, 86, 1)',   // Yellow
                'rgba(75, 192, 192, 1)',   // Teal
                'rgba(54, 162, 235, 1)',   // Blue
                'rgba(153, 102, 255, 1)',  // Purple
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

export default Weekly;
