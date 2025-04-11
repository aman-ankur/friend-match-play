import { GameQuestion, GameMode } from "../types/game";

// Game descriptions for each mode
export const GAME_DESCRIPTIONS: Record<GameMode, string> = {
  "guess-who-i-am": "Reveal hidden aspects of your personality! Answer personal questions about yourself, then predict how your friend would answer the same questions. Discover how well you truly know each other.",
  "hot-takes": "Test your ability to predict opinions! Share your stance on controversial topics and predict your friend's reactions. See who's better at reading each other's minds.",
  "this-or-that": "Make tough choices and predict your friend's preferences! Face impossible dilemmas and discover how your choices align (or don't) with your friend's."
};

const guessWhoIAmQuestions: GameQuestion[] = [
  {
    id: "gwia-1",
    text: "What's your go-to karaoke song when you're feeling confident?",
    options: ["Bohemian Rhapsody", "Don't Stop Believin'", "Sweet Caroline", "Livin' on a Prayer"],
    score: 1,
    nsfwRating: 1,
    categories: ["personal", "music"]
  },
  {
    id: "gwia-2",
    text: "What's your secret talent that no one would guess?",
    options: ["I can solve a Rubik's cube", "I'm really good at impressions", "I can recite pi to 50 digits", "I'm a great cook"],
    score: 1,
    nsfwRating: 1,
    categories: ["personal", "skills"]
  },
  {
    id: "gwia-3",
    text: "What's your guilty pleasure TV show?",
    options: ["The Bachelor", "Keeping Up with the Kardashians", "90 Day Fiancé", "Love Island"],
    score: 1,
    nsfwRating: 1,
    categories: ["entertainment", "personal"]
  },
  {
    id: "gwia-4",
    text: "What's your most irrational fear?",
    options: ["Clowns", "Heights", "Spiders", "Public Speaking"],
    score: 1,
    nsfwRating: 1,
    categories: ["personal", "fears"]
  },
  {
    id: "gwia-5",
    text: "What's your dream travel destination?",
    options: ["Japan", "Italy", "New Zealand", "Iceland"],
    score: 1,
    nsfwRating: 1,
    categories: ["travel", "personal"]
  },
  {
    id: "gwia-6",
    text: "What's your most controversial food opinion?",
    options: ["Pineapple belongs on pizza", "Ketchup is overrated", "Avocado is just okay", "Coffee is better without sugar"],
    score: 1,
    nsfwRating: 4,
    categories: ["food", "opinions"]
  },
  {
    id: "gwia-7",
    text: "What's your most embarrassing dating app story?",
    options: ["Matched with my ex", "Got catfished", "Awkward first date", "Ghosted after great conversation"],
    score: 1,
    nsfwRating: 5,
    categories: ["dating", "personal"]
  },
  {
    id: "gwia-8",
    text: "What's your most controversial relationship opinion?",
    options: ["Living together before marriage is essential", "Long-distance relationships never work", "Age gaps don't matter", "Friends with exes is fine"],
    score: 1,
    nsfwRating: 5,
    categories: ["relationships", "opinions"]
  },
  {
    id: "gwia-9",
    text: "What's your most scandalous social media habit?",
    options: ["Stalking exes", "Posting thirst traps", "Arguing in comments", "Fake checking in at fancy places"],
    score: 1,
    nsfwRating: 4,
    categories: ["social", "personal"]
  },
  {
    id: "gwia-10",
    text: "What's your most controversial opinion about modern dating?",
    options: ["Ghosting is sometimes necessary", "Dating apps ruined romance", "Marriage is outdated", "Friends with benefits never works"],
    score: 1,
    nsfwRating: 5,
    categories: ["dating", "opinions"]
  },
  {
    id: "gwia-11",
    text: "What's your most controversial opinion about sex?",
    options: ["Communication is overrated", "Monogamy is unnatural", "Size doesn't matter", "Sex on first date is fine"],
    score: 1,
    nsfwRating: 8,
    categories: ["sex", "opinions"]
  },
  {
    id: "gwia-12",
    text: "What's your most scandalous dating app behavior?",
    options: ["Using fake photos", "Lying about age", "Having multiple accounts", "Using someone else's photos"],
    score: 1,
    nsfwRating: 7,
    categories: ["dating", "personal"]
  },
  {
    id: "gwia-13",
    text: "What's your most controversial opinion about relationships?",
    options: ["Cheating can be justified", "Open relationships are better", "Marriage is a scam", "Love is just chemicals"],
    score: 1,
    nsfwRating: 8,
    categories: ["relationships", "opinions"]
  },
  {
    id: "gwia-14",
    text: "What's your most scandalous social media confession?",
    options: ["I have a secret account", "I post fake relationship drama", "I stalk my crush's ex", "I pretend to be someone else"],
    score: 1,
    nsfwRating: 7,
    categories: ["social", "personal"]
  },
  {
    id: "gwia-15",
    text: "What's your most controversial opinion about modern romance?",
    options: ["Romance is dead", "Love is a choice not a feeling", "Soulmates don't exist", "Marriage is outdated"],
    score: 1,
    nsfwRating: 8,
    categories: ["relationships", "opinions"]
  }
];

