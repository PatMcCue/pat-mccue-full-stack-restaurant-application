import React, { useState, useContext } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import fetch from 'isomorphic-fetch';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { CardSection } from './index';
import AppContext from '../Providers/Context';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

function CheckoutForm() {
    const [data, setData] = useState({
        address: '',
        city: '',
        state: '',
        stripe_id: '',
    });
    const [error, setError] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const appContext = useContext(AppContext);

    function onChange(e) {
        // set the key = to the name property equal to the value typed
        const updateItem = (data[e.target.name] = e.target.value);
        // update the state data object
        setData({ ...data, updateItem });
    }
    const router = useRouter();
    async function submitOrder() {
        // event.preventDefault();
        // // Use elements.getElement to get a reference to the mounted Element.
        const cardElement = elements.getElement(CardElement);

        // // Pass the Element directly to other Stripe.js methods:
        // // e.g. createToken - https://stripe.com/docs/js/tokens_sources/create_token?type=cardElement
        // get token back from stripe to process credit card
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

        const token = await stripe.createToken(cardElement);
        const userToken = Cookies.get('token');

        const fetchBody = {
            method: 'POST',
            headers: userToken && { Authorization: `Bearer ${userToken}` },
            body: JSON.stringify({
                amount: Number(Math.round(appContext.cart.total + 'e2') + 'e-2'),
                dishes: appContext.cart.items,
                address: data.address,
                city: data.city,
                state: data.state,
                token: token.token.id,
            }),
        };

        const response = await fetch(`${API_URL}/orders`, fetchBody);

        console.log('response:', await response);

        if (response.ok) {
            router.push('/order-success');
            console.log('Order succeeded!');
        } else {
            setError(response.statusText);
        }

        // OTHER stripe methods you can use depending on app
        // // or createPaymentMethod - https://stripe.com/docs/js/payment_intents/create_payment_method
        // stripe.createPaymentMethod({
        //   type: "card",
        //   card: cardElement,
        // });

        // // or confirmCardPayment - https://stripe.com/docs/js/payment_intents/confirm_card_payment
        // stripe.confirmCardPayment(paymentIntentClientSecret, {
        //   payment_method: {
        //     card: cardElement,
        //   },
        // });
    }

    return (
        <div className="paper">
            <h5>Your information:</h5>
            <hr />
            <FormGroup style={{ display: 'flex' }}>
                <div style={{ flex: '0.90', marginRight: 10 }}>
                    <Label>Address</Label>
                    <Input name="address" onChange={onChange} required />
                </div>
            </FormGroup>
            <FormGroup style={{ display: 'flex' }}>
                <div style={{ flex: '0.65', marginRight: '6%' }}>
                    <Label>City</Label>
                    <Input name="city" onChange={onChange} required />
                </div>
                <div style={{ flex: '0.25', marginRight: 0 }}>
                    <Label for="state">State</Label>
                    <select name="state" id="state" onChange={onChange} required>
                        <option value="">-- Select a state --</option>
                        <option value="Alabama">AL</option>
                        <option value="Alaska">AK</option>
                        <option value="Arizona">AZ</option>
                        <option value="Arkansas">AR</option>
                        <option value="California">CA</option>
                        <option value="Colorado">CO</option>
                        <option value="Connecticut">CT</option>
                        <option value="Delaware">DE</option>
                        <option value="Florida">FL</option>
                        <option value="Georgia">GA</option>
                        <option value="Hawaii">HI</option>
                        <option value="Idaho">ID</option>
                        <option value="Illinois">IL</option>
                        <option value="Indiana">IN</option>
                        <option value="Iowa">IA</option>
                        <option value="Kansas">KS</option>
                        <option value="Kentucky">KY</option>
                        <option value="Louisiana">LA</option>
                        <option value="Maine">ME</option>
                        <option value="Maryland">MD</option>
                        <option value="Massachusetts">MA</option>
                        <option value="Michigan">MI</option>
                        <option value="Minnesota">MN</option>
                        <option value="Mississippi">MS</option>
                        <option value="Missouri">MO</option>
                        <option value="Montana">MT</option>
                        <option value="Nebraska">NE</option>
                        <option value="Nevada">NV</option>
                        <option value="New Hampshire">NH</option>
                        <option value="New Jersey">NJ</option>
                        <option value="New Mexico">NM</option>
                        <option value="New York">NY</option>
                        <option value="North Carolina">NC</option>
                        <option value="North Dakota">ND</option>
                        <option value="Ohio">OH</option>
                        <option value="Oklahoma">OK</option>
                        <option value="Oregon">OR</option>
                        <option value="Pennsylvania">PA</option>
                        <option value="Rhode Island">RI</option>
                        <option value="South Carolina">SC</option>
                        <option value="South Dakota">SD</option>
                        <option value="Tennessee">TN</option>
                        <option value="Texas">TX</option>
                        <option value="Utah">UT</option>
                        <option value="Vermont">VT</option>
                        <option value="Virginia">VA</option>
                        <option value="Washington">WA</option>
                        <option value="West Virginia">WV</option>
                        <option value="Wisconsin">WI</option>
                        <option value="Wyoming">WY</option>
                    </select>
                </div>
            </FormGroup>
            <CardSection data={data} stripeError={error} submitOrder={submitOrder} required />
        </div>
    );
}
export default CheckoutForm;
