import { GameMode, GameQuestion } from './types/game';

type QuestionSpec = [
  id: string,
  nsfwRating: number,
  text: string,
  options: string[]
];

const buildQuestions = (
  specs: QuestionSpec[],
  categories: string[]
): GameQuestion[] => specs.map(([id, nsfwRating, text, options]) => ({
  id,
  text,
  options,
  score: 1,
  nsfwRating,
  categories
}));

const refreshedGuessWhoIAmQuestions = buildQuestions([
  ["gwia-refresh-001", 1, "What tiny luxury would improve my mood embarrassingly fast?", ["Fresh sheets after a long day", "Someone bringing me my exact coffee order", "Cancelling plans without consequences", "Finding money in clothes I forgot about"]],
  ["gwia-refresh-002", 2, "What role do I naturally become on a chaotic group trip?", ["The planner with six backup plans", "The missing person everyone keeps calling", "The snack supplier holding society together", "The one creating a story nobody can tell the parents"]],
  ["gwia-refresh-003", 2, "Which harmless opinion would I defend like my reputation depends on it?", ["Voice notes are better than calls", "Dessert is a valid breakfast", "Window seats are worth fighting for", "Rewatching comfort shows beats starting new ones"]],
  ["gwia-refresh-004", 3, "What kind of compliment works on me even when I know it's flirting?", ["You have dangerously good taste", "You make awkward situations fun", "You look better when you're not trying", "I never know what you'll say next"]],
  ["gwia-refresh-005", 3, "Which version of me appears after one drink?", ["The oversharer with a complete origin story", "The dance-floor politician greeting everyone", "The philosopher questioning every relationship", "The flirt who suddenly has suspicious confidence"]],
  ["gwia-refresh-006", 4, "What would I secretly enjoy being mildly famous for?", ["Dating advice I rarely follow", "A brutally honest reaction channel", "Throwing legendary house parties", "Accidentally becoming a relationship meme"]],
  ["gwia-refresh-007", 4, "Which person could convince me to break my 'I'm staying home' promise?", ["My most chaotic friend", "Someone I'm trying not to like", "An ex with suspicious timing", "Whoever says there's free food"]],
  ["gwia-refresh-008", 5, "What's my most believable 'I'm not flirting' flirting move?", ["Remembering one oddly specific detail", "Starting an unnecessary debate", "Sending a meme that's basically a confession", "Complimenting something nobody else notices"]],
  ["gwia-refresh-009", 5, "Which red flag am I most capable of explaining away when I'm attracted to someone?", ["Terrible texting but incredible chemistry", "A suspicious number of 'crazy' exes", "Flirting with everyone in the room", "Being emotionally mysterious for no reason"]],
  ["gwia-refresh-010", 6, "What truth about my dating style would my friends expose first?", ["I fall for potential, not people", "I love the chase more than the relationship", "I pretend not to care until it's too late", "One good voice can erase three red flags"]],
  ["gwia-refresh-011", 6, "Which kind of person is most dangerous for me to develop a crush on?", ["A close friend who understands everything", "A charming coworker I see daily", "Someone unavailable but clearly interested", "An ex who finally learned how to communicate"]],
  ["gwia-refresh-012", 7, "Which romantic confession would make me panic the most?", ["I've liked you since we first met", "My friends already know about you", "I deleted the apps because of you", "I can actually imagine a future with you"]],
  ["gwia-refresh-013", 7, "What would I least want a date to learn from my best friend?", ["How quickly I get attached", "What I said after our first date", "The type I claim not to have", "How many screenshots entered the group chat"]],
  ["gwia-refresh-014", 8, "Which form of jealousy would I deny until presented with screenshots?", ["Watching my crush flirt with my funniest friend", "Seeing an ex treat someone better than they treated me", "My partner having a suspiciously attractive work bestie", "Being ignored while they're visibly online"]],
  ["gwia-refresh-015", 8, "What's the boldest thing I'd do to confirm mutual attraction?", ["Ask directly and risk the silence", "Engineer a moment where we're finally alone", "Send a message with no innocent interpretation", "Let a friend reveal just enough by accident"]],
  ["gwia-refresh-016", 9, "Which consensual fantasy would appeal to me more for the psychology than the activity?", ["Giving up control to someone I trust", "Being treated like strangers meeting for one night", "Setting every rule and watching them follow", "Building anticipation all day without touching"]],
  ["gwia-refresh-017", 9, "Which intimate truth would be hardest for me to say without joking?", ["I need more reassurance than I admit", "Praise affects me more than anything physical", "I want to feel completely wanted", "Sometimes vulnerability turns me on more than confidence"]],
  ["gwia-refresh-018", 10, "Which secret would create the biggest plot twist in my friend group?", ["I once liked someone everyone considers off-limits", "Two people here have heard different versions of the same story", "I know about a hookup nobody else knows happened", "One friendship started because of a hidden crush"]],
  ["gwia-refresh-019", 10, "What would I be most afraid to discover about my own attraction patterns?", ["I only want people who keep me guessing", "Stability sometimes feels boring to me", "I confuse jealousy with chemistry", "I'm attracted to people I can't fully have"]],
  ["gwia-refresh-020", 10, "If everyone involved genuinely wanted it, which setup would tempt me most?", ["A third person chosen together", "Watching a partner flirt before coming home with me", "Being watched in a completely private setting", "A no-names roleplay where we meet as strangers"]],
  ["gwia-11", 8, "What opinion about intimacy am I most likely to defend?", ["Chemistry can be built through communication", "Great sex can't rescue a bad relationship", "Emotional safety makes experimentation better", "Sexual compatibility deserves honest discussion"]],
  ["gwia-new-8", 8, "What would I suggest first if intimacy started feeling predictable?", ["Share one fantasy each", "Change the setting completely", "Let one person plan the entire night", "Try something playful neither person has mastered"]],
  ["gwia-new-9", 10, "Which unconventional relationship experiment would I genuinely consider?", ["Negotiating a hall pass with clear boundaries", "Taking a fantasy-focused weekend together", "Trying consensual non-monogamy for a defined period", "Sharing phones only for a playful challenge, not surveillance"]],
  ["gwia-new-90", 9, "Which kind of private recording might I consensually make once?", ["A carefully staged roleplay scene", "A playful POV clip", "A mirror-focused video", "Nothing — being present is hotter than recording"]],
  ["gwia-new-124", 10, "Which consensual roleplay would I least want my friends discovering?", ["Strict authority and playful discipline", "Spy interrogation with negotiated rules", "Pet play with a trusted partner", "Performing privately while my partner watches"]],
  ["gwia-43", 3, "Which quirky habit is most likely to expose me when I think nobody's watching?", ["Making up songs about whatever I'm doing", "Practicing arguments I may never have", "Giving dramatic speeches to pets or objects", "Dancing badly while waiting for food"]]
], ["personal", "relationships", "social"]);

