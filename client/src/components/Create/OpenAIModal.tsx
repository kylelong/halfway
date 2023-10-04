import {Fragment, useRef, useState, useEffect} from "react";
import {Dialog, Transition, Disclosure} from "@headlessui/react";
import {
  InformationCircleIcon,
  MinusSmallIcon,
  PlusSmallIcon,
} from "@heroicons/react/24/outline";
import {
  ArrowSmallRightIcon,
  ArrowSmallDownIcon,
  XCircleIcon,
  CheckCircleIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import OpenAI from "openai";

type Props = {
  showModal: boolean;
  onClose: () => void;
};

const OpenAIModal: React.FC<Props> = ({showModal, onClose}) => {
  // !localStorage.getItem("hw_apikey")
  const handleClose = () => {
    setOpen(false);
    setSuccess(false);
    setErrorMessage("");
    setApiKey("");
    onClose(); // Invoke the callback when the modal is closed
  };
  const faqs = [
    {
      question: "What happens when I share my API Key?",
      answer:
        "Your API Key is stored locally in your browser and nowhere else. There is no server or database for halfway. You may check the network tab when generating content to verify that only open ai is being pinged.",
    },
    {
      question: "Why do I need to add my billing details to Open AI?",
      answer:
        "In order to get an API Key and for Open AI to manage your Chat GPT usage, you need an API Key. For details and to add your payment info visit: https://platform.openai.com/account/billing/overview",
    },
    // More questions...
  ];

  const [open, setOpen] = useState(showModal);
  const [faqOpen, setFaqOpen] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const openRef = useRef(showModal);

  const handleApiKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  // checks if open ai api key is valid
  const validateApiKey = async (apiKey: string) => {
    // INVALID KEY: status: 401 type: 'invalid_request_error' code: 'invalid_api_key'
    // 401 'invalid_request_error'
    try {
      const openai = new OpenAI({
        apiKey: apiKey, // It's better to use this from a backend server
        dangerouslyAllowBrowser: true, // Use with caution
      });
      const completion = await openai.completions.create({
        model: "gpt-3.5-turbo-instruct",
        prompt:
          "welcome me to halfway, an app that generates smart content for all my writing needs :)",
        max_tokens: 100,
        temperature: 0,
      });
      if (completion) {
        setSuccess(true);
        localStorage.setItem("hw_openai_apikey", apiKey);
        setErrorMessage("");
        setTimeout(() => {
          handleClose();
        }, 2000);
      }
      // if valid
      // handleClose
    } catch (err) {
      const error: any = JSON.parse(JSON.stringify(err));
      // const {status, type, code} = error;
      const {message} = error.error;
      setErrorMessage(message);
    }
  };

  const cancelButtonRef = useRef(null);
  useEffect(() => {
    if (showModal !== openRef.current) {
      openRef.current = showModal;
      setOpen(showModal);
    }
  }, [open, showModal, apiKey, errorMessage, onClose]);

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
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-200">
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
                      className="pl-2 block w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-100 sm:text-sm sm:leading-6"
                      placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                      onChange={handleApiKey}
                    />
                  </div>
                </div>
                {success && (
                  <div className="rounded-md bg-green-50 p-4 mt-2">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <CheckCircleIcon
                          className="h-5 w-5 text-green-400"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-green-800">
                          Successfully verified your API Key
                        </p>
                      </div>
                      <div className="ml-auto pl-3">
                        <div className="-mx-1.5 -my-1.5">
                          <button
                            type="button"
                            className="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                          >
                            <span className="sr-only">Dismiss</span>
                            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {errorMessage && (
                  <div className="rounded-md bg-red-50 p-4 mt-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <XCircleIcon
                          className="h-5 w-5 text-red-400"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="ml-2">
                        <h3 className="text-sm text-left font-medium text-red-800">
                          There were errors validating your API Key
                        </h3>
                        <div className="mt-2 text-xs text-left text-red-700">
                          {errorMessage}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="mt-4 flex flex-row">
                  <ArrowSmallRightIcon className="w-5 h-5" />
                  <a
                    href="https://platform.openai.com/account/api-keys"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-indigo-600 text-left hover:text-indigo-800 hover:text-md"
                  >
                    Get your API Key from your Open AI account
                  </a>
                </div>
                <p className="text-xs mt-2 text-left">
                  For your API Key to work, you must have a{" "}
                  <a
                    className="text-indigo-600 text-left hover:text-indigo-800 hover:text-md"
                    href="https://platform.openai.com/account/billing/overview"
                    target="_blank"
                    rel="noreferrer"
                  >
                    payment method{" "}
                  </a>
                  associated with your Open AI account. No need for ChatGPT
                  Plus.
                </p>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 ring-1 ring-inset sm:col-start-1 sm:mt-0"
                    onClick={() => validateApiKey(apiKey)}
                    ref={cancelButtonRef}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-gray-300 hover:bg-gray-50 ring-1 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    onClick={handleClose}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
                <p className="text-xs text-left mt-3">
                  Halfway will connect to OpenAI and validate that your API key
                  is valid.
                </p>

                <button
                  onClick={() => setFaqOpen(!faqOpen)}
                  type="button"
                  className="mt-4 rounded-md flex flex-row bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  {faqOpen ? (
                    <ArrowSmallDownIcon className="w-5 h-5 mr-1" />
                  ) : (
                    <ArrowSmallRightIcon className="w-5 h-5 mr-1" />
                  )}
                  FAQ
                </button>
                {faqOpen && (
                  <div className="bg-white">
                    <div className="mx-auto max-w-7xl px-6 py-24 sm:py-2 lg:px-8 lg:py-2">
                      <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
                        <h2 className="text-xl font-bold leading-10 tracking-tight text-gray-900">
                          Frequently asked questions
                        </h2>
                        <dl className="mt-2 space-y-6 divide-y divide-gray-900/10">
                          {faqs.map((faq) => (
                            <Disclosure
                              as="div"
                              key={faq.question}
                              className="pt-6"
                            >
                              {({open}) => (
                                <>
                                  <dt>
                                    <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                                      <span className="text-base text-sm font-semibold leading-7">
                                        {faq.question}
                                      </span>
                                      <span className="ml-6 flex h-7 items-center">
                                        {open ? (
                                          <MinusSmallIcon
                                            className="h-6 w-6"
                                            aria-hidden="true"
                                          />
                                        ) : (
                                          <PlusSmallIcon
                                            className="h-6 w-6"
                                            aria-hidden="true"
                                          />
                                        )}
                                      </span>
                                    </Disclosure.Button>
                                  </dt>
                                  <Disclosure.Panel
                                    as="dd"
                                    className="mt-2 pr-12"
                                  >
                                    <p className="text-left text-sm leading-normal text-gray-600">
                                      {faq.answer}
                                    </p>
                                  </Disclosure.Panel>
                                </>
                              )}
                            </Disclosure>
                          ))}
                        </dl>
                      </div>
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default OpenAIModal;
