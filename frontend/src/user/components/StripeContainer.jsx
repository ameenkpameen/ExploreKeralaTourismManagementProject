import React from 'react'

import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import PaymentForm from './PaymentForm'
import { useLocation } from 'react-router-dom';



const PUBLIC_KEY = "pk_test_51NRnxVSHFF52P44ZOnlq2gaMZwhx17xz0YwrIKbxZvtHii5nVQ2gU8azXx9zV8zPqDCJmTl5SwfDsyhbWoAckfxL00UPSxkP24"
const stripeTestPromise = loadStripe(PUBLIC_KEY)
function StripeContainer({updated,discount,coupenCode,successModal,onClose}) {
    const location = useLocation();
    const checkoutData = location.state
  return (
    <Elements stripe={stripeTestPromise} >
        <PaymentForm data={checkoutData} onSuccess={updated} discount={discount} coupen={coupenCode} successModal={successModal} onClose={onClose}/>
    </Elements>
  )
}

export default StripeContainer