const refreshedHotTakesQuestions = buildQuestions([
  ["ht-refresh-001", 1, "A friendship breakup can hurt more than a romantic breakup.", ["Absolutely — friends know different parts of you", "Romance usually cuts deeper", "The length and betrayal matter more than the label"]],
  ["ht-refresh-002", 2, "Someone's behavior toward service workers reveals more than how they treat a date.", ["It's the fastest character test", "People can have one bad moment", "Patterns matter, not one interaction"]],
  ["ht-refresh-003", 2, "Being easy to talk to is more attractive than being conventionally good-looking.", ["Connection wins every time", "Attraction still opens the door", "The dangerous people usually have both"]],
  ["ht-refresh-004", 3, "Constant texting creates artificial intimacy before two people truly know each other.", ["You can build a whole fake relationship through a screen", "Texting reveals genuine compatibility", "It depends whether real-life energy matches"]],
  ["ht-refresh-005", 3, "A friend who dislikes everyone you date might understand you better than you understand yourself.", ["Friends recognize the pattern first", "They may be possessive or projecting", "Listen, but make your own mistake"]],
  ["ht-refresh-006", 4, "'Bad timing' is often a polite name for insufficient interest.", ["Interested people create space", "Timing can genuinely ruin something good", "Both can be true at once"]],
  ["ht-refresh-007", 4, "Reading old messages after a breakup delays healing more than checking social media.", ["Messages recreate intimacy", "Social media creates worse comparisons", "Both are emotional self-harm with Wi-Fi"]],
  ["ht-refresh-008", 5, "Keeping someone around because they might become relationship material is emotionally dishonest.", ["Potential isn't a promise", "Dating is literally evaluating potential", "It's dishonest only when intentions are hidden"]],
  ["ht-refresh-009", 6, "Flirting becomes cheating when you start managing what your partner is allowed to know.", ["Secrecy is the line", "Intent matters more than disclosure", "Every couple should define the line themselves"]],
  ["ht-refresh-010", 6, "A partner's insecurity deserves compassion, but not control over your choices.", ["Reassure them without surrendering autonomy", "Relationships require occasional compromises", "It depends whether the insecurity came from your behavior"]],
  ["ht-refresh-011", 7, "Fantasizing about someone else during sex is less concerning than being emotionally absent afterward.", ["Thoughts wander; behavior matters", "Your partner deserves your full presence", "Frequency and identity change the answer"]],
  ["ht-refresh-012", 8, "Consensual exhibitionism is appealing because being desired can be as exciting as the physical act.", ["Being seen is part of the fantasy", "Privacy makes intimacy hotter", "It depends completely on setting and trust"]],
  ["ht-refresh-013", 8, "People often call a fantasy 'taboo' when they really mean 'socially embarrassing but consensual.'", ["Shame exaggerates harmless preferences", "Some fantasies carry genuine ethical concerns", "Specifics matter more than labels"]],
  ["ht-refresh-014", 9, "Secure masculinity includes being comfortable with submission, vulnerability, and receiving pleasure.", ["Control has nothing to do with masculinity", "Preferences shouldn't become identity tests", "Society still punishes men for softness"]],
  ["ht-refresh-015", 10, "The most dangerous relationship is one with intense chemistry and just enough instability to feel addictive.", ["Uncertainty can imitate passion", "Chemistry deserves more credit than that", "If peace feels boring, the pattern is internal"]]
], ["opinions", "relationships", "social"]);

