export enum CONTENT_TYPE {
  Writing = "Writing",
  Marketing = "Marketing",
  Email = "Email",
  Advertising = "Advertising",
  Seo = "Seo",
  Ecommerce = "E-commerce ",
  Social = "Social",
}
export enum CONTENT_SUB_TYPE {
  LinkedIn = "LinkedIn",
  Youtube = "Youtube",
  Instagram = "Instagram",
  Twitter = "Twitter",
  TikTok = "Tiktok",
  Facebook = "Facebook",
  Blog = "Blog",
  Paper = "Paper",
  Newsletter = "Newsletter",
}
export enum TONE {
  Generic = "Generic",
  Argumentative = "Argumentative",
  Analytical = "Analytical",
  Casual = "Casual",
  Conversational = "Conversational",
  Descriptive = "Descriptive",
  Emotional = "Emotional",
  Formal = "Formal",
  Friendly = "Friendly",
  Humorous = "Humorous",
  Inspirational = "Inspirational",
  Narratice = "Narrative",
  Persuasive = "Persuasive",
  Sarcastic = "Sarcastic",
}
export enum LENGTH {
  short = "Short",
  medium = "Medium",
  long = "Long",
}

// const PARAGRAPH_SHORT_LENGTH = [1, 2];
// const PARAGRAPH_MEDIUM_LENGTH = [3, 4];
// const PARAGRAPH_LARGE_LENGTH = [4, 6];

/*
 LONG FORM CONTENT: Writing, Social(Facebook, twitter, linkedin)
*/
export const SHORT_RANGE = [100, 250];
export const MEDIUM_RANGE = [250, 500];
export const LARGE_RANGE = [500, 750];

export const LENGTH_SUB_TEXT = [
  `${SHORT_RANGE[0]} - ${SHORT_RANGE[1]} words`,
  `${MEDIUM_RANGE[0]} - ${MEDIUM_RANGE[1]} words`,
  `${LARGE_RANGE[0]} - ${LARGE_RANGE[1]} words`,
];

// interface Content {
//   contentType: CONTENT_TYPE;
//   tone: TONE;
//   length?: LENGTH;
// }
// const content: Content = {
//   contentType: CONTENT_TYPE.Writing,
//   tone: TONE.Sarcastic,
//   length: LENGTH.short,
// };

// what are you writing about ?
