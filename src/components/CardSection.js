import React from "react";
import { CardElement } from "@stripe/react-stripe-js";

function CardSection(props) {
  return (
    <div>
      <div>
        <label htmlFor="card-element">Credit or debit card</label>
        <div>
          <fieldset style={{ border: "none" }}>
            <div className="form-row">
              <div id="card-element" style={{ width: "100%" }}>
                <CardElement
                  options={{
                    style: { width: "100%", base: { fontSize: "18px" } },
                  }}
                />
              </div>
              <br />
              <div className="order-button-wrapper">
                <button className="order-button" onClick={props.submitOrder}>Confirm Order</button>
              </div>
              {props.stripeError ? (
                <div>{props.stripeError.toString()}</div>
              ) : null}
              <div id="card-errors" role="alert" />
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  );
}

export default CardSection;