const refreshedThisOrThatQuestions = buildQuestions([
  ["tot-refresh-001", 1, "Would you rather always know the perfect gift or always know exactly what to say when someone is upset?", ["Perfect gifts", "Perfect comforting words"]],
  ["tot-refresh-002", 1, "Would you rather be the funniest person in every room or the person everyone trusts with secrets?", ["Funniest person", "Trusted confidant"]],
  ["tot-refresh-003", 2, "Would you rather have a friend who answers every call or one who always knows when you need space?", ["Always answers", "Always understands"]],
  ["tot-refresh-004", 2, "Would you rather relive your funniest night or erase your most embarrassing one?", ["Relive the funny night", "Erase the embarrassment"]],
  ["tot-refresh-005", 3, "Would you rather discover your crush secretly likes you or discover everyone already knew you liked them?", ["Mutual crush revealed", "Your crush exposed"]],
  ["tot-refresh-006", 3, "Would you rather have irresistible confidence with average looks or incredible looks with zero flirting ability?", ["Irresistible confidence", "Incredible looks"]],
  ["tot-refresh-007", 4, "Would you rather date someone your friends love but your family dislikes, or your family loves but your friends distrust?", ["Friends approve", "Family approves"]],
  ["tot-refresh-008", 4, "Would you rather hear the honest first impression everyone had of you or their current unfiltered opinion?", ["First impressions", "Current opinions"]],
  ["tot-refresh-009", 5, "Would you rather admit feelings and discover they aren't mutual, or never admit them and watch the person date someone else?", ["Risk rejection", "Stay silent"]],
  ["tot-refresh-010", 5, "Would you rather receive closure from an ex or an apology from a former best friend?", ["Closure from ex", "Friend's apology"]],
  ["tot-refresh-011", 6, "Would you rather date someone who challenges you but drains you, or comforts you but never pushes you?", ["Challenging chemistry", "Comfortable stability"]],
  ["tot-refresh-012", 6, "Would you rather know every lie your partner told or every truth they chose not to share?", ["Every lie", "Every omitted truth"]],
  ["tot-refresh-013", 7, "Would you rather discover a friend once had feelings for you or that you once missed an obvious chance with them?", ["Their hidden feelings", "Your missed chance"]],
  ["tot-refresh-014", 7, "Would you rather have incredible chemistry with someone emotionally unavailable or average chemistry with someone completely ready?", ["Incredible but unavailable", "Average but ready"]],
  ["tot-refresh-015", 8, "Would you rather your crush hear your friends discussing them or read the notes-app draft you wrote after your first date?", ["Friend-group analysis", "Notes-app confession"]],
  ["tot-refresh-016", 8, "Would you rather reveal who in the room is most attractive to you or who you trust least?", ["Reveal attraction", "Reveal distrust"]],
  ["tot-refresh-017", 9, "Would you rather let your partner choose a fantasy for you both or reveal one you've never told anyone?", ["They choose", "You confess"]],
  ["tot-refresh-018", 9, "Would you rather be teased all evening before anything happens or have the tension break the moment you're alone?", ["All-evening anticipation", "Immediate payoff"]],
  ["tot-refresh-019", 10, "Would you rather watch your partner be openly desired at a party or know someone has been privately messaging them?", ["Public attention", "Private messages"]],
  ["tot-refresh-020", 10, "Would you rather tell your partner exactly who else you've fantasized about or hear their completely honest answer first?", ["Confess first", "Hear theirs first"]]
], ["relationships", "choices", "social"]);

