import {Fragment, useState, useEffect} from "react";
import {Menu, Transition} from "@headlessui/react";
import {ChevronDownIcon} from "@heroicons/react/20/solid";

type Props = {
  options: string[];
  label: string;
  description: string; // describes drop down menu
  updateSelection: React.Dispatch<React.SetStateAction<string>>;
  subText?: string[];
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const DropDownMenu: React.FC<Props> = ({
  options,
  label,
  description,
  updateSelection,
  subText,
}) => {
  const [labelText, setLabelText] = useState<string>(label);
  useEffect(() => {
    setLabelText(label);
  }, [label]);
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className="block text-sm font-medium leading-6 text-gray-900 mb-2">
        {description}
      </div>
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {labelText}
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {options.map((item, index) => {
              return (
                <Menu.Item key={index}>
                  {({active}) => (
                    <div
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm hover:cursor-pointer"
                      )}
                      onClick={() => {
                        setLabelText(item);
                        updateSelection(item);
                      }}
                    >
                      {item}
                      <>
                        {subText && (
                          <div className="text-xs text-indigo-700">
                            {subText[index]}
                          </div>
                        )}
                      </>
                    </div>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
export default DropDownMenu;
