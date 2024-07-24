import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import 'chart.js/auto';

const Daily = ({ id }) => {
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

                const hoursPerDay = data?.reduce((acc, task) => {
                    const tc = task.taskCategory;
                    const startTime = new Date(`1970-01-01T${task.start}`);
                    const endTime = new Date(`1970-01-01T${task.end}`);
                    const duration = (endTime - startTime) / (1000 * 60 * 60);
                    if (!acc[tc]) {
                        acc[tc] = 0;
                    }
                    acc[tc] += duration;

                    return acc;
                }, {});

                const labels = Object.keys(hoursPerDay);
                const dataSet = Object.values(hoursPerDay);

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Task Category in hrs',
                            data: dataSet,
                            backgroundColor: [
                                '#FF6F61',  // Coral
                                '#6B5B95',  // Purple
                                '#88B04B',  // Green
                                '#F7CAC9',  // Pink
                                '#92A8D1',  // Blue
                                '#FFCC5C',  // Yellow
                                '#FFB3E6',  // Light Pink
                                '#D5AAFF',  // Lavender
                                '#FF9F40',  // Orange
                                '#61C0BF',  // Teal
                            ],
                            borderColor: '#ffffff', // White border for better contrast
                            borderWidth: 2,
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
        <div className="p-5">
            <Pie data={chartData} />
        </div>
    );
};

export default Daily;