const refreshedExclusiveQuestions = buildQuestions([
  ["tot-exclusive-refresh-001", 11, "Would you rather invite a third person you both know or someone neither of you will ever see again?", ["Someone you know", "Complete stranger"]],
  ["tot-exclusive-refresh-002", 11, "Would you rather watch your partner flirt all night before choosing you, or have them watch you do the same?", ["Watch them flirt", "Be watched flirting"]],
  ["tot-exclusive-refresh-003", 11, "Would you rather reveal your most specific fantasy or hear your partner's without being allowed to react immediately?", ["Reveal yours", "Hear theirs silently"]],
  ["tot-exclusive-refresh-004", 11, "Would you rather give complete control to someone you trust or have complete control while carrying all the responsibility?", ["Surrender control", "Take control"]],
  ["tot-exclusive-refresh-005", 11, "Would you rather be watched by your partner in private or watch them perform only for you?", ["Be watched", "Watch them"]],
  ["tot-exclusive-refresh-006", 11, "Would you rather try consensual non-monogamy once with strict rules or keep it permanently as a fantasy?", ["Try it once", "Keep it fantasy-only"]],
  ["tot-exclusive-refresh-007", 11, "Would you rather let your partner read your private fantasy list or your honest ranking of past chemistry?", ["Fantasy list", "Chemistry ranking"]],
  ["tot-exclusive-refresh-008", 11, "Would you rather spend a night roleplaying as strangers or roleplaying a power dynamic you've never admitted liking?", ["Strangers", "Hidden power dynamic"]],
  ["tot-exclusive-refresh-009", 11, "Would you rather choose the third person while your partner sets the rules, or let your partner choose while you set them?", ["You choose person", "You choose rules"]],
  ["tot-exclusive-refresh-010", 11, "Would you rather admit you've fantasized about someone in your social circle or learn that your partner has?", ["Admit yours", "Learn theirs"]],
  ["tot-exclusive-refresh-011", 11, "Would you rather hear exactly what your partner wants more of or exactly what they sometimes pretend to enjoy?", ["What they want", "What they pretend"]],
  ["tot-exclusive-refresh-012", 11, "Would you rather attend a private, consent-focused kink party together or create your own fantasy night at home?", ["Private party", "At-home fantasy"]],
  ["tot-exclusive-refresh-013", 11, "Would you rather be unable to touch for an entire evening or be allowed to touch but not kiss?", ["No touching", "No kissing"]],
  ["tot-exclusive-refresh-014", 11, "Would you rather record one private scene together or exchange audio descriptions of your fantasies?", ["Private recording", "Fantasy audio"]],
  ["tot-exclusive-refresh-015", 11, "Would you rather let your partner choose your outfit and role for the night or choose theirs?", ["They choose yours", "You choose theirs"]],
  ["tot-exclusive-refresh-016", 11, "Would you rather explore something you've wanted for years or something your partner has secretly wanted?", ["Your fantasy", "Their fantasy"]],
  ["tot-exclusive-refresh-017", 11, "Would you rather know which of your friends your partner finds most attractive or which ex they remember most vividly?", ["Attractive friend", "Memorable ex"]],
  ["tot-exclusive-refresh-018", 11, "Would you rather have one rule-free fantasy conversation or one question your partner must answer with complete honesty?", ["Fantasy conversation", "One guaranteed truth"]],
  ["tot-exclusive-refresh-019", 11, "Would you rather discover your partner's fantasy is more adventurous than yours or much more emotionally intimate?", ["More adventurous", "More intimate"]],
  ["tot-exclusive-refresh-020", 11, "Would you rather share an experience that permanently changes your boundaries or keep wondering whether you would have loved it?", ["Explore together", "Keep wondering"]]
], ["sex", "relationships", "consent"]);

