import PropTypes from "prop-types";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import MenuCart from "./sub-components/MenuCart";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../actions";
const IconGroup = ({
  currency,
  cartData,
  wishlistData,
  compareData,
  deleteFromCart,
  iconWhiteClass,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const cart = useSelector((state) => state.cart);
  const wish = useSelector((state) => state.wish);
  const compare = useSelector((state) => state.compare);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);

  const handleClick = (e) => {
    e.currentTarget.nextSibling.classList.toggle("active");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(searchValue);
    // navigate(`${searchValue}`);
    navigate(`/${"search"}?${searchValue}`);
  };

  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.add("active");
  };

  const logout = () => {
    dispatch(signout());
  };

  return (
    <div
      className={`header-right-wrap ${iconWhiteClass ? iconWhiteClass : ""}`}
    >
      <div className="same-style header-search d-none d-lg-block">
        <button className="search-active" onClick={(e) => handleClick(e)}>
          <i className="pe-7s-search" />
        </button>
        <div className="search-content">
          <form action="#">
            <input
              type="text"
              placeholder="Search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button className="button-search" onClick={(e) => handleSearch(e)}>
              <i className="pe-7s-search" />
            </button>
          </form>
        </div>
      </div>
      <div className="same-style account-setting d-none d-lg-block">
        <button
          className="account-setting-active"
          onClick={(e) => handleClick(e)}
        >
          <i className="pe-7s-user-female" />
        </button>
        {
          !auth.authenticate ?
          <div className="account-dropdown">
          <ul>
            <li>
              <Link to={process.env.PUBLIC_URL + "/login-register"}>
                Login
              </Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/login-register"}>
                Register
              </Link>
            </li>
          </ul>
        </div>
        : 
        <div className="account-dropdown">
        <ul>
          <li>
            <Link to={process.env.PUBLIC_URL + "/account/orders"}>
              My Orders
            </Link>
          <li>
            <Link to={process.env.PUBLIC_URL + "/my-account"}>
              My Account
            </Link>
          </li>
          <li>
          </li>
            <Link to={process.env.PUBLIC_URL + "/"} onClick={logout}>
              Sign out
            </Link>
          </li>
        </ul>
      </div>
        }
        
      </div>
      <div className="same-style header-compare">
        <Link to={process.env.PUBLIC_URL + "/compare"}>
          <i className="pe-7s-shuffle" />
          <span className="count-style">
            {/* {compareData && compareData.length ? compareData.length : 0} */}
            {Object.keys(compare.compareItems).length}
          </span>
        </Link>
      </div>
      <div className="same-style header-wishlist">
        <Link to={process.env.PUBLIC_URL + "/wishlist"}>
          <i className="pe-7s-like" />
          <span className="count-style">
            {/* {wishlistData && wishlistData.length ? wishlistData.length : 0} */}
            {Object.keys(wish.wishItems).length}
          </span>
        </Link>
      </div>
      <div className="same-style cart-wrap d-none d-lg-block">
        <button className="icon-cart" onClick={(e) => handleClick(e)}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {/* {cartData && cartData.length ? cartData.length : 0} */}
            {Object.keys(cart.cartItems).length}
          </span>
        </button>
        {/* menu cart */}
        <MenuCart
          cartData={cart.cartItems}
          currency={currency}
          deleteFromCart={deleteFromCart}
        />
      </div>
      <div className="same-style cart-wrap d-block d-lg-none">
        <Link className="icon-cart" to={process.env.PUBLIC_URL + "/cart"}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {/* {cartData && cartData.length ? cartData.length : 0} */}
          </span>
        </Link>
      </div>
      <div className="same-style mobile-off-canvas d-block d-lg-none">
        <button
          className="mobile-aside-button"
          onClick={() => triggerMobileMenu()}
        >
          <i className="pe-7s-menu" />
        </button>
      </div>
    </div>
  );
};

IconGroup.propTypes = {
  cartData: PropTypes.array,
  compareData: PropTypes.array,
  currency: PropTypes.object,
  iconWhiteClass: PropTypes.string,
  deleteFromCart: PropTypes.func,
  wishlistData: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    currency: state.currencyData,
    cartData: state.cartData,
    wishlistData: state.wishlistData,
    compareData: state.compareData,
  };
};

const mapDispatchToProps = (dispatch) => {
  // return {
  //   deleteFromCart: (item, addToast) => {
  //     dispatch(deleteFromCart(item, addToast));
  //   }
  // };
};

export default connect(mapStateToProps, mapDispatchToProps)(IconGroup);
