import { Button, Container, Form, NavLink, Row } from 'react-bootstrap';

import { Helmet, HelmetProvider } from 'react-helmet-async';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import styles from './Login.module.css';

import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter valid email address')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {
  const { login } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,

    onSubmit: ({ email, password }, { resetForm }) => {
      login(email, password);
      resetForm();
    },
  });

  return (
    <HelmetProvider>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Container>
        <div className={styles['form-container']}>
          <Form
            onSubmit={formik.handleSubmit}
            className={styles.form}
          >
            <Row className='mx-2'>
              <h3 className={'h3 text-center'}>Login</h3>
              <Form.Group className='mb-2'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='text'
                  className={
                    formik.touched['email'] && formik.errors['email']
                      ? 'is-invalid'
                      : ''
                  }
                  placeholder='Email'
                  name='email'
                  value={formik.values['email']}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isValid={formik.touched['email'] && !formik.errors['email']}
                />
                {formik.touched['email'] && formik.errors['email'] && (
                  <span className='text-danger small'>
                    {formik.errors['email']}
                  </span>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  className={
                    formik.touched['password'] && formik.errors['password']
                      ? 'is-invalid'
                      : ''
                  }
                  placeholder='Password'
                  name='password'
                  value={formik.values['password']}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isValid={
                    formik.touched['password'] && !formik.errors['password']
                  }
                />
                {formik.touched['password'] && formik.errors['password'] && (
                  <span className='text-danger small'>
                    {formik.errors['password']}
                  </span>
                )}
              </Form.Group>
              <div className='d-grid gap-2 mt-3'>
                <Button
                  type='submit'
                  variant='primary'
                >
                  Submit
                </Button>
              </div>
              <p className='text-center mt-2'>
                <NavLink
                  href='/forgot-password'
                  className='text-primary'
                >
                  Forgot password?
                </NavLink>
              </p>
            </Row>
          </Form>
        </div>
      </Container>
    </HelmetProvider>
  );
};

export default Login;
