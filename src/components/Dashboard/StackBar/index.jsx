import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

import axios from 'axios';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
ChartJS.defaults.responsive = true;
ChartJS.defaults.maintainAspectRatio = false;

const options = {
  plugins: {
    title: {
      display: true,
      text: 'Percentage of students passed and failed in each location',
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const StackBar = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    loadStackBar();
  }, []);

  const loadStackBar = async () => {
    try {
      const { data } = await axios.get('/dashboard/stack-bar');

      setData({
        labels: [
          ...data.map(
            ({ location, passed_per, failed_per }) =>
              `${location}, Passed: ${passed_per}% | Failed: ${failed_per}%`
          ),
        ],
        datasets: [
          {
            label: 'Passed',
            data: [...data.map(({ passed }) => passed)],
            backgroundColor: '#28a745',
          },
          {
            label: 'Failed',
            data: [...data.map(({ failed }) => failed)],
            backgroundColor: '#dc3545',
          },
        ],
      });
    } catch (error) {}
  };

  return (
    <Card className='mt-3'>
      <Card.Header>
        Percentage of students passed and failed in each location
      </Card.Header>
      <Card.Body style={{ height: data ? '500px' : '100px' }}>
        {data ? (
          <Bar
            options={options}
            data={data}
          />
        ) : null}
      </Card.Body>
    </Card>
  );
};

export default StackBar;
