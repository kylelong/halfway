import {Fragment, useRef, useState, useEffect} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {InformationCircleIcon} from "@heroicons/react/24/outline";
import {
  QuestionMarkCircleIcon,
  ArrowSmallRightIcon,
} from "@heroicons/react/20/solid";

type Props = {
  showModal: boolean;
  onClose: () => void;
};
const OpenAIModal: React.FC<Props> = ({showModal, onClose}) => {
  // !localStorage.getItem("hw_apikey")
  const handleClose = () => {
    setOpen(false);
    onClose(); // Invoke the callback when the modal is closed
  };

  const [open, setOpen] = useState(showModal);
  const openRef = useRef(showModal);

  const cancelButtonRef = useRef(null);
  useEffect(() => {
    if (showModal !== openRef.current) {
      openRef.current = showModal;
      setOpen(showModal);
    }
  }, [open, showModal]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 flex items-center justify-center z-10"
        initialFocus={cancelButtonRef}
        onClose={handleClose}
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
              <Dialog.Panel className="relative transform w-full max-w-md p-4 bg-white rounded-lg shadow-xl transition-all sm:mx-4 sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-200">
                    <InformationCircleIcon
                      className="h-6 w-6 text-black-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Enter your Open AI API Key
                    </Dialog.Title>
                    <div className="mt-2 mb-4">
                      <p className="text-sm text-gray-500 text-left mb-2">
                        You need an OpenAI API Key to get started using halfway.
                      </p>
                      <p className="text-sm text-gray-500 text-left">
                        Your OpenAI API Key is stored locally in your browser
                        and <b>never</b> shared.
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="account-number"
                    className="block text-left text-sm font-medium leading-6 text-gray-900"
                  >
                    Open AI API Key
                  </label>
                  <div className="relative mt-2 rounded-md shadow-sm">
                    <input
                      type="text"
                      name="account-number"
                      id="account-number"
                      className="pl-2 block w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <QuestionMarkCircleIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex flex-row">
                  <ArrowSmallRightIcon className="w-5 h-5 " />
                  <a
                    href="https://platform.openai.com/account/api-keys"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-indigo-600 text-left hover:text-indigo-800 hover:text-md"
                  >
                    Get your API Key from your Open AI account
                  </a>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    onClick={handleClose}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    onClick={handleClose}
                  >
                    Save
                  </button>
                </div>
                <p className="text-sm text-gray-500 text-left mt-3">
                  Halfway will connect to OpenAI and validate that your API key
                  is valid.
                </p>
                <ul>Tips</ul>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default OpenAIModal;