const hotTakesQuestions: GameQuestion[] = [
  {
    id: "ht-1",
    text: "Most people would rather be right than happy in an argument",
    options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"],
    score: 1,
    nsfwRating: 1,
    categories: ["relationships", "opinions"]
  },
  {
    id: "ht-2",
    text: "Social media has made us more connected but less intimate",
    options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"],
    score: 1,
    nsfwRating: 1,
    categories: ["social", "technology"]
  },
  {
    id: "ht-3",
    text: "Modern dating is more about convenience than connection",
    options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"],
    score: 1,
    nsfwRating: 2,
    categories: ["dating", "relationships"]
  },
  {
    id: "ht-4",
    text: "People are more honest online than in person",
    options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"],
    score: 1,
    nsfwRating: 1,
    categories: ["social", "personal"]
  },
  {
    id: "ht-5",
    text: "Friendships are more valuable than romantic relationships",
    options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"],
    score: 1,
    nsfwRating: 1,
    categories: ["relationships", "friendship"]
  },
  {
    id: "ht-6",
    text: "Most people would cheat if they knew they wouldn't get caught",
    options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"],
    score: 1,
    nsfwRating: 6,
    categories: ["relationships", "morality"]
  },
  {
    id: "ht-7",
    text: "Dating apps have ruined the concept of romance",
    options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"],
    score: 1,
    nsfwRating: 4,
    categories: ["dating", "technology"]
  },
  {
    id: "ht-8",
    text: "People are more likely to be honest about their feelings when drunk",
    options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"],
    score: 1,
    nsfwRating: 5,
    categories: ["personal", "relationships"]
  },
  {
    id: "ht-9",
    text: "Most relationships fail because of poor communication, not lack of love",
    options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"],
    score: 1,
    nsfwRating: 4,
    categories: ["relationships", "communication"]
  },
  {
    id: "ht-10",
    text: "People are more likely to be their true selves online than in person",
    options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"],
    score: 1,
    nsfwRating: 4,
    categories: ["social", "personal"]
  },
  {
    id: "ht-11",
    text: "Most people have fantasized about someone they shouldn't have",
    options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"],
    score: 1,
    nsfwRating: 8,
    categories: ["relationships", "personal"]
  },
  {
    id: "ht-12",
    text: "Sexual compatibility is more important than emotional connection",
    options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"],
    score: 1,
    nsfwRating: 9,
    categories: ["relationships", "sex"]
  },
  {
    id: "ht-13",
    text: "Most people have sent nudes at some point in their lives",
    options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"],
    score: 1,
    nsfwRating: 8,
    categories: ["relationships", "technology"]
  },
  {
    id: "ht-14",
    text: "Open relationships are more honest than monogamous ones",
    options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"],
    score: 1,
    nsfwRating: 9,
    categories: ["relationships", "morality"]
  },
  {
    id: "ht-15",
    text: "Most people have had a one-night stand they regret",
    options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"],
    score: 1,
    nsfwRating: 8,
    categories: ["relationships", "personal"]
  }
];

