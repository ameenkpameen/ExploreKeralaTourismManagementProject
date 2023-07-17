import React from 'react'

import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import PaymentForm from './PaymentForm'
import { useLocation } from 'react-router-dom';



const PUBLIC_KEY = "pk_test_51NRnxVSHFF52P44ZOnlq2gaMZwhx17xz0YwrIKbxZvtHii5nVQ2gU8azXx9zV8zPqDCJmTl5SwfDsyhbWoAckfxL00UPSxkP24"
const stripeTestPromise = loadStripe(PUBLIC_KEY)
function StripeContainer() {
    const location = useLocation();
    const checkoutData = location.state
    console.log(checkoutData);
  return (
    <Elements stripe={stripeTestPromise}>
        <PaymentForm data={checkoutData} />
    </Elements>
  )
}

export default StripeContainer
