import React, { useEffect, useContext } from 'react';
import Header from './../components/Header';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from './../redux/Actions/CartActions';
import { ThemeContext } from './ThemeContext';
import Footer from '../components/Footer';

const CartScreen = ({ match, location, history }) => {
  const context = useContext(ThemeContext);

  window.scrollTo(0, 0);
  const dispatch = useDispatch();
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const total = cartItems.reduce((a, i) => a + i.qty * i.price, 0).toFixed(2);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const checkOutHandler = () => {
    history.push('/login?redirect=shipping');
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  return (
    <>
      <div id={context.theme}>
        <Header />
        {/* Cart */}
        <div className="container single-product">
          {cartItems.length === 0 ? (
            <div className=" alert alert-info text-center mt-3">
              Your cart is empty
              <Link
                className="btn btn-success mx-5 px-5 py-3"
                to="/"
                style={{
                  fontSize: '12px',
                }}
              >
                SHOPPING NOW
              </Link>
            </div>
          ) : (
            <>
              <div className="d-flex jusify-content-between flex-column-reverse">
                {/* cartiterm */}
                <div className="card-items">
                  {cartItems.map((item, index) => (
                    <div
                      className="cart-iterm d-flex align-items-center justify-content-between"
                      key={index}
                    >
                      {/* close */}
                      <div
                        onClick={() => removeFromCartHandler(item.product)}
                        className="remove-button d-flex justify-content-center align-items-center"
                      >
                        <i class="fad fa-times-square"></i>
                      </div>
                      {/* close */}
                      <div className="cart-image ">
                        <img src={item.image.url} alt={item.name} />
                      </div>
                      <div className="d-flex justify-content-center align-items-start gap">
                        <div className="d-flex flex-column justify-content-start align-items-center cart-name ">
                          <div className="text-center">
                            <Link to={`/products/${item.product}`}>
                              <h4>{item.name}</h4>
                            </Link>
                          </div>
                          <div className="">
                            <Link to={`/products/${item.product}`}>
                              <h4 className="cart-auther">{item.nameAuther}</h4>
                            </Link>
                          </div>
                        </div>
                        <div className="d-flex flex-column align-items-center width-qty">
                          <h6 style={{ color: 'red' }}>QUANTITY</h6>
                          <select
                            value={item.qty}
                            onChange={(e) =>
                              dispatch(
                                addToCart(item.product, Number(e.target.value))
                              )
                            }
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="width-price">
                          <h6 style={{ color: 'red' }}>PRICE</h6>
                          <h4>${item.price}</h4>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* End of cart iterms */}
                <div className="total d-flex align-items-center justify-content-between">
                  <h2 className="your-order">YOUR ORDER</h2>
                  <span className="sub">total: ${total}</span>
                  {/* <span className="total-price"></span> */}
                </div>
              </div>
              <hr />
              <div className="cart-buttons d-flex align-items-center row">
                <Link to="/" className="col-md-6 ">
                  <button className="continue">
                    <span>Continue</span>{' '}
                    <i class="fad fa-shopping-cart shopping-cart"></i>
                  </button>
                </Link>
                {total > 0 && (
                  <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0 ">
                    <button onClick={checkOutHandler} className="checkout">
                      <span> Checkout</span>{' '}
                      <i class="fad fa-money-check-edit-alt money-checkout"></i>
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default CartScreen;
