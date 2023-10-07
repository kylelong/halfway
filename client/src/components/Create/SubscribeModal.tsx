import {Fragment, useRef, useState, useEffect} from "react";
import {Dialog, Transition} from "@headlessui/react";
import chicken from "../../assets/chicken.svg";
type Props = {
  showModal: boolean;
  updatePricingModal: React.Dispatch<React.SetStateAction<boolean>>;
};

// encourages people on the free trial to subscribe
const SubscribeModal: React.FC<Props> = ({showModal, updatePricingModal}) => {
  const [open, setOpen] = useState(showModal);
  const [time, setTime] = useState(7);
  const closeDueToCountdown = useRef(false); // Track if modal closed due to countdown

  const cancelButtonRef = useRef(null);

  // Synchronize open state with showModal prop
  useEffect(() => {
    if (showModal) {
      if (!closeDueToCountdown.current) {
        setOpen(true);
        setTime(7); // reset the timer
      } else {
        // Reset the ref for future showModal toggles
        closeDueToCountdown.current = false;
      }
    } else {
      setOpen(false);
    }
  }, [showModal, open]);

  useEffect(() => {
    if (open && time > 0) {
      const timer = setTimeout(() => {
        setTime((prevTime) => {
          if (prevTime - 1 === 0) {
            closeDueToCountdown.current = true;
            setOpen(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [open, time]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 flex items-center justify-center z-10"
        initialFocus={cancelButtonRef}
        onClose={() => setOpen(false)}
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
                  <div className="mt-3 text-center sm:mt-5">
                    <div className="absolute top-2 right-4 text-center w-8 h-8 flex justify-center items-center font-semibold text-indigo-600 rounded-full bg-slate-200">
                      {time}
                    </div>
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900 items-center flex flex-row"
                    >
                      <img src={chicken} alt="bird" className="w-8 h-8 mr-2" />
                      <div>Early bird pricing is ending soon.</div>
                    </Dialog.Title>
                    <div className="mt-2 mb-4">
                      <p className="text-sm text-gray-500 text-left mb-2">
                        You are using the{" "}
                        <b className="text-indigo-600">free trial</b> version.
                      </p>
                      <p></p>
                      <p className="text-sm text-gray-500 text-left">
                        Unlock premium features like searching saved content
                        results and saving your search templates.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="mt-3 mb-4 sm:mb-0 inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 ring-1 ring-inset sm:col-start-1 sm:mt-0"
                  onClick={() => updatePricingModal(true)}
                >
                  Unlock premium features
                </button>
                <p className="text-base text-sm mt-2">
                  $9 one time purchase, life time membership
                </p>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default SubscribeModal;
