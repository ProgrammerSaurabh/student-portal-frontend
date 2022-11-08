import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Container } from 'react-bootstrap';
import { lazy } from 'react';

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
  return (
    <HelmetProvider>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Container className='my-4'>
        <PieChart />
        <StackBar />
      </Container>
    </HelmetProvider>
  );
};

export default Dashboard;
