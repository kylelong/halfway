export const STRIPE_LINK =
  process.env.REACT_APP_NODE_ENV === "production"
    ? process.env.REACT_APP_STRIPE_LIVE_LINK
    : process.env.REACT_APP_STRIPE_TEST_LINK;
export const OPENAI_PROMPT_TOKEN_COST = 0.003;
export const OPENAI_COMPLETION_TOKEN_COST = 0.004;
export const OPENAI_TOKEN_THRESHOLD = 1000;
