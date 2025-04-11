import { GameQuestion, GameMode } from "../types/game";

export const getQuestionsByMode = (mode: GameMode, count: number = 5): GameQuestion[] => {
  const questionsPool = allQuestions[mode] || [];
  
  // Shuffle and pick the first 'count' questions
  const shuffled = [...questionsPool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const guessWhoIAmQuestions: GameQuestion[] = [
  {
    id: "gwia-1",
    text: "What's something you're secretly proud of but rarely mention?",
    options: [
      "A creative talent or skill",
      "An act of kindness I did anonymously",
      "Overcoming a personal fear",
      "A professional achievement"
    ]
  },
  {
    id: "gwia-2",
    text: "What's your actual reaction when someone cancels plans last minute?",
    options: [
      "Relief - I could use the free time",
      "Disappointment, but I understand",
      "Irritation, especially if I was looking forward to it",
      "Suspicion that they didn't want to meet in the first place"
    ]
  },
  {
    id: "gwia-3",
    text: "When was the last time you felt genuinely vulnerable with someone?",
    options: [
      "Within the last week",
      "Within the last month",
      "Within the last year",
      "It's been over a year"
    ]
  },
  {
    id: "gwia-4",
    text: "What's your go-to strategy when feeling overwhelmed?",
    options: [
      "Creating a structured plan or list",
      "Taking a break and practicing self-care",
      "Talking it out with someone I trust",
      "Pushing through and handling things one at a time"
    ]
  },
  {
    id: "gwia-5",
    text: "What quality do you admire most in other people?",
    options: [
      "Authenticity and honesty",
      "Kindness and empathy",
      "Intelligence and creativity",
      "Determination and resilience"
    ]
  },
  {
    id: "gwia-6",
    text: "How do you typically express affection to people you care about?",
    options: [
      "Quality time and being present",
      "Acts of service and practical help",
      "Verbal affirmation and encouragement",
      "Physical touch and closeness"
    ]
  },
  {
    id: "gwia-7",
    text: "What's your biggest pet peeve that you don't usually tell people about?",
    options: [
      "People who are chronically late",
      "Loud eating or drinking sounds",
      "People who interrupt conversations",
      "Those who don't respect personal space"
    ]
  },
  {
    id: "gwia-8",
    text: "What was the most impactful book, movie, or show you've experienced?",
    options: [
      "Something that changed my perspective on life",
      "A piece that helped me through a difficult time",
      "A story that inspired a personal passion",
      "Something that connected me with others"
    ]
  },
  {
    id: "gwia-9",
    text: "What's your approach to making difficult decisions?",
    options: [
      "Weigh pros and cons logically",
      "Go with my intuition or gut feeling",
      "Seek advice from people I trust",
      "Consider the emotional impact on everyone involved"
    ]
  },
  {
    id: "gwia-10",
    text: "What's something you wish more people knew about you?",
    options: [
      "I'm more sensitive than I appear",
      "I have interests or talents people don't expect",
      "I need more alone time than people realize",
      "I'm actually quite different from first impressions"
    ]
  },
  {
    id: "gwia-11",
    text: "What's the most rebellious thing you've ever done?",
    options: [
      "Broke a significant rule or law",
      "Defied my parents/authority on something important",
      "Changed my appearance dramatically against others' wishes",
      "Walked away from a major commitment/expectation"
    ]
  },
  {
    id: "gwia-12",
    text: "What's your biggest relationship regret?",
    options: [
      "Not expressing my feelings when I had the chance",
      "Staying too long in a bad relationship",
      "Hurting someone I genuinely cared about",
      "Never prioritizing relationships enough"
    ]
  },
  {
    id: "gwia-13",
    text: "What insecurity affects your daily life the most?",
    options: [
      "Physical appearance",
      "Social skills/likability",
      "Professional competence",
      "Financial stability"
    ]
  },
  {
    id: "gwia-14",
    text: "What's something you've done that you're not proud of?",
    options: [
      "Betrayed someone's trust",
      "Acted selfishly at someone else's expense",
      "Failed to stand up for what's right",
      "Judged someone unfairly"
    ]
  },
  {
    id: "gwia-15",
    text: "If you could change one decision in your past, what would it be about?",
    options: [
      "Career choice or opportunity",
      "Romantic relationship decision",
      "Educational path",
      "Family-related decision"
    ]
  },
  {
    id: "gwia-16",
    text: "What's your biggest fear in your current or future relationship?",
    options: [
      "Being betrayed or cheated on",
      "Growing apart over time",
      "Not being enough for my partner",
      "Losing my independence"
    ]
  },
  {
    id: "gwia-17",
    text: "What sexual topic makes you most uncomfortable to discuss?",
    options: [
      "Personal preferences and desires",
      "Past sexual experiences",
      "Fantasies I'm curious about",
      "Body insecurities"
    ]
  },
  {
    id: "gwia-18",
    text: "How comfortable are you with your body right now?",
    options: [
      "Very comfortable - I love my body",
      "Mostly comfortable with occasional insecurities",
      "More uncomfortable than comfortable",
      "Very uncomfortable - it affects my daily life"
    ]
  },
  {
    id: "gwia-19",
    text: "What's the real reason your last relationship ended?",
    options: [
      "Incompatible values or life goals",
      "Loss of attraction or passion",
      "Trust issues or betrayal",
      "We just grew apart over time"
    ]
  },
  {
    id: "gwia-20",
    text: "What's the biggest lie you've ever told?",
    options: [
      "A lie to protect someone's feelings",
      "A lie to get out of trouble",
      "A lie to make myself look better",
      "A lie that hurt someone else"
    ]
  }
];

const hotTakesQuestions: GameQuestion[] = [
  {
    id: "ht-1",
    text: "I often find myself overthinking texts before sending them",
    options: ["Strongly Agree", "Somewhat Agree", "Somewhat Disagree", "Strongly Disagree"]
  },
  {
    id: "ht-2",
    text: "I've pretended to like something just because someone I care about loves it",
    options: ["Strongly Agree", "Somewhat Agree", "Somewhat Disagree", "Strongly Disagree"]
  },
  {
    id: "ht-3",
    text: "I sometimes rehearse important conversations in my head beforehand",
    options: ["Strongly Agree", "Somewhat Agree", "Somewhat Disagree", "Strongly Disagree"]
  },
  {
    id: "ht-4",
    text: "Social media has had more negative than positive effects on society",
    options: ["Strongly Agree", "Somewhat Agree", "Somewhat Disagree", "Strongly Disagree"]
  },
  {
    id: "ht-5",
    text: "I believe people can fundamentally change who they are",
    options: ["Strongly Agree", "Somewhat Agree", "Somewhat Disagree", "Strongly Disagree"]
  },
  {
    id: "ht-6",
    text: "Most people are doing their best with what they have",
    options: ["Strongly Agree", "Somewhat Agree", "Somewhat Disagree", "Strongly Disagree"]
  },
  {
    id: "ht-7",
    text: "I'd rather be honest and risk hurting someone than tell a comforting lie",
    options: ["Strongly Agree", "Somewhat Agree", "Somewhat Disagree", "Strongly Disagree"]
  },
  {
    id: "ht-8",
    text: "It's impossible to have a truly platonic friendship with someone you find attractive",
    options: ["Strongly Agree", "Somewhat Agree", "Somewhat Disagree", "Strongly Disagree"]
  },
  {
    id: "ht-9",
    text: "People who post constantly on social media are typically less happy in real life",
    options: ["Strongly Agree", "Somewhat Agree", "Somewhat Disagree", "Strongly Disagree"]
  },
  {
    id: "ht-10",
    text: "In relationships, passionate love inevitably fades over time",
    options: ["Strongly Agree", "Somewhat Agree", "Somewhat Disagree", "Strongly Disagree"]
  },
  {
    id: "ht-11",
    text: "Dating apps have made dating worse, not better",
    options: ["Strongly Agree", "Somewhat Agree", "Somewhat Disagree", "Strongly Disagree"]
  },
  {
    id: "ht-12",
    text: "Most people would cheat in a relationship if they knew they wouldn't get caught",
    options: ["Strongly Agree", "Somewhat Agree", "Somewhat Disagree", "Strongly Disagree"]
  },
  {
    id: "ht-13",
    text: "Watching adult content regularly affects your expectations in real relationships",
    options: ["Strongly Agree", "Somewhat Agree", "Somewhat Disagree", "Strongly Disagree"]
  },
  {
    id: "ht-14",
    text: "Sexual compatibility is just as important as emotional compatibility in relationships",
    options: ["Strongly Agree", "Somewhat Agree", "Somewhat Disagree", "Strongly Disagree"]
  },
  {
    id: "ht-15",
    text: "It's better to be alone than to settle for the wrong person",
    options: ["Strongly Agree", "Somewhat Agree", "Somewhat Disagree", "Strongly Disagree"]
  },
  {
    id: "ht-16",
    text: "People who say they don't care what others think of them are usually lying",
    options: ["Strongly Agree", "Somewhat Agree", "Somewhat Disagree", "Strongly Disagree"]
  },
  {
    id: "ht-17",
    text: "Most people would rather receive validation than honest criticism",
    options: ["Strongly Agree", "Somewhat Agree", "Somewhat Disagree", "Strongly Disagree"]
  },
  {
    id: "ht-18",
    text: "Fantasizing about someone other than your partner is a form of cheating",
    options: ["Strongly Agree", "Somewhat Agree", "Somewhat Disagree", "Strongly Disagree"]
  },
  {
    id: "ht-19",
    text: "Open relationships rarely work long-term",
    options: ["Strongly Agree", "Somewhat Agree", "Somewhat Disagree", "Strongly Disagree"]
  },
  {
    id: "ht-20",
    text: "It's normal to occasionally check your partner's phone",
    options: ["Strongly Agree", "Somewhat Agree", "Somewhat Disagree", "Strongly Disagree"]
  }
];

const thisOrThatQuestions: GameQuestion[] = [
  {
    id: "tot-1",
    text: "Would you rather...",
    options: [
      "Be completely honest but hurt someone",
      "Tell a comforting lie"
    ]
  },
  {
    id: "tot-2",
    text: "Would you rather...",
    options: [
      "Have all your private thoughts exposed for a day",
      "Hear everyone else's thoughts for a day"
    ]
  },
  {
    id: "tot-3",
    text: "Would you rather...",
    options: [
      "Relive your most embarrassing moment",
      "Reveal your biggest insecurity"
    ]
  },
  {
    id: "tot-4",
    text: "Would you rather...",
    options: [
      "Never be able to use social media again",
      "Only be able to communicate through social media"
    ]
  },
  {
    id: "tot-5",
    text: "Would you rather...",
    options: [
      "Know how and when you'll die",
      "Never know and be surprised"
    ]
  },
  {
    id: "tot-6",
    text: "Would you rather...",
    options: [
      "Be able to read minds but not control when",
      "Be able to teleport but never know exactly where you'll land"
    ]
  },
  {
    id: "tot-7",
    text: "Would you rather...",
    options: [
      "Have many acquaintances but no close friends",
      "Have one best friend but no other social connections"
    ]
  },
  {
    id: "tot-8",
    text: "Would you rather...",
    options: [
      "Have all your exes meet your current partner",
      "Have your current partner meet all your secret crushes"
    ]
  },
  {
    id: "tot-9",
    text: "Would you rather...",
    options: [
      "Always know what your partner is thinking",
      "Your partner always knows what you're thinking"
    ]
  },
  {
    id: "tot-10",
    text: "Would you rather...",
    options: [
      "Be with someone who's amazing in bed but boring otherwise",
      "Be with someone who's amazing in every way but mediocre in bed"
    ]
  },
  {
    id: "tot-11",
    text: "Would you rather...",
    options: [
      "Have an intense 2-year relationship that ends painfully",
      "Have a comfortable 10-year relationship that slowly fades"
    ]
  },
  {
    id: "tot-12",
    text: "Would you rather...",
    options: [
      "Know exactly when and how your relationship will end",
      "Be completely surprised when it happens"
    ]
  },
  {
    id: "tot-13",
    text: "Would you rather...",
    options: [
      "Be with someone who's extremely jealous but loyal",
      "Be with someone who's completely trusting but might stray"
    ]
  },
  {
    id: "tot-14",
    text: "Would you rather...",
    options: [
      "Have a partner who's terrible with money but great with emotions",
      "Have a partner who's financially responsible but emotionally distant"
    ]
  },
  {
    id: "tot-15",
    text: "Would you rather...",
    options: [
      "Know every detail about your future relationship path right now",
      "Experience it all as surprises, good and bad"
    ]
  },
  {
    id: "tot-16",
    text: "Would you rather...",
    options: [
      "Have passionate love without friendship",
      "Have deep friendship without passion"
    ]
  },
  {
    id: "tot-17",
    text: "Would you rather...",
    options: [
      "Date someone who's consistently late to everything",
      "Date someone who's always rushing you to be early"
    ]
  },
  {
    id: "tot-18",
    text: "Would you rather...",
    options: [
      "Have great sexual chemistry but argue constantly",
      "Have perfect emotional harmony but lackluster physical connection"
    ]
  },
  {
    id: "tot-19",
    text: "Would you rather...",
    options: [
      "Know your partner's complete sexual history",
      "Have them know all your private fantasies"
    ]
  },
  {
    id: "tot-20",
    text: "Would you rather...",
    options: [
      "Be with someone everyone thinks is perfect for you but you have doubts",
      "Be with someone nobody approves of but you feel is your soulmate"
    ]
  },
  {
    id: "tot-21",
    text: "Would you rather...",
    options: [
      "Give up sex for a year to save your relationship",
      "Give up all forms of digital communication with your partner for a month"
    ]
  },
  {
    id: "tot-22",
    text: "Would you rather...",
    options: [
      "Always know when your partner is lying",
      "Your partner always knows when you're lying"
    ]
  }
];

export const allQuestions: Record<GameMode, GameQuestion[]> = {
  "guess-who-i-am": guessWhoIAmQuestions,
  "hot-takes": hotTakesQuestions,
  "this-or-that": thisOrThatQuestions
};

export default getQuestionsByMode;
