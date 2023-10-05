import {useParams} from "react-router-dom";
import React from "react";
import Logo from "./Logo/Logo";
import {CheckIcon} from "@heroicons/react/24/outline";
export default function PaymentConfirmation() {
  // Use the useParams hook to get the checkout_session_id from the URL
  const {checkout_session_id} = useParams();

  // Now, you can use checkout_session_id in your component as needed
  let stripe_id = checkout_session_id?.substring(
    checkout_session_id.indexOf("=") + 1
  );
  localStorage.setItem("hw-stripe-payment-license-key", stripe_id || "");

  // Rest of your component logic
  return (
    <div className="py-5 px-6">
      <Logo />
      <div className="flex flex-row w-screen justify-center">
        <div className="bg-gray-50 sm:rounded-lg mb-6 w-11/12 lg:w-2/4 mt-12 flex flex-column justify-center align-center align-middle">
          <div className="px-4 py-5 sm:p-6 items-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-2">
              <CheckIcon
                className="h-6 w-6 text-green-600"
                aria-hidden="true"
              />
            </div>
            <h3 className="text-2xl font-semibold leading-6 text-gray-900 text-center">
              Thank you
            </h3>
            <h3 className="text-base leading-6 text-gray-900 text-center mt-2">
              Payment confirmed
            </h3>

            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>
                You now have access to premium features and a lifetime
                subscription.
              </p>
            </div>
            <div className="mt-5 flex flex-row justify-center items-center">
              <a href="/">
                <button
                  type="button"
                  className="inline-flex items-center  mr-6 xl:m-0 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset  hover:bg-indigo-700 hover:text-gray-50"
                >
                  Continue to Editor
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
