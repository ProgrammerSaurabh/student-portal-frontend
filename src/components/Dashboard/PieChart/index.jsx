import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

import axios from 'axios';

import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.defaults.responsive = true;
ChartJS.defaults.maintainAspectRatio = false;

const PieChart = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    loadPieChart();
  }, []);

  const loadPieChart = async () => {
    try {
      const { data } = await axios.get('/dashboard/pie-chart');

      setData({
        labels: [
          'Passed (' + data.passed_per + '%)',
          'Failed (' + data.failed_per + '%)',
        ],
        datasets: [
          {
            label: '# of students passed and failed',
            data: [data.passed, data.failed],
            backgroundColor: ['#28a745', '#dc3545'],
            borderColor: ['#28a745', '#dc3545'],
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {}
  };

  return (
    <Card>
      <Card.Header>Breakup of Students passed and Failed</Card.Header>
      <Card.Body style={{ height: data ? '500px' : '100px' }}>
        {data ? <Pie data={data} /> : null}
      </Card.Body>
    </Card>
  );
};

export default PieChart;
