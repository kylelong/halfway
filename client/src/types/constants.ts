export const STRIPE_LINK =
  process.env.REACT_APP_NODE_ENV === "production"
    ? process.env.REACT_APP_STRIPE_LIVE_LINK
    : process.env.REACT_APP_STRIPE_TEST_LINK;
