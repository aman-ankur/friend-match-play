
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
  }
];

export const allQuestions: Record<GameMode, GameQuestion[]> = {
  "guess-who-i-am": guessWhoIAmQuestions,
  "hot-takes": hotTakesQuestions,
  "this-or-that": thisOrThatQuestions
};

export default getQuestionsByMode;
