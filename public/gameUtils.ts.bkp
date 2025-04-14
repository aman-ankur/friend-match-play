// server/src/gameUtils.ts
// Import types from the single source of truth (expected to be copied locally during build)
import { GameQuestion as ImportedGameQuestion, GameMode as ImportedGameMode } from './types/game';

// Re-export the types for use by other server modules
export type GameQuestion = ImportedGameQuestion;
export type GameMode = ImportedGameMode;

// Question data and function will be added in the next step

// Define basic types here or import from a shared types file
// Removed duplicate type definitions (GameQuestion, GameMode) - Now imported from ./types/game

// --- Question Data (Duplicated from src/utils/gameQuestions.ts to avoid CJS/ESM issues) --- 
const guessWhoIAmQuestions: GameQuestion[] = [
  {
    id: "gwia-1",
    text: "What's your go-to karaoke song when you're feeling confident?",
    options: ["Bohemian Rhapsody", "Shape of You'", "WAP", "Let It Go"],
    score: 1,
    nsfwRating: 1,
    categories: ["personal", "music"]
  },
  {
    id: "gwia-2",
    text: "What's your secret talent that no one would guess?",
    options: ["Flirting via memes only", "Guessing someone's vibe from their Spotify playlist", "I can cry on command — emotionally and dramatically", "Detecting red flags in under 0.3 seconds"],
    score: 1,
    nsfwRating: 2,
    categories: ["personal", "skills"]
  },
  {
    id: "gwia-3",
    text: "What's your guilty pleasure TV show?",
    options: ["Bridgerton — for the plot (aka the Duke of Hastings)", "Any cooking show where they get judged harshly for raw chicken", "Shark Tank — but only for the drama, not the business", "Indian Matchmaking — it's anthropology, I swear"],
    score: 1,
    nsfwRating: 2,
    categories: ["entertainment", "personal"]
  },
  {
    id: "gwia-4",
    text: "What's your most irrational fear?",
    options: ["The Wi-Fi dropping at the wrong moment", "My phone battery dying during an important conversation", "Accidentally sending a message to the wrong person", "Running into an ex when you're looking your worst"],
    score: 1,
    nsfwRating: 1,
    categories: ["personal", "fears"]
  },
  {
    id: "gwia-5",
    text: "What's your dream travel destination?",
    options: ["A cozy cabin in the Swiss Alps with a view of the Northern Lights", "A tiny island in Greece where you can swim to dinner", "A secluded villa in Tuscany with endless vineyards and sunsets", "An ancient Japanese village with traditional tea ceremonies and cherry blossoms"],
    score: 1,
    nsfwRating: 1,
    categories: ["travel", "personal"]
  },
  {
    id: "gwia-6",
    text: "What's your most controversial food opinion?",
    options: ["Burgers don't need lettuce or tomato", "Breakfast should be a dessert, not a meal", "Avocado is just a green mush with delusions of grandeur", "Coffee without sugar is for true masochists"],
    score: 1,
    nsfwRating: 3,
    categories: ["food", "opinions"]
  },
  {
    id: "gwia-7",
    text: "What's your most embarrassing dating app story (or what would it be if you ever dared to download one)?",
    options: ["Matched with my ex… and we both swiped right 😬", "Sent a risky message… to the wrong match 😭", "Used ChatGPT to write my bio and now they expect me to be funny", "Got ghosted mid-convo — they vanished like my motivation on Mondays"],
    score: 1,
    nsfwRating: 5,
    categories: ["dating", "personal"]
  },
  {
    id: "gwia-8",
    text: "What's your most controversial relationship opinion?",
    options: ["Couples should stalk each other's exes — it's just research", "\"We were on a break\" is a valid excuse — sorry, Ross was right", "You don't need to share everything — including the Netflix password", "If they don't post you, you're not the main character 💅"],
    score: 1,
    nsfwRating: 4,
    categories: ["relationships", "opinions"]
  },
  {
    id: "gwia-9",
    text: "What's your most scandalous social media habit?",
    options: ["Secretly stalking my ex like I'm a detective on a case", "Posting thirst traps and pretending it's just 'casual content'", "I scroll through my crush's profile until I know their life story", "I follow people I don't even like just for the drama"],
    score: 1,
    nsfwRating: 5,
    categories: ["social", "personal"]
  },
  {
    id: "gwia-10",
    text: "What's your most controversial opinion about modern dating?",
    options: ["Ghosting is sometimes necessary", "Dating apps ruined romance", "Marriage? A relic of the past", "Friends with benefits never works"],
    score: 1,
    nsfwRating: 5,
    categories: ["dating", "opinions"]
  },
  {
    id: "gwia-11",
    text: "What's your most controversial opinion about sex?",
    options: ["Communication is overrated", "Monogamy? It's a societal invention. Let's think outside the box.", "SSize doesn't matter. It's about chemistry, baby.", "Sex on first date is fine"],
    score: 1,
    nsfwRating: 9,
    categories: ["sex", "opinions"]
  },
  {
    id: "gwia-12",
    text: "What's your most wildly questionable move on a dating app? ",
    options: ["Using a picture from 5 years ago (or 10... who's counting?)", "Telling them you're \"just here for friends\" but really you're only looking for one thing...", "Juggling 3 apps like it's your full-time job", "Pretending to be a dog lover when you're definitely allergic"],
    score: 1,
    nsfwRating: 6,
    categories: ["dating", "personal"]
  },
  {
    id: "gwia-13",
    text: "What's your most controversial opinion about relationships?",
    options: ["Sometimes, cheating isn't as black-and-white as people make it out to be.", "Open relationships can be more fun than monogamy", "Marriage is just an expensive tradition.", "Living together before marriage is the real test."],
    score: 1,
    nsfwRating: 8,
    categories: ["relationships", "opinions"]
  },
  {
    id: "gwia-14",
    text: "What's your most scandalous social media confession?",
    options: ["I have a secret account that nobody knows about… except my dog.", "I've stalked my crush's ex to see if I'm better (spoiler: I am).", "I've used a fake account to peek at someone's stories without them knowing.", "I've commented on my own post to make it look like I'm more popular."],
    score: 1,
    nsfwRating: 6,
    categories: ["social", "personal"]
  },
  {
    id: "gwia-15",
    text: "What's your most controversial opinion about modern romance?",
    options: ["Romance is dead — we're all just trying to survive in this chaotic world", "Love is a choice not a feeling", "Soulmates are a myth — we're just here for the vibes.", "We all love the idea of 'the one,' but let's face it, it's more like 'the right one for now.'"],
    score: 1,
    nsfwRating: 6,
    categories: ["relationships", "opinions"]
  },
  {
    id: "gwia-17",
    text: "If you could have any superpower, what would it be?",
    options: ["Perfect Memory — Never forget that hilarious meme again.", "Invisibility — Sneak into VIP sections without anyone noticing.", "Mind Reading — So you can actually know what your crush is thinking", "Time Travel — Undo all those awkward moments and missed opportunities."],
    score: 1,
    nsfwRating: 2,
    categories: ["personal", "fantasy"]
  },
  {
    id: "gwia-18",
    text: "What's the first thing you do when you wake up?",
    options: ["Check the time and instantly regret it", "Hit snooze 5 times and pretend I'm actually getting rest", "Check Instagram to see what I missed while sleeping", "Immediately regret not going to bed earlier last night"],
    score: 1,
    nsfwRating: 1,
    categories: ["personal", "habits"]
  },
  {
    id: "gwia-19",
    text: "What's that tiny thing that instantly boosts your mood?",
    options: ["Sunny weather", "That first sip of coffee in the morning that makes you human again.", "A random act of kindness from a stranger that makes you believe in good people.", "When your favorite song plays, and suddenly life is a music video"],
    score: 1,
    nsfwRating: 1,
    categories: ["personal", "preferences"]
  },
  {
    id: "gwia-20",
    text: "If you could live in any fictional universe, which one would it be?",
    options: ["Hogwarts – magic school vibes.", "Marvel – superheroes, obviously.", "Star Wars – lightsabers and space battles", "Westeros – drama and dragons."],
    score: 1,
    nsfwRating: 2,
    categories: ["entertainment", "personal"]
  },
  {
    id: "gwia-21",
    text: "What's a skill you wish you had?",
    options: ["Playing an instrument – so I can make a dramatic entrance.", "Speaking another language – so I can talk smack in private.", "Drawing – because my stick figures deserve better.", "Photography – to prove I went to that concert."],
    score: 1,
    nsfwRating: 2,
    categories: ["personal", "skills"]
  },
  {
    id: "gwia-22",
    text: "What's your biggest pet peeve?",
    options: ["Loud phone talkers in public - we get it, you're popular", "Being late – I don't have time for your time management issues", "Interrupting – I'm not even done with my sentence yet, but okay.", "Texting 'k' – why does it feel like a passive-aggressive war declaration?"],
    score: 1,
    nsfwRating: 3,
    categories: ["personal", "preferences"]
  },
  {
    id: "gwia-23",
    text: "What's the most spontaneous thing you've ever done?",
    options: ["Made an impulse purchase I definitely didn't need", "Ate an entire pizza in one sitting (and regretted it)", "Signed up for a random class on a whim", "Blurted out my feelings without thinking"],
    score: 1,
    nsfwRating: 4,
    categories: ["personal", "life"]
  },
  {
    id: "gwia-24",
    text: "What's a white lie you tell often?",
    options: ["I'm fine... really!", "Be there in 5!", "It's amazing! I'll pretend I didn't hate it.", "I've totally seen that movie"],
    score: 1,
    nsfwRating: 5,
    categories: ["personal", "morality"]
  },
  {
    id: "gwia-25",
    text: "What's something you find attractive that others might not?",
    options: ["That one accent that makes you swoon", "Embracing that adorable awkwardness", "Brains > looks, fight me on it", "A dry sense of humor that keeps you guessing"],
    score: 1,
    nsfwRating: 6,
    categories: ["personal", "attraction"]
  },
  {
    id: "gwia-26",
    text: "What's the weirdest place you've fallen asleep?",
    options: ["At a friend's party, because I'm too old for this.", "During a Zoom call, pretending to listen.", "On the bus/train, drooling like a champion.", "On a park bench, because who needs a bed?"],
    score: 1,
    nsfwRating: 6,
    categories: ["personal", "funny"]
  },
  {
    id: "gwia-27",
    text: "Have you ever snooped through someone's phone?",
    options: ["Yes, my partner's – couldn't resist.", "Yes, my friend's – curiosity is a disease.", "Yes, my family's – because family secrets, right?", "Nope, I'm a saint (for now)."],
    score: 1,
    nsfwRating: 7,
    categories: ["personal", "relationships", "morality"]
  },
  {
    id: "gwia-28",
    text: "What's your go-to move to initiate intimacy?",
    options: ["A little bit of teasing mixed with a whole lot of charm", "The classic accidental touch – oops, didn't mean to", "Unsubtle eye contact and a slow smile.", "Flirty banter that turns into a full-on roast session."],
    score: 1,
    nsfwRating: 8,
    categories: ["relationships", "sex"]
  },
  {
    id: "gwia-29",
    text: "What's a sexual fantasy you'd be hesitant to admit?",
    options: ["Getting bossed around – and not in a business meeting.", "Something involving a blindfold and lots of trust", "BDSM, but only if we have a safe word", "Roleplay, but only if I'm not a fantasy character."],
    score: 1,
    nsfwRating: 9,
    categories: ["sex", "personal"]
  },
  {
    id: "gwia-30",
    text: "What's the biggest secret you've kept from a partner?",
    options: ["I've been low-key lying about my job.", "A fling I never told them about", "I told them I'm 'working late'... but I'm out with friends.", "I still have a stash of things from my wild days"],
    score: 1,
    nsfwRating: 10,
    categories: ["relationships", "secrets"]
  },
  {
    id: "gwia-new-1",
    text: "What's the one thing you'd secretly love to do if nobody was judging you?",
    options: ["Post a silly dance video on social media and not care.", "Wear pajamas to work... every day", "Eat dessert for breakfast daily", "Take a spontaneous road trip with no destination."],
    score: 1,
    nsfwRating: 2,
    categories: ["personal", "fantasy"]
  },
  {
    id: "gwia-new-2",
    text: "What's your go-to snack you'd eat way too much of if calories didn't exist?",
    options: ["Ice cream, all day, every day", "Pani puri, because who can stop at just one?", "Cheese fries—because who doesn't love melted cheese?", "Chaat—pav bhaji, bhel puri, the works."],
    score: 1,
    nsfwRating: 2,
    categories: ["food", "personal"]
  },
  {
    id: "gwia-new-3",
    text: "What's the pettiest thing that gets you irrationally annoyed?",
    options: ["People who clap at movies", "Loud phone notifications in quiet spaces.", "Using 'literally' for everything, like, literally.", "When people say 'we need to talk' without context."],
    score: 1,
    nsfwRating: 3,
    categories: ["personal", "preferences"]
  },
  {
    id: "gwia-new-4",
    text: "What's the flirtiest thing you'd do to get someone's attention at a bar?",
    options: ["Send them a drink, and add a mysterious smile.", "Drop a line so cheesy, it'll have them laughing.", "Casually 'bump' into them, then play it cool.", "Start a playful debate and invite them to argue"],
    score: 1,
    nsfwRating: 5,
    categories: ["dating", "personal"]
  },
  {
    id: "gwia-new-5",
    text: "What's the weirdest thing you'd admit to finding kinda hot?",
    options: ["When they get all flustered while trying to explain something.", "A heated debate that somehow ends in laughter... and chemistry.", "When they just own their quirks, no matter how weird.", "Seeing someone get sweaty from a workout (unapologetically)."],
    score: 1,
    nsfwRating: 6,
    categories: ["attraction", "personal"]
  },
  {
    id: "gwia-new-6",
    text: "What's your secret social media guilty pleasure?",
    options: ["Watching dog reels for hours", "Watching cringe-worthy influencer try-ons, judging every outfit.","Getting lost in the chaos of comment section drama.", "Liking every single thing my crush posts—no shame."],
    score: 1,
    nsfwRating: 4,
    categories: ["social", "personal"]
  },
  {
    id: "gwia-new-7",
    text: "What's the naughtiest thing you'd consider doing if you knew it'd stay a secret?",
    options: ["Have a late-night adventure with a complete stranger, no names, no rules.", "Send a scandalous message to my crush just to see if they'd bite.", "Take a risky bet and try a blindfolded date with someone completely new.", "Flirt openly with someone while pretending it's all innocent"],
    score: 1,
    nsfwRating: 8,
    categories: ["personal", "fantasy"]
  },
  {
    id: "gwia-new-8",
    text: "What's your go-to move to spice things up in the bedroom?",
    options: ["Whisper your wildest fantasies to them and see what happens.", "Try a slow and sensual kiss, building up the anticipation.", "Whisper something naughty in their ear to set the mood.", "Suggest a new position that neither of you has tried before."],
    score: 1,
    nsfwRating: 9,
    categories: ["sex", "relationships"]
  },
  {
    id: "gwia-new-9",
    text: "What's the most unhinged thing you'd want to try in a relationship just to see what happens?",
    options: ["Suggest a threesome with their hottest friend", "Book a kink retreat without telling them the theme.", "Swap phones for a day, no questions, full access", "Send them a 'hall pass'... and mean it"],
    score: 1,
    nsfwRating: 10,
    categories: ["relationships", "fantasy"]
  },
  {
    id: "gwia-new-10",
    text: "What's my secret guilty pleasure when I'm home alone?",
    options: ["Bingeing 90s Bollywood dance numbers or movies", "Stalking my own Instagram account", "Eating Maggi straight from the pan", "Practicing my Oscar speech in the mirror"],
    score: 1,
    nsfwRating: 1,
    categories: ["personal", "funny"]
  },
  {
    id: "gwia-new-11",
    text: "What's the one street food I'd fight a crowd for?",
    options: ["Pani puri with extra spice", "The OG Chhole Bhature that needs a nap afterward", "Momos with fiery sauce", "Jalebi fresh from the kadhai"],
    score: 1,
    nsfwRating: 3,
    categories: ["food", "funny"]
  },
  {
    id: "gwia-new-12",
    text: "What's my go-to excuse for dodging a boring family function?",
    options: ["Fake a work deadline", "Claim a sudden stomachache", "Can't. Mercury is in retrograde and so is my will to live", "Pretend I'm stuck in traffic forever"],
    score: 1,
    nsfwRating: 4,
    categories: ["personal", "quirky"]
  },
  {
    id: "gwia-new-13",
    text: "What's the one song I'd blast to scare away a bad mood?",
    options: ["'Munni Badnaam Hui' because chaos is therapy", "'Baby Shark' for ironic vibes", "'Badtameez Dil' to dance like a fool", "'Despacito' even though I don't get the words"],
    score: 1,
    nsfwRating: 2,
    categories: ["music", "funny"]
  },
  {
    id: "gwia-new-14",
    text: "What's my weirdest monsoon habit?",
    options: ["Sniffing the wet earth like a poet", "Jumping in every puddle like a kid", "Drinking chai while judging people's umbrella choices", "Pretending I'm in a music video every time it drizzles"],
    score: 1,
    nsfwRating: 1,
    categories: ["habits", "quirky"]
  },
  {
    id: "gwia-new-15",
    text: "What's the one thing I'd save from my room in a fire?",
    options: ["My childhood photo album", "My charger, because my phone is basically my soul", "My secret snack stash", "The one pair of dress/clothing that fits me right every time"],
    score: 1,
    nsfwRating: 3,
    categories: ["personal", "sentimental"]
  },
  {
    id: "gwia-new-16",
    text: "What's my most irrational fear at a desi wedding?",
    options: ["Aunties asking about my marriage plans", "Tripping during the baraat dance", "Ending up in the family dance video looking like a lost intern", "Getting stuck in a selfie with creepy uncle"],
    score: 1,
    nsfwRating: 2,
    categories: ["funny", "social"]
  },
  {
    id: "gwia-new-17",
    text: "My power move while rewatching my favorite sitcom/movie is…",
    options: ["Quoting every line 2 seconds before the character does (with pride)", "Laughing louder than the laugh track like I'm part of the cast", "Judging the character's life choices even though I've seen it 15 times", "Pausing to explain plot holes that nobody asked about"],
    score: 1,
    nsfwRating: 2,
    categories: ["entertainment", "funny"]
  },
  {
    id: "gwia-new-18",
    text: "What's the one thing I'd smuggle into a movie theater?",
    options: ["A full South Indian meal on a banana leaf", "Pakoras in a tissue-lined box like it's gold", "Homemade pav bhaji in Tupperware with chutneys labeled", "A whole biryani tiffin"],
    score: 1,
    nsfwRating: 2,
    categories: ["food", "quirky"]
  },
  {
    id: "gwia-new-19",
    text: "What's my weirdest way of cheering myself up?",
    options: ["Pretending I'm being interviewed about surviving emotional trauma—by Karan Johar", "Cocooning under the blanket while playing sad songs like it's my personal music video", "Talking to my ceiling fan like it's my therapist", "Calling my mom just to argue"],
    score: 1,
    nsfwRating: 4,
    categories: ["personal", "funny"]
  },
  {
    id: "gwia-new-20",
    text: "What's my strangest comfort ritual after a rough day?",
    options: ["Watch conspiracy videos and suddenly become an expert", "Ordering a cartful of random stuff online and calling it \"retail therapy\"", "Try 7 skincare products at once to confuse my pores", "Rewatching a movie I've seen 50 times"],
    score: 1,
    nsfwRating: 3,
    categories: ["personal", "funny"]
  },
  {
    id: "gwia-new-21",
    text: "What's my secret weapon to dodge a boring conversation?",
    options: ["Pretending to get a very important call and whispering \"Hello? Yes, it's done.\"", "Pretend I forgot something urgent", "Faking a coughing fit and dramatically sanitizing everything", "Asking \"What would you do if you woke up as a potato?\" and taking mental notes about their emotional stability"],
    score: 1,
    nsfwRating: 3,
    categories: ["social", "funny"]
  },
  {
    id: "gwia-new-22",
    text: "What's the one thing I do in private that'd make you laugh?",
    options: ["Rehearsing how I'll win an imaginary reality show", "Imitating celebrity accents while doing chores", "Practicing fake arguments so I'm never caught off guard", "Dance like nobody's watching—badly"],
    score: 1,
    nsfwRating: 1,
    categories: ["personal", "funny"]
  },
  {
    id: "gwia-new-23",
    text: "What's my go-to vibe for a lazy Sunday?",
    options: ["Binge a crime podcast marathon", "Nap like it's an Olympic sport", "Rearrange my room for no reason", "Scroll 3 years deep into someone's profile \"by accident\""],
    score: 1,
    nsfwRating: 3,
    categories: ["habits", "relaxation"]
  },
  {
    id: "gwia-new-24",
    text: "What's the pettiest thing I've held a grudge over?",
    options: ["They said \"let's catch up soon\" and never followed up. It's been 4 years", "They didn't laugh hard enough at my joke that was objectively hilarious", "They played a song I showed them — in a party — and didn't give me credit", "I said \"guess what happened\" and they replied \"what?\" without any excitement"],
    score: 1,
    nsfwRating: 5,
    categories: ["personal", "funny"]
  },
  {
    id: "gwia-new-25",
    text: "What's my weirdest quirk when I'm nervous?",
    options: ["Twirl my hair like I'm plotting a heist", "Laugh during serious trauma dumps", "Over-apologize for everything, even air", "Hum random tunes like I'm buffering"],
    score: 1,
    nsfwRating: 4,
    categories: ["habits", "quirky"]
  },
  {
    id: "gwia-new-26",
    text: "What's the one thing I'd splurge on without regret?",
    options: ["A scenic Airbnb I'll barely leave because it has \"vibes\"", "A gadget I'll use twice", "An outfit I'll wear once and then emotionally retire", "A 5-course meal with molecular gastronomy and zero idea what's happening"],
    score: 1,
    nsfwRating: 1,
    categories: ["personal", "lifestyle"]
  },
  {
    id: "gwia-new-27",
    text: "What's my most absurd childhood belief?",
    options: ["Monsters lived in my closet", "That if I swallowed a watermelon seed, a tree would grow inside me", "That my shadow had its own life and would misbehave when I wasn't looking", "That mixing all the soft drinks made a magic potion"],
    score: 1,
    nsfwRating: 2,
    categories: ["sentimental", "funny"]
  },
  {
    id: "gwia-new-28",
    text: "What's the one thing I'd do if I was invisible for a day?",
    options: ["Eavesdrop on strangers' drama", "Sit in on strangers' dates and rate their chemistry", "Move things around in a friend's house to confuse them like a poltergeist", "Whisper weird things into people's ears just for fun"],
    score: 1,
    nsfwRating: 6,
    categories: ["funny", "imagination"]
  },
  {
    id: "gwia-new-29",
    text: "What's the one food I'd eat every day if calories didn't exist?",
    options: ["Overloaded biryani with raita, gravy, and a smug sense of superiority", "Loaded fries drowned in cheese, jalapeños, and secrets", "Cheesecake so rich it requires a loan", "Deep-dish pizza with gravity-defying cheese pull"],
    score: 1,
    nsfwRating: 1,
    categories: ["food", "quirky"]
  },
  {
    id: "gwia-new-30",
    text: "What's my go-to excuse when I'm trying to sneak out of a bad date?",
    options: ["Sudden 'food poisoning' from a salad", "My friend just 'got dumped and needs me ASAP'", "Forgot I left my dog... on the stove", "A surprise period. Works every time"],
    score: 1,
    nsfwRating: 5,
    categories: ["dating", "funny", "escape"]
  },
  {
    id: "gwia-new-31",
    text: "If I had to send a risky text right now, what would it be?",
    options: ["\"You up? 😉\"", "\"Wanna skip the talking part tonight?\"", "\"Had a dream about you… it wasn't PG\"", "\"Thinking about that one time. You know the one.\""],
    score: 1,
    nsfwRating: 5,
    categories: ["flirting", "texts"]
  },
  {
    id: "gwia-new-32",
    text: "Which of these would totally ruin the mood for me?",
    options: ["Socks still on… *with sandals*", "Saying \"let's make love\" in a baby voice", "Playing Nickelback mid-hookup", "Moaning their own name"],
    score: 1,
    nsfwRating: 5,
    categories: ["sex", "ick"]
  },
  {
    id: "gwia-new-33",
    text: "If I was a sexy Halloween costume, what would I be?",
    options: ["Slutty ghost: just a sheet with holes in all the wrong places", "Sexy Excel Sheet: because I got all the right curves & formulas", "Naughty Librarian who shushes with a wink", "Steamy barista who'll steam more than milk"],
    score: 1,
    nsfwRating: 5,
    categories: ["funny", "costume"]
  },
  {
    id: "gwia-new-34",
    text: "What's my biggest red flag... that somehow people still find hot?",
    options: ["Emotionally unavailable but devastatingly charming", "Ghosts for a week, then replies with 'hey stranger'", "Loves chaos, hates small talk", "Will analyze your birth chart before texting back"],
    score: 1,
    nsfwRating: 5,
    categories: ["personality", "funny"]
  },
  {
    id: "gwia-new-35",
    text: "What's the most sus thing I'd do if I ran into my ex with their new partner?",
    options: ["Loudly say 'Oh, you replaced me already? Cute.'", "Pretend not to know them, then wink", "Mention our 'vacation tape' in front of them", "Say hi… and accidentally touch their arm a little too long"],
    score: 1,
    nsfwRating: 5,
    categories: ["exes", "awkward"]
  },
  {
    id: "gwia-43",
    text: "What's a quirky habit you have that others might find amusing?",
    options: ["Talking to pets like they're people", "Making up songs about daily tasks", "Collecting random items", "Dancing while cooking", "Naming inanimate objects", "Creating elaborate to-do lists", "Practicing accents alone", "Laughing at your own jokes"],
    score: 1,
    nsfwRating: 3,
    categories: ["habits", "quirks"]
  },
  {
    id: "gwia-new-61",
    text: "What's something I'd totally say *right after* hooking up?",
    options: [
      "\"So... brunch or round two?\"",
      "\"Wait, where are my pants?\"",
      "\"That was... unexpectedly athletic.\"",
      "\"Do you validate parking or just trauma?\""
    ],
    score: 1,
    nsfwRating: 6,
    categories: ["sex", "post-hookup", "funny"]
  },
  {
    id: "gwia-new-62",
    text: "If I had to describe my flirting style as a type of food, what would it be?",
    options: [
      "Spicy ramen: hot, messy, and leaves you thirsty",
      "Dark chocolate: smooth, mysterious, and might ruin your shirt",
      "Curry: intense, unforgettable, and lingers for days",
      "Tiramisu: layered, sweet, and might put you in a coma"
    ],
    score: 1,
    nsfwRating: 6,
    categories: ["flirting", "personality"]
  },
  {
    id: "gwia-new-63",
    text: "What's the weirdest thing that could turn me on *way too fast*?",
    options: [
      "A voice that sounds like sin and bad decisions",
      "Watching someone expertly fold laundry",
      "Getting called 'sir/ma'am' in the wrong context",
      "The sound of a belt unbuckling... in Dolby surround"
    ],
    score: 1,
    nsfwRating: 6,
    categories: ["kinks", "turn-ons"]
  },
  {
    id: "gwia-new-71",
    text: "What would be my accidental safe word?",
    options: [
      "\"WiFi's down!\"",
      "\"Oof... that's new!\"",
      "\"Wait, did you just quote Twilight?\"",
      "\"I smell... toast?\""
    ],
    score: 1,
    nsfwRating: 7,
    categories: ["sex", "humor", "kinks"]
  },
  {
    id: "gwia-new-72",
    text: "What's the one thing I secretly want said to me mid-hookup?",
    options: [
      "\"You're doing *terrible things* to my soul.\"",
      "\"I can't believe you're real.\"",
      "\"Say that again and I might combust.\"",
      "\"Okay but like... teach me that move later?\""
    ],
    score: 1,
    nsfwRating: 7,
    categories: ["sex", "compliments", "fantasy"]
  },
  {
    id: "gwia-new-73",
    text: "If I had to roleplay one of these, which would I choose?",
    options: [
      "Angsty vampire and reluctant snack",
      "Boss and very unqualified intern",
      "Detective and *suspiciously flexible* suspect",
      "Gym trainer and client who 'forgot' leg day"
    ],
    score: 1,
    nsfwRating: 7,
    categories: ["roleplay", "fantasy", "sex"]
  },
  {
    id: "gwia-new-74",
    text: "What would be the title of my sex tape?",
    options: [
      "\"No Notes, Just Moans\"",
      "\"Oops... We Did It Again\"",
      "\"Lighting Could've Been Better\"",
      "\"Rated R for Regret and Rhythm\""
    ],
    score: 1,
    nsfwRating: 7,
    categories: ["sex", "humor", "confession"]
  },
  {
    id: "gwia-new-75",
    text: "What's the thirstiest thing I've done without realizing?",
    options: [
      "Moaned during a *stretch* in yoga class",
      "Seduced someone using only eye contact and a bag of chips",
      "Accidentally sexted... my boss (oops)",
      "Slid into DMs with a meme and *zero shame*"
    ],
    score: 1,
    nsfwRating: 7,
    categories: ["sex", "confession", "cringe"]
  },
  {
    id: "gwia-new-76",
    text: "What's my weirdest turn-on I *might* lie about?",
    options: [
      "Being manhandled just the right amount",
      "Accents that could ruin lives",
      "That look someone gives *right before bad decisions*",
      "Someone reading... in a deep, slow voice"
    ],
    score: 1,
    nsfwRating: 7,
    categories: ["kinks", "sex", "secrets"]
  },
  {
    id: "gwia-new-77",
    text: "What's the most dangerously flirty thing I could whisper?",
    options: [
      "\"You're not gonna survive tonight, are you?\"",
      "\"I dreamt about this. You were louder.\"",
      "\"If you stop now, I'll sue.\"",
      "\"I'm not wearing patience. Or underwear.\""
    ],
    score: 1,
    nsfwRating: 7,
    categories: ["flirting", "sex", "wildcards"]
  },
  {
    id: "gwia-new-78",
    text: "What's a red flag I'd *absolutely ignore* if the sex is good?",
    options: [
      "Still in touch with all their exes (and their exes' moms)",
      "Says 'I don't believe in beds'",
      "Sends unprompted astrology memes *about us*",
      "Owns more toys than furniture"
    ],
    score: 1,
    nsfwRating: 7,
    categories: ["relationships", "sex", "red flags"]
  },
  {
    id: "gwia-new-79",
    text: "What's the kink I'd deny in public but whisper about later?",
    options: [
      "Biting. Lots of biting.",
      "Being tied up... or doing the tying.",
      "Praise so intense it's practically a monologue.",
      "Calling them something I'd blush to text."
    ],
    score: 1,
    nsfwRating: 7,
    categories: ["kinks", "secrets", "sex"]
  },
  {
    id: "gwia-new-81",
    text: "What's my *most dangerous* sex-related habit?",
    options: [
      "I push things to the limit and never look back.",
      "I'm into very loud things... after hours.",
      "I flirt *way* too much in public.",
      "I get a rush from breaking the rules... of consent."
    ],
    score: 1,
    nsfwRating: 8,
    categories: ["kinks", "sex", "risky"]
  },
  {
    id: "gwia-new-82",
    text: "Which of these would I absolutely refuse to do... in *public*?",
    options: [
      "Whisper all the dirty things I've done in a crowd.",
      "Act out an entire roleplay scenario, live.",
      "Talk about the *craziest* thing I've done in bed.",
      "Kiss someone in a way that leaves *no room for imagination*"
    ],
    score: 1,
    nsfwRating: 8,
    categories: ["sex", "public", "kinks"]
  },
  {
    id: "gwia-new-83",
    text: "If I were to be a stripper, what would my stage name be?",
    options: [
      "The *Unfiltered* Whisper",
      "Dangerous Desire",
      "Mistress of Mayhem",
      "Your Worst Mistake"
    ],
    score: 1,
    nsfwRating: 8,
    categories: ["sex", "humor", "roleplay"]
  },
  {
    id: "gwia-new-84",
    text: "Which taboo would I experiment with if no one knew?",
    options: [
      "Public sex... but like, *really* public.",
      "Dominating someone way out of my comfort zone.",
      "Fantasies involving multiple people, all at once.",
      "Bending some *very* strict rules about consent."
    ],
    score: 1,
    nsfwRating: 8,
    categories: ["sex", "taboo", "kinks"]
  },
  {
    id: "gwia-new-85",
    text: "What's the filthiest thing I've thought about doing but would *never* admit?",
    options: [
      "Having a one-night stand with someone I met in a bookstore.",
      "Tying someone up, just to leave them waiting.",
      "Breaking all the rules in a public setting—on purpose.",
      "Showering with someone... then never talking to them again."
    ],
    score: 1,
    nsfwRating: 8,
    categories: ["sex", "fantasy", "wild thoughts"]
  },
  {
    id: "gwia-new-86",
    text: "Which of these would I say during *the hottest* hookup of my life?",
    options: [
      "\"You're *too* good at this.\"",
      "\"Let's just say... your stamina's getting tested.\"",
      "\"Keep going, and I might *worship* you.\"",
      "\"You just unlocked a *new* kink of mine.\""
    ],
    score: 1,
    nsfwRating: 8,
    categories: ["sex", "dirty talk", "flirting"]
  },
  {
    id: "gwia-new-87",
    text: "How do I secretly like to be dominated?",
    options: [
      "Take control, but with *gentle* reminders.",
      "Talk *really dirty* and don't hold back.",
      "Overpower me *physically*, but not emotionally.",
      "Tell me exactly what to do... and watch me obey."
    ],
    score: 1,
    nsfwRating: 8,
    categories: ["sex", "domination", "kinks"]
  },
  {
    id: "gwia-new-88",
    text: "If I had to pick a *most shocking* location for a hookup, where would it be?",
    options: [
      "On a crowded subway at rush hour.",
      "The office... during a meeting.",
      "The kitchen... while making dinner.",
      "In the backseat of a car, *parked in public*."
    ],
    score: 1,
    nsfwRating: 8,
    categories: ["sex", "public", "taboo"]
  },
  {
    id: "gwia-new-89",
    text: "What's my biggest *darkest* secret when it comes to desire?",
    options: [
      "I've considered *forcing* someone into a fantasy scenario.",
      "I get off to watching forbidden things happen to others.",
      "I crave a total loss of control in bed, no matter the cost.",
      "I fantasize about doing unspeakable things... *safely*."
    ],
    score: 1,
    nsfwRating: 8,
    categories: ["sex", "fantasy", "dark desires"]
  },
  {
    id: "gwia-new-411",
    text: "What's your go-to cringe playlist move you hope no one ever sees?",
    options: [
      "Bollywood heartbreak anthems on loop",
      "That one 2000s emo track I never deleted",
      "K-pop bangers while pretending to dance-battle",
      "Disney songs at full volume—fight me"
    ],
    score: 1,
    nsfwRating: 4,
    categories: ["music", "personal"]
  },
  {
    id: "gwia-new-412",
    text: "Which friend are you during a breakup?",
    options: [
      "The one ready to slash tires (metaphorically… probably)",
      "The therapist who *needs* wine during sessions",
      "The distraction master: brunch, trip, rebound—GO",
      "The ghost who disappears until it blows over"
    ],
    score: 1,
    nsfwRating: 4,
    categories: ["relationships", "personal"]
  },
  {
    id: "gwia-new-413",
    text: "What's the most 'main character' thing you've done lately?",
    options: [
      "Walked out dramatically after an argument",
      "Cried in an Uber while pretending I'm in a movie",
      "Stared at myself in the mirror like it's a scene",
      "Said 'I'm done' and didn't mean it (but looked good)"
    ],
    score: 1,
    nsfwRating: 4,
    categories: ["personal", "drama"]
  },
  {
    id: "gwia-new-414",
    text: "What's the weirdest compliment you've *actually* enjoyed?",
    options: [
      "'You look like you'd ruin lives—in a good way'",
      "'You give villain energy, but like… hot villain'",
      "'You seem like you know everyone's secrets'",
      "'You're probably someone's red flag, and I respect it'"
    ],
    score: 1,
    nsfwRating: 4,
    categories: ["compliments", "social"]
  },
  {
    id: "gwia-new-101",
    text: "Would I rather get caught having sex in a public place or be secretly filmed during my most embarrassing moment?",
    options: [
      "Caught having sex in public.",
      "Secretly filmed during my most embarrassing moment."
    ],
    score: 1,
    nsfwRating: 10,
    categories: ["sex", "embarrassment", "public"]
  },
  {
    id: "gwia-new-102",
    text: "If I could choose one way to humiliate myself for the most pleasure, what would it be?",
    options: [
      "Being forced to beg for it.",
      "Doing something completely degrading in front of an audience.",
      "Confessing my most embarrassing fantasies to someone I trust.",
      "Being totally vulnerable and exposed to a stranger."
    ],
    score: 1,
    nsfwRating: 10,
    categories: ["humiliation", "kinks", "public"]
  },
  {
    id: "gwia-new-103",
    text: "What's my ultimate *no limits* kink that no one can ever know about?",
    options: [
      "A scene where I'm completely dominated without being able to move.",
      "Public exposure with *no discretion*.",
      "A wild orgy scenario where I'm the center of attention.",
      "Being forced into something so taboo, it could ruin my reputation."
    ],
    score: 1,
    nsfwRating: 10,
    categories: ["kinks", "humiliation", "taboo"]
  },
  {
    id: "gwia-new-104",
    text: "What's the most messed up thing I've secretly fantasized about but *would never admit*?",
    options: [
      "Being controlled by someone I trust, to the point where I can't resist.",
      "A hardcore public display of kink I'm too ashamed to tell anyone about.",
      "Being secretly filmed while fulfilling every *dirty* fantasy.",
      "A scenario where my deepest secrets are exposed and used against me."
    ],
    score: 1,
    nsfwRating: 10,
    categories: ["fantasy", "sex", "embarrassment"]
  },
  {
    id: "gwia-new-105",
    text: "What would be my most *embarrassing* but *exhilarating* experience if no one was watching?",
    options: [
      "Letting go of all control in a kinky situation.",
      "Being publicly humiliated in front of a crowd.",
      "Doing something taboo that could ruin me, but *only for the thrill*.",
      "Being caught in a forbidden act by a stranger who *doesn't care*."
    ],
    score: 1,
    nsfwRating: 10,
    categories: ["humiliation", "kinks", "public"]
  },
  {
    id: "gwia-new-106",
    text: "What would be my reaction if someone dared me to participate in their ultimate fantasy, no matter how crazy?",
    options: [
      "I'd say yes instantly—anything for the thrill.",
      "I'd hesitate, but secretly be *excited* to try it.",
      "I'd be terrified, but wouldn't be able to resist.",
      "I'd flat-out refuse, but the idea would still linger in my mind."
    ],
    score: 1,
    nsfwRating: 10,
    categories: ["kinks", "fantasy", "sex"]
  },
  {
    id: "gwia-new-107",
    text: "Which of these would turn me on *like crazy*, but I'd never tell anyone about it?",
    options: [
      "Being tied up in front of an audience who doesn't know me.",
      "Having someone talk dirty to me in the most graphic way imaginable.",
      "Doing something sexually taboo that I can't even speak about.",
      "Participating in a gangbang that no one ever hears about."
    ],
    score: 1,
    nsfwRating: 10,
    categories: ["kinks", "fantasy", "taboo"]
  },
  {
    id: "gwia-new-108",
    text: "Would I rather explore my deepest taboo with *complete strangers* or someone I trust the most?",
    options: [
      "Strangers, because it's even *more thrilling*.",
      "Someone I trust completely, for the ultimate intimacy."
    ],
    score: 1,
    nsfwRating: 10,
    categories: ["kinks", "fantasy", "strangers"]
  },
  {
    id: "gwia-new-109",
    text: "What's the most intense kink I'd be willing to *sacrifice* my normal life for?",
    options: [
      "Being someone's full-time slave in a dominant-submissive relationship.",
      "Living a life where all I do is fulfill their wildest, most taboo fantasies.",
      "Being part of an underground group that indulges in every sexual taboo imaginable.",
      "A life of constant public humiliation and secretive *dirty play*."
    ],
    score: 1,
    nsfwRating: 10,
    categories: ["kinks", "dominance", "taboo"]
  },
  {
    id: "gwia-new-110",
    text: "What's the *ultimate fantasy* I'd live out if I knew no one would ever judge me?",
    options: [
      "Living a secret life where I'm *publicly* owned and used.",
      "Being forced into a taboo scenario with no way out.",
      "Indulging in every dirty fantasy with a *group* of strangers.",
      "Exploring every forbidden sexual desire I've secretly had for years."
    ],
    score: 1,
    nsfwRating: 10,
    categories: ["kinks", "fantasy", "taboo"]
  },
  {
    id: "gwia-new-111",
    text: "What's your toxic post-midnight text energy?",
    options: [
      "'You up?' — to someone I *definitely* shouldn't text",
      "Starting a fight just to feel something",
      "Thirst-trap selfie with zero context",
      "Asking deep life questions like I'm Socrates on tequila"
    ],
    score: 1,
    nsfwRating: 10,
    categories: ["social", "chaotic", "spicy"]
  },
  {
    id: "gwia-new-112",
    text: "Choose your unholy thirst-trap caption:",
    options: [
      "Just shower thoughts. And no clothes.",
      "Oops! Dropped my morals 🫠",
      "Serving emotional damage with a side of legs",
      "Mood: ethically questionable but photogenic"
    ],
    score: 1,
    nsfwRating: 10,
    categories: ["social", "spicy", "chaotic"]
  },
  {
    id: "gwia-new-113",
    text: "Pick a cursed safe word you'd actually use (for the meme):",
    options: [
      "'GSTIN'",
      "'Nana Patekar'",
      "'Adobe Premiere Pro 2014'",
      "'Dhinchak Pooja'"
    ],
    score: 1,
    nsfwRating: 10,
    categories: ["chaotic", "bedroom", "funny"]
  },
  {
    id: "gwia-new-114",
    text: "What's your personal red flag you secretly take pride in?",
    options: [
      "I flirt like it's an Olympic sport—then ghost like Houdini",
      "Emotionally available... for 6 hours max",
      "Will fall in love over one song recommendation",
      "My love language is sending memes and mixed signals"
    ],
    score: 1,
    nsfwRating: 10,
    categories: ["spicy", "relationships", "chaotic"]
  },
  {
    id: "gwia-new-64",
    text: "What's your secret go-to move when flirting IRL?",
    options: [
      "Laughing at their worst jokes like it's stand-up night",
      "Light accidental touches — oops!",
      "Mirroring their energy like a sneaky chameleon",
      "Eye contact so intense it should come with a warning"
    ],
    score: 1,
    nsfwRating: 6,
    categories: ["flirty", "social", "funny"]
  },
  {
    id: "gwia-new-65",
    text: "What instantly gives you a tiny crush on someone?",
    options: [
      "The way they talk about something they love",
      "Their totally unnecessary but cute hand gestures",
      "A killer playlist they casually drop",
      "Them correcting your grammar — respectfully"
    ],
    score: 1,
    nsfwRating: 6,
    categories: ["relationships", "vibes", "fun"]
  },
  {
    id: "gwia-new-66",
    text: "What's something that's technically a red flag, but still hot?",
    options: [
      "They know *everyone* at the party",
      "Too confident for no reason — and it works",
      "They casually ignore texts… but show up in person 🔥",
      "They always say 'we'll figure it out' with zero plan"
    ],
    score: 1,
    nsfwRating: 6,
    categories: ["dating", "controversial", "funny"]
  },
  {
    id: "gwia-new-67",
    text: "What's your signature move to test someone's vibe?",
    options: [
      "Send them a cursed meme and see if they survive",
      "Ask 'Would you rather fight 100 duck-sized horses…'",
      "Pretend you're into astrology and judge their response",
      "Invite them to karaoke and unleash chaos"
    ],
    score: 1,
    nsfwRating: 6,
    categories: ["chaotic", "fun", "vibes"]
  },
  {
    "id": "gwia-new-80",
    "text": "Which of these would be my ultimate 'seduction power move'?",
    "options": [
      "Wearing nothing but confidence and eye contact.",
      "Slow dancing to a song with *dangerously* filthy lyrics.",
      "Cooking in just an apron and a smirk.",
      "Reading their deepest fantasy out loud... like a bedtime story."
    ],
    "score": 1,
    "nsfwRating": 8,
    "categories": ["sex", "seduction", "fantasy"]
  },
  {
    "id": "gwia-new-81",
    "text": "Which 'guilty pleasure' would I secretly *love* to try with a partner?",
    "options": [
      "Sending spicy voice notes throughout the day.",
      "A secret affair... in our own house.",
      "Watching each other get flirty with strangers... then pouncing later.",
      "Recording our sessions – for *personal use only*, of course."
    ],
    "score": 1,
    "nsfwRating": 8,
    "categories": ["sex", "kinks", "modern love"]
  },
  {
    "id": "gwia-new-82",
    "text": "If I had to text someone one *dirty* line right now, which would it be?",
    "options": [
      "\"I just had a thought I can't say out loud. Wanna hear it?\"",
      "\"You left something at my place… your control.\"",
      "\"My hands are free. So is my imagination.\"",
      "\"If I sent a photo, would you be decent... or honest?\""
    ],
    "score": 1,
    "nsfwRating": 8,
    "categories": ["sex", "flirting", "texts"]
  },
  {
    "id": "gwia-new-83",
    "text": "Which of these secret fantasies would I *actually* try if dared?",
    "options": [
      "A masquerade hookup with no real names.",
      "Roleplaying as strangers who meet at a bar.",
      "Being handcuffed somewhere... questionable.",
      "Getting caught in the act, just for the thrill."
    ],
    "score": 1,
    "nsfwRating": 8,
    "categories": ["sex", "fantasy", "roleplay"]
  },
  {
    "id": "gwia-new-84",
    "text": "Which unusual place secretly turns me on?",
    "options": [
      "The dressing room of a fancy store.",
      "A rooftop with city lights watching.",
      "An elevator with *way too many* stops.",
      "The middle row in a packed movie theatre."
    ],
    "score": 1,
    "nsfwRating": 8,
    "categories": ["sex", "public", "locations"]
  },
  {
    "id": "gwia-new-85",
    "text": "What's the most dangerous outfit I'd wear to tease someone?",
    "options": [
      "Absolutely nothing... under a trench coat.",
      "A crop top that screams 'come closer'.",
      "Just their shirt, and a look that says 'prove it'.",
      "Something sheer, with zero apologies."
    ],
    "score": 1,
    "nsfwRating": 8,
    "categories": ["fashion", "sex", "flirting"]
  },
  {
    "id": "gwia-new-86",
    "text": "What's the wildest *bet* I'd be willing to make in the bedroom?",
    "options": [
      "Winner gives the loser a massage... with no hands.",
      "Loser has to be blindfolded for the next round.",
      "Winner gets to pick a toy... and use it.",
      "Loser has to wear whatever the winner chooses."
    ],
    "score": 1,
    "nsfwRating": 8,
    "categories": ["sex", "games", "kinks"]
  },
  {
    "id": "gwia-new-87",
    "text": "What kind of NSFW 'bucket list' item secretly tempts me?",
    "options": [
      "Join a secret club with *very specific* rules.",
      "Hook up in a location that could go viral.",
      "Try something that involves an ice cube and no mercy.",
      "Have a day with zero clothes and zero shame."
    ],
    "score": 1,
    "nsfwRating": 8,
    "categories": ["sex", "bucket list", "fantasy"]
  },
  {
    "id": "gwia-new-88",
    "text": "What's my *weirdest turn-on* I wouldn't tell my friends about?",
    "options": [
      "Getting bossed around *professionally*.",
      "The smell of someone's shirt after a night out.",
      "Being praised while doing *very* bad things.",
      "Getting caught eavesdropping on someone else's fun."
    ],
    "score": 1,
    "nsfwRating": 8,
    "categories": ["kinks", "weird", "psych"]
  },
  {
    "id": "gwia-new-89",
    "text": "What would I *accidentally* moan during a hot moment?",
    "options": [
      "\"This should be illegal.\"",
      "\"Don't stop. Ever.\"",
      "\"Who even *taught* you that?!\"",
      "\"I want this *again* tomorrow.\""
    ],
    "score": 1,
    "nsfwRating": 8,
    "categories": ["sex", "humor", "dirty talk"]
  },
  {
    "id": "gwia-new-90",
    "text": "Which of these would I actually consider filming... just once?",
    "options": [
      "A full-on roleplay scene, costumes and all.",
      "A slow-motion solo session with dramatic lighting.",
      "A 'caught in the act' style hidden camera moment.",
      "A POV fantasy that gets *way too real*."
    ],
    "score": 1,
    "nsfwRating": 9,
    "categories": ["sex", "fantasy", "filming"]
  },
  {
    "id": "gwia-new-91",
    "text": "What's something *wild* I'd do in a hotel room with no rules?",
    "options": [
      "Order room service mid-hookup... and keep going.",
      "Tie someone up with the bathrobe belt.",
      "Make *use* of every surface—yes, even the minibar.",
      "Leave the curtains wide open for the thrill."
    ],
    "score": 1,
    "nsfwRating": 9,
    "categories": ["sex", "fantasy", "adventure"]
  },
  {
    "id": "gwia-new-92",
    "text": "Which *power play* secretly turns me on?",
    "options": [
      "Being bossed around by someone younger.",
      "Flipping the script and dominating someone older.",
      "Trading control every 5 minutes.",
      "Being seduced by someone totally off-limits."
    ],
    "score": 1,
    "nsfwRating": 9,
    "categories": ["sex", "power", "roleplay"]
  },
  {
    "id": "gwia-new-93",
    "text": "If I got invited to an exclusive underground kink party, what would I do?",
    "options": [
      "Dress up and *watch* from the shadows.",
      "Try the mild stuff... then maybe more.",
      "Join in anonymously, no names allowed.",
      "Host my own secret room and set the rules."
    ],
    "score": 1,
    "nsfwRating": 9,
    "categories": ["sex", "kinks", "fantasy"]
  },
  {
    "id": "gwia-new-94",
    "text": "What's something spicy I'd whisper to someone *in public* just to mess with them?",
    "options": [
      "\"Remember what we did in the elevator?\"",
      "\"Don't act innocent. You're still sore, aren't you?\"",
      "\"Keep a straight face while I tell you what I'm *not* wearing.\"",
      "\"Want to recreate that *kitchen counter* moment later?\""
    ],
    "score": 1,
    "nsfwRating": 9,
    "categories": ["sex", "dirty talk", "public"]
  },
  {
    "id": "gwia-new-95",
    "text": "Which of these 'morning after' scenarios secretly excites me?",
    "options": [
      "Waking up in a stranger's shirt with zero regrets.",
      "Cooking breakfast in nothing but socks.",
      "Sneaking out unnoticed... with a cheeky note left behind.",
      "Round two *before* brushing teeth."
    ],
    "score": 1,
    "nsfwRating": 9,
    "categories": ["sex", "aftercare", "humor"]
  },
  {
    "id": "gwia-new-96",
    "text": "What's a bold request I might text someone at 2 AM?",
    "options": [
      "\"Want to come over and ruin my sleep schedule?\"",
      "\"Need help testing out this new toy...\"",
      "\"My bed's cold and my thoughts are filthy.\"",
      "\"Let's play a game called 'yes, daddy/mommy'.\""
    ],
    "score": 1,
    "nsfwRating": 9,
    "categories": ["sex", "flirting", "late night"]
  },
  {
    "id": "gwia-new-97",
    "text": "What would I secretly love to try in front of a mirror?",
    "options": [
      "Watch myself take total control.",
      "Lock eyes mid-action and keep going.",
      "Experiment with angles no one's ever seen before.",
      "Record a short clip... just for *me*."
    ],
    "score": 1,
    "nsfwRating": 9,
    "categories": ["sex", "mirror", "kinks"]
  },
  {
    "id": "gwia-new-98",
    "text": "Which of these would I *pretend* to be into, only to realize I love it?",
    "options": [
      "Being handcuffed to the bed.",
      "Getting called something filthy during foreplay.",
      "Reading erotica out loud.",
      "Wearing something outrageous under my clothes."
    ],
    "score": 1,
    "nsfwRating": 9,
    "categories": ["sex", "kinks", "discovery"]
  },
  {
    "id": "gwia-new-99",
    "text": "Which of these would turn me on more than I'd admit?",
    "options": [
      "Someone *narrating* exactly what they're doing to me.",
      "Getting teased for hours with no release.",
      "A voice note that's 99% breathing and 1% words.",
      "Losing a bet... and paying for it in *creative* ways."
    ],
    "score": 1,
    "nsfwRating": 9,
    "categories": ["sex", "sensual", "kinks"]
  },
  {
    "id": "gwia-new-115",
    "text": "Which of these would instantly ruin a wholesome cuddle session?",
    "options": [
      "Loud stomach growl mid-snuggle",
      "Unprompted 'Would you still love me if I was a worm?'",
      "Sudden fart war—no survivors",
      "Pulling out a spreadsheet of cuddle KPIs"
    ],
    "score": 1,
    "nsfwRating": 10,
    "categories": ["chaotic", "bedroom", "humor"]
  },
  {
    "id": "gwia-new-116",
    "text": "You accidentally send a spicy pic to your family WhatsApp group. What's your next move?",
    "options": [
      "Yeet phone. Become tree.",
      "Follow up with 'That was a dare 😅'",
      "Claim you were hacked by Russians. Again.",
      "Just delete the group and move to another country"
    ],
    "score": 1,
    "nsfwRating": 10,
    "categories": ["chaotic", "social", "oops"]
  },
  {
    "id": "gwia-new-117",
    "text": "What's your post-hookup intrusive thought of the week?",
    "options": [
      "Did I leave my socks on... again?",
      "Was that one noise *me* or the furniture?",
      "Should I text my therapist or my bestie first?",
      "Do they now know my weird breathing rhythm?"
    ],
    "score": 1,
    "nsfwRating": 10,
    "categories": ["bedroom", "personal", "overthink"]
  },
  {
    "id": "gwia-new-118",
    "text": "What's your toxic post-midnight text energy?",
    "options": [
      "'You up?' — to someone I *definitely* shouldn't text",
      "Starting a fight just to feel something",
      "Thirst-trap selfie with zero context",
      "Asking deep life questions like I'm Socrates on tequila"
    ],
    "score": 1,
    "nsfwRating": 10,
    "categories": ["social", "chaotic", "spicy"]
  },
  {
    "id": "gwia-new-119",
    "text": "Choose your unholy thirst-trap caption:",
    "options": [
      "Just shower thoughts. And no clothes.",
      "Oops! Dropped my morals 🫠",
      "Serving emotional damage with a side of legs",
      "Mood: ethically questionable but photogenic"
    ],
    "score": 1,
    "nsfwRating": 10,
    "categories": ["social", "spicy", "chaotic"]
  },
  {
    "id": "gwia-new-120",
    "text": "What's your worst 'accidentally sexy' moment?",
    "options": [
      "Tripped in slow motion while making eye contact",
      "Voice cracked while trying to flirt",
      "Spilled drink *on myself* mid-wink",
      "Sexy sneeze? It's a thing. I swear."
    ],
    "score": 1,
    "nsfwRating": 10,
    "categories": ["chaotic", "flirty", "oops"]
  },
  {
    "id": "gwia-new-121",
    "text": "Pick a cursed safe word you'd actually use (for the meme):",
    "options": [
      "'GSTIN'",
      "'Nana Patekar'",
      "'Adobe Premiere Pro 2014'",
      "'Dhinchak Pooja'"
    ],
    "score": 1,
    "nsfwRating": 10,
    "categories": ["chaotic", "bedroom", "funny"]
  },
  {
    "id": "gwia-new-122",
    "text": "What's your personal red flag you secretly take pride in?",
    "options": [
      "I flirt like it's an Olympic sport—then ghost like Houdini",
      "Emotionally available... for 6 hours max",
      "Will fall in love over one song recommendation",
      "My love language is sending memes and mixed signals"
    ],
    "score": 1,
    "nsfwRating": 10,
    "categories": ["spicy", "relationships", "chaotic"]
  },
  {
    "id": "gwia-new-123", // Renamed from gwia-new-115
    "text": "What's the dirtiest power move I could make during a family wedding?",
    "options": [
      "Sneak away for a quickie during the sangeet",
      "Hook up with a cousin's hot best friend—again",
      "Use the DJ's mic to whisper something filthy to one person",
      "Send my plus-one a pic from the bathroom with a challenge"
    ],
    "score": 1,
    "nsfwRating": 10,
    "categories": ["taboo", "public", "chaotic"]
  },
  {
    "id": "gwia-new-124", // Renamed from gwia-new-116
    "text": "What secret roleplay would *destroy* me if someone found out I liked it?",
    "options": [
      "Getting 'disciplined' by a strict professor type",
      "Being interrogated like a spy with *kinky consequences*",
      "Playing a submissive pet for a dom",
      "Being forced to perform in front of a live audience"
    ],
    "score": 1,
    "nsfwRating": 10,
    "categories": ["kinks", "roleplay", "taboo"]
  },
  {
    "id": "gwia-new-125", // Renamed from gwia-new-117
    "text": "What's the most scandalous public situation I'd get *giddy* about being caught in?",
    "options": [
      "Making out with a stranger in an elevator",
      "A very public display of dominance in the middle of a park",
      "Having an unplanned *quickie* in the back of a cab",
      "Wearing nothing but a trench coat while walking through a busy mall"
    ],
    "score": 1,
    "nsfwRating": 10,
    "categories": ["public", "kinks", "chaotic"]
  },
  {
    "id": "gwia-new-126", // Renamed from gwia-new-118
    "text": "If I had to do something that would destroy my reputation just to turn someone on, what would it be?",
    "options": [
      "Do a very public striptease in the middle of a work event",
      "Challenge someone to a public *showdown* of humiliation",
      "Send a message full of *dirty* confessions to the wrong person",
      "Fake an embarrassing 'confession' on a live stream"
    ],
    "score": 1,
    "nsfwRating": 10,
    "categories": ["taboo", "humiliation", "public"]
  },
  {
    "id": "gwia-new-127", // Renamed from gwia-new-119
    "text": "What's the most fucked up thing I'd risk to *completely* destroy my life just for the thrill?",
    "options": [
      "Live out a sexual fantasy on a public stage with no warning",
      "Hook up with a total stranger in a public restroom",
      "Join a secret club that lives out illegal kinks without fear of consequence",
      "Expose all my deepest secrets in a podcast that gets millions of listeners"
    ],
    "score": 1,
    "nsfwRating": 10,
    "categories": ["taboo", "humiliation", "chaotic"]
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
  // === Exclusive Questions (nsfwRating: 11) ===
  {
    id: "tot-new-201",
    text: "Would you rather jerk off to a close friend's nudes you accidentally saw or fantasize about a same-sex hookup you'll never admit to?",
    options: ["Friend's nudes", "Same-sex fantasy"],
    score: 1,
    nsfwRating: 11,
    categories: ["sex", "past", "secrets"]
  },
  {
    id: "tot-new-202",
    text: "Would you rather watch your partner get it on with a stranger while you're cuckolded or join a threesome where you're the odd one out?",
    options: ["Cuckolded watching", "Threesome odd one out"],
    score: 1,
    nsfwRating: 11,
    categories: ["sex", "cuckolding", "threesome"]
  },
  {
    id: "tot-new-203",
    text: "Would you rather role-play a CNC scene where you're the aggressor or the one being 'taken' with zero control?",
    options: ["Be the aggressor", "Be taken"],
    score: 1,
    nsfwRating: 11,
    categories: ["sex", "fetish", "CNC"]
  },
  {
    id: "tot-new-204",
    text: "Would you rather secretly watch a couple hook up in a hotel room or have someone watch you and your partner without you knowing?",
    options: ["Watch a couple", "Be watched"],
    score: 1,
    nsfwRating: 11,
    categories: ["sex", "voyeurism"]
  },
  {
    id: "tot-new-205",
    text: "Would you rather admit to getting off to your partner's sibling or to a teacher you had a crush on?",
    options: ["Partner's sibling", "Teacher crush"],
    score: 1,
    nsfwRating: 11,
    categories: ["sex", "past", "taboo"]
  },
  {
    id: "tot-new-206",
    text: "Would you rather have a threesome with two strangers who know your kinks or two friends who don't suspect a thing?",
    options: ["Strangers with kinks", "Unsuspecting friends"],
    score: 1,
    nsfwRating: 11,
    categories: ["sex", "threesome"]
  },
  {
    id: "tot-new-207",
    text: "Would you rather confess you've masturbated in a public place or that you've used someone else's sex toy without telling them?",
    options: ["Public masturbation", "Used their toy"],
    score: 1,
    nsfwRating: 11,
    categories: ["sex", "past"]
  },
  {
    id: "tot-new-208",
    text: "Would you rather your partner peg you in a dominance scene or you peg them while they beg for mercy?",
    options: ["Get pegged", "Peg them"],
    score: 1,
    nsfwRating: 11,
    categories: ["sex", "fetish", "domination"]
  },
  {
    id: "tot-new-209",
    text: "Would you rather fantasize about cuckolding your partner with their best friend or being cuckolded by them with yours?",
    options: ["Cuckold them", "Be cuckolded"],
    score: 1,
    nsfwRating: 11,
    categories: ["sex", "cuckolding", "fantasy"]
  },
  {
    id: "tot-new-210",
    text: "Would you rather admit to getting turned on by a furry convention or a BDSM dungeon party you stumbled into?",
    options: ["Furry convention", "BDSM dungeon"],
    score: 1,
    nsfwRating: 11,
    categories: ["sex", "fetish", "past"]
  },
  {
    id: "tot-new-211",
    text: "Would you rather have your partner film you in a solo kink session or star in a couples' tape that's strictly for their eyes?",
    options: ["Solo kink film", "Couples' tape"],
    score: 1,
    nsfwRating: 11,
    categories: ["sex", "exhibitionism"]
  },
  {
    id: "tot-new-212",
    text: "Would you rather confess you've gotten off to a coworker's social media or to a random stranger you saw once?",
    options: ["Coworker's socials", "Random stranger"],
    score: 1,
    nsfwRating: 11,
    categories: ["sex", "past"]
  },
  {
    id: "tot-new-213",
    text: "Would you rather try a group orgy where you're blindfolded or one where you're the only one giving commands?",
    options: ["Blindfolded orgy", "Giving commands"],
    score: 1,
    nsfwRating: 11,
    categories: ["sex", "fetish", "group"]
  },
  {
    id: "tot-new-214",
    text: "Would you rather your partner catch you sniffing their worn clothes or overhear you describing a fetish to a friend?",
    options: ["Sniffing clothes", "Describing fetish"],
    score: 1,
    nsfwRating: 11,
    categories: ["sex", "secrets"]
  },
  {
    id: "tot-new-215",
    text: "Would you rather role-play a taboo teacher-student scene or a doctor-patient one with your partner?",
    options: ["Teacher-student", "Doctor-patient"],
    score: 1,
    nsfwRating: 11,
    categories: ["sex", "fetish", "roleplay"]
  },
  {
    id: "tot-new-216",
    text: "Would you rather admit you've fantasized about a gangbang or that you've gotten off to porn you're ashamed of?",
    options: ["Gangbang fantasy", "Shameful porn"],
    score: 1,
    nsfwRating: 11,
    categories: ["sex", "fantasy", "past"]
  },
  {
    id: "tot-new-217",
    text: "Would you rather have a voyeur secretly record you during sex or be the voyeur recording someone else?",
    options: ["Be recorded", "Record someone"],
    score: 1,
    nsfwRating: 11,
    categories: ["sex", "voyeurism"]
  },
  {
    id: "tot-new-218",
    text: "Would you rather confess to a foot fetish you've acted on or a watersports fantasy you've kept buried?",
    options: ["Foot fetish acted on", "Watersports fantasy"],
    score: 1,
    nsfwRating: 11,
    categories: ["sex", "fetish"]
  },
  {
    id: "tot-new-219",
    text: "Would you rather your partner dominate you with a leash and collar or you dominate them with verbal humiliation?",
    options: ["Leash and collar", "Verbal humiliation"],
    score: 1,
    nsfwRating: 11,
    categories: ["sex", "fetish", "domination"]
  },
  {
    id: "tot-new-220",
    text: "Would you rather admit you've sexted someone while in a relationship or that you've gotten off thinking about your partner's ex?",
    options: ["Sexted someone", "Thought of their ex"],
    score: 1,
    nsfwRating: 11,
    categories: ["sex", "past", "secrets"]
  },
  {
    id: "tot-new-301",
    text: "Would you rather confess you've gotten off to the idea of your partner being gangbanged by strangers or that you've fantasized about leading the gangbang yourself?",
    options: ["Their gangbang", "Lead the gangbang"],
    score: 1,
    nsfwRating: 11,
    categories: ["sex", "fantasy", "group"]
  },
  {
    id: "tot-new-302",
    text: "Would you rather admit you've masturbated in a graveyard or that you've gotten aroused at a funeral?",
    options: ["Graveyard masturbation", "Funeral arousal"],
    score: 1,
    nsfwRating: 11,
    categories: ["sex", "macabre", "past"]
  },
  {
    id: "tot-new-303",
    text: "Would you rather try a role-play where you're a cult leader seducing your partner or a sacrifice being offered to them?",
    options: ["Cult leader", "Sacrifice"],
    score: 1,
    nsfwRating: 11,
    categories: ["sex", "fetish", "roleplay"]
  },
  {
    id: "tot-new-304",
    text: "Would you rather have your partner find your secret stash of extreme fetish porn or catch you practicing a humiliation kink alone?",
    options: ["Fetish porn stash", "Humiliation practice"],
    score: 1,
    nsfwRating: 11,
    categories: ["sex", "fetish", "secrets"]
  },
  {
    id: "tot-new-305",
    text: "Would you rather spend a night dissecting a cadaver with your partner or confessing every morbid thought you've ever had?",
    options: ["Dissect cadaver", "Confess morbid thoughts"],
    score: 1,
    nsfwRating: 11,
    categories: ["macabre", "psychology"]
  },
  // Adding new questions from questions_11_2.txt
  {
    id: "tot-new-801",
    text: "Would you rather join a threesome where your partner picks the third or pick the third yourself but they watch you two first?",
    options: ["Partner picks", "You pick, they watch"],
    score: 1,
    nsfwRating: 11,
    categories: ["sex", "threesome"]
  },
  {
    id: "tot-new-802",
    text: "Would you rather jerk off to an ex-lover's old sexts or fantasize about your current partner's ex while you're with them?",
    options: ["Ex's sexts", "Partner's ex"],
    score: 1,
    nsfwRating: 11,
    categories: ["sex", "past", "masturbation"]
  },
  {
    id: "tot-new-803",
    text: "Would you rather play out a CNC scene where you're the prey or the predator with your partner?",
    options: ["Be prey", "Be predator"],
    score: 1,
    nsfwRating: 11,
    categories: ["sex", "fetish", "CNC"]
  },
  {
    id: "tot-new-804",
    text: "Would you rather get caught fingering someone at a swinger's party or have someone catch you being fingered in a public bathroom?",
    options: ["Caught fingering", "Caught being fingered"],
    score: 1,
    nsfwRating: 11,
    categories: ["sex", "exhibitionism"]
  },
  {
    id: "tot-new-805",
    text: "Would you rather watch your partner get creampied by a stranger or be the one creampied while they watch?",
    options: ["Watch them", "They watch you"],
    score: 1,
    nsfwRating: 11,
    categories: ["sex", "cuckolding"]
  },
  {
    id: "tot-new-806",
    text: "Would you rather suck your partner's nipples in a crowded club or have them fondle your boobs under a restaurant table?",
    options: ["Suck nipples", "Boobs fondled"],
    score: 1,
    nsfwRating: 11,
    categories: ["sex", "exhibitionism"]
  },
  {
    id: "tot-new-807",
    text: "Would you rather peg your partner in a femdom scene or be pegged by them while they degrade you?",
    options: ["Peg them", "Be pegged"],
    score: 1,
    nsfwRating: 11,
    categories: ["sex", "fetish", "femdom"]
  },
  {
    id: "tot-new-808",
    text: "Would you rather admit you've masturbated to a coworker's voice or that you've gotten off to a friend's workout video?",
    options: ["Coworker's voice", "Friend's video"],
    score: 1,
    nsfwRating: 11,
    categories: ["sex", "past", "masturbation"]
  },
  {
    id: "tot-new-809",
    text: "Would you rather have sex in a room where you know you're being filmed or where you know someone's hiding and watching?",
    options: ["Filmed", "Watched live"],
    score: 1,
    nsfwRating: 11,
    categories: ["sex", "voyeurism"]
  },
  {
    id: "tot-new-810",
    text: "Would you rather role-play a rape-fantasy where you're pinned down or where you're the one pinning?",
    options: ["Pinned down", "Pinning"],
    score: 1,
    nsfwRating: 11,
    categories: ["sex", "fetish", "CNC"]
  },
  {
    id: "tot-new-811",
    text: "Would you rather share your partner with their ex for a night or let your ex join you two for a threesome?",
    options: ["Share with their ex", "Your ex joins"],
    score: 1,
    nsfwRating: 11,
    categories: ["sex", "threesome", "ex-lovers"]
  },
  {
    id: "tot-new-812",
    text: "Would you rather try doggy style in front of a mirror to see yourself or missionary while blindfolded to feel everything?",
    options: ["Doggy with mirror", "Missionary blindfolded"],
    score: 1,
    nsfwRating: 11,
    categories: ["sex", "positions"]
  },
  {
    id: "tot-new-813",
    text: "Would you rather jerk off to a fantasy of your partner pregnant or to them dominating you in a dungeon?",
    options: ["Pregnant fantasy", "Dungeon domination"],
    score: 1,
    nsfwRating: 11,
    categories: ["sex", "fetish"]
  },
  {
    id: "tot-new-814",
    text: "Would you rather have your partner catch you sexting a swinger couple or overhear you describing a threesome you want?",
    options: ["Caught sexting", "Overheard threesome"],
    score: 1,
    nsfwRating: 11,
    categories: ["sex", "past"]
  },
  {
    id: "tot-new-815",
    text: "Would you rather try exhibitionism by fucking on a balcony or voyeurism by spying on a couple in a hotel?",
    options: ["Balcony sex", "Spy on couple"],
    score: 1,
    nsfwRating: 11,
    categories: ["sex", "exhibitionism", "voyeurism"]
  },
  {
    id: "tot-new-816",
    text: "Would you rather admit you've gotten off to a same-sex fantasy or that you've fantasized about a partner's sibling?",
    options: ["Same-sex fantasy", "Partner's sibling"],
    score: 1,
    nsfwRating: 11,
    categories: ["sex", "past", "sexual-preference"]
  },
  {
    id: "tot-new-817",
    text: "Would you rather have your partner ride you in a car while people pass or let them finger you in a movie theater?",
    options: ["Car ride", "Theater fingering"],
    score: 1,
    nsfwRating: 11,
    categories: ["sex", "exhibitionism"]
  },
  {
    id: "tot-new-818",
    text: "Would you rather try a cuckolding scene where you're tied up watching or one where you're the bull for another couple?",
    options: ["Tied up watching", "Be the bull"],
    score: 1,
    nsfwRating: 11,
    categories: ["sex", "cuckolding"]
  },
  {
    id: "tot-new-819",
    text: "Would you rather masturbate to a memory of your first hookup or to a fantasy of your partner's boss?",
    options: ["First hookup", "Partner's boss"],
    score: 1,
    nsfwRating: 11,
    categories: ["sex", "past", "masturbation"]
  },
  {
    id: "tot-new-820",
    text: "Would you rather let your partner pick a swinger party for you to join or pick one yourself but they set the rules?",
    options: ["They pick party", "You pick, they rule"],
    score: 1,
    nsfwRating: 11,
    categories: ["sex", "swingers"]
  },
  {
    id: "tot-new-821",
    text: "Would you rather try a position where you're bent over in front of strangers or one where you're spread-eagle on display?",
    options: ["Bent over", "Spread-eagle"],
    score: 1,
    nsfwRating: 11,
    categories: ["sex", "positions", "exhibitionism"]
  },
  {
    id: "tot-new-822",
    text: "Would you rather have your partner whisper about sharing you with a friend or admit you've dreamed of sharing them with yours?",
    options: ["They whisper", "You dream"],
    score: 1,
    nsfwRating: 11,
    categories: ["sex", "sharing"]
  },
  {
    id: "tot-new-823",
    text: "Would you rather get off while being watched by a silent stranger or while your partner narrates every move?",
    options: ["Silent stranger", "Partner narrates"],
    score: 1,
    nsfwRating: 11,
    categories: ["sex", "exhibitionism"]
  },
  {
    id: "tot-new-824",
    text: "Would you rather try a femdom scene where you're spanked publicly or a CNC scene where you're chased privately?",
    options: ["Public spanking", "Private chase"],
    score: 1,
    nsfwRating: 11,
    categories: ["sex", "fetish", "femdom"]
  },
  {
    id: "tot-new-825",
    text: "Would you rather admit you've fantasized about a creampie during pregnancy or about dominating an ex in a revenge fuck?",
    options: ["Pregnancy creampie", "Revenge fuck"],
    score: 1,
    nsfwRating: 11,
    categories: ["sex", "fetish", "past"]
  },
  {
    id: "tot-new-901",
    text: "Would you rather plan a threesome with your partner where you both seduce a stranger together or one where you watch them seduce the stranger alone first?",
    options: ["Seduce together", "Watch them seduce"],
    score: 1,
    nsfwRating: 11,
    categories: ["sex", "threesome", "couple"]
  },
  {
    id: "tot-new-902",
    text: "Would you rather try a CNC role-play with your partner where you're the aggressor in a dark alley scene or the one being chased through a fake 'break-in' at home?",
    options: ["Be aggressor", "Be chased"],
    score: 1,
    nsfwRating: 11,
    categories: ["sex", "fetish", "CNC", "couple"]
  },
  {
    id: "tot-new-903",
    text: "Would you rather have you and your partner masturbate together in a parked car while strangers pass by or take turns pleasuring each other on a balcony with neighbors watching?",
    options: ["Car masturbation", "Balcony pleasure"],
    score: 1,
    nsfwRating: 11,
    categories: ["sex", "exhibitionism", "masturbation", "couple"]
  },
  {
    id: "tot-new-904",
    text: "Would you rather let your partner pick a swinger couple for you both to swap with or agree to a femdom scene where they peg you while you're blindfolded?",
    options: ["Swinger swap", "Pegged blindfolded"],
    score: 1,
    nsfwRating: 11,
    categories: ["sex", "swingers", "femdom", "couple"]
  },
  {
    id: "tot-new-905",
    text: "Would you rather share a fantasy with your partner about you both being watched while you fuck in a club or one where you're both fingering each other under a table at a friend's dinner party?",
    options: ["Club watching", "Dinner party fingering"],
    score: 1,
    nsfwRating: 11,
    categories: ["sex", "exhibitionism", "sharing", "couple"]
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

  // Additional "This or That" questions from revision
  {
    id: "tot-new-1101",
    text: "Would you rather always send texts with typos or always accidentally reply-all?",
    options: ["Always typo", "Always reply-all"],
    score: 1,
    nsfwRating: 1,
    categories: ["social", "technology", "communication"]
  },
  {
    id: "tot-new-1102",
    text: "Would you rather accidentally like your crush's ancient post or accidentally follow, unfollow, and follow them again?",
    options: ["Like ancient post", "Follow loop of shame"],
    score: 1,
    nsfwRating: 1,
    categories: ["social", "dating", "technology"]
  },
  {
    id: "tot-new-1103",
    text: "Would you rather your Google search history be public or your photo gallery?",
    options: ["Search history", "Photo gallery"],
    score: 1,
    nsfwRating: 1,
    categories: ["privacy", "technology", "personal"]
  },
  {
    id: "tot-new-1104",
    text: "Would you rather go on a date with someone who talks only in motivational quotes or someone who only sends voice notes?",
    options: ["Quotes machine", "Voice note enthusiast"],
    score: 1,
    nsfwRating: 1,
    categories: ["dating", "communication", "humor"]
  },
  {
    id: "tot-new-1105",
    text: "Would you rather get ghosted after one date or be stuck in an endless \"what are we?\" loop?",
    options: ["Ghosted", "Situationship purgatory"],
    score: 1,
    nsfwRating: 1,
    categories: ["dating", "relationships", "communication"]
  },
  {
    id: "tot-new-1106",
    text: "Would you rather date someone who replies \"k\" or someone who types \"hehe\" unironically?",
    options: ["'k' texter", "'hehe' user"],
    score: 1,
    nsfwRating: 1,
    categories: ["dating", "communication", "texting"]
  },
  {
    id: "tot-new-1107",
    text: "Would you rather always have spinach in your teeth on dates or toilet paper stuck to your shoe?",
    options: ["Spinach smile", "Toilet paper trail"],
    score: 1,
    nsfwRating: 1,
    categories: ["dating", "embarrassment", "humor"]
  },
  {
    id: "tot-new-2101",
    text: "Would you rather accidentally text \"I love you\" to your situationship or drunk call your ex?",
    options: ["Text situationship", "Call the ex"],
    score: 1,
    nsfwRating: 2,
    categories: ["relationships", "communication", "awkward"]
  },
  {
    id: "tot-new-2102",
    text: "Would you rather be caught stalking your ex's new partner or caught rewatching your own Instagram story 12 times?",
    options: ["Caught stalking", "Caught looping my own story"],
    score: 1,
    nsfwRating: 2,
    categories: ["social", "relationships", "technology"]
  },
  {
    id: "tot-new-2103",
    text: "Would you rather have your partner call you by their ex's name once, or you accidentally call them by yours?",
    options: ["They mess up", "I mess up"],
    score: 1,
    nsfwRating: 2,
    categories: ["relationships", "awkward", "communication"]
  },
  {
    id: "tot-new-2104",
    text: "Would you rather get a text from your crush saying \"wrong number\" or a Venmo request from your date for your half?",
    options: ["Wrong number crush", "Date Venmo request"],
    score: 1,
    nsfwRating: 2,
    categories: ["dating", "awkward", "money"]
  },
  {
    id: "tot-new-2105",
    text: "Would you rather have a Hinge bio written by your mom or your most sarcastic friend?",
    options: ["Mom-made bio", "Snarky friend bio"],
    score: 1,
    nsfwRating: 2,
    categories: ["dating", "social", "humor"]
  },
  {
    id: "tot-new-2106",
    text: "Would you rather your partner never posts you or posts cringe couple content daily?",
    options: ["Never posts me", "Cringe couple goals"],
    score: 1,
    nsfwRating: 2,
    categories: ["relationships", "social", "technology"]
  },
  {
    id: "tot-new-2107",
    text: "Would you rather accidentally send a flirty text to your boss or a work complaint to your crush?",
    options: ["Flirty boss text", "Crush gets my 9-5 rant"],
    score: 1,
    nsfwRating: 2,
    categories: ["work", "dating", "awkward"]
  },
  {
    id: "tot-new-3101",
    text: "Would you rather date someone who insists on baby talk or someone who moans when they eat?",
    options: ["Baby talker", "Food moaner"],
    score: 1,
    nsfwRating: 3,
    categories: ["dating", "habits", "pet peeves"]
  },
  {
    id: "tot-new-3102",
    text: "Would you rather have a hot one-night stand or an average-looking long-term cuddle buddy?",
    options: ["Hot one-nighter", "Cuddle bae forever"],
    score: 1,
    nsfwRating: 3,
    categories: ["dating", "intimacy", "preferences"]
  },
  {
    id: "tot-new-3103",
    text: "Would you rather always get caught sexting or always get caught snooping?",
    options: ["Caught sexting", "Caught snooping"],
    score: 1,
    nsfwRating: 3,
    categories: ["relationships", "privacy", "technology"]
  },
  {
    id: "tot-new-3104",
    text: "Would you rather make out with your ex at a party or watch your ex make out with someone hotter?",
    options: ["Make out with ex", "Watch them upgrade"],
    score: 1,
    nsfwRating: 3,
    categories: ["relationships", "jealousy", "social"]
  },
  {
    id: "tot-new-3105",
    text: "Would you rather send a risky DM and get left on read or accidentally like a 2016 thirst trap?",
    options: ["Left on read", "Thirst trap like"],
    score: 1,
    nsfwRating: 3,
    categories: ["social", "dating", "technology"]
  },
  {
    id: "tot-new-3106",
    text: "Would you rather hook up with someone who's too quiet or way too vocal?",
    options: ["Pin-drop silence", "Over-the-top moans"],
    score: 1,
    nsfwRating: 3,
    categories: ["sex", "intimacy", "preferences"]
  },
  {
    id: "tot-new-3107",
    text: "Would you rather always say something awkward during foreplay or accidentally call them \"bro\"?",
    options: ["Awkward line", "Hey bro 👀"],
    score: 1,
    nsfwRating: 3,
    categories: ["sex", "awkward", "communication"]
  },
  {
    id: "tot-new-3108",
    text: "Would you rather only have pillow talk or only hookup with zero talking at all?",
    options: ["Only pillow talk", "Silent but spicy"],
    score: 1,
    nsfwRating: 3,
    categories: ["sex", "intimacy", "communication"]
  },
  {
    id: "tot-new-3109",
    text: "Would you rather date someone who only sexts with emojis or someone who uses corporate jargon in bed?",
    options: ["🍆💦🔥 only", "'Let's circle back' in bed"],
    score: 1,
    nsfwRating: 3,
    categories: ["dating", "sex", "communication"]
  },
  {
    id: "tot-new-3110",
    text: "Would you rather date someone who never makes the first move or someone who always makes the *wrong* move?",
    options: ["Never initiates", "Wrong move champ"],
    score: 1,
    nsfwRating: 3,
    categories: ["dating", "intimacy", "compatibility"]
  },
  {
    id: "tot-new-4101",
    text: "Would you rather your nudes get leaked or your entire group chat screenshots?",
    options: ["Leaked nudes", "Leaked group chat"],
    score: 1,
    nsfwRating: 4,
    categories: ["privacy", "social", "technology"]
  },
  {
    id: "tot-new-4102",
    text: "Would you rather sleep with your ex's best friend or your best friend's ex?",
    options: ["Ex's bestie", "Bestie's ex"],
    score: 1,
    nsfwRating: 4,
    categories: ["sex", "relationships", "friendship"]
  },
  {
    id: "tot-new-4103",
    text: "Would you rather hook up with someone who cries after or someone who high-fives you after?",
    options: ["Cries after", "High-fives after"],
    score: 1,
    nsfwRating: 4,
    categories: ["sex", "awkward", "humor"]
  },
  {
    id: "tot-new-4104",
    text: "Would you rather be amazing at foreplay but terrible at sex, or vice versa?",
    options: ["Foreplay legend", "Sex god, bad build-up"],
    score: 1,
    nsfwRating: 4,
    categories: ["sex", "abilities", "preferences"]
  },
  {
    id: "tot-new-4105",
    text: "Would you rather accidentally send a \"thinking of you\" text to your boss or your ex's mom?",
    options: ["Boss", "Ex's mom"],
    score: 1,
    nsfwRating: 4,
    categories: ["work", "relationships", "awkward"]
  },
  {
    id: "tot-new-4106",
    text: "Would you rather fall asleep mid-hookup or have them fall asleep on you (literally)?",
    options: ["I fall asleep", "They nap on me"],
    score: 1,
    nsfwRating: 4,
    categories: ["sex", "awkward", "humor"]
  },
  {
    id: "tot-new-4107",
    text: "Would you rather be rated 10/10 in bed but 3/10 in emotional availability or vice versa?",
    options: ["10 in bed, 3 in feels", "10 in feels, 3 in bed"],
    score: 1,
    nsfwRating: 4,
    categories: ["sex", "relationships", "compatibility"]
  },
  {
    id: "tot-new-4108",
    text: "Would you rather date someone with an annoying sex playlist or someone who insists on silence?",
    options: ["Bad playlist", "Silent sessions"],
    score: 1,
    nsfwRating: 4,
    categories: ["sex", "dating", "preferences"]
  },
  {
    id: "tot-new-4109",
    text: "Would you rather sext while your mom follows you on Instagram or while she's sitting in the next room?",
    options: ["While she follows me", "While she's nearby"],
    score: 1,
    nsfwRating: 4,
    categories: ["sex", "family", "social"]
  },
  {
    id: "tot-new-4110",
    text: "Would you rather always be asked for feedback after sex or get ghosted every time after?",
    options: ["Feedback survey", "The classic ghost"],
    score: 1,
    nsfwRating: 4,
    categories: ["sex", "dating", "communication"]
  },
  {
    id: "tot-new-5101",
    text: "Would you rather walk in on your parents or have them walk in on you?",
    options: ["Walk in on them", "They walk in on you"],
    score: 1,
    nsfwRating: 5,
    categories: ["family", "sex", "embarrassment"]
  },
  {
    id: "tot-new-5102",
    text: "Would you rather drunk-text your sneaky link or voice note your crush at 3AM?",
    options: ["Drunk text", "3AM voice note"],
    score: 1,
    nsfwRating: 5,
    categories: ["dating", "communication", "awkward"]
  },
  {
    id: "tot-new-5103",
    text: "Would you rather hook up with someone who only talks in quotes or only roleplays as historical figures?",
    options: ["Quote machine", "Horny Napoleon"],
    score: 1,
    nsfwRating: 5,
    categories: ["sex", "roleplay", "humor"]
  },
  {
    id: "tot-new-5104",
    text: "Would you rather have a kink you're ashamed of go viral or accidentally expose your search history during a Zoom call?",
    options: ["Kink goes viral", "Zoom share fail"],
    score: 1,
    nsfwRating: 5,
    categories: ["sex", "privacy", "technology"]
  },
  {
    id: "tot-new-5105",
    text: "Would you rather date someone who always says your name mid-hookup or who moans their own name instead?",
    options: ["My name", "THEIR name"],
    score: 1,
    nsfwRating: 5,
    categories: ["sex", "dating", "humor"]
  },
  {
    id: "tot-new-5106",
    text: "Would you rather be celibate for a year or only have bad sex with a toxic ex?",
    options: ["Celibate monk", "Toxic ex reunion"],
    score: 1,
    nsfwRating: 5,
    categories: ["sex", "relationships", "choices"]
  },
  {
    id: "tot-new-5107",
    text: "Would you rather get roasted in a group chat post-hookup or get a LinkedIn message from a one-night stand?",
    options: ["Group chat roast", "LinkedIn follow-up"],
    score: 1,
    nsfwRating: 5,
    categories: ["sex", "social", "work"]
  },
  {
    id: "tot-new-5108",
    text: "Would you rather be kink-shamed publicly or accidentally kink-shame someone on a date?",
    options: ["I get shamed", "I do the shaming"],
    score: 1,
    nsfwRating: 5,
    categories: ["sex", "social", "dating"]
  },
  {
    id: "tot-new-5109",
    text: "Would you rather every hookup be with someone who needs constant affirmations or constant narrations?",
    options: ["Affirmation addict", "Narrator in the sheets"],
    score: 1,
    nsfwRating: 5,
    categories: ["sex", "communication", "preferences"]
  },
  {
    id: "tot-new-5110",
    text: "Would you rather get turned on during a work meeting or during a family event?",
    options: ["Work meeting", "Family chaos"],
    score: 1,
    nsfwRating: 5,
    categories: ["sex", "work", "family"]
  },
  {
    id: "tot-new-6101",
    text: "Would you rather always finish too early or never finish at all?",
    options: ["Speed run", "Eternal edging"],
    score: 1,
    nsfwRating: 6,
    categories: ["sex", "performance", "preferences"]
  },
  {
    id: "tot-new-6102",
    text: "Would you rather your sex tape leak or accidentally upload it to your work cloud?",
    options: ["Sex tape goes viral", "Company All-Hands exclusive"],
    score: 1,
    nsfwRating: 6,
    categories: ["sex", "privacy", "work"]
  },
  {
    id: "tot-new-6103",
    text: "Would you rather find your friend's OnlyFans or your sibling's?",
    options: ["Friend's OF", "Sibling's OF"],
    score: 1,
    nsfwRating: 6,
    categories: ["sex", "friendship", "family"]
  },
  {
    id: "tot-new-6104",
    text: "Would you rather only have sex to the sound of ASMR or wrestling commentary?",
    options: ["ASMR moans", "WWE dirty talk"],
    score: 1,
    nsfwRating: 6,
    categories: ["sex", "preferences", "humor"]
  },
  {
    id: "tot-new-6105",
    text: "Would you rather get walked in on by a pet or have the pet *join* on the bed?",
    options: ["Walk-in pet", "Too-comfy pet"],
    score: 1,
    nsfwRating: 6,
    categories: ["sex", "pets", "awkward"]
  },
  {
    id: "tot-new-6106",
    text: "Would you rather find out your partner's into feet or into clowns?",
    options: ["Toes for days", "Honk honk kink"],
    score: 1,
    nsfwRating: 6,
    categories: ["sex", "kink", "relationships"]
  },
  {
    id: "tot-new-6107",
    text: "Would you rather hook up with someone obsessed with mirror play or one who insists on costumes?",
    options: ["Mirror junkie", "Costume freak"],
    score: 1,
    nsfwRating: 6,
    categories: ["sex", "kink", "preferences"]
  },
  {
    id: "tot-new-6108",
    text: "Would you rather do roleplay but it's always as your boss, or your high school teacher?",
    options: ["Bossy roleplay", "Homework kink"],
    score: 1,
    nsfwRating: 6,
    categories: ["sex", "roleplay", "fantasies"]
  },
  {
    id: "tot-new-6109",
    text: "Would you rather date someone who insists on calling you \"Daddy\" or someone who calls you \"Bestie\" mid-action?",
    options: ["Daddy issues", "Bestie energy"],
    score: 1,
    nsfwRating: 6,
    categories: ["sex", "dating", "communication"]
  },
  {
    id: "tot-new-6110",
    text: "Would you rather discover your partner used to be a cam model or currently has a secret OnlyFans?",
    options: ["Used to be", "Still going strong"],
    score: 1,
    nsfwRating: 6,
    categories: ["sex", "relationships", "secrets"]
  },
  {
    id: "tot-new-7101",
    text: "Would you rather be called \"Daddy\" during sex or accidentally call *them* \"Mommy\"?",
    options: ["Get the Daddy treatment", "Oops, Mommy slipped out"],
    score: 1,
    nsfwRating: 7,
    categories: ["sex", "kink", "embarrassment"]
  },
  {
    id: "tot-new-7102",
    text: "Would you rather your sexts leak or your Google search history from incognito?",
    options: ["Sexts leak", "Search history goes public"],
    score: 1,
    nsfwRating: 7,
    categories: ["sex", "privacy", "technology"]
  },
  {
    id: "tot-new-7103",
    text: "Would you rather be choked or do the choking?",
    options: ["Choke me", "I'll do the choking"],
    score: 1,
    nsfwRating: 7,
    categories: ["sex", "kink", "preferences"]
  },
  {
    id: "tot-new-7104",
    text: "Would you rather sleep with your ex again or their best friend?",
    options: ["Ex 2.0", "Best friend revenge"],
    score: 1,
    nsfwRating: 7,
    categories: ["sex", "relationships", "revenge"]
  },
  {
    id: "tot-new-7105",
    text: "Would you rather be filmed without knowing or watch your partner's past tape?",
    options: ["Unknowingly filmed", "Watch their tape"],
    score: 1,
    nsfwRating: 7,
    categories: ["sex", "privacy", "relationships"]
  },
  {
    id: "tot-new-7106",
    text: "Would you rather moan too loud in public or say something filthy in your sleep at a family sleepover?",
    options: ["Public moan", "Sleepover confession"],
    score: 1,
    nsfwRating: 7,
    categories: ["sex", "embarrassment", "public"]
  },
  {
    id: "tot-new-7107",
    text: "Would you rather have a partner who's too quiet or way too loud in bed?",
    options: ["Mute mode", "Full surround sound"],
    score: 1,
    nsfwRating: 7,
    categories: ["sex", "relationships", "preferences"]
  },
  {
    id: "tot-new-7108",
    text: "Would you rather only have car sex or only public restroom sex for a year?",
    options: ["Car adventures", "Restroom rendezvous"],
    score: 1,
    nsfwRating: 7,
    categories: ["sex", "public", "preferences"]
  },
  {
    id: "tot-new-7109",
    text: "Would you rather get caught sexting at work or catch your boss doing it?",
    options: ["Caught red-thumbed", "Boss gone wild"],
    score: 1,
    nsfwRating: 7,
    categories: ["sex", "work", "technology"]
  },
  {
    id: "tot-new-7110",
    text: "Would you rather never use toys again or only use toys from the 90s?",
    options: ["No toys ever", "Retro weirdness only"],
    score: 1,
    nsfwRating: 7,
    categories: ["sex", "preferences", "toys"]
  },
  {
    id: "tot-new-8101",
    text: "Would you rather be handcuffed for a night or blindfolded for a weekend?",
    options: ["Handcuffed", "Blindfolded"],
    score: 1,
    nsfwRating: 8,
    categories: ["sex", "kink", "bondage"]
  },
  {
    id: "tot-new-8102",
    text: "Would you rather sleep with someone in cosplay or someone who stays fully clothed?",
    options: ["Cosplay commitment", "Fully clothed freak"],
    score: 1,
    nsfwRating: 8,
    categories: ["sex", "kink", "preferences"]
  },
  {
    id: "tot-new-8103",
    text: "Would you rather be spanked in public or send a spanking video to your parents by mistake?",
    options: ["Public spanking", "Parental trauma"],
    score: 1,
    nsfwRating: 8,
    categories: ["sex", "kink", "public"]
  },
  {
    id: "tot-new-8104",
    text: "Would you rather have a foot fetish or be with someone who moans like a cartoon character?",
    options: ["Foot enthusiast", "Toon moaner"],
    score: 1,
    nsfwRating: 8,
    categories: ["sex", "kink", "preferences"]
  },
  {
    id: "tot-new-8105",
    text: "Would you rather hook up on your office desk or your childhood bed?",
    options: ["Office desk", "Childhood bed nostalgia"],
    score: 1,
    nsfwRating: 8,
    categories: ["sex", "work", "nostalgia"]
  },
  {
    id: "tot-new-8106",
    text: "Would you rather only do kink with a safe word in Latin or never use a safe word again?",
    options: ["Latin safe word", "No safe word ever"],
    score: 1,
    nsfwRating: 8,
    categories: ["sex", "kink", "safety"]
  },
  {
    id: "tot-new-8107",
    text: "Would you rather sext someone you shouldn't or receive a nude from a relative by mistake?",
    options: ["Risky sext", "Family nude horror"],
    score: 1,
    nsfwRating: 8,
    categories: ["sex", "family", "technology"]
  },
  {
    id: "tot-new-8108",
    text: "Would you rather wear latex for a week or explain your kinks to your parents?",
    options: ["Latex life", "The kink talk"],
    score: 1,
    nsfwRating: 8,
    categories: ["sex", "kink", "family"]
  },
  {
    id: "tot-new-8109",
    text: "Would you rather only do threesomes with strangers or never have sex again?",
    options: ["Stranger threesomes", "Forced celibacy"],
    score: 1,
    nsfwRating: 8,
    categories: ["sex", "threesomes", "choices"]
  },
  {
    id: "tot-new-8110",
    text: "Would you rather get stuck in your partner's restraints or theirs in yours — with the in-laws walking in?",
    options: ["Stuck in theirs", "They're stuck in mine"],
    score: 1,
    nsfwRating: 8,
    categories: ["sex", "kink", "family"]
  },
  {
    id: "tot-new-9101",
    text: "Would you rather date someone with a humiliation kink or a financial domination kink?",
    options: ["Humiliation kink", "Fyndom freak"],
    score: 1,
    nsfwRating: 9,
    categories: ["sex", "kink", "dating"]
  },
  {
    id: "tot-new-9102",
    text: "Would you rather roleplay as a submissive pet or a strict principal?",
    options: ["Pet play", "School discipline"],
    score: 1,
    nsfwRating: 9,
    categories: ["sex", "roleplay", "kink"]
  },
  {
    id: "tot-new-9103",
    text: "Would you rather get caught mid-threesome or be the accidental third in someone else's?",
    options: ["Get caught mid-thruple", "Walk in, join in"],
    score: 1,
    nsfwRating: 9,
    categories: ["sex", "threesomes", "awkward"]
  },
  {
    id: "tot-new-9104",
    text: "Would you rather use whipped cream or candle wax... in front of an audience?",
    options: ["Whipped cream show", "Wax performance"],
    score: 1,
    nsfwRating: 9,
    categories: ["sex", "kink", "exhibitionism"]
  },
  {
    id: "tot-new-9105",
    text: "Would you rather dominate your boss or be dominated by an intern?",
    options: ["Boss domination", "Intern in charge"],
    score: 1,
    nsfwRating: 9,
    categories: ["sex", "work", "power"]
  },
  {
    id: "tot-new-9106",
    text: "Would you rather hook up with someone dressed as a clown or a furry?",
    options: ["Clown love", "Fluffy furry fun"],
    score: 1,
    nsfwRating: 9,
    categories: ["sex", "kink", "costume"]
  },
  {
    id: "tot-new-9107",
    text: "Would you rather reenact a spicy scene from a rom-com or a horror movie?",
    options: ["Rom-com kink", "Horror play"],
    score: 1,
    nsfwRating: 9,
    categories: ["sex", "roleplay", "entertainment"]
  },
  {
    id: "tot-new-9108",
    text: "Would you rather be filmed in VR POV or stream to OnlyFans live?",
    options: ["VR star", "OnlyFans live drop"],
    score: 1,
    nsfwRating: 9,
    categories: ["sex", "technology", "exhibitionism"]
  },
  {
    id: "tot-new-9109",
    text: "Would you rather have a kink that requires props or one that requires public risk?",
    options: ["Prop-heavy kink", "Public danger kink"],
    score: 1,
    nsfwRating: 9,
    categories: ["sex", "kink", "preferences"]
  },
  {
    id: "tot-new-9110",
    text: "Would you rather have your sex life narrated by Morgan Freeman or your mom?",
    options: ["Morgan Freeman commentary", "Mom's monologue"],
    score: 1,
    nsfwRating: 9,
    categories: ["sex", "humor", "family"]
  },
  {
    id: "tot-new-10101",
    text: "Would you rather wear a vibrating plug at a family dinner or let your partner read your sexts out loud there?",
    options: ["Plug dinner", "Sext storytelling"],
    score: 1,
    nsfwRating: 10,
    categories: ["sex", "family", "public"]
  },
  {
    id: "tot-new-10102",
    text: "Would you rather be in a polycule with your ex and their new partner or be their babysitter?",
    options: ["Ex polycule", "Babysitter from hell"],
    score: 1,
    nsfwRating: 10,
    categories: ["sex", "relationships", "polyamory"]
  },
  {
    id: "tot-new-10103",
    text: "Would you rather be waterboarded by whipped cream or ice cubes in the butt?",
    options: ["Whipped cream waterboarding", "Chilly cheeks"],
    score: 1,
    nsfwRating: 10,
    categories: ["sex", "kink", "temperature"]
  },
  {
    id: "tot-new-10104",
    text: "Would you rather go viral for a sex fail or win an award for amateur porn?",
    options: ["Sex fail fame", "Amateur Oscar"],
    score: 1,
    nsfwRating: 10,
    categories: ["sex", "fame", "social"]
  },
  {
    id: "tot-new-10105",
    text: "Would you rather only orgasm to the national anthem or to your ex's name?",
    options: ["Anthem climax", "Ex-powered O"],
    score: 1,
    nsfwRating: 10,
    categories: ["sex", "ex", "fetish"]
  },
  {
    id: "tot-new-10106",
    text: "Would you rather date someone whose kink is taxes or who cries every orgasm?",
    options: ["Tax kink", "Teargasm every time"],
    score: 1,
    nsfwRating: 10,
    categories: ["sex", "kink", "dating"]
  },
  {
    id: "tot-new-10107",
    text: "Would you rather host a public BDSM workshop or join one where your parents attend?",
    options: ["Lead the workshop", "Mom and Dad join"],
    score: 1,
    nsfwRating: 10,
    categories: ["sex", "bdsm", "family"]
  },
  {
    id: "tot-new-10108",
    text: "Would you rather get a tattoo of your most used kink or send your therapist screenshots of it?",
    options: ["Kink tattoo", "Therapist drop"],
    score: 1,
    nsfwRating: 10,
    categories: ["sex", "kink", "therapy"]
  },
  {
    id: "tot-new-10109",
    text: "Would you rather your nudes be displayed in Times Square or printed in your alumni newsletter?",
    options: ["Times Square debut", "Alumni exclusive"],
    score: 1,
    nsfwRating: 10,
    categories: ["sex", "public", "embarrassment"]
  },
  {
    id: "tot-new-10110",
    text: "Would you rather be stuck in a sex swing during an earthquake or on a stripper pole during a fire drill?",
    options: ["Sex swing quake", "Pole drill exit"],
    score: 1,
    nsfwRating: 10,
    categories: ["sex", "emergency", "awkward"]
  },
  
  // Additional This or That questions from latest revision
  {
    id: "tot-new-5111",
    text: "Would you rather your Instagram explore page be shown to your entire family or your screen time shared with your crush?",
    options: ["Family sees explore page", "Crush sees screen time"],
    score: 1,
    nsfwRating: 5,
    categories: ["social", "technology", "privacy"]
  },
  {
    id: "tot-new-5112",
    text: "Would you rather get added to your ex's family WhatsApp group or accidentally like your manager's beach thirst trap?",
    options: ["Ex's family group chat", "Manager's thirst trap like"],
    score: 1,
    nsfwRating: 5,
    categories: ["social", "work", "awkward"]
  },
  {
    id: "tot-new-5113",
    text: "Would you rather send a typo-laced 3AM rant to your boss or accidentally post your Notes app breakdown to your story?",
    options: ["3AM boss rant", "Notes app meltdown post"],
    score: 1,
    nsfwRating: 5,
    categories: ["work", "social", "technology"]
  },
  {
    id: "tot-new-5114",
    text: "Would you rather your phone screen mirror onto a public display for 10 minutes or send your group chat history to your boss?",
    options: ["Public phone mirror", "Boss gets the GC tea"],
    score: 1,
    nsfwRating: 5,
    categories: ["privacy", "technology", "work"]
  },
  {
    id: "tot-new-5115",
    text: "Would you rather always reply to texts with voice notes or only use Comic Sans in all work emails?",
    options: ["Voice note gremlin", "Comic Sans menace"],
    score: 1,
    nsfwRating: 5,
    categories: ["communication", "work", "technology"]
  },
  {
    id: "tot-new-5116",
    text: "Would you rather have your parents read your diary or your crush read your therapy notes?",
    options: ["Parents read diary", "Crush gets therapist scoop"],
    score: 1,
    nsfwRating: 5,
    categories: ["family", "privacy", "dating"]
  },
  {
    id: "tot-new-5117",
    text: "Would you rather get roasted at your own wedding or give a TED Talk on your biggest failure?",
    options: ["Wedding roast", "Failure TED Talk"],
    score: 1,
    nsfwRating: 5,
    categories: ["social", "public", "embarrassment"]
  },
  {
    id: "tot-new-5118",
    text: "Would you rather have to end every sentence with \"allegedly\" or start every sentence with \"No offense, but…\"?",
    options: ["'Allegedly' forever", "Constant 'No offense'"],
    score: 1,
    nsfwRating: 5,
    categories: ["communication", "social", "humor"]
  },
  {
    id: "tot-new-5119",
    text: "Would you rather only communicate through memes or only speak in song lyrics for a year?",
    options: ["Meme talk", "Lyric life"],
    score: 1,
    nsfwRating: 5,
    categories: ["communication", "social", "humor"]
  },
  {
    id: "tot-new-5120",
    text: "Would you rather go viral for crying on a reality show or be a meme for a weird laugh?",
    options: ["Crying reality star", "Weird laugh meme"],
    score: 1,
    nsfwRating: 5,
    categories: ["social", "fame", "embarrassment"]
  },
  {
    id: "tot-new-6111",
    text: "Would you rather have your worst hot take trend on Twitter or your deepest insecurity become a subreddit?",
    options: ["Hot take exposed", "Insecurity subreddit"],
    score: 1,
    nsfwRating: 6,
    categories: ["social", "privacy", "technology"]
  },
  {
    id: "tot-new-6112",
    text: "Would you rather your high school ex write your wedding vows or your most judgmental aunt plan your honeymoon?",
    options: ["Ex writes vows", "Aunt's honeymoon plans"],
    score: 1,
    nsfwRating: 6,
    categories: ["relationships", "family", "wedding"]
  },
  {
    id: "tot-new-6113",
    text: "Would you rather accidentally like your ex's new partner's 2014 selfie or send a flirty emoji to your CEO?",
    options: ["Like their old pic", "Flirt with CEO"],
    score: 1,
    nsfwRating: 6,
    categories: ["social", "work", "technology"]
  },
  {
    id: "tot-new-6114",
    text: "Would you rather only wear crocs with socks to every formal event or have to wear your partner's baby photo on a locket?",
    options: ["Crocs at weddings", "Baby face locket"],
    score: 1,
    nsfwRating: 6,
    categories: ["fashion", "relationships", "social"]
  },
  {
    id: "tot-new-6115",
    text: "Would you rather go to a therapist who knew you in high school or get therapy from your nemesis?",
    options: ["Therapist from high school", "Nemesis therapist"],
    score: 1,
    nsfwRating: 6,
    categories: ["mental health", "relationships", "awkward"]
  },
  {
    id: "tot-new-6116",
    text: "Would you rather reveal your screen time stats on a date or share your food delivery history?",
    options: ["Screen time exposed", "Delivery shame revealed"],
    score: 1,
    nsfwRating: 6,
    categories: ["dating", "technology", "privacy"]
  },
  {
    id: "tot-new-6117",
    text: "Would you rather attend your own intervention or surprise someone else at theirs… and realize it's kinda about you too?",
    options: ["My intervention", "Hijacked theirs"],
    score: 1,
    nsfwRating: 6,
    categories: ["mental health", "relationships", "awkward"]
  },
  {
    id: "tot-new-7111",
    text: "Would you rather be reincarnated as your least favorite influencer's pet or as your sibling's child?",
    options: ["Influencer's pet", "Your sibling's kid"],
    score: 1,
    nsfwRating: 7,
    categories: ["family", "social", "fantasy"]
  },
  {
    id: "tot-new-7112",
    text: "Would you rather find out your partner is a secret lifestyle vlogger or that your parents are OnlyFans famous?",
    options: ["Partner is a vlogger", "Parents on OF"],
    score: 1,
    nsfwRating: 7,
    categories: ["relationships", "family", "technology"]
  },
  {
    id: "tot-new-7113",
    text: "Would you rather get a face tattoo of your most-used emoji or a QR code that links to your worst tweet?",
    options: ["Emoji tattoo", "QR code regret"],
    score: 1,
    nsfwRating: 7,
    categories: ["technology", "social", "permanent decisions"]
  },
  {
    id: "tot-new-7114",
    text: "Would you rather be featured in a documentary titled *\"World's Pettiest Person\"* or *\"How Not To Date\"*?",
    options: ["Pettiest Person doc", "How Not To Date star"],
    score: 1,
    nsfwRating: 7,
    categories: ["fame", "personality", "dating"]
  },
  {
    id: "tot-new-7115",
    text: "Would you rather become a motivational speaker for something you failed at or a brand ambassador for a product you hate?",
    options: ["Failure speaker", "Fake ambassador"],
    score: 1,
    nsfwRating: 7,
    categories: ["career", "ethics", "irony"]
  },
  {
    id: "tot-new-7116",
    text: "Would you rather be trapped in a group trip with all your ex-friends or attend a silent retreat with people you blocked?",
    options: ["Ex-friends group trip", "Blocked retreat"],
    score: 1,
    nsfwRating: 7,
    categories: ["social", "awkward", "relationships"]
  },
  {
    id: "tot-new-7117",
    text: "Would you rather all your arguments be auto-transcribed and emailed to your parents or auto-Tweeted live?",
    options: ["Parents get transcripts", "Twitter fight stream"],
    score: 1,
    nsfwRating: 7,
    categories: ["privacy", "family", "technology"]
  }
];

const allQuestions: Record<GameMode, GameQuestion[]> = {
  "guess-who-i-am": guessWhoIAmQuestions,
  "hot-takes": hotTakesQuestions,
  "this-or-that": thisOrThatQuestions
};

// --- Function to get questions (Exported for server use) ---
export const getQuestionsByMode = (mode: GameMode, count: number = 5, nsfwLevel: number = 1, includeExclusive: boolean = false): GameQuestion[] => {
  const questionsPool = allQuestions[mode] || [];
  
  console.log(`[getQuestionsByMode] Called with: mode=${mode}, count=${count}, nsfwLevel=${nsfwLevel}, includeExclusive=${includeExclusive}`);
  console.log(`[getQuestionsByMode] Total questions in pool for ${mode}: ${questionsPool.length}`);

  // Filter questions by NSFW level
  const filteredQuestions = includeExclusive
    ? questionsPool.filter(q => q.nsfwRating === 11) // Only get exclusive questions (rating 11)
    : questionsPool.filter(q => q.nsfwRating <= nsfwLevel); // Standard filtering (up to specified level)
    
  console.log(`[getQuestionsByMode] Filtered questions: ${filteredQuestions.length} (includeExclusive=${includeExclusive})`);
  if (includeExclusive) {
    console.log(`[getQuestionsByMode] NSFW Rating 11 questions found: ${filteredQuestions.length}`);
    // Log the first 3 questions to verify they're correct
    if (filteredQuestions.length > 0) {
      console.log(`[getQuestionsByMode] First exclusive question: ${filteredQuestions[0].id} - ${filteredQuestions[0].text.substring(0, 40)}...`);
    }
  }

  // Shuffle and pick the first 'count' questions
  // Basic Fisher-Yates shuffle
  const shuffled = [...filteredQuestions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // For exclusive mode, return all questions (or up to count if specified)
  if (includeExclusive && count === 0) {
    console.log(`[getQuestionsByMode] Returning all ${shuffled.length} exclusive questions`);
    return shuffled;
  }

  const result = shuffled.slice(0, count);
  console.log(`[getQuestionsByMode] Returning ${result.length} questions`);
  return result;
}; 