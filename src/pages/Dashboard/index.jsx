import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Container, Form } from 'react-bootstrap';
import { lazy } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const PieChart = lazy(() =>
  import(
    /* webpackChunkName:'PieChart' */ '../../components/Dashboard/PieChart'
  )
);

const StackBar = lazy(() =>
  import(
    /* webpackChunkName:'StackBar' */ '../../components/Dashboard/StackBar'
  )
);

const Dashboard = () => {
  const [locations, setLocations] = useState([]);

  const [location, setLocation] = useState('all');

  useEffect(() => {
    loadLocations();
  }, []);

  const loadLocations = async () => {
    try {
      const { data } = await axios.get('/dashboard/locations');
      console.log(data);
      setLocations(data);
    } catch (error) {}
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Container className='my-4'>
        <div className='d-flex justify-content-end mb-2'>
          <Form.Select
            aria-label='Default select example'
            className='w-auto'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value='all'>All</option>
            {locations.map((location_) => (
              <option key={`location-${location_}`}>{location_}</option>
            ))}
          </Form.Select>
        </div>
        <PieChart location={location} />
        <StackBar location={location} />
      </Container>
    </HelmetProvider>
  );
};

export default Dashboard;
