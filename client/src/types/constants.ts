export const STRIPE_LINK =
  process.env.REACT_APP_NODE_ENV === "production"
    ? process.env.REACT_APP_STRIPE_LIVE_LINK
    : process.env.REACT_APP_STRIPE_TEST_LINK;
export const OPENAI_PROMPT_TOKEN_COST = 0.003;
export const OPENAI_COMPLETION_TOKEN_COST = 0.004;
export const OPENAI_TOKEN_THRESHOLD = 1000;
export const LOCAL_STORAGE_LICENSE_KEY = "hw-stripe-payment-license-key";
export const LOCAL_STORAGE_USAGE_KEY = "hw-openai-usage";
export const LOCAL_STORAGE_API_KEY = "hw-openai-apikey";
export const LOCAL_STORAGE_QUERIES_KEY = "hw-queries";
