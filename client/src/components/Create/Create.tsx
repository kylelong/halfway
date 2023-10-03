import {Fragment, useState} from "react";
import {Dialog, Transition, Disclosure} from "@headlessui/react";
import {ChevronRightIcon} from "@heroicons/react/20/solid";
import lifeBuoyWhite from "../../assets/lifeBuoyWhite.svg";
import {
  Bars3Icon,
  ChartPieIcon,
  // HomeIcon,
  XMarkIcon,
  UserCircleIcon,
  UserPlusIcon,
  ChartBarIcon,
  InboxArrowDownIcon,
  ShoppingCartIcon,
  NewspaperIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";
import facebookBlank from "../../assets/facebook_blank.svg";
import instagramBlank from "../../assets/instagram_blank.svg";
import youtubeBlank from "../../assets/youtube_blank.svg";
import twitterBlank from "../../assets/twitter_blank.svg";
import linkedinBlank from "../../assets/linkedin_blank.svg";
import tiktokBlank from "../../assets/tiktok_blank.svg";
import youtube from "../../assets/youtube.svg";
import facebook from "../../assets/facebook.svg";
import linkedin from "../../assets/linkedin.svg";
import tiktok from "../../assets/tiktok.svg";
import instagram from "../../assets/instagram.svg";
import twitter from "../../assets/twitter.svg";
import TinyEditor from "./TinyEditor";
import FilterMenu from "./FilterMenu";
import {CONTENT_TYPE} from "../../types/basics";

const navigation = [
  // {id: 0, name: "Dashboard", href: "#", icon: HomeIcon},
  {
    id: 1,
    name: "Writing",
    href: "#",
    icon: NewspaperIcon,
    type: CONTENT_TYPE.Writing,
    children: [
      {
        name: "Paper",
        href: "#",
        options: ["idea", "outline", "sentence", "paragraph"],
      },
      {
        name: "Blog",
        href: "#",
        options: ["idea", "outline", "sentence", "paragraph"],
      },

      {
        name: "Newsletter",
        href: "#",
        options: ["idea", "outline", "sentence", "paragraph"],
      },
    ],
  },
  {
    id: 2,
    name: "Social",
    href: "#",
    icon: DevicePhoneMobileIcon,
    type: CONTENT_TYPE.Social,
    children: [
      {
        name: "Twitter",
        href: "#",
        options: ["thread", "tweet", "reply"],
        icon: twitterBlank,
        coloredIcon: twitter,
      },
      {
        name: "LinkedIn",
        href: "#",
        options: ["post", "article", "hashtags"],
        icon: linkedinBlank,
        coloredIcon: linkedin,
      },
      {
        name: "Youtube",
        href: "#",
        options: ["video idea", "title", "subtitle", "description"],
        icon: youtubeBlank,
        coloredIcon: youtube,
      },
      {
        name: "Instagram",
        href: "#",
        options: ["caption", "bio", "ad", "dm", "comment", "hashtags"],
        icon: instagramBlank,
        coloredIcon: instagram,
      },
      {
        name: "Tiktok",
        href: "#",
        options: ["video idea", "title", "caption"],
        icon: tiktokBlank,
        coloredIcon: tiktok,
      },
      {
        name: "Facebook",
        href: "#",
        options: ["post", "message", "ad"],
        icon: facebookBlank,
        coloredIcon: facebook,
      },
    ],
  },
  {
    id: 3,
    name: "Marketing",
    type: CONTENT_TYPE.Marketing,
    href: "#",
    icon: ChartPieIcon,
    options: ["campaign", "slogan", "affiliate"],
  },
  {
    id: 4,
    name: "SEO",
    href: "#",
    type: CONTENT_TYPE.Seo,
    icon: ChartBarIcon,
    options: ["keywords", "content"],
  },
  {
    id: 5,
    name: "Email",
    href: "#",
    type: CONTENT_TYPE.Email,
    icon: InboxArrowDownIcon,
    options: ["subject", "message"],
  },
  {
    id: 6,
    name: "Advertising",
    href: "#",
    type: CONTENT_TYPE.Advertising,
    icon: UserPlusIcon,
    options: ["campaign", "slogan", "affiliate"],
  },
  {
    id: 7,
    name: "E-commerce",
    href: "#",
    type: CONTENT_TYPE.Ecommerce,
    icon: ShoppingCartIcon,
    options: ["product title", "product description", "keywords"],
  },
];
const teams = [
  {id: 1, name: "Templates", href: "#", initial: "T", current: false},
];
function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
//#endregion

export default function Create() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navId, setNavId] = useState(1);
  const [childIndex, setChildIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(navigation[0]);

  const handleNavClick = (idx: number, item: any) => {
    // TODO: child index
    setNavId(idx);
    setSelectedItem(item);
  };
  const handleChildClick = (index: number) => {
    setChildIndex(index);
  };

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-2">
                    <div className="flex h-16 shrink-0 items-center">
                      <img
                        className="h-8 w-auto"
                        src={lifeBuoyWhite}
                        alt="Your Company"
                      />
                      <div className="text-white ml-2 text-2xl font-bold">
                        halfway
                      </div>
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul className="-mx-2 space-y-1">
                            {navigation.map((item, idx) => (
                              <li
                                key={item.name}
                                onClick={() => handleNavClick(idx, item)}
                              >
                                {!item.children ? (
                                  <a
                                    href={item.href}
                                    className={classNames(
                                      item.id === navId
                                        ? "bg-gray-50 text-indigo-600"
                                        : "text-indigo-200 hover:text-white hover:bg-indigo-700",
                                      "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                    )}
                                  >
                                    <item.icon
                                      className={classNames(
                                        item.id === navId
                                          ? "text-indigo-600"
                                          : "text-indigo-200 group-hover:text-white",
                                        "h-6 w-6 shrink-0"
                                      )}
                                      aria-hidden="true"
                                    />
                                    {item.name}
                                  </a>
                                ) : (
                                  <Disclosure as="div">
                                    {({open}) => (
                                      <>
                                        <Disclosure.Button
                                          className={classNames(
                                            item.id === navId
                                              ? "bg-gray-50 text-indigo-700"
                                              : "hover:bg-indigo-700 text-indigo-200",
                                            "flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-indigo-200"
                                          )}
                                        >
                                          <item.icon
                                            className={classNames(
                                              item.id === navId
                                                ? "text-indigo-600"
                                                : "text-indigo-200",
                                              "h-6 w-6 shrink-0"
                                            )}
                                            aria-hidden="true"
                                          />
                                          {item.name}
                                          <ChevronRightIcon
                                            className={classNames(
                                              open
                                                ? "rotate-90 text-gray-500"
                                                : "text-gray-400",
                                              "ml-auto h-5 w-5 shrink-0"
                                            )}
                                            aria-hidden="true"
                                          />
                                        </Disclosure.Button>
                                        <Disclosure.Panel
                                          as="ul"
                                          className="mt-1 px-2"
                                        >
                                          {item.children.map(
                                            (subItem: any, index: number) => (
                                              <li
                                                key={subItem.name}
                                                onClick={() =>
                                                  handleChildClick(index)
                                                }
                                                className="flex flex-row pl-7 rounded-md hover:bg-indigo-700 hover:text-gray-50 hover:cursor-pointer"
                                              >
                                                {/* 44px */}
                                                {subItem.icon && (
                                                  <img
                                                    src={subItem.icon}
                                                    className="w-8"
                                                  />
                                                )}
                                                <Disclosure.Button
                                                  as="a"
                                                  href={subItem.href}
                                                  className={classNames(
                                                    subItem.current
                                                      ? "bg-gray-50"
                                                      : "hover:bg-indigo-700 hover:text-gray-50",
                                                    "block rounded-md py-2 pr-2 pl-2 text-sm leading-6 text-indigo-200"
                                                  )}
                                                >
                                                  {subItem.name}
                                                </Disclosure.Button>
                                              </li>
                                            )
                                          )}
                                        </Disclosure.Panel>
                                      </>
                                    )}
                                  </Disclosure>
                                )}
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li>
                          <div className="text-xs font-semibold leading-6 text-indigo-200">
                            Your items
                          </div>
                          <ul className="-mx-2 mt-2 space-y-1">
                            {teams.map((team) => (
                              <li key={team.name}>
                                <a
                                  href={team.href}
                                  className={classNames(
                                    team.current
                                      ? "bg-gray-50 text-indigo-600"
                                      : "text-indigo-200 hover:text-white hover:bg-indigo-700",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <span
                                    className={classNames(
                                      team.current
                                        ? "text-indigo-600 border-indigo-600"
                                        : "text-gray-400 border-indigo-400 group-hover:border-indigo-400 group-hover:text-gray-400",
                                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-indigo-500"
                                    )}
                                  >
                                    {team.initial}
                                  </span>
                                  <span className="truncate">{team.name}</span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-indigo-600 px-6">
            <div className="flex h-16 shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src={lifeBuoyWhite}
                alt="Your Company"
              />
              <div className="text-white ml-2 text-2xl font-bold">halfway</div>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul className="-mx-2 space-y-1">
                    {navigation.map((item, idx) => (
                      <li
                        key={item.name}
                        onClick={() => handleNavClick(idx, item)}
                      >
                        {!item.children ? (
                          <a
                            href={item.href}
                            className={classNames(
                              item.id === navId
                                ? "bg-gray-50 text-indigo-600"
                                : "text-indigo-200 hover:text-white hover:bg-indigo-700",
                              "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                            )}
                          >
                            <item.icon
                              className={classNames(
                                item.id === navId
                                  ? "text-indigo-600"
                                  : "text-indigo-200 group-hover:text-white",
                                "h-6 w-6 shrink-0"
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                          </a>
                        ) : (
                          <Disclosure as="div">
                            {({open}) => (
                              <>
                                <Disclosure.Button
                                  className={classNames(
                                    item.id === navId
                                      ? "bg-gray-50 text-indigo-700"
                                      : "hover:bg-indigo-700 text-indigo-200",
                                    "flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-indigo-200"
                                  )}
                                >
                                  <item.icon
                                    className={classNames(
                                      item.id === navId
                                        ? "text-indigo-600"
                                        : "text-indigo-200",
                                      "h-6 w-6 shrink-0"
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                  <ChevronRightIcon
                                    className={classNames(
                                      open
                                        ? "rotate-90 text-gray-500"
                                        : "text-gray-400",
                                      "ml-auto h-5 w-5 shrink-0"
                                    )}
                                    aria-hidden="true"
                                  />
                                </Disclosure.Button>
                                <Disclosure.Panel as="ul" className="mt-1 px-2">
                                  {item.children.map(
                                    (subItem: any, index: number) => (
                                      <li
                                        key={subItem.name}
                                        onClick={() => handleChildClick(index)}
                                        className="flex flex-row pl-7 rounded-md text-indigo-200 hover:bg-indigo-700 hover:text-gray-50 hover:cursor-pointer"
                                      >
                                        {/* 44px */}
                                        {subItem.icon && (
                                          <img
                                            src={subItem.icon}
                                            className="w-6"
                                          />
                                        )}
                                        <Disclosure.Button
                                          as="a"
                                          href={subItem.href}
                                          className={classNames(
                                            subItem.id === navId
                                              ? "bg-gray-50"
                                              : "hover:bg-indigo-700 hover:text-gray-50",
                                            "block rounded-md py-2 pr-2 pl-2 text-sm leading-6 text-indigo-200"
                                          )}
                                        >
                                          {subItem.name}
                                        </Disclosure.Button>
                                      </li>
                                    )
                                  )}
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                        )}
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <div className="text-xs font-semibold leading-6 text-indigo-200">
                    Your items
                  </div>
                  <ul className="-mx-2 mt-2 space-y-1">
                    {teams.map((team) => (
                      <li key={team.name}>
                        <a
                          href={team.href}
                          className={classNames(
                            team.current
                              ? "bg-gray-50 text-indigo-600"
                              : "text-indigo-200 hover:text-white hover:bg-indigo-700",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                        >
                          <span
                            className={classNames(
                              team.current
                                ? "text-indigo-600 border-indigo-600"
                                : "text-gray-400 border-indigo-400 group-hover:border-indigo-400 bg-indigo-500",
                              "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white"
                            )}
                          >
                            {team.initial}
                          </span>
                          <span className="truncate">{team.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="-mx-6 mt-auto">
                  <a
                    href="#"
                    className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-indigo-500 rounded-md"
                  >
                    {/* <img
                      className="h-8 w-8 rounded-full bg-gray-50"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    /> */}

                    <UserCircleIcon className="h-8 w-8 shrink-0 text-gray-200" />
                    <span className="sr-only">Your profile</span>
                    <span aria-hidden="true">Kyle Long</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">
            Dashboard
          </div>
          <a href="#">
            <span className="sr-only">Your profile</span>
            {/* <img
              className="h-8 w-8 rounded-full bg-gray-50"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            /> */}
            <UserCircleIcon className="h-8 w-8 shrink-0 text-indigo-400" />
          </a>
        </div>

        <main className="lg:pl-72">
          <div className="xl:pr-96">
            <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
              {/* Main area w-full sm:w-4/6 lg:2/6 */}
              <TinyEditor />
              <div className="xl:hidden mt-6">
                <FilterMenu item={selectedItem} childIndex={childIndex} />
              </div>
            </div>
          </div>
        </main>

        <aside className="fixed inset-y-0 right-0 hidden w-96 overflow-y-auto border-l border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block">
          {/* Secondary column (hidden on smaller screens) */}
          <FilterMenu item={selectedItem} childIndex={childIndex} />
        </aside>
      </div>
    </>
  );
}
