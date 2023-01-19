import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from './../components/Header';
import Message from './../components/LoadingError/Error';
import Loading from './../components/LoadingError/Loading';
import { login } from './../redux/Actions/UserActions';
import { ThemeContext } from './ThemeContext';
import VideoBg from './animation.mp4';
import '../App.css';
const Login = ({ location, history }) => {
  const context = useContext(ThemeContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split('=')[1] : '/';

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <>
      <div id={context.theme}>
        <Header />
        <div style={{ width: '100%', height: '100%', marginTop: '98px' }}>
          <div className="video-login">
            <video src={VideoBg} autoPlay loop muted />
          </div>
          <div className="container d-flex flex-column justify-content-center align-items-center login-center">
            {error && <Message variant="alert-danger">{error}</Message>}
            {loading && <Loading />}
            <form
              className="Login col-md-8 col-lg-4 col-11"
              onSubmit={submitHandler}
              style={{ width: '30%' }}
            >
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Login</button>
              <p>
                <Link
                  to={redirect ? `/register?redirect=${redirect}` : '/register'}
                >
                  Create Account
                </Link>
              </p>
            </form>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default Login;
