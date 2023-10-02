import React, {useState} from "react";
const Modal: React.FC = () => {
  const [show, setShow] = useState(true);
  const hideForever = () => {
    localStorage.setItem("hideGetStartedModal", "true");
    setShow(false);
  };
  return (
    <>
      {show && !localStorage.getItem("hideGetStartedModal") && (
        <div className="bg-gray-50 sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Get started
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>
                Briefly describe your content in the textbox below <br /> <br />{" "}
                Then select from the filters to tailor the content to meet your
                needs.
                <br /> <br /> Then edit the generated content in the text editor
                if you'd like
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
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                onClick={hideForever}
              >
                Don't show me this again
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Modal;
