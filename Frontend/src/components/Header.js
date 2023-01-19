import React from 'react';
import { useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../redux/Actions/UserActions';
import Typewriter from 'typewriter-effect';

import { ThemeContext } from '../screens/ThemeContext';
import { SearchContext } from './homeComponents/SearchContext';

import { MaterialUISwitch } from './homeComponents/materialUISwitch';
import FormControlLabel from '@mui/material/FormControlLabel';

const Header = ({ type }) => {
  const context = useContext(ThemeContext);
  const context1 = useContext(SearchContext);

  const [fix, setFix] = useState(false);
  const setFixed = () => {
    if (window.scrollY >= 100) {
      setFix(true);
    } else {
      setFix(false);
    }
  };
  window.addEventListener('scroll', setFixed);

  const dispatch = useDispatch();

  // const productList = useSelector((state) => state.productList);
  // const { loading, error, products } = productList;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div>
      {/* Header */}
      <div className={fix ? ' header fixed' : 'header header-bgr'}>
        <div className="container">
          {/* MOBILE HEADER */}
          <div className="mobile-header">
            <div className="container ">
              <div className="row ">
                <div className="col-6 d-flex align-items-center">
                  <Link className="navbar-brand" to="/">
                    <h1>B</h1>
                  </Link>
                </div>
                <div className="col-6 d-flex align-items-center justify-content-end Login-Register">
                  {userInfo ? (
                    <div className="btn-group">
                      <button
                        type="button"
                        className="name-button dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i className="fas fa-user"></i>
                      </button>
                      <div className="dropdown-menu">
                        <Link className="dropdown-item" to="/profile">
                          Profile
                        </Link>
                        <Link
                          className="dropdown-item"
                          to="#"
                          onClick={logoutHandler}
                        >
                          Logout
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="btn-group">
                      <button
                        type="button"
                        className="name-button dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i className="fas fa-user"></i>
                      </button>
                      <div className="dropdown-menu">
                        <Link className="dropdown-item" to="/login">
                          Login
                        </Link>
                        <Link className="dropdown-item" to="/register">
                          Register
                        </Link>
                      </div>
                    </div>
                  )}
                  <Link to="/cart" className="cart-mobile-icon">
                    <i className="fas fa-shopping-bag"></i>
                    <span className="badge">{cartItems.length}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* PC HEADER */}
          <div className="pc-header ">
            <div className="row d-flex justify-content-between">
              <div className="col-md-3 col-4 d-flex align-items-center">
                <Link className="navbar-brand" to="/">
                  <strong className="header-strong">
                    <h1 style={{ fontSize: '70px' }}>B</h1>
                    <Typewriter
                      options={{
                        autoStart: true,
                        loop: true,
                        delay: 400,
                        strings: ['ookStore', 'ookStore', 'ookStore'],
                      }}
                    />
                  </strong>
                </Link>
              </div>
              {/* search */}
              <div className="col-md-6 col-lg-4  py-1 d-flex align-items-center">
                {type === 'searchs' && (
                  <>
                    <div
                      className="col-lg-4 col-md-6 py-1"
                      style={{ width: '100%' }}
                    >
                      <input
                        type="search"
                        placeholder="Search..."
                        className="form-control"
                        onChange={(e) =>
                          context1.setSearchProduct(e.target.value)
                        }
                      />
                    </div>
                  </>
                )}
              </div>
              {/*end search */}

              <div className="col-md-3 d-flex align-items-center justify-content-end Login-Register">
                {userInfo ? (
                  <div className="btn-group">
                    <button
                      type="button"
                      className="name-button dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {userInfo.name}
                    </button>
                    <div className="dropdown-menu">
                      <Link className="dropdown-item" to="/profile">
                        Profile
                      </Link>
                      <Link
                        className="dropdown-item"
                        to="#"
                        onClick={logoutHandler}
                      >
                        Logout
                      </Link>
                    </div>
                  </div>
                ) : (
                  <>
                    <Link to="/Register">Register</Link>
                    <Link to="/login">Login</Link>
                  </>
                )}
                <Link to="/cart">
                  {/* <i className="fas fa-shopping-bag"></i> */}

                  <i class="fas fa-cart-plus icon-cart"></i>
                  <span className="badge">{cartItems.length}</span>
                </Link>
                <FormControlLabel
                  onChange={context.toggleTheme}
                  checked={context.theme === 'dark'}
                  control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
                />
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
