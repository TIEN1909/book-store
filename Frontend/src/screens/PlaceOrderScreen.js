import React, { useEffect, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { savePaymentMethod } from '../redux/Actions/CartActions';
import { createOrder } from '../redux/Actions/OrderActions';
import { ORDER_CREATE_RESET } from '../redux/Constants/OrderConstants';
import Header from './../components/Header';
import Message from './../components/LoadingError/Error';
import { ThemeContext } from './ThemeContext';
const PlaceOrderScreen = ({ history }) => {
  const context = useContext(ThemeContext);
  window.scrollTo(0, 0);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('Paypal');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };

  // Calculate Price
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  cart.shippingPrice = addDecimals(
    cart.itemsPrice > 100
      ? cart.itemsPrice > 200
        ? cart.itemsPrice > 300
          ? 0
          : 5
        : 10
      : 15
  );

  cart.taxPrice = addDecimals(Number((0.1 * cart.itemsPrice).toFixed(2)));

  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [history, dispatch, success, order]);

  const placeOrderHandler = (e) => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <>
      <div id={context.theme}>
        <Header />
        <div
          className="container"
          style={{ padding: '40px', marginTop: '100px' }}
        >
          <div className="row order-products justify-content-between">
            <div className="col-lg-8">
              {cart.cartItems.length === 0 ? (
                <Message variant="alert-info mt-5">Your cart is empty</Message>
              ) : (
                <>
                  {cart.cartItems.map((item, index) => (
                    <div className="order-product row" key={index}>
                      <div className="col-md-3 col-6">
                        <img src={item.image.url} alt={item.name} />
                      </div>
                      <div className="col-md-5 col-6 d-flex align-items-center">
                        <Link to={`/products/${item.product}`}>
                          <h4 className="place" style={{ fontSize: '30px' }}>
                            {item.name}
                          </h4>
                          <h6 style={{ textAlign: 'center' }}>
                            {item.nameAuther}
                          </h6>
                        </Link>
                      </div>
                      <div className="mt-3 mt-md-0 col-md-2 col-6  d-flex align-items-center flex-column justify-content-center ">
                        <h4 className="place">QUANTITY</h4>
                        <h6>{item.qty}</h6>
                      </div>
                      <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center ">
                        <h4 className="place">SUBTOTAL</h4>
                        <h6>${item.qty * item.price}</h6>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
            {/* total */}
            <div className="col-lg-3 d-flex align-items-end flex-column mt-5 subtotal-order">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>
                      <strong>Products</strong>
                    </td>
                    <td>${cart.itemsPrice}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Shipping</strong>
                    </td>
                    <td>${cart.shippingPrice}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Tax</strong>
                    </td>
                    <td>${cart.taxPrice}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Total</strong>
                    </td>
                    <td>${cart.totalPrice}</td>
                  </tr>
                </tbody>
              </table>
              {/* form */}
              <form
                className=" "
                onSubmit={submitHandler}
                style={{ width: '100%' }}
              >
                <div>
                  <div className="radio-container d-flex align-items-center">
                    <input
                      className="form-check-input"
                      type="radio"
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label className="form-check-label paypad-lable">
                      PayPal or Credit Card
                    </label>
                  </div>
                </div>
              </form>
              {/* end form */}
              {cart.cartItems.length === 0 ? null : (
                <button
                  type="submit"
                  onClick={placeOrderHandler}
                  className="place-order"
                >
                  PLACE ORDER
                </button>
              )}
              {error && (
                <div className="my-3 col-12">
                  <Message variant="alert-danger">{error}</Message>
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default PlaceOrderScreen;
