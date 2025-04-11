// server/src/gameUtils.ts

// Define basic types here or import from a shared types file
export interface GameQuestion {
    id: string;
    text: string;
    options: string[];
    score: number;
    nsfwRating: number;
    categories: string[];
}

export type GameMode = "guess-who-i-am" | "hot-takes" | "this-or-that";

// --- Copied Question Data (Consider moving to JSON or DB) --- 
const guessWhoIAmQuestions: GameQuestion[] = [
  {
    id: "gwia-1",
    text: "What's your go-to karaoke song when you're feeling confident?",
    options: ["Bohemian Rhapsody", "Don't Stop Believin'", "Sweet Caroline", "Livin' on a Prayer"],
    score: 1,
    nsfwRating: 1,
    categories: ["personal", "music"]
  },
  // ... (rest of guessWhoIAmQuestions data) ...
  {
    id: "gwia-15",
    text: "What's your most controversial opinion about modern romance?",
    options: ["Romance is dead", "Love is a choice not a feeling", "Soulmates don't exist", "Marriage is outdated"],
    score: 1,
    nsfwRating: 8,
    categories: ["relationships", "opinions"]
  },
  {
    id: "gwia-16",
    text: "What's your comfort food after a bad day?",
    options: ["Pizza", "Ice Cream", "Mac & Cheese", "Chocolate"],
    score: 1,
    nsfwRating: 1,
    categories: ["personal", "food"]
  },
  {
    id: "gwia-17",
    text: "If you could have any superpower, what would it be?",
    options: ["Flight", "Invisibility", "Teleportation", "Super Strength"],
    score: 1,
    nsfwRating: 1,
    categories: ["personal", "fantasy"]
  },
  {
    id: "gwia-18",
    text: "What's the first thing you do when you wake up?",
    options: ["Check phone", "Drink water", "Hit snooze", "Meditate"],
    score: 1,
    nsfwRating: 1,
    categories: ["personal", "habits"]
  },
  {
    id: "gwia-19",
    text: "What's a small thing that makes your day better?",
    options: ["Sunny weather", "Good coffee", "Kind stranger", "Favorite song"],
    score: 1,
    nsfwRating: 1,
    categories: ["personal", "preferences"]
  },
  {
    id: "gwia-20",
    text: "What fictional world would you most like to live in?",
    options: ["Hogwarts", "Middle-earth", "Star Wars Galaxy", "Narnia"],
    score: 1,
    nsfwRating: 2,
    categories: ["entertainment", "personal"]
  },
  {
    id: "gwia-21",
    text: "What's a skill you wish you had?",
    options: ["Playing an instrument", "Speaking another language", "Drawing", "Coding"],
    score: 1,
    nsfwRating: 2,
    categories: ["personal", "skills"]
  },
  {
    id: "gwia-22",
    text: "What's your biggest pet peeve?",
    options: ["Loud chewing", "Being late", "Slow walkers", "Interrupting"],
    score: 1,
    nsfwRating: 3,
    categories: ["personal", "preferences"]
  },
  {
    id: "gwia-23",
    text: "What's the most spontaneous thing you've ever done?",
    options: ["Last-minute trip", "Quit a job", "Got a tattoo", "Confessed feelings"],
    score: 1,
    nsfwRating: 4,
    categories: ["personal", "life"]
  },
  {
    id: "gwia-24",
    text: "What's a white lie you tell often?",
    options: ["I'm fine", "On my way", "Looks great!", "I've seen that movie"],
    score: 1,
    nsfwRating: 5,
    categories: ["personal", "morality"]
  },
  {
    id: "gwia-25",
    text: "What's something you find attractive that others might not?",
    options: ["Specific accent", "Awkwardness", "Intelligence over looks", "Unique hobby"],
    score: 1,
    nsfwRating: 6,
    categories: ["personal", "attraction"]
  },
  {
    id: "gwia-26",
    text: "What's the weirdest place you've fallen asleep?",
    options: ["Public transport", "At work/school", "Standing up", "During a movie"],
    score: 1,
    nsfwRating: 6,
    categories: ["personal", "funny"]
  },
  {
    id: "gwia-27",
    text: "Have you ever snooped through someone's phone?",
    options: ["Yes, partner's", "Yes, friend's", "Yes, family's", "No, never"],
    score: 1,
    nsfwRating: 7,
    categories: ["personal", "relationships", "morality"]
  },
  {
    id: "gwia-28",
    text: "What's your go-to move to initiate intimacy?",
    options: ["Direct approach", "Subtle hints", "Physical touch", "Flirty banter"],
    score: 1,
    nsfwRating: 8,
    categories: ["relationships", "sex"]
  },
  {
    id: "gwia-29",
    text: "What's a sexual fantasy you'd be hesitant to admit?",
    options: ["Group scenario", "Public place", "BDSM", "Roleplay"],
    score: 1,
    nsfwRating: 9,
    categories: ["sex", "personal"]
  },
  {
    id: "gwia-30",
    text: "What's the biggest secret you've kept from a partner?",
    options: ["Financial issue", "Past relationship detail", "Secret habit", "Infidelity"],
    score: 1,
    nsfwRating: 10,
    categories: ["relationships", "secrets"]
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
  // ... (rest of hotTakesQuestions data) ...
  {
    id: "ht-15",
    text: "Most people have had a one-night stand they regret",
    options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"],
    score: 1,
    nsfwRating: 8,
    categories: ["relationships", "personal"]
  },
  {
    id: "ht-16",
    text: "Breakfast is the most important meal of the day.",
    options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"],
    score: 1,
    nsfwRating: 1,
    categories: ["food", "opinions"]
  },
  {
    id: "ht-17",
    text: "Cats are better pets than dogs.",
    options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"],
    score: 1,
    nsfwRating: 1,
    categories: ["animals", "opinions"]
  },
  {
    id: "ht-18",
    text: "Reality TV is mostly harmful entertainment.",
    options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"],
    score: 1,
    nsfwRating: 2,
    categories: ["entertainment", "opinions"]
  },
  {
    id: "ht-19",
    text: "Cancel culture goes too far most of the time.",
    options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"],
    score: 1,
    nsfwRating: 3,
    categories: ["social", "opinions"]
  },
  {
    id: "ht-20",
    text: "Working from home is more productive than working in an office.",
    options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"],
    score: 1,
    nsfwRating: 2,
    categories: ["work", "opinions"]
  },
  {
    id: "ht-21",
    text: "It's okay to ghost someone after one or two dates.",
    options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"],
    score: 1,
    nsfwRating: 4,
    categories: ["dating", "morality"]
  },
  {
    id: "ht-22",
    text: "Physical attraction is the most important factor in early dating.",
    options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"],
    score: 1,
    nsfwRating: 5,
    categories: ["dating", "relationships"]
  },
  {
    id: "ht-23",
    text: "Having separate finances in a marriage is a good idea.",
    options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"],
    score: 1,
    nsfwRating: 4,
    categories: ["relationships", "finance"]
  },
  {
    id: "ht-24",
    text: "It's acceptable to lie to protect someone's feelings.",
    options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"],
    score: 1,
    nsfwRating: 5,
    categories: ["morality", "relationships"]
  },
  {
    id: "ht-25",
    text: "Psychedelics can be beneficial for mental health.",
    options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"],
    score: 1,
    nsfwRating: 6,
    categories: ["health", "opinions"]
  },
  {
    id: "ht-26",
    text: "Most people present a fake version of themselves online.",
    options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"],
    score: 1,
    nsfwRating: 4,
    categories: ["social", "psychology"]
  },
  {
    id: "ht-27",
    text: "Pornography has a mostly negative impact on relationships.",
    options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"],
    score: 1,
    nsfwRating: 8,
    categories: ["sex", "relationships", "opinions"]
  },
  {
    id: "ht-28",
    text: "Experimenting sexually outside a relationship can sometimes strengthen it.",
    options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"],
    score: 1,
    nsfwRating: 9,
    categories: ["relationships", "sex", "morality"]
  },
  {
    id: "ht-29",
    text: "Having a 'work spouse' can border on emotional infidelity.",
    options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"],
    score: 1,
    nsfwRating: 8,
    categories: ["relationships", "work", "morality"]
  },
  {
    id: "ht-30",
    text: "Sex work should be fully decriminalized and regulated.",
    options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"],
    score: 1,
    nsfwRating: 10,
    categories: ["social", "politics", "sex"]
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
    id: "tot-16",
    text: "Would you rather explore space or the deep ocean?",
    options: ["Space", "Deep Ocean"],
    score: 1,
    nsfwRating: 1,
    categories: ["exploration", "preferences"]
  },
  {
    id: "tot-17",
    text: "Would you rather live without music or without movies?",
    options: ["Without Music", "Without Movies"],
    score: 1,
    nsfwRating: 1,
    categories: ["entertainment", "preferences"]
  },
  {
    id: "tot-18",
    text: "Would you rather always be 10 minutes late or always 20 minutes early?",
    options: ["10 mins late", "20 mins early"],
    score: 1,
    nsfwRating: 1,
    categories: ["personal", "habits"]
  },
  {
    id: "tot-19",
    text: "Would you rather have the ability to fly or be invisible?",
    options: ["Fly", "Be Invisible"],
    score: 1,
    nsfwRating: 2,
    categories: ["abilities", "fantasy"]
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
    id: "tot-15",
    text: "Would you rather have a partner who's amazing in bed but has no other qualities, or has every quality but is terrible in bed?",
    options: ["Amazing in bed", "Every other quality"],
    score: 1,
    nsfwRating: 9,
    categories: ["relationships", "sex"]
  },
  {
    id: "tot-20",
    text: "Would you rather read minds or control time?",
    options: ["Read minds", "Control time"],
    score: 1,
    nsfwRating: 1,
    categories: ["abilities", "fantasy"]
  },
  {
    id: "tot-21",
    text: "Would you rather live in the city or the countryside?",
    options: ["City", "Countryside"],
    score: 1,
    nsfwRating: 1,
    categories: ["lifestyle", "preferences"]
  },
  {
    id: "tot-22",
    text: "Would you rather give up coffee or alcohol forever?",
    options: ["Give up coffee", "Give up alcohol"],
    score: 1,
    nsfwRating: 2,
    categories: ["food", "habits"]
  },
  {
    id: "tot-23",
    text: "Would you rather have more time or more money?",
    options: ["More time", "More money"],
    score: 1,
    nsfwRating: 1,
    categories: ["lifestyle", "philosophy"]
  },
  {
    id: "tot-24",
    text: "Would you rather be an amazing singer or an amazing dancer?",
    options: ["Singer", "Dancer"],
    score: 1,
    nsfwRating: 1,
    categories: ["abilities", "personal"]
  },
  {
    id: "tot-25",
    text: "Would you rather travel the future or the past?",
    options: ["Future", "Past"],
    score: 1,
    nsfwRating: 2,
    categories: ["fantasy", "personal"]
  },
  {
    id: "tot-26",
    text: "Would you rather always have to tell the truth or always have to lie?",
    options: ["Always tell truth", "Always lie"],
    score: 1,
    nsfwRating: 3,
    categories: ["morality", "philosophy"]
  },
  {
    id: "tot-27",
    text: "Would you rather find true love or win the lottery?",
    options: ["True love", "Lottery"],
    score: 1,
    nsfwRating: 4,
    categories: ["relationships", "lifestyle"]
  },
  {
    id: "tot-28",
    text: "Would you rather date someone much older or much younger?",
    options: ["Much older", "Much younger"],
    score: 1,
    nsfwRating: 5,
    categories: ["dating", "relationships"]
  },
  {
    id: "tot-29",
    text: "Would you rather forgive a partner for cheating emotionally or physically?",
    options: ["Forgive emotional cheating", "Forgive physical cheating"],
    score: 1,
    nsfwRating: 7,
    categories: ["relationships", "morality"]
  },
  {
    id: "tot-30",
    text: "Would you rather have your browser history leaked or your private messages leaked?",
    options: ["Browser history", "Private messages"],
    score: 1,
    nsfwRating: 6,
    categories: ["privacy", "technology"]
  },
  {
    id: "tot-31",
    text: "Would you rather have a threesome with two people you know or two strangers?",
    options: ["People you know", "Strangers"],
    score: 1,
    nsfwRating: 9,
    categories: ["sex", "relationships"]
  },
  {
    id: "tot-32",
    text: "Would you rather be dominant or submissive in the bedroom?",
    options: ["Dominant", "Submissive"],
    score: 1,
    nsfwRating: 8,
    categories: ["sex", "personal"]
  },
  {
    id: "tot-33",
    text: "Would you rather watch porn with your partner or separately?",
    options: ["Watch together", "Watch separately"],
    score: 1,
    nsfwRating: 8,
    categories: ["sex", "relationships"]
  },
  {
    id: "tot-34",
    text: "Would you rather have sex in public or film a sex tape (never leaked)?",
    options: ["Sex in public", "Film sex tape"],
    score: 1,
    nsfwRating: 10,
    categories: ["sex", "fantasy"]
  },
  {
    id: "tot-35",
    text: "Would you rather have your deepest kink revealed to your parents or your boss?",
    options: ["Parents", "Boss"],
    score: 1,
    nsfwRating: 10,
    categories: ["sex", "privacy", "social"]
  }
];

const allQuestions: Record<GameMode, GameQuestion[]> = {
  "guess-who-i-am": guessWhoIAmQuestions,
  "hot-takes": hotTakesQuestions,
  "this-or-that": thisOrThatQuestions
};

// --- Function to get questions (Exported for server use) --- 
export const getQuestionsByMode = (mode: GameMode, count: number = 5, nsfwLevel: number = 1): GameQuestion[] => {
  const questionsPool = allQuestions[mode] || [];
  
  // Filter questions by NSFW level
  const filteredQuestions = questionsPool.filter(q => q.nsfwRating <= nsfwLevel);
  
  // Shuffle and pick the first 'count' questions
  // Basic Fisher-Yates shuffle
  const shuffled = [...filteredQuestions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled.slice(0, count);
}; 