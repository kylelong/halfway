import * as React from "react";
import checkBadge from "../../assets/checkBadge.svg";
import {STRIPE_LINK} from "../../types/constants";
import {Fragment, useRef, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {ClockIcon, XMarkIcon} from "@heroicons/react/24/outline";

const includedFeatures = [
  "Content for all your needs",
  "Save your own custom presets",
  "Several templates",
  "Search saved generated content",
];

export default function PricingModal() {
  const [open, setOpen] = useState(true);

  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 flex items-center justify-center z-10"
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform md:ml-20 lg:ml-0 w-full max-w-md xl:max-w-xl p-4 bg-white rounded-lg shadow-xl transition-all sm:mx-4 sm:p-6">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="sm:flex sm:items-center text-center flex-column justify-center align-center">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-bold tracking-tight text-gray-900"
                    >
                      Lifetime Membership
                    </Dialog.Title>
                    <p className="text-base text-sm font-semibold text-gray-600">
                      Pay once, own it forever
                    </p>
                    <p className="mt-6 flex items-baseline justify-center gap-x-2">
                      <span className="text-5xl font-bold tracking-tight text-gray-900">
                        $9
                      </span>
                      <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
                        USD
                      </span>
                    </p>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 flex justify-center">
                        Get your halfway license key by upgrading.
                      </p>
                    </div>
                    <ul className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 xl:grid-cols-2 sm:gap-6">
                      {includedFeatures.map((feature) => (
                        <li key={feature} className="flex gap-x-3">
                          <img
                            alt="checkBadge"
                            src={checkBadge}
                            className="h-6 w-5 flex-none"
                          />
                          <span className="">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex flex-row">
                  <a
                    href={STRIPE_LINK}
                    className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2.5 text-center text-sm font-bold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Upgrade
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
