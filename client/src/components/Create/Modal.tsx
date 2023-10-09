import React, {useState} from "react";
import {ExclamationTriangleIcon} from "@heroicons/react/20/solid";
import {LOCAL_STORAGE_API_KEY} from "../../types/constants";
const Modal: React.FC = () => {
  const [show, setShow] = useState(true);
  const hideForever = () => {
    localStorage.setItem("hideGetStartedModal", "true");
    setShow(false);
  };
  //TODO: remove p if api key is set
  return (
    <>
      {show && !localStorage.getItem("hideGetStartedModal") && (
        <div className="bg-gray-50 sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Get started
            </h3>
            {!localStorage.getItem(LOCAL_STORAGE_API_KEY) && (
              <div className="rounded-md bg-yellow-50 p-4 mt-1.5">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <ExclamationTriangleIcon
                      className="h-5 w-5 text-yellow-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-xs font-medium text-yellow-800">
                      After adding your Open AI API Key
                    </h3>
                  </div>
                </div>
              </div>
            )}
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p className="mb-1">
                <b>1.</b>{" "}
                <span>Briefly describe your content in the textbox below</span>
              </p>
              <p className="mb-1">
                <b>2.</b> Add filters to tailor the content to your needs
              </p>
              <p className="mb-1">
                <b>3.</b> Edit the generated content in the text editor to your
                satisfaction
              </p>
            </div>
            <div className="mt-5 flex flex-row xl:justify-between">
              <button
                type="button"
                className="inline-flex items-center mr-6 xl:m-0 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset  hover:bg-indigo-700 hover:text-gray-50"
                onClick={() => setShow(false)}
              >
                Close
              </button>
              {localStorage.getItem(LOCAL_STORAGE_API_KEY) && (
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  onClick={hideForever}
                >
                  Don't show me this again
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Modal;
