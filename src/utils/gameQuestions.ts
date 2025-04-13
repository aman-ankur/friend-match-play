import { GameQuestion, GameMode } from "../types/game";

// Game descriptions for each mode
export const GAME_DESCRIPTIONS: Record<GameMode, { title: string; description: string }> = {
  "guess-who-i-am": {
    title: "Guess Who I Am",
    description: "Reveal hidden aspects of your personality! Answer personal questions about yourself, then predict how your friend would answer the same questions. Discover how well you truly know each other."
  },
  "hot-takes": {
    title: "Hot Takes",
    description: "Test your ability to predict opinions! Share your stance on controversial topics and predict your friend's reactions. See who's better at reading each other's minds."
  },
  "this-or-that": {
    title: "This or That",
    description: "Make tough choices and predict your friend's preferences! Face impossible dilemmas and discover how your choices align (or don't) with your friend's."
  }
};

// --- Question Data --- 
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
  },
  {
    id: "gwia-new-1",
    text: "What's the one thing you'd secretly love to do if nobody was judging you?",
    options: ["Sing opera in public", "Wear a full superhero costume all day", "Eat dessert for breakfast daily", "Dance like nobody's watching at a bus stop"],
    score: 1,
    nsfwRating: 2,
    categories: ["personal", "fantasy"]
  },
  {
    id: "gwia-new-2",
    text: "What's your go-to snack you'd eat way too much of if calories didn't exist?",
    options: ["Nacho cheese Doritos", "Gummy bears", "French fries", "Chocolate chip cookies"],
    score: 1,
    nsfwRating: 1,
    categories: ["food", "personal"]
  },
  {
    id: "gwia-new-3",
    text: "What's the pettiest thing that gets you irrationally annoyed?",
    options: ["People who clap at movies", "Misplaced grocery carts", "Using 'literally' wrong", "Loud phone notifications"],
    score: 1,
    nsfwRating: 3,
    categories: ["personal", "preferences"]
  },
  {
    id: "gwia-new-4",
    text: "What's the flirtiest thing you'd do to get someone's attention at a bar?",
    options: ["Send them a drink with a wink", "Bust out a cheesy pick-up line", "Pretend to 'accidentally' bump into them", "Challenge them to a silly bet"],
    score: 1,
    nsfwRating: 5,
    categories: ["dating", "personal"]
  },
  {
    id: "gwia-new-5",
    text: "What's the weirdest thing you'd admit to finding kinda hot?",
    options: ["Someone explaining math passionately", "Clumsy dancing", "Arguing about pizza toppings", "Wearing mismatched socks"],
    score: 1,
    nsfwRating: 6,
    categories: ["attraction", "personal"]
  },
  {
    id: "gwia-new-6",
    text: "What's your secret social media guilty pleasure?",
    options: ["Watching dog reels for hours", "Liking every post from a crush", "Reading petty comment fights", "Following weird niche meme pages"],
    score: 1,
    nsfwRating: 4,
    categories: ["social", "personal"]
  },
  {
    id: "gwia-new-7",
    text: "What's the naughtiest thing you'd consider doing if you knew it'd stay a secret?",
    options: ["Sneak into a VIP club", "Send a risky text to a crush", "Try a blindfolded taste test date", "Crash a stranger's party"],
    score: 1,
    nsfwRating: 8,
    categories: ["personal", "fantasy"]
  },
  {
    id: "gwia-new-8",
    text: "What's your go-to move to spice things up in the bedroom?",
    options: ["Whisper something flirty", "Break out a blindfold", "Play a sexy playlist", "Suggest a new position"],
    score: 1,
    nsfwRating: 9,
    categories: ["sex", "relationships"]
  },
  {
    id: "gwia-new-9",
    text: "What's the most unhinged thing you'd want to try in a relationship just to see what happens?",
    options: ["Plan a fake proposal for laughs", "Go to a couples' retreat with no prep", "Swap phones for a day", "Try a 24-hour no-talking challenge"],
    score: 1,
    nsfwRating: 10,
    categories: ["relationships", "fantasy"]
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
  },
  {
    id: "ht-new-1",
    text: "Fast food is better than home-cooked meals for pure vibe.",
    options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"],
    score: 1,
    nsfwRating: 2,
    categories: ["food", "opinions"]
  },
  {
    id: "ht-new-2",
    text: "Socks with sandals are a fashion statement, not a crime.",
    options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"],
    score: 1,
    nsfwRating: 1,
    categories: ["personal", "opinions"]
  },
  {
    id: "ht-new-3",
    text: "Group chats are more stressful than work meetings.",
    options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"],
    score: 1,
    nsfwRating: 3,
    categories: ["social", "opinions"]
  },
  {
    id: "ht-new-4",
    text: "It's fine to flirt with someone's partner if it's just for fun.",
    options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"],
    score: 1,
    nsfwRating: 6,
    categories: ["relationships", "morality"]
  },
  {
    id: "ht-new-5",
    text: "Posting gym selfies is thirstier than posting beach pics.",
    options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"],
    score: 1,
    nsfwRating: 5,
    categories: ["social", "opinions"]
  },
  {
    id: "ht-new-6",
    text: "Texting 'k' is ruder than ghosting someone.",
    options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"],
    score: 1,
    nsfwRating: 4,
    categories: ["communication", "opinions"]
  },
  {
    id: "ht-new-7",
    text: "Dirty talk is overrated and mostly cringey.",
    options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"],
    score: 1,
    nsfwRating: 8,
    categories: ["sex", "opinions"]
  },
  {
    id: "ht-new-8",
    text: "Everyone's secretly into at least one weird fetish.",
    options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"],
    score: 1,
    nsfwRating: 9,
    categories: ["sex", "psychology"]
  },
  {
    id: "ht-new-9",
    text: "Monogamy is just peer pressure with extra paperwork.",
    options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"],
    score: 1,
    nsfwRating: 10,
    categories: ["relationships", "opinions"]
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
    id: "tot-20",
    text: "Would you rather read minds or control time?",
    options: ["Read minds", "Control time"],
    score: 1,
    nsfwRating: 1,
    categories: ["abilities", "fantasy"]
  },
  {
    id: "tot-23",
    text: "Would you rather be able to speak every language or play every instrument?",
    options: ["Speak every language", "Play every instrument"],
    score: 1,
    nsfwRating: 1,
    categories: ["abilities", "skills"]
  },
  {
    id: "tot-25",
    text: "Would you rather have unlimited money or unlimited time?",
    options: ["Unlimited money", "Unlimited time"],
    score: 1,
    nsfwRating: 1,
    categories: ["fantasy", "choices"]
  },
  {
    id: "tot-26",
    text: "Would you rather travel the future or the past?",
    options: ["Future", "Past"],
    score: 1,
    nsfwRating: 2,
    categories: ["fantasy", "personal"]
  },
  {
    id: "tot-27",
    text: "Would you rather always have to tell the truth or always have to lie?",
    options: ["Always tell truth", "Always lie"],
    score: 1,
    nsfwRating: 3,
    categories: ["morality", "philosophy"]
  },
  {
    id: "tot-28",
    text: "Would you rather find true love or win the lottery?",
    options: ["True love", "Lottery"],
    score: 1,
    nsfwRating: 4,
    categories: ["relationships", "lifestyle"]
  },
  {
    id: "tot-29",
    text: "Would you rather date someone much older or much younger?",
    options: ["Much older", "Much younger"],
    score: 1,
    nsfwRating: 5,
    categories: ["dating", "relationships"]
  },
  {
    id: "tot-30",
    text: "Would you rather forgive a partner for cheating emotionally or physically?",
    options: ["Forgive emotional cheating", "Forgive physical cheating"],
    score: 1,
    nsfwRating: 7,
    categories: ["relationships", "morality"]
  },
  {
    id: "tot-31",
    text: "Would you rather have your browser history leaked or your private messages leaked?",
    options: ["Browser history", "Private messages"],
    score: 1,
    nsfwRating: 6,
    categories: ["privacy", "technology"]
  },
  {
    id: "tot-32",
    text: "Would you rather have a threesome with two people you know or two strangers?",
    options: ["People you know", "Strangers"],
    score: 1,
    nsfwRating: 9,
    categories: ["sex", "relationships"]
  },
  {
    id: "tot-33",
    text: "Would you rather be dominant or submissive in the bedroom?",
    options: ["Dominant", "Submissive"],
    score: 1,
    nsfwRating: 8,
    categories: ["sex", "personal"]
  },
  {
    id: "tot-34",
    text: "Would you rather watch porn with your partner or separately?",
    options: ["Watch together", "Watch separately"],
    score: 1,
    nsfwRating: 8,
    categories: ["sex", "relationships"]
  },
  {
    id: "tot-35",
    text: "Would you rather have sex in public or film a sex tape (never leaked)?",
    options: ["Sex in public", "Film sex tape"],
    score: 1,
    nsfwRating: 10,
    categories: ["sex", "fantasy"]
  },
  {
    id: "tot-36",
    text: "Would you rather have your deepest kink revealed to your parents or your boss?",
    options: ["Parents", "Boss"],
    score: 1,
    nsfwRating: 10,
    categories: ["sex", "privacy", "social"]
  },
  {
    id: "tot-new-1",
    text: "Would you rather have every meal taste like candy or every song sound like your favorite?",
    options: ["Meals taste like candy", "Songs sound like my favorite"],
    score: 1,
    nsfwRating: 1,
    categories: ["personal", "preferences"]
  },
  {
    id: "tot-new-2",
    text: "Would you rather always smell like pizza or always have glitter on you?",
    options: ["Smell like pizza", "Covered in glitter"],
    score: 1,
    nsfwRating: 2,
    categories: ["personal", "funny"]
  },
  {
    id: "tot-new-3",
    text: "Would you rather talk like a pirate all day or only communicate in emojis?",
    options: ["Talk like a pirate", "Use only emojis"],
    score: 1,
    nsfwRating: 1,
    categories: ["personal", "communication"]
  },
  {
    id: "tot-new-4",
    text: "Would you rather date someone who's obsessed with their pet or their TikTok followers?",
    options: ["Obsessed with pet", "Obsessed with TikTok"],
    score: 1,
    nsfwRating: 5,
    categories: ["dating", "relationships"]
  },
  {
    id: "tot-new-5",
    text: "Would you rather have your best friend pick your outfits or your dating profile pics?",
    options: ["Pick my outfits", "Pick my profile pics"],
    score: 1,
    nsfwRating: 4,
    categories: ["personal", "social"]
  },
  {
    id: "tot-new-6",
    text: "Would you rather always overshare on dates or always be too mysterious?",
    options: ["Overshare", "Too mysterious"],
    score: 1,
    nsfwRating: 6,
    categories: ["dating", "personal"]
  },
  {
    id: "tot-new-7",
    text: "Would you rather have a partner who's loud in bed or loud about your relationship online?",
    options: ["Loud in bed", "Loud online"],
    score: 1,
    nsfwRating: 8,
    categories: ["relationships", "sex"]
  },
  {
    id: "tot-new-8",
    text: "Would you rather accidentally send a nude to your boss or your group chat?",
    options: ["To my boss", "To my group chat"],
    score: 1,
    nsfwRating: 9,
    categories: ["sex", "social"]
  },
  {
    id: "tot-new-9",
    text: "Would you rather have your kinks posted anonymously online or explained in detail to a friend?",
    options: ["Posted anonymously", "Explained to a friend"],
    score: 1,
    nsfwRating: 10,
    categories: ["sex", "privacy"]
  },
  
  // NSFW 1 Questions - New additions
  {
    id: "tot-new-1001",
    text: "Would you rather have fingers as long as your legs or legs as short as your fingers?",
    options: ["Fingers as long as legs", "Legs as short as fingers"],
    score: 1,
    nsfwRating: 1,
    categories: ["personal", "bizarre", "funny"]
  },
  {
    id: "tot-new-1002",
    text: "Would you rather always have to wear socks with sandals or a fanny pack everywhere?",
    options: ["Socks with sandals", "Fanny pack everywhere"],
    score: 1,
    nsfwRating: 1,
    categories: ["personal", "fashion", "funny"]
  },
  {
    id: "tot-new-1003",
    text: "Would you rather have a tail that wags when you're excited or ears that twitch when you're nervous?",
    options: ["Wagging tail", "Twitching ears"],
    score: 1,
    nsfwRating: 1,
    categories: ["personal", "bizarre", "emotions"]
  },
  {
    id: "tot-new-1004",
    text: "Would you rather burp bubbles or fart sparkles?",
    options: ["Burp bubbles", "Fart sparkles"],
    score: 1,
    nsfwRating: 1,
    categories: ["personal", "bizarre", "funny"]
  },
  {
    id: "tot-new-1005",
    text: "Would you rather have a personal theme song that plays every time you enter a room or a laugh track for every joke you tell?",
    options: ["Personal theme song", "Laugh track"],
    score: 1,
    nsfwRating: 1,
    categories: ["personal", "bizarre", "social"]
  },
  {
    id: "tot-new-1006",
    text: "Would you rather have a personal hype squad that cheers every time you wake up or a pet that narrates your life like a nature documentary?",
    options: ["Personal hype squad", "Narrating pet"],
    score: 1,
    nsfwRating: 1,
    categories: ["personal", "funny", "fantasy"]
  },
  {
    id: "tot-new-1007",
    text: "Would you rather always smell like fresh cookies or have your voice sound like a cartoon character?",
    options: ["Smell like cookies", "Cartoon voice"],
    score: 1,
    nsfwRating: 1,
    categories: ["personal", "sensory", "quirky"]
  },
  {
    id: "tot-new-1008",
    text: "Would you rather live in a world where everyone sings their thoughts or where everyone dances their emotions?",
    options: ["Singing thoughts", "Dancing emotions"],
    score: 1,
    nsfwRating: 1,
    categories: ["social", "fantasy", "communication"]
  },
  {
    id: "tot-new-1009",
    text: "Would you rather have a time machine that only goes to awkward moments in your past or one that only shows you your future wardrobe?",
    options: ["Awkward past moments", "Future wardrobe"],
    score: 1,
    nsfwRating: 1,
    categories: ["fantasy", "personal", "time travel"]
  },
  {
    id: "tot-new-1010",
    text: "Would you rather have a superpower that makes you unbeatable at board games or one that guarantees you win at karaoke?",
    options: ["Board game champ", "Karaoke star"],
    score: 1,
    nsfwRating: 1,
    categories: ["abilities", "social", "skills"]
  },
  {
    id: "tot-new-1011",
    text: "Would you rather have a fridge that refills with your favorite snack or a closet that always has the perfect outfit?",
    options: ["Magic snack fridge", "Perfect outfit closet"],
    score: 1,
    nsfwRating: 1,
    categories: ["lifestyle", "comfort", "preferences"]
  },
  {
    id: "tot-new-1012",
    text: "Would you rather have every text you send come with a random emoji or every call you make play hold music when you speak?",
    options: ["Random emoji texts", "Hold music calls"],
    score: 1,
    nsfwRating: 1,
    categories: ["communication", "funny", "technology"]
  },
  {
    id: "tot-new-1013",
    text: "Would you rather be stuck in a sitcom where you're always the punchline or a reality show where you're the wildcard?",
    options: ["Sitcom punchline", "Reality show wildcard"],
    score: 1,
    nsfwRating: 1,
    categories: ["entertainment", "social", "funny"]
  },
  {
    id: "tot-new-1014",
    text: "Would you rather have a tattoo that changes daily or a hairstyle that picks itself every morning?",
    options: ["Daily changing tattoo", "Self-picking hairstyle"],
    score: 1,
    nsfwRating: 1,
    categories: ["appearance", "quirky", "fantasy"]
  },
  {
    id: "tot-new-1015",
    text: "Would you rather have a robot therapist who's brutally honest or a dog that gives you life advice?",
    options: ["Honest robot therapist", "Wise advice dog"],
    score: 1,
    nsfwRating: 1,
    categories: ["mental health", "funny", "fantasy"]
  },
  
  // NSFW 2 Questions - New additions
  {
    id: "tot-new-2001",
    text: "Would you rather have a superpower that makes you irresistible for 5 minutes a day or mildly attractive all the time?",
    options: ["Irresistible 5 minutes", "Mildly attractive always"],
    score: 1,
    nsfwRating: 2,
    categories: ["personal", "attraction", "fantasy"]
  },
  {
    id: "tot-new-2002",
    text: "Would you rather always have perfect hair or never need to shave again?",
    options: ["Perfect hair", "Never shave"],
    score: 1,
    nsfwRating: 2,
    categories: ["personal", "appearance", "preferences"]
  },
  {
    id: "tot-new-2003",
    text: "Would you rather have a clone to do your chores or one to flirt for you?",
    options: ["Clone for chores", "Clone for flirting"],
    score: 1,
    nsfwRating: 2,
    categories: ["personal", "relationships", "fantasy"]
  },
  {
    id: "tot-new-2004",
    text: "Would you rather accidentally like your crush's old photo or call them by the wrong name in person?",
    options: ["Like old photo", "Call wrong name"],
    score: 1,
    nsfwRating: 2,
    categories: ["relationships", "social", "embarrassment"]
  },
  {
    id: "tot-new-2005",
    text: "Would you rather have a partner who's always hot or always cold?",
    options: ["Always hot", "Always cold"],
    score: 1,
    nsfwRating: 2,
    categories: ["relationships", "preferences", "lifestyle"]
  },
  {
    id: "tot-new-2006",
    text: "Would you rather have a crush who's always winking at you or one who's always dropping terrible pickup lines?",
    options: ["Constant winker", "Bad pickup liner"],
    score: 1,
    nsfwRating: 2,
    categories: ["flirting", "relationships", "dating"]
  },
  {
    id: "tot-new-2007",
    text: "Would you rather have a wardrobe that makes you irresistible for one hour a day or mildly attractive all the time?",
    options: ["One-hour irresistible", "Always mildly attractive"],
    score: 1,
    nsfwRating: 2,
    categories: ["appearance", "confidence", "attraction"]
  },
  {
    id: "tot-new-2008",
    text: "Would you rather accidentally like your ex's post from three years ago or butt-dial your boss during a rant?",
    options: ["Like ex's old post", "Butt-dial boss"],
    score: 1,
    nsfwRating: 2,
    categories: ["social media", "embarrassment", "awkward"]
  },
  {
    id: "tot-new-2009",
    text: "Would you rather have a partner who's obsessed with matching outfits or one who's obsessed with matching tattoos?",
    options: ["Matching outfits", "Matching tattoos"],
    score: 1,
    nsfwRating: 2,
    categories: ["relationships", "style", "preferences"]
  },
  {
    id: "tot-new-2010",
    text: "Would you rather have every mirror wink back at you or every chair adjust perfectly to your body?",
    options: ["Winking mirrors", "Perfect chairs"],
    score: 1,
    nsfwRating: 2,
    categories: ["quirky", "comfort", "fantasy"]
  },
  {
    id: "tot-new-2011",
    text: "Would you rather have a superpower that lets you know when someone's lying or one that makes you the best gift-giver ever?",
    options: ["Lie detector", "Gift-giving guru"],
    score: 1,
    nsfwRating: 2,
    categories: ["abilities", "social", "fantasy"]
  },
  {
    id: "tot-new-2012",
    text: "Would you rather have a partner who's always stealing your hoodies or one who's always borrowing your phone?",
    options: ["Hoodie thief", "Phone borrower"],
    score: 1,
    nsfwRating: 2,
    categories: ["relationships", "habits", "personal"]
  },
  {
    id: "tot-new-2013",
    text: "Would you rather have a laugh that's contagious or a smile that stops traffic?",
    options: ["Contagious laugh", "Traffic-stopping smile"],
    score: 1,
    nsfwRating: 2,
    categories: ["social", "charm", "attraction"]
  },
  {
    id: "tot-new-2014",
    text: "Would you rather have a clone to do your boring errands or one to hype you up on every date?",
    options: ["Errand clone", "Date hype clone"],
    score: 1,
    nsfwRating: 2,
    categories: ["lifestyle", "dating", "fantasy"]
  },
  {
    id: "tot-new-2015",
    text: "Would you rather have a partner who's always humming your favorite song or one who's always quoting your favorite meme?",
    options: ["Humming partner", "Meme-quoting partner"],
    score: 1,
    nsfwRating: 2,
    categories: ["relationships", "funny", "habits"]
  },
  
  // NSFW 3 Questions - New additions
  {
    id: "tot-new-3001",
    text: "Would you rather live in a world where everyone can read your thoughts or where you can read everyone else's?",
    options: ["Everyone reads yours", "You read everyone's"],
    score: 1,
    nsfwRating: 3,
    categories: ["psychology", "fantasy", "personal"]
  },
  {
    id: "tot-new-3002",
    text: "Would you rather always smell like your favorite food or your favorite perfume/cologne?",
    options: ["Smell like food", "Smell like perfume/cologne"],
    score: 1,
    nsfwRating: 3,
    categories: ["personal", "sensory", "social"]
  },
  {
    id: "tot-new-3003",
    text: "Would you rather have a secret admirer who never confesses or a loud crush who won't shut up?",
    options: ["Secret admirer", "Loud crush"],
    score: 1,
    nsfwRating: 3,
    categories: ["relationships", "dating", "social"]
  },
  {
    id: "tot-new-3004",
    text: "Would you rather lose your sense of taste or your sense of touch for a week?",
    options: ["Lose taste", "Lose touch"],
    score: 1,
    nsfwRating: 3,
    categories: ["personal", "sensory", "choices"]
  },
  {
    id: "tot-new-3005",
    text: "Would you rather have a partner who's always right or one who always admits they're wrong?",
    options: ["Always right", "Always admits wrong"],
    score: 1,
    nsfwRating: 3,
    categories: ["relationships", "communication", "psychology"]
  },
  {
    id: "tot-new-3006",
    text: "Would you rather know everyone's deepest secret or have everyone know one of yours?",
    options: ["Know all secrets", "One secret exposed"],
    score: 1,
    nsfwRating: 3,
    categories: ["trust", "privacy", "social"]
  },
  {
    id: "tot-new-3007",
    text: "Would you rather have a partner who's always planning elaborate dates or one who's always surprising you with random adventures?",
    options: ["Elaborate date planner", "Random adventure surpriser"],
    score: 1,
    nsfwRating: 3,
    categories: ["relationships", "romance", "lifestyle"]
  },
  {
    id: "tot-new-3008",
    text: "Would you rather have a crush confess to you in a group chat or in a handwritten letter?",
    options: ["Group chat confession", "Handwritten letter"],
    score: 1,
    nsfwRating: 3,
    categories: ["romance", "communication", "dating"]
  },
  {
    id: "tot-new-3009",
    text: "Would you rather have a partner who's brutally honest about your flaws or one who lies to spare your feelings?",
    options: ["Brutal honesty", "White lies"],
    score: 1,
    nsfwRating: 3,
    categories: ["relationships", "morality", "communication"]
  },
  {
    id: "tot-new-3010",
    text: "Would you rather have a superpower that lets you change your appearance at will or one that lets you read emotions perfectly?",
    options: ["Shape-shifter", "Emotion reader"],
    score: 1,
    nsfwRating: 3,
    categories: ["abilities", "social", "fantasy"]
  },
  {
    id: "tot-new-3011",
    text: "Would you rather have a partner who's obsessed with your laugh or one who's obsessed with your eyes?",
    options: ["Loves my laugh", "Loves my eyes"],
    score: 1,
    nsfwRating: 3,
    categories: ["relationships", "attraction", "romance"]
  },
  {
    id: "tot-new-3012",
    text: "Would you rather have every first date feel like a movie montage or every breakup feel like a plot twist?",
    options: ["Movie montage dates", "Plot twist breakups"],
    score: 1,
    nsfwRating: 3,
    categories: ["dating", "romance", "emotions"]
  },
  {
    id: "tot-new-3013",
    text: "Would you rather have a partner who's always cold and needs cuddling or one who's always hot and needs space?",
    options: ["Cuddly cold partner", "Spacey hot partner"],
    score: 1,
    nsfwRating: 3,
    categories: ["relationships", "intimacy", "preferences"]
  },
  {
    id: "tot-new-3014",
    text: "Would you rather have a secret admirer who sends you gifts or one who writes you poetry?",
    options: ["Gift-giving admirer", "Poetry-writing admirer"],
    score: 1,
    nsfwRating: 3,
    categories: ["romance", "mystery", "gifts"]
  },
  {
    id: "tot-new-3015",
    text: "Would you rather have a partner who's always challenging you to debates or one who's always challenging you to dares?",
    options: ["Debate challenger", "Dare challenger"],
    score: 1,
    nsfwRating: 3,
    categories: ["relationships", "dynamics", "personality"]
  },
  
  // NSFW 4 Questions - New additions
  {
    id: "tot-new-4001",
    text: "Would you rather date someone who's a morning person or a night owl?",
    options: ["Morning person", "Night owl"],
    score: 1,
    nsfwRating: 4,
    categories: ["relationships", "dating", "lifestyle"]
  },
  {
    id: "tot-new-4002",
    text: "Would you rather have a partner who's obsessed with planning dates or one who's totally spontaneous?",
    options: ["Planning obsessed", "Totally spontaneous"],
    score: 1,
    nsfwRating: 4,
    categories: ["relationships", "dating", "compatibility"]
  },
  {
    id: "tot-new-4003",
    text: "Would you rather kiss someone who's all tongue or all teeth?",
    options: ["All tongue", "All teeth"],
    score: 1,
    nsfwRating: 4,
    categories: ["relationships", "sex", "intimacy"]
  },
  {
    id: "tot-new-4004",
    text: "Would you rather date someone who loves to cuddle or someone who needs their space?",
    options: ["Loves cuddling", "Needs space"],
    score: 1,
    nsfwRating: 4,
    categories: ["relationships", "intimacy", "preferences"]
  },
  {
    id: "tot-new-4005",
    text: "Would you rather have a partner who's a loud snorer or a sleep-talker spilling secrets?",
    options: ["Loud snorer", "Sleep-talker spilling secrets"],
    score: 1,
    nsfwRating: 4,
    categories: ["relationships", "lifestyle", "funny"]
  },
  {
    id: "tot-new-4006",
    text: "Would you rather have a partner who's amazing at kissing but terrible at texting or great at texting but terrible at kissing?",
    options: ["Great kisser, bad texter", "Great texter, bad kisser"],
    score: 1,
    nsfwRating: 4,
    categories: ["romance", "communication", "relationships"]
  },
  {
    id: "tot-new-4007",
    text: "Would you rather have a partner who's obsessed with planning sexy date nights or one who's obsessed with spontaneous makeout sessions?",
    options: ["Planned sexy dates", "Spontaneous makeouts"],
    score: 1,
    nsfwRating: 4,
    categories: ["relationships", "romance", "intimacy"]
  },
  {
    id: "tot-new-4008",
    text: "Would you rather have your most embarrassing crush revealed to the group or your most embarrassing date story?",
    options: ["Crush revealed", "Date story revealed"],
    score: 1,
    nsfwRating: 4,
    categories: ["embarrassment", "dating", "social"]
  },
  {
    id: "tot-new-4009",
    text: "Would you rather have a partner who's always stealing your underwear to wear it jokingly or one who's always leaving hickeys by accident?",
    options: ["Underwear stealer", "Accidental hickey giver"],
    score: 1,
    nsfwRating: 4,
    categories: ["relationships", "intimacy", "funny"]
  },
  {
    id: "tot-new-4010",
    text: "Would you rather have a partner who's into slow dancing in the kitchen or one who's into wrestling playfully on the couch?",
    options: ["Kitchen slow dancer", "Couch wrestler"],
    score: 1,
    nsfwRating: 4,
    categories: ["romance", "playfulness", "intimacy"]
  },
  {
    id: "tot-new-4011",
    text: "Would you rather have a partner who's always flirting with you in public or one who's always sneaking you away for private moments?",
    options: ["Public flirt", "Private moment sneak"],
    score: 1,
    nsfwRating: 4,
    categories: ["relationships", "flirting", "intimacy"]
  },
  {
    id: "tot-new-4012",
    text: "Would you rather have a partner who's into writing you love letters or one who's into sending you spicy selfies?",
    options: ["Love letter writer", "Spicy selfie sender"],
    score: 1,
    nsfwRating: 4,
    categories: ["romance", "communication", "intimacy"]
  },
  {
    id: "tot-new-4013",
    text: "Would you rather have a partner who's always trying to recreate rom-com moments or one who's always pulling you into real-life pranks?",
    options: ["Rom-com recreator", "Real-life prankster"],
    score: 1,
    nsfwRating: 4,
    categories: ["relationships", "funny", "lifestyle"]
  },
  {
    id: "tot-new-4014",
    text: "Would you rather have a partner who's obsessed with your scent or one who's obsessed with your voice?",
    options: ["Scent obsessed", "Voice obsessed"],
    score: 1,
    nsfwRating: 4,
    categories: ["attraction", "intimacy", "romance"]
  },
  {
    id: "tot-new-4015",
    text: "Would you rather have a partner who's always planning couple's costumes or one who's always planning couple's vacations?",
    options: ["Couple's costume planner", "Couple's vacation planner"],
    score: 1,
    nsfwRating: 4,
    categories: ["relationships", "lifestyle", "activities"]
  },
  
  // NSFW 5 Questions - New additions
  {
    id: "tot-new-5001",
    text: "Would you rather your partner know all your passwords or all your guilty pleasures?",
    options: ["Know all passwords", "Know all guilty pleasures"],
    score: 1,
    nsfwRating: 5,
    categories: ["relationships", "trust", "privacy"]
  },
  {
    id: "tot-new-5002",
    text: "Would you rather have a partner who's jealous but passionate or chill but distant?",
    options: ["Jealous but passionate", "Chill but distant"],
    score: 1,
    nsfwRating: 5,
    categories: ["relationships", "emotions", "compatibility"]
  },
  {
    id: "tot-new-5003",
    text: "Would you rather accidentally flash your neighbor or your boss?",
    options: ["Flash neighbor", "Flash boss"],
    score: 1,
    nsfwRating: 5,
    categories: ["embarrassment", "social", "awkward"]
  },
  {
    id: "tot-new-5004",
    text: "Would you rather have a partner who loves long foreplay or gets straight to the point?",
    options: ["Loves long foreplay", "Gets straight to the point"],
    score: 1,
    nsfwRating: 5,
    categories: ["sex", "relationships", "intimacy"]
  },
  {
    id: "tot-new-5005",
    text: "Would you rather share your wildest dream or your weirdest turn-on?",
    options: ["Share wildest dream", "Share weirdest turn-on"],
    score: 1,
    nsfwRating: 5,
    categories: ["personal", "sex", "vulnerability"]
  },
  {
    id: "tot-new-5006",
    text: "Would you rather have a partner who knows your darkest fantasy or one who knows your most embarrassing hookup story?",
    options: ["Knows my fantasy", "Knows my hookup story"],
    score: 1,
    nsfwRating: 5,
    categories: ["trust", "intimacy", "vulnerability"]
  },
  {
    id: "tot-new-5007",
    text: "Would you rather have a partner who's into skinny dipping at midnight or one who's into sneaking kisses in elevators?",
    options: ["Midnight skinny dipper", "Elevator kiss sneak"],
    score: 1,
    nsfwRating: 5,
    categories: ["romance", "adventure", "thrill"]
  },
  {
    id: "tot-new-5008",
    text: "Would you rather have your search history leaked to your friends or your flirty DMs leaked to your family?",
    options: ["Search history to friends", "DMs to family"],
    score: 1,
    nsfwRating: 5,
    categories: ["privacy", "embarrassment", "social"]
  },
  {
    id: "tot-new-5009",
    text: "Would you rather have a partner who's into long, teasing massages or one who's into quick, passionate makeouts?",
    options: ["Teasing massages", "Passionate makeouts"],
    score: 1,
    nsfwRating: 5,
    categories: ["intimacy", "romance", "physical"]
  },
  {
    id: "tot-new-5010",
    text: "Would you rather have a partner who's always leaving naughty voicemails or one who's always sending suggestive emojis?",
    options: ["Naughty voicemails", "Suggestive emojis"],
    score: 1,
    nsfwRating: 5,
    categories: ["communication", "flirting", "technology"]
  },
  {
    id: "tot-new-5011",
    text: "Would you rather have a partner who's into blindfolding you for surprises or one who's into whispering secrets during dates?",
    options: ["Blindfold surpriser", "Secret whisperer"],
    score: 1,
    nsfwRating: 5,
    categories: ["trust", "romance", "intimacy"]
  },
  {
    id: "tot-new-5012",
    text: "Would you rather have a partner who's jealous but super attentive or chill but super distant?",
    options: ["Jealous and attentive", "Chill and distant"],
    score: 1,
    nsfwRating: 5,
    categories: ["relationships", "dynamics", "personality"]
  },
  {
    id: "tot-new-5013",
    text: "Would you rather have a partner who's into public hand-holding or one who's into private neck kisses?",
    options: ["Public hand-holder", "Private neck kisser"],
    score: 1,
    nsfwRating: 5,
    categories: ["romance", "intimacy", "physical"]
  },
  {
    id: "tot-new-5014",
    text: "Would you rather have a partner who's always challenging you to spicy bets or one who's always daring you to try new foods?",
    options: ["Spicy bet challenger", "New food darer"],
    score: 1,
    nsfwRating: 5,
    categories: ["playfulness", "adventure", "relationships"]
  },
  {
    id: "tot-new-5015",
    text: "Would you rather have a partner who's into writing you erotic stories or one who's into drawing you suggestive sketches?",
    options: ["Erotic story writer", "Suggestive sketch artist"],
    score: 1,
    nsfwRating: 5,
    categories: ["creativity", "intimacy", "romance"]
  },
  
  // NSFW 6 Questions - New additions
  {
    id: "tot-new-6001",
    text: "Would you rather have a partner who's loud in bed or one who bites?",
    options: ["Loud in bed", "Bites"],
    score: 1,
    nsfwRating: 6,
    categories: ["sex", "intimacy", "preferences"]
  },
  {
    id: "tot-new-6002",
    text: "Would you rather hook up in a car or a movie theater?",
    options: ["Car", "Movie theater"],
    score: 1,
    nsfwRating: 6,
    categories: ["sex", "public", "thrill"]
  },
  {
    id: "tot-new-6003",
    text: "Would you rather have a partner who's into blindfolds or handcuffs?",
    options: ["Blindfolds", "Handcuffs"],
    score: 1,
    nsfwRating: 6,
    categories: ["sex", "kink", "preferences"]
  },
  {
    id: "tot-new-6004",
    text: "Would you rather send a nude to the wrong group chat or have your partner post one of you online by mistake?",
    options: ["Send to wrong chat", "Partner posts online"],
    score: 1,
    nsfwRating: 6,
    categories: ["sex", "embarrassment", "social"]
  },
  {
    id: "tot-new-6005",
    text: "Would you rather have a quickie in the shower or a long session on the couch?",
    options: ["Quickie in shower", "Long session on couch"],
    score: 1,
    nsfwRating: 6,
    categories: ["sex", "intimacy", "preferences"]
  },
  {
    id: "tot-new-6006",
    text: "Would you rather have a partner who's amazing in bed but awful at cuddling or amazing at cuddling but awful in bed?",
    options: ["Great in bed, bad cuddler", "Great cuddler, bad in bed"],
    score: 1,
    nsfwRating: 6,
    categories: ["intimacy", "relationships", "preferences"]
  },
  {
    id: "tot-new-6007",
    text: "Would you rather hook up in a tent under the stars or in a fancy hotel penthouse?",
    options: ["Tent under stars", "Hotel penthouse"],
    score: 1,
    nsfwRating: 6,
    categories: ["adventure", "intimacy", "location"]
  },
  {
    id: "tot-new-6008",
    text: "Would you rather have a partner who's into leaving lipstick marks on you or one who's into scratching your back lightly?",
    options: ["Lipstick marker", "Back scratcher"],
    score: 1,
    nsfwRating: 6,
    categories: ["intimacy", "affection", "physical"]
  },
  {
    id: "tot-new-6009",
    text: "Would you rather have your most awkward sexting moment exposed or your most cringe-worthy hookup playlist?",
    options: ["Awkward sexts exposed", "Cringe playlist exposed"],
    score: 1,
    nsfwRating: 6,
    categories: ["embarrassment", "intimacy", "social"]
  },
  {
    id: "tot-new-6010",
    text: "Would you rather have a partner who's into role-playing as strangers or one who's into reenacting your first date?",
    options: ["Stranger role-play", "First date reenactor"],
    score: 1,
    nsfwRating: 6,
    categories: ["fantasy", "romance", "roleplay"]
  },
  {
    id: "tot-new-6011",
    text: "Would you rather have a partner who's loud during sex or one who's silent but intense?",
    options: ["Loud partner", "Silent but intense"],
    score: 1,
    nsfwRating: 6,
    categories: ["intimacy", "dynamics", "sex"]
  },
  {
    id: "tot-new-6012",
    text: "Would you rather have a partner who's into ice cube foreplay or one who's into warm oil massages?",
    options: ["Ice cube foreplay", "Warm oil massages"],
    score: 1,
    nsfwRating: 6,
    categories: ["intimacy", "sensory", "foreplay"]
  },
  {
    id: "tot-new-6013",
    text: "Would you rather have a partner who's into quickies in the car or long sessions in the bath?",
    options: ["Car quickies", "Bath sessions"],
    score: 1,
    nsfwRating: 6,
    categories: ["intimacy", "locations", "preferences"]
  },
  {
    id: "tot-new-6014",
    text: "Would you rather have a partner who's into biting your lip or one who's into tugging your hair?",
    options: ["Lip biter", "Hair tugger"],
    score: 1,
    nsfwRating: 6,
    categories: ["intimacy", "affection", "physical"]
  },
  {
    id: "tot-new-6015",
    text: "Would you rather have a partner who's into sending you spicy dares or one who's into playing naughty truth-or-dare games?",
    options: ["Spicy dare sender", "Naughty truth-or-dare player"],
    score: 1,
    nsfwRating: 6,
    categories: ["playfulness", "intimacy", "games"]
  },
  
  // NSFW 7 Questions - New additions
  {
    id: "tot-new-7001",
    text: "Would you rather have your partner find your sex toy stash or your secret fan fiction?",
    options: ["Find sex toys", "Find fan fiction"],
    score: 1,
    nsfwRating: 7,
    categories: ["sex", "secrets", "embarrassment"]
  },
  {
    id: "tot-new-7002",
    text: "Would you rather have sex on a beach or in a forest?",
    options: ["Beach", "Forest"],
    score: 1,
    nsfwRating: 7,
    categories: ["sex", "outdoor", "fantasy"]
  },
  {
    id: "tot-new-7003",
    text: "Would you rather admit your most awkward hookup moment or your strangest fantasy?",
    options: ["Awkward hookup moment", "Strangest fantasy"],
    score: 1,
    nsfwRating: 7,
    categories: ["sex", "past", "fantasy"]
  },
  {
    id: "tot-new-7004",
    text: "Would you rather have a partner who's into dirty talk in public or sexts you at work?",
    options: ["Dirty talk in public", "Sexts at work"],
    score: 1,
    nsfwRating: 7,
    categories: ["sex", "public", "naughty"]
  },
  {
    id: "tot-new-7005",
    text: "Would you rather have a one-night stand with your best friend's ex or your ex's best friend?",
    options: ["Best friend's ex", "Ex's best friend"],
    score: 1,
    nsfwRating: 7,
    categories: ["sex", "relationships", "taboo"]
  },
  {
    id: "tot-new-7006",
    text: "Would you rather have a partner who always whispers sweet nothings in your ear or one who always leaves love notes for you to find?",
    options: ["Whispers sweet nothings", "Leaves love notes"],
    score: 1,
    nsfwRating: 7,
    categories: ["relationships", "romance", "preferences"]
  },
  {
    id: "tot-new-7007",
    text: "Would you rather accidentally send a flirty text to your boss or to your partner's parent?",
    options: ["To your boss", "To partner's parent"],
    score: 1,
    nsfwRating: 7,
    categories: ["embarrassment", "communication", "awkward"]
  },
  {
    id: "tot-new-7008",
    text: "Would you rather have a partner who is always the big spoon or always the little spoon?",
    options: ["Always big spoon", "Always little spoon"],
    score: 1,
    nsfwRating: 7,
    categories: ["relationships", "intimacy", "preferences"]
  },
  {
    id: "tot-new-7009",
    text: "Would you rather receive a surprise weekend getaway or a thoughtful, handmade gift?",
    options: ["Weekend getaway", "Handmade gift"],
    score: 1,
    nsfwRating: 7,
    categories: ["relationships", "romance", "gifts"]
  },
  {
    id: "tot-new-7010",
    text: "Would you rather accidentally flash a stranger or have a stranger accidentally flash you?",
    options: ["Flash a stranger", "Stranger flashes you"],
    score: 1,
    nsfwRating: 7,
    categories: ["embarrassment", "awkward", "public"]
  },
  {
    id: "tot-new-7011",
    text: "Would you rather have a partner who's into blindfolding you during a kiss or one who's into tying your hands with a scarf?",
    options: ["Blindfolding during kiss", "Tying hands with scarf"],
    score: 1,
    nsfwRating: 7,
    categories: ["sex", "kink", "sensory"]
  },
  {
    id: "tot-new-7012",
    text: "Would you rather have a partner who loves to sext all day or one who sends you a single steamy voice note at night?",
    options: ["Sexts all day", "Steamy voice note at night"],
    score: 1,
    nsfwRating: 7,
    categories: ["sex", "communication", "preferences"]
  },
  
  // NSFW 8 Questions - New additions
  {
    id: "tot-new-8001",
    text: "Would you rather have sex with music playing or someone watching?",
    options: ["Music playing", "Someone watching"],
    score: 1,
    nsfwRating: 8,
    categories: ["sex", "preferences", "voyeurism"]
  },
  {
    id: "tot-new-8002",
    text: "Would you rather have your partner rate your oral skills or you rate theirs?",
    options: ["They rate yours", "You rate theirs"],
    score: 1,
    nsfwRating: 8,
    categories: ["sex", "communication", "intimacy"]
  },
  {
    id: "tot-new-8003",
    text: "Would you rather have a partner who's into spanking or one who's into ice cubes?",
    options: ["Spanking", "Ice cubes"],
    score: 1,
    nsfwRating: 8,
    categories: ["sex", "kink", "sensations"]
  },
  {
    id: "tot-new-8004",
    text: "Would you rather walk in on your roommate hooking up or have them walk in on you?",
    options: ["Walk in on them", "They walk in on you"],
    score: 1,
    nsfwRating: 8,
    categories: ["sex", "embarrassment", "awkward"]
  },
  {
    id: "tot-new-8005",
    text: "Would you rather have a threesome with two strangers or two exes?",
    options: ["Two strangers", "Two exes"],
    score: 1,
    nsfwRating: 8,
    categories: ["sex", "threesome", "fantasy"]
  },
  {
    id: "tot-new-8006",
    text: "Would you rather fulfill your partner's wildest fantasy or have them fulfill yours?",
    options: ["Fulfill their fantasy", "They fulfill mine"],
    score: 1,
    nsfwRating: 8,
    categories: ["sex", "fantasy", "relationships"]
  },
  {
    id: "tot-new-8007",
    text: "Would you rather make out in a crowded bar or in an empty movie theater?",
    options: ["Crowded bar", "Empty movie theater"],
    score: 1,
    nsfwRating: 8,
    categories: ["public", "intimacy", "thrill"]
  },
  {
    id: "tot-new-8008",
    text: "Would you rather have your partner read your diary or your browser history?",
    options: ["Read diary", "Read browser history"],
    score: 1,
    nsfwRating: 8,
    categories: ["privacy", "relationships", "secrets"]
  },
  {
    id: "tot-new-8009",
    text: "Would you rather have a partner who's amazing at oral sex or amazing at dirty talk?",
    options: ["Amazing at oral sex", "Amazing at dirty talk"],
    score: 1,
    nsfwRating: 8, 
    categories: ["sex", "preferences", "intimacy"]
  },
  {
    id: "tot-new-8010",
    text: "Would you rather have a partner who's into blindfolds or one who's into handcuffs?",
    options: ["Into blindfolds", "Into handcuffs"],
    score: 1,
    nsfwRating: 8,
    categories: ["sex", "kink", "bdsm"]
  },
  {
    id: "tot-new-8011",
    text: "Would you rather have a partner who loves to bite or one who loves to leave hickeys?",
    options: ["Loves to bite", "Loves to leave hickeys"],
    score: 1,
    nsfwRating: 8,
    categories: ["sex", "passion", "physical"]
  },
  {
    id: "tot-new-8012",
    text: "Would you rather have sex on a balcony overlooking a busy street or in a glass-walled shower with a view?",
    options: ["Balcony overlooking street", "Glass-walled shower with view"],
    score: 1,
    nsfwRating: 8,
    categories: ["sex", "public", "exhibitionism"]
  },
  {
    id: "tot-new-8013",
    text: "Would you rather have a partner who loves to role-play as a dominant teacher or a submissive student?",
    options: ["Dominant teacher", "Submissive student"],
    score: 1,
    nsfwRating: 8,
    categories: ["sex", "roleplay", "power dynamics"]
  },
  {
    id: "tot-new-8014",
    text: "Would you rather have a partner who's into body paint foreplay or one who's into edible underwear?",
    options: ["Body paint foreplay", "Edible underwear"],
    score: 1,
    nsfwRating: 8,
    categories: ["sex", "foreplay", "sensory"]
  },
  
  // NSFW 9 Questions - New additions
  {
    id: "tot-new-9001",
    text: "Would you rather have sex tied up or tie someone else up?",
    options: ["Be tied up", "Tie someone up"],
    score: 1,
    nsfwRating: 9,
    categories: ["sex", "kink", "bondage"]
  },
  {
    id: "tot-new-9002",
    text: "Would you rather have your loudest orgasm heard by neighbors or recorded by accident?",
    options: ["Heard by neighbors", "Recorded by accident"],
    score: 1,
    nsfwRating: 9,
    categories: ["sex", "embarrassment", "privacy"]
  },
  {
    id: "tot-new-9003",
    text: "Would you rather have a partner who's into public groping or private stripping?",
    options: ["Public groping", "Private stripping"],
    score: 1,
    nsfwRating: 9,
    categories: ["sex", "exhibitionism", "intimacy"]
  },
  {
    id: "tot-new-9004",
    text: "Would you rather confess your dirtiest roleplay idea or act it out with no warning?",
    options: ["Confess it", "Act it out"],
    score: 1,
    nsfwRating: 9,
    categories: ["sex", "roleplay", "communication"]
  },
  {
    id: "tot-new-9005",
    text: "Would you rather have sex in a hot tub with a stranger or on a rooftop with someone you know?",
    options: ["Hot tub with stranger", "Rooftop with someone you know"],
    score: 1,
    nsfwRating: 9,
    categories: ["sex", "public", "thrill"]
  },
  {
    id: "tot-new-9006",
    text: "Would you rather have a threesome with two strangers or with two people you know?",
    options: ["Two strangers", "Two people you know"],
    score: 1,
    nsfwRating: 9,
    categories: ["sex", "threesome", "fantasy"]
  },
  {
    id: "tot-new-9007",
    text: "Would you rather have sex in a public bathroom or in a parked car?",
    options: ["Public bathroom", "Parked car"],
    score: 1,
    nsfwRating: 9,
    categories: ["sex", "public", "risk"]
  },
  {
    id: "tot-new-9008",
    text: "Would you rather have a partner who's into BDSM or into role-playing?",
    options: ["Into BDSM", "Into role-playing"],
    score: 1,
    nsfwRating: 9,
    categories: ["sex", "kink", "preferences"]
  },
  {
    id: "tot-new-9009",
    text: "Would you rather have sex with the lights on or off?",
    options: ["Lights on", "Lights off"],
    score: 1,
    nsfwRating: 9,
    categories: ["sex", "preferences", "intimacy"]
  },
  {
    id: "tot-new-9010",
    text: "Would you rather act out your wildest fantasy or have your partner act out theirs?",
    options: ["Act out yours", "They act out theirs"],
    score: 1,
    nsfwRating: 9,
    categories: ["sex", "fantasy", "adventure"]
  },
  {
    id: "tot-new-9011",
    text: "Would you rather join an orgy with strangers or host a sex party with your closest friends?",
    options: ["Orgy with strangers", "Sex party with friends"],
    score: 1,
    nsfwRating: 9,
    categories: ["sex", "group", "fantasy"]
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