const thisOrThatQuestions: GameQuestion[] = [
  {
    id: "tot-1",
    text: "Would you rather have a great career but be single forever, or have a perfect relationship but a mediocre career?",
    options: ["Great career, single forever", "Perfect relationship, mediocre career"],
    score: 1,
    nsfwRating: 2,
    categories: ["career", "relationships"]
  },
  {
    id: "tot-2",
    text: "Would you rather know when you'll die or how you'll die?",
    options: ["Know when", "Know how"],
    score: 1,
    nsfwRating: 1,
    categories: ["personal", "philosophy"]
  },
  {
    id: "tot-3",
    text: "Would you rather be too hot or too cold?",
    options: ["Too hot", "Too cold"],
    score: 1,
    nsfwRating: 1,
    categories: ["personal", "preferences"]
  },
  {
    id: "tot-4",
    text: "Would you rather be famous or rich?",
    options: ["Famous", "Rich"],
    score: 1,
    nsfwRating: 1,
    categories: ["personal", "lifestyle"]
  },
  {
    id: "tot-5",
    text: "Would you rather have a great memory or be able to forget anything?",
    options: ["Great memory", "Forget anything"],
    score: 1,
    nsfwRating: 1,
    categories: ["personal", "abilities"]
  },
  {
    id: "tot-6",
    text: "Would you rather date someone who's amazing in bed but terrible in conversation, or great at conversation but terrible in bed?",
    options: ["Amazing in bed", "Great at conversation"],
    score: 1,
    nsfwRating: 6,
    categories: ["relationships", "sex"]
  },
  {
    id: "tot-7",
    text: "Would you rather have a partner who's always honest but sometimes hurtful, or always kind but sometimes dishonest?",
    options: ["Always honest", "Always kind"],
    score: 1,
    nsfwRating: 4,
    categories: ["relationships", "morality"]
  },
  {
    id: "tot-8",
    text: "Would you rather know all your partner's secrets or have them know all of yours?",
    options: ["Know theirs", "They know mine"],
    score: 1,
    nsfwRating: 5,
    categories: ["relationships", "trust"]
  },
  {
    id: "tot-9",
    text: "Would you rather have a partner who's always busy but successful, or always available but struggling?",
    options: ["Busy but successful", "Available but struggling"],
    score: 1,
    nsfwRating: 4,
    categories: ["relationships", "lifestyle"]
  },
  {
    id: "tot-10",
    text: "Would you rather have a partner who's your best friend but not very romantic, or very romantic but not your best friend?",
    options: ["Best friend", "Very romantic"],
    score: 1,
    nsfwRating: 4,
    categories: ["relationships", "friendship"]
  },
  {
    id: "tot-11",
    text: "Would you rather have great sexual chemistry but argue constantly, or have no sexual chemistry but never argue?",
    options: ["Great sex, constant arguments", "No sex, no arguments"],
    score: 1,
    nsfwRating: 9,
    categories: ["relationships", "sex"]
  },
  {
    id: "tot-12",
    text: "Would you rather have a partner who's amazing in bed but cheats, or faithful but terrible in bed?",
    options: ["Amazing but cheats", "Faithful but terrible"],
    score: 1,
    nsfwRating: 9,
    categories: ["relationships", "sex"]
  },
  {
    id: "tot-13",
    text: "Would you rather know your partner's sexual history in detail, or have them know yours?",
    options: ["Know theirs", "They know mine"],
    score: 1,
    nsfwRating: 8,
    categories: ["relationships", "sex"]
  },
  {
    id: "tot-14",
    text: "Would you rather have a partner who's always initiating sex but not very emotional, or very emotional but never initiates sex?",
    options: ["Always initiates", "Very emotional"],
    score: 1,
    nsfwRating: 8,
    categories: ["relationships", "sex"]
  },
  {
    id: "tot-15",
    text: "Would you rather have a partner who's amazing in bed but has no other qualities, or has every quality but is terrible in bed?",
    options: ["Amazing in bed", "Every other quality"],
    score: 1,
    nsfwRating: 9,
    categories: ["relationships", "sex"]
  }
];

export const allQuestions: Record<GameMode, GameQuestion[]> = {
  "guess-who-i-am": guessWhoIAmQuestions,
  "hot-takes": hotTakesQuestions,
  "this-or-that": thisOrThatQuestions
};

export const getQuestionsByMode = (mode: GameMode, count: number = 5, nsfwLevel: number = 1): GameQuestion[] => {
  const questionsPool = allQuestions[mode] || [];
  
  // Filter questions by NSFW level
  const filteredQuestions = questionsPool.filter(q => q.nsfwRating <= nsfwLevel);
  
  // Shuffle and pick the first 'count' questions
  const shuffled = [...filteredQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default getQuestionsByMode;