const retiredIds: Record<GameMode, Set<string>> = {
  "guess-who-i-am": new Set([
    "gwia-1", "gwia-5", "gwia-11", "gwia-17", "gwia-20", "gwia-21",
    "gwia-43",
    "gwia-new-8", "gwia-new-9", "gwia-new-90", "gwia-new-101",
    "gwia-new-102", "gwia-new-103", "gwia-new-104", "gwia-new-105",
    "gwia-new-106", "gwia-new-107", "gwia-new-108", "gwia-new-109",
    "gwia-new-110", "gwia-new-115", "gwia-new-116", "gwia-new-118",
    "gwia-new-119", "gwia-new-120", "gwia-new-121", "gwia-new-122",
    "gwia-new-124", "gwia-new-127"
  ]),
  "hot-takes": new Set([
    "ht-4", "ht-10", "ht-16", "ht-17", "ht-18", "ht-20",
    "ht-new-7", "ht-new-18", "ht-new-22", "ht-new-25", "ht-new-26",
    "ht-new-29", "ht-new-45", "ht-new-49", "ht-new-51", "ht-new-54",
    "ht-new-55", "ht-new-56"
  ]),
  "this-or-that": new Set([
    "tot-4", "tot-16", "tot-17", "tot-19", "tot-20", "tot-23",
    "tot-25", "tot-26", "tot-new-1", "tot-new-2", "tot-new-3",
    "tot-new-1001", "tot-new-1002", "tot-new-1003", "tot-new-1004",
    "tot-new-1005", "tot-new-6105", "tot-new-7103", "tot-new-7105",
    "tot-new-8106", "tot-new-9003", "tot-new-9004"
  ]),
  "how-would-i-react": new Set(),
  "most-likely-to": new Set(),
  "dealbreaker-draft": new Set(),
  "red-flag-radar": new Set()
};

// These texts belong to duplicate-ID blocks. Removing by text retires only the
// weak occurrence while preserving the stronger card that reused the same ID.
const retiredTexts = new Set([
  "What's my *most dangerous* sex-related habit?",
  "Which of these would I absolutely refuse to do... in *public*?",
  "If I were to be a stripper, what would my stage name be?",
  "Which taboo would I experiment with if no one knew?",
  "What's the filthiest thing I've thought about doing but would *never* admit?",
  "Which of these would I say during *the hottest* hookup of my life?",
  "How do I secretly like to be dominated?",
  "If I had to pick a *most shocking* location for a hookup, where would it be?",
  "What's my biggest *darkest* secret when it comes to desire?",
  "Would you rather date someone with a humiliation kink or a financial domination kink?",
  "Would you rather roleplay as a submissive pet or a strict principal?",
  "Would you rather get caught mid-threesome or be the accidental third in someone else's?",
  "Would you rather use whipped cream or candle wax... in front of an audience?",
  "Would you rather dominate your boss or be dominated by an intern?",
  "Would you rather hook up with someone dressed as a clown or a furry?",
  "Would you rather reenact a spicy scene from a rom-com or a horror movie?",
  "Would you rather be filmed in VR POV or stream to OnlyFans live?",
  "Would you rather have a kink that requires props or one that requires public risk?",
  "Would you rather have your sex life narrated by Morgan Freeman or your mom?",
  "Would you rather wear a vibrating plug at a family dinner or let your partner read your sexts out loud there?",
  "Would you rather be in a polycule with your ex and their new partner or be their babysitter?",
  "Would you rather be waterboarded by whipped cream or ice cubes in the butt?",
  "Would you rather go viral for a sex fail or win an award for amateur porn?",
  "Would you rather only orgasm to the national anthem or to your ex's name?",
  "Would you rather date someone whose kink is taxes or who cries every orgasm?",
  "Would you rather host a public BDSM workshop or join one where your parents attend?",
  "Would you rather get a tattoo of your most used kink or send your therapist screenshots of it?",
  "Would you rather your nudes be displayed in Times Square or printed in your alumni newsletter?",
  "Would you rather be stuck in a sex swing during an earthquake or on a stripper pole during a fire drill?"
]);

const replacements: Record<GameMode, GameQuestion[]> = {
  "guess-who-i-am": refreshedGuessWhoIAmQuestions,
  "hot-takes": refreshedHotTakesQuestions,
  "this-or-that": [...refreshedThisOrThatQuestions, ...refreshedExclusiveQuestions],
  "how-would-i-react": [],
  "most-likely-to": [],
  "dealbreaker-draft": [],
  "red-flag-radar": []
};

export const refreshQuestionPool = (
  mode: GameMode,
  legacyQuestions: GameQuestion[]
): GameQuestion[] => {
  const filtered = legacyQuestions.filter((candidate) => {
    if (mode === "this-or-that" && candidate.nsfwRating === 11) {
      return false;
    }

    return !retiredIds[mode].has(candidate.id) && !retiredTexts.has(candidate.text);
  });

  return [...filtered, ...replacements[mode]];
};
