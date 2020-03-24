import React, { useEffect, useState } from "react";
import "./Delivery.css";
import { useForm } from "react-hook-form";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import img from "../../assets/image/Dinner/dinner1.png";
import { getDatabaseCart } from "../../utilities/databaseManager";
import fackData from "../../fakeData";

function Delivery() {
  const { register, handleSubmit, errors } = useForm();

  const [products, setProducts] = useState([]);

  const [price, setPrice] = useState({});

  useEffect(() => {
    //cart
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    const cartProducts = productKeys.map(key => {
      const product = fackData.find(pd => pd.key === key);
      product.quantity = savedCart[key];
      return product;
    });
    const price = cartProducts.reduce((total, price) => total + price.price, 0);
    const quantity = cartProducts.reduce(
      (total, quantity) => total + quantity.quantity,
      0
    );

    const tex = (price / 100) * 15;
    const delivery = 2;
    const totalPrice = tex + delivery + price;

    setPrice({
      price: price.toFixed(2),
      tex: tex.toFixed(2),
      delivery: delivery.toFixed(2),
      totalPrice: totalPrice.toFixed(2),
      quantity: quantity
    });
    setProducts(cartProducts);

    // product add or delate
    const previousCart = productKeys.map(existingKey => {
      const product = fackData.find(pd => pd.key === existingKey);
      product.quantity = savedCart[existingKey];
      return product;
    });
  }, []);

  return (
    <div className="container delivery">
      <div className="row">
        <div className="col">
          <ul className="d-flex justify-content-center ">
            <li>Breakfast</li>
            <li>Dinner</li>
            <li>Lunch</li>
          </ul>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-4">
          <h2>Edit Delivery Deatails</h2>
          <form className="form-group  ">
            <input
              className="form-control"
              name="dor"
              placeholder="Deliver to door"
              type="text"
              ref={register({ required: true })}
            />
            {errors.dor && <span>Deliver to door name field is required</span>}
            <input
              className="form-control"
              name="road"
              placeholder="107 RD NO 8"
              type="text"
              ref={register({ required: true })}
            />
            {errors.road && <span>road name field is required</span>}
            <input
              className="form-control"
              name="floor"
              placeholder="Flat, Suite or floor"
              type="text"
              ref={register({ required: true })}
            />
            {errors.floor && <span>floor name field is required</span>}
            <input
              className="form-control"
              name="business"
              placeholder="Business Name"
              type="text"
              ref={register({ required: true })}
            />
            {errors.business && <span>business name field is required</span>}

            <textarea
              className="form-control"
              name="instructor"
              placeholder="Add delivery instructor"
              id=""
              cols="30"
              rows="5"
              ref={register({ required: true })}
            ></textarea>

            {errors.instructor && (
              <span>instructor name field is required</span>
            )}

            <input type="submit" className="submit bg-danger btn" />
          </form>
        </div>
        <div className="col-md-4 offset-md-4">
          <div className="restaurant_info">
            <p>
              From: <strong>Gulshan Plaza Restaurant GPR</strong>
            </p>
            <p>Arriving in 20-30 min</p>
            107 Rd No 8
          </div>
          {products.map(product => (
            <div className="product_list" key={product.key}>
              <img src={product.image} alt="" />
              <div className="content">
                <h5>{product.title}</h5>
                <h4>${product.price}</h4>
                <p>Delivery fee</p>
              </div>
              <div className="quntati">
                <span className="incrementDecrement">
                  <strong>-</strong>
                  <b>{product.quantity}</b>
                  <strong>+</strong>
                </span>
              </div>
            </div>
          ))}

          <div className="price_table">
            <div className="table">
              <p>Subtotal: {price.quantity} item</p>
              <p>${price.price}</p>
            </div>
            <div className="table">
              <p>Tex (15%)</p>
              <p>${price.tex}</p>
            </div>
            <div className="table">
              <p>Delivery fee</p>
              <p>${price.delivery}</p>
            </div>
            <div className="table">
              <h4>Total </h4>
              <p> ${price.totalPrice}</p>
            </div>
          </div>

          <button className="btn btn-outline-dark" disabled>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Delivery;
