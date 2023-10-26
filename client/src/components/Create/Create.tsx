import {Fragment, useState, useEffect, useRef} from "react";
import {Dialog, Transition, Disclosure} from "@headlessui/react";
import {ChevronRightIcon} from "@heroicons/react/20/solid";
import lifeBuoyWhite from "../../assets/lifeBuoyWhite.svg";
import {
  LOCAL_STORAGE_LICENSE_KEY,
  LOCAL_STORAGE_USAGE_KEY,
} from "../../types/constants";
import {
  OPENAI_PROMPT_TOKEN_COST,
  OPENAI_COMPLETION_TOKEN_COST,
  OPENAI_TOKEN_THRESHOLD,
} from "../../types/constants";
import {
  Bars3Icon,
  ChartPieIcon,
  HomeIcon,
  XMarkIcon,
  UserPlusIcon,
  ChartBarIcon,
  InboxArrowDownIcon,
  ShoppingCartIcon,
  NewspaperIcon,
  DevicePhoneMobileIcon,
  GiftIcon,
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
type Navigation = {
  id: number;
  name: string;
  href: string;
  icon: any;
  type: CONTENT_TYPE;
  showLength?: boolean;
  options?: string[];
  examples?: any;
  children?: any[];
};

const navigation: Navigation[] = [
  // {id: 0, name: "About", href: "/about", icon: HomeIcon},
  // {id: 1, name: "Purchase", href: "/pricing", icon: GiftIcon},
  {
    id: 0,
    name: "Writing",
    href: "#",
    icon: NewspaperIcon,
    type: CONTENT_TYPE.Writing,
    showLength: false,
    children: [
      {
        name: "Paper",
        href: "#",
        options: ["idea", "outline", "sentence", "paragraph"],
        examples: {
          idea: [
            "factors that influence our music taste",
            "french cuisine influence on luxury dining",
            "how having a garden increases life expectancy",
          ],
          outline: [
            "ETFs as an effective investing strategy",
            "determinism vs free will",
            "history of human computer interaction",
          ],
          sentence: [
            "explain why grit is critical to success",
            "fasting as an effective weight loss strategy",
            "strength training impact on muscle mass",
          ],
          paragraph: [
            "how silicon valley became the mecca of tech",
            "red burgundy vs willamette valley pinot noir",
            "cancel culture in modern comedy",
          ],
        },
      },
      {
        name: "Blog",
        href: "#",
        options: ["idea", "outline", "sentence", "paragraph"],
        examples: {
          idea: [
            "how to come up with creative ideas",
            "french cuisine influence on luxury dining",
            "how having a garden increases life expectancy",
          ],
          outline: [
            "why you should solo travel",
            "determinism vs free will",
            "history of human computer interaction",
          ],
          sentence: [
            "explain why grit is critical to success",
            "fasting as an effective weight loss strategy",
            "strength training impact on muscle mass",
          ],
          paragraph: [
            "how silicon valley became the mecca of tech",
            "red burgundy vs willamette valley pinot noir",
            "cancel culture in modern comedy",
          ],
        },
      },

      {
        name: "Newsletter",
        href: "#",
        options: ["idea", "outline", "sentence", "paragraph"],
        examples: {
          idea: [
            "weekly tech news",
            "daily worldwide news",
            "inspirational quotes and sayings",
          ],
          outline: [
            "tech startups to look out for",
            "recipes of the week",
            "paris art musuems",
          ],
          sentence: [
            "explain amor fati in stoic philosophy",
            "investing strategy for retirement",
            "strength training impact on muscle mass",
          ],
          paragraph: [
            "how yoga improved me as a distance runner",
            "napa chardonnay vs white burgundy",
            "fashion ideas for fall dressing",
          ],
        },
      },
    ],
  },
  {
    id: 1,
    name: "Social",
    href: "#",
    icon: DevicePhoneMobileIcon,
    showLength: true,
    type: CONTENT_TYPE.Social,
    children: [
      {
        name: "Twitter",
        href: "#",
        options: ["tweet", "thread", "reply", "dm"],
        icon: twitterBlank,
        coloredIcon: twitter,
        examples: {
          tweet: [
            "showing love for Drake's new album",
            "launching my new book",
            "asking for recs in nyc",
          ],
          thread: [
            "how to build better habits",
            "steps to make strawberry cobbler",
            "steps to effective marketing",
          ],
          reply: [
            "answering a feature request from a user",
            "expanding on the tweet",
            "follow up question to a tweet",
          ],
          dm: [
            "reaching out to make a connection",
            "responding to a tweet",
            "pitching an idea",
          ],
        },
      },
      {
        name: "LinkedIn",
        href: "#",
        options: ["post", "article", "message"],
        icon: linkedinBlank,
        coloredIcon: linkedin,
        examples: {
          post: [
            "announcing my new role as a software engineer",
            "launching my new podcast",
            "announcing my book signing in nyc",
          ],
          article: [
            "how to land your dream job",
            "how to negotiate effectively",
            "networking effectively on linkedin",
          ],
          message: [
            "following up on a job",
            "inquiring about a position",
            "reaching out to an old colleague",
          ],
        },
      },
      {
        name: "Youtube",
        href: "#",
        options: ["video", "title", "subtitle", "description"],
        icon: youtubeBlank,
        coloredIcon: youtube,
        examples: {
          video: [
            "day in the life vlog in nyc",
            "cooking show making apple pie",
            "nike dunks low shoe unboxing",
          ],
          title: [
            "day in the life as a google intern",
            "top rap albums of the last decade",
            "golfing at pebble beach",
          ],
          subtitle: [
            "solo travel in positano vlog",
            "music podcast interviewing erykah badu",
            "nyc new apartment tour",
          ],
          description: [
            "live show promotion",
            "golf trip to scottsdale,arizona",
            "clothing brand pop up in soho nyc",
          ],
        },
      },
      {
        name: "Instagram",
        href: "#",
        options: ["caption", "ad", "dm", "comment", "hashtags"],
        icon: instagramBlank,
        coloredIcon: instagram,
        examples: {
          caption: [
            "weekend trip to nyc",
            "happy birthday to my friend",
            "rolling loud recap",
          ],
          ad: [
            "clothing brand fall collection",
            "speed dating event",
            "live comedy show tonight",
          ],
          dm: [
            "reaching out for a music collab",
            "responding to a cool story",
            "letting a friend know I am in town",
          ],
          comment: ["insight on a post", "hyping my friend up"],
          hashtags: [
            "wine tour in napa valley",
            "golf trip to pebble beach",
            "us open in nyc",
          ],
        },
      },
      {
        name: "Tiktok",
        href: "#",
        options: ["video", "title", "caption", "hashtags"],
        icon: tiktokBlank,
        coloredIcon: tiktok,
        examples: {
          video: [
            "new hip trendy dance",
            "get ready with me",
            "day in the life in nyc",
          ],
          title: [
            "story time about a vacation",
            "horrible date recap",
            "ski trip montage",
          ],
          caption: [
            "sharing my favorite songs from an album",
            "announcing a local wine event",
            "pranking my sister",
          ],
          hashtags: [
            "helo my video go viral",
            "dance video",
            "football game vlog",
          ],
        },
      },
      {
        name: "Facebook",
        href: "#",
        options: ["post", "message", "ad"],
        icon: facebookBlank,
        coloredIcon: facebook,
        examples: {
          post: [
            "recent life update",
            "announcing my new apparel line",
            "letting friends and family know I am engaged",
          ],
          message: [
            "inquiring about a product on the marketplace",
            "reaching out to an old friend",
            "joking in the group chat",
          ],
          ad: [
            "clothing brand new fall collection",
            "speed dating event",
            "live comedy show tonight at 8pm",
          ],
        },
      },
    ],
  },
  {
    id: 2,
    name: "Marketing",
    type: CONTENT_TYPE.Marketing,
    href: "#",
    icon: ChartPieIcon,
    showLength: false,
    options: ["campaign", "slogan", "affiliate"],
    examples: {
      campaign: [
        "fall 2023 skin care product line",
        "website analytics SaaS business",
        "massage therapy",
      ],
      slogan: [
        "for my new jewelry boutique",
        "fall discounts for retail",
        "joking in the group chat",
      ],
      affiliate: [
        "collaborating with new balance",
        "partnering with instagram influencers",
        "sponsoring a podcast",
      ],
    },
  },
  {
    id: 3,
    name: "SEO",
    href: "#",
    type: CONTENT_TYPE.Seo,
    icon: ChartBarIcon,
    showLength: false,
    options: ["keywords", "content"],
    examples: {
      keywords: [
        "etsy jewelry store",
        "SaaS analytics business",
        "computer science tutoring service",
      ],
      content: [
        "my businesses product page",
        "tech blog post",
        "SaaS landing page",
      ],
    },
  },
  {
    id: 4,
    name: "Email",
    href: "#",
    type: CONTENT_TYPE.Email,
    icon: InboxArrowDownIcon,
    showLength: true,
    options: ["message", "subject"],
    examples: {
      message: [
        "reschedule meeting with my colleague Kevin for friday at 2pm",
        "following up with the recruiter about my application",
        "inquiring about the status of my order",
      ],
      subject: [
        "follow up with a recruiter",
        "cancel meeting this afternoon with my colleague",
        "introducing my friend to someone",
      ],
    },
  },
  {
    id: 5,
    name: "Advertising",
    href: "#",
    type: CONTENT_TYPE.Advertising,
    icon: UserPlusIcon,
    showLength: false,
    options: ["campaign", "slogan", "affiliate"],
    examples: {
      campaign: [
        "fall 2023 skin care product line",
        "site analytics SaaS business",
        "design agency service",
      ],
      slogan: [
        "for my new jewelry boutique",
        "fall discounts for retail",
        "fall 2023 skin care product line",
      ],
      affiliate: [
        "collaborating with new balance",
        "partnering with instagram influencers",
        "sponsoring a podcast",
      ],
    },
  },
  {
    id: 6,
    name: "E-commerce",
    href: "#",
    type: CONTENT_TYPE.Ecommerce,
    icon: ShoppingCartIcon,
    showLength: false,
    options: ["product title", "product description", "keywords"],
    examples: {
      title: [
        "fall 2023 skin care product line",
        "handle made jewlery items",
        "custom hoodies",
      ],
      description: [
        "high quality gold necklace",
        "premium golf polo",
        "sleek mechanical keyboards",
      ],
      keywords: [
        "fall 2023 skin care product line",
        "t-shirt line",
        "custom air force ones",
      ],
    },
  },
];
// const teams = [
//   {id: 1, name: "Templates", href: "#", initial: "T", current: false},
// ];
function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
//#endregion

export default function Create() {
  const welcomeMessage = `Welcome to Halfway. Get smart generated content for all your writing needs. Content for writing papers, emails, blogs, newsletters. Also for social media, marketing & advertising campaigns, e-commerce, and seo. To get started, enter the details (below if on mobile, to the right if on desktop) of the content you want to create.`;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navId, setNavId] = useState(0);
  const [childIndex, setChildIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState<Navigation>(navigation[0]);
  const [content, setContent] = useState(
    localStorage.getItem("showedWelcomeMessage") ? "" : welcomeMessage
  );
  const [completion, setCompletion] = useState<any>();
  const [usage, setUsage] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_USAGE_KEY) || "{}")
  );
  const usageRef = useRef(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_USAGE_KEY) || "{}")
  );

  const handleNavClick = (idx: number, item: any) => {
    // TODO: child index
    setNavId(idx);
    setSelectedItem(item);
    setContent("");
    if (navigation[idx].children && idx !== navId) {
      setChildIndex(0);
    }
  };
  const handleChildClick = (index: number) => {
    setChildIndex(index);
    setContent("");
  };
  useEffect(() => {
    // update api usage
    if (
      localStorage.getItem(LOCAL_STORAGE_USAGE_KEY) &&
      localStorage.getItem(LOCAL_STORAGE_USAGE_KEY) !==
        JSON.stringify(usageRef.current)
    ) {
      // is set in FilterMenu.tsx#generate
      const use = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_USAGE_KEY) || "{}"
      );
      setUsage(use);
      usageRef.current = use;
    }
    if (!localStorage.getItem("showedWelcomeMessage")) {
      localStorage.setItem("showedWelcomeMessage", "true");
    }
  }, [content, setContent, usage]);
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
                      <div
                        style={{fontFamily: "Gaegu"}}
                        className="text-white ml-2 text-3xl font-bold"
                      >
                        halfway
                      </div>
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul className="-mx-2 space-y-1">
                            <li>
                              <a
                                href="/about"
                                style={{fontFamily: "Gaegu"}}
                                className="group flex gap-x-3 rounded-md p-2 text-xl leading-6 font-semibold text-indigo-200 hover:text-white hover:bg-indigo-700"
                              >
                                <HomeIcon className="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white" />
                                About
                              </a>
                            </li>
                            {navigation.map((item, idx) => (
                              <li
                                key={item.name}
                                onClick={() => handleNavClick(idx, item)}
                              >
                                {!item.children ? (
                                  <a
                                    href={item.href}
                                    style={{fontFamily: "Gaegu"}}
                                    className={classNames(
                                      item.id === navId
                                        ? "bg-gray-50 text-indigo-600"
                                        : "text-indigo-200 hover:text-white hover:bg-indigo-700",
                                      "group flex gap-x-3 rounded-md p-2 text-xl leading-6 font-semibold"
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
                                          style={{fontFamily: "Gaegu"}}
                                          className={classNames(
                                            item.id === navId
                                              ? "bg-gray-50 text-indigo-700"
                                              : "hover:bg-indigo-700 text-indigo-200",
                                            "flex items-center w-full text-left rounded-md p-2 gap-x-3 text-xl leading-6 font-semibold text-indigo-200"
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
                                          {item.children?.map(
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
                                                    alt="icon"
                                                    src={subItem.icon}
                                                    className="w-8"
                                                  />
                                                )}
                                                <Disclosure.Button
                                                  as="a"
                                                  href={subItem.href}
                                                  style={{fontFamily: "Gaegu"}}
                                                  className={classNames(
                                                    subItem.current
                                                      ? "bg-gray-50"
                                                      : "hover:bg-indigo-700 hover:text-gray-50",
                                                    "block rounded-md py-2 pr-2 pl-2 text-xl leading-6 text-indigo-200"
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
                        {/* <li>
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
                        </li> */}
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
              <div
                style={{fontFamily: "Gaegu"}}
                className="text-white ml-2 text-3xl font-bold"
              >
                halfway
              </div>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul className="-mx-2 space-y-1">
                    <li>
                      <a
                        href="/about"
                        style={{fontFamily: "Gaegu"}}
                        className="group flex gap-x-3 rounded-md p-2 text-xl leading-6 font-semibold text-indigo-200 hover:text-white hover:bg-indigo-700"
                      >
                        <HomeIcon className="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white" />
                        About
                      </a>
                    </li>
                    {!localStorage.getItem(LOCAL_STORAGE_LICENSE_KEY) && (
                      <li>
                        <a
                          href="/pricing"
                          style={{fontFamily: "Gaegu"}}
                          className="group flex gap-x-3 rounded-md p-2 text-xl leading-6 font-semibold text-indigo-200 hover:text-white hover:bg-indigo-700"
                        >
                          <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-white opacity-75"></span>
                          <GiftIcon className="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white" />
                          Purchase
                        </a>
                      </li>
                    )}
                    {navigation.map((item, idx) => (
                      <li
                        key={item.name}
                        onClick={() => handleNavClick(idx, item)}
                        style={{fontFamily: "Gaegu"}}
                      >
                        {!item.children ? (
                          <a
                            href={item.href}
                            style={{fontFamily: "Gaegu"}}
                            className={classNames(
                              item.id === navId
                                ? "bg-gray-50 text-indigo-600"
                                : "text-indigo-200 hover:text-white hover:bg-indigo-700",
                              "group flex gap-x-3 rounded-md p-2 text-xl leading-6 font-semibold"
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
                                  style={{fontFamily: "Gaegu"}}
                                  className={classNames(
                                    item.id === navId
                                      ? "bg-gray-50 text-indigo-700"
                                      : "hover:bg-indigo-700 text-indigo-200",
                                    "flex items-center w-full text-left rounded-md p-2 gap-x-3 text-xl leading-6 font-semibold text-indigo-200"
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
                                  {item.children?.map(
                                    (subItem: any, index: number) => (
                                      <li
                                        key={subItem.name}
                                        onClick={() => handleChildClick(index)}
                                        className="flex flex-row pl-7 rounded-md text-indigo-200 hover:bg-indigo-700 hover:text-gray-50 hover:cursor-pointer"
                                      >
                                        {/* 44px */}
                                        {subItem.icon && (
                                          <img
                                            alt="icon"
                                            src={subItem.icon}
                                            className="w-6"
                                          />
                                        )}
                                        <Disclosure.Button
                                          as="a"
                                          href={subItem.href}
                                          style={{fontFamily: "Gaegu"}}
                                          className={classNames(
                                            subItem.id === navId
                                              ? "bg-gray-50"
                                              : "hover:bg-indigo-700 hover:text-gray-50",
                                            "block rounded-md py-2 pr-2 pl-2 text-xl leading-6 text-indigo-200"
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

                {localStorage.getItem(LOCAL_STORAGE_USAGE_KEY) && (
                  <div>
                    <p className="text-xs font-semibold leading-6 text-indigo-200">
                      API usage cost: $
                      <span className="text-xs font-semibold leading-6 text-indigo-100">
                        {""}
                        {(
                          (usage.prompt_tokens / OPENAI_TOKEN_THRESHOLD) *
                            OPENAI_PROMPT_TOKEN_COST +
                          (usage.completion_tokens / OPENAI_TOKEN_THRESHOLD) *
                            OPENAI_COMPLETION_TOKEN_COST
                        ).toFixed(6)}
                      </span>
                    </p>
                    <a
                      href="https://openai.com/pricing"
                      className="text-xs relative bottom-1.5 font-semibold leading-6 text-slate-50"
                      target="_blank"
                      rel="noreferrer"
                    >
                      GPT-3.5 Turbo pricing explained
                    </a>
                  </div>
                )}
                <li className="-mx-6 mt-auto">
                  {/* <a
                    href="/profile"
                    className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-indigo-500 rounded-md"
                  >
                     <img
                      className="h-8 w-8 rounded-full bg-gray-50"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    /> 

                     <UserCircleIcon className="h-8 w-8 shrink-0 text-gray-200" />
                    <span className="sr-only">Your profile</span>
                    <span aria-hidden="true">Kyle Long</span> 
                  </a> */}
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
          {/* <a href="/profile">
            <span className="sr-only">Your profile</span>
             <img
              className="h-8 w-8 rounded-full bg-gray-50"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            /> 
            <UserCircleIcon className="h-8 w-8 shrink-0 text-indigo-400" />
          </a> */}
        </div>

        <main className="lg:pl-72">
          <div className="xl:pr-96">
            <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
              {/* Main area w-full sm:w-4/6 lg:2/6 */}
              <TinyEditor content={content} completion={completion} />

              <div className="xl:hidden mt-6">
                <FilterMenu
                  item={selectedItem}
                  childIndex={childIndex}
                  updateCompletion={setCompletion}
                />
              </div>
            </div>
          </div>
        </main>

        <aside className="fixed inset-y-0 right-0 hidden w-96 overflow-y-auto border-l border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block">
          {/* Secondary column (hidden on smaller screens) */}
          <FilterMenu
            item={selectedItem}
            childIndex={childIndex}
            updateCompletion={setCompletion}
          />
        </aside>
      </div>
    </>
  );
}
