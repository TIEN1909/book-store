import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { saveShippingAddress } from './../redux/Actions/CartActions';
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const ShippingScreen = ({ history }) => {
  const context = useContext(ThemeContext);
  window.scrollTo(0, 0);

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push('/placeorder');
    setAddress('');
    setCity('');
    setPostalCode('');
    setCountry('');
  };
  return (
    <>
      <div id={context.theme}>
        <Header />
        <div className="container d-flex justify-content-center align-items-center ">
          <form
            className="Login Login3 col-md-8 col-lg-4 col-11"
            onSubmit={submitHandler}
            style={{ marginTop: '100px' }}
          >
            <h6 className="delivery-address">DELIVERY ADDRESS</h6>
            <input
              type="text"
              placeholder="Enter address"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter city"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter postal code"
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter country"
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            />
            <button type="submit">Continue</button>
          </form>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ShippingScreen;
