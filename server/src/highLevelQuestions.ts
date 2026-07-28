import { GameQuestion } from './types/game';

const question = (
  id: string,
  text: string,
  options: string[],
  nsfwRating: number,
  categories: string[]
): GameQuestion => ({ id, text, options, score: 1, nsfwRating, categories });

export const highLevelGuessWhoIAmQuestions: GameQuestion[] = [
  question(
    "gwia-2026-001",
    "Which kind of attention would make me fold embarrassingly fast?",
    ["A dangerously specific compliment", "A voice note in that low voice", "Remembering one tiny thing I said months ago", "Eye contact that lasts one second too long"],
    8,
    ["attraction", "dating", "personal"]
  ),
  question(
    "gwia-2026-002",
    "What's my most believable excuse for texting an ex after midnight?",
    ["I found your charger", "This song attacked me emotionally", "Mercury made me do it", "No excuse — just one terrible decision loading"],
    8,
    ["dating", "exes", "chaotic"]
  ),
  question(
    "gwia-2026-003",
    "Which dating boundary would I break first for someone ridiculously attractive?",
    ["No kissing on the first date", "Never dating a friend's ex", "No coworkers, ever", "Waiting three days to text back"],
    8,
    ["dating", "boundaries", "attraction"]
  ),
  question(
    "gwia-2026-004",
    "How would I most likely signal that I want the night to continue?",
    ["Order one suspiciously slow final drink", "Ask if they want to see my 'playlist'", "Let the eye contact do all the paperwork", "Say it directly and save everyone the drama"],
    8,
    ["dating", "flirting", "personal"]
  ),
  question(
    "gwia-2026-005",
    "What would make me jealous even if I swore I was totally chill?",
    ["My crush laughing too hard at someone else's joke", "An ex suddenly looking suspiciously upgraded", "My partner having a very hot work bestie", "Being left on read while they're posting stories"],
    8,
    ["relationships", "jealousy", "personal"]
  ),
  question(
    "gwia-2026-006",
    "Which compliment would live in my head rent-free for the next six months?",
    ["You make everyone feel wanted", "You look unfairly good today", "Your mind is dangerously attractive", "I feel safest when I'm with you"],
    8,
    ["attraction", "emotions", "personal"]
  ),
  question(
    "gwia-2026-007",
    "What's the boldest voice note I could actually send without deleting it?",
    ["A breathy 'come over' with no context", "Exactly what I want, in unnecessary detail", "A fake innocent message with a filthy double meaning", "Just their name followed by a long, dangerous pause"],
    8,
    ["flirting", "sex", "social"]
  ),
  question(
    "gwia-2026-008",
    "Which power dynamic would tempt me most in a consensual roleplay?",
    ["I set every rule", "They take control and I stop overthinking", "We compete until someone surrenders", "We switch halfway and ruin each other's plans"],
    9,
    ["sex", "roleplay", "control"]
  ),
  question(
    "gwia-2026-009",
    "What's the riskiest location where I'd still consider a make-out session?",
    ["A quiet balcony at a wedding", "An office after everyone leaves", "The back row of a nearly empty cinema", "A rooftop where the city can mind its business"],
    9,
    ["dating", "public", "chaotic"]
  ),
  question(
    "gwia-2026-010",
    "Which truth would be hardest for me to admit to someone I'm dating?",
    ["I checked your ex's entire profile", "I like you much more than I'm acting", "I compared you to someone from my past", "I've rehearsed our breakup despite being happy"],
    9,
    ["dating", "secrets", "emotions"]
  ),
  question(
    "gwia-2026-011",
    "What kind of teasing would destroy my ability to act normal?",
    ["A whisper in public about later", "Being told not to touch", "A slow kiss that ends too soon", "An innocent text with extremely guilty timing"],
    9,
    ["sex", "flirting", "attraction"]
  ),
  question(
    "gwia-2026-012",
    "If a partner suggested trying something new tonight, what would excite me most?",
    ["A blindfold and a very clear safe word", "Choosing a fantasy for each other", "A toy neither of us has tried", "Roleplaying as strangers meeting for the first time"],
    9,
    ["sex", "fantasy", "relationships"]
  ),
  question(
    "gwia-2026-013",
    "Which late-night confession am I most likely to make after two drinks?",
    ["I've imagined us kissing", "I still think about one ex", "I'm far less innocent than I look", "I caught feelings before our second date"],
    9,
    ["dating", "secrets", "personal"]
  ),
  question(
    "gwia-2026-014",
    "What would I secretly want written into a no-judgment intimacy menu?",
    ["More praise, less guessing", "Let me take control for once", "Slow teasing with zero rushing", "A ridiculous roleplay we never discuss at brunch"],
    9,
    ["sex", "communication", "fantasy"]
  ),
  question(
    "gwia-2026-015",
    "Which revelation would cause maximum chaos if my closest friends learned it tonight?",
    ["I've hooked up with someone in this circle", "I once had a crush on my best friend's partner", "I keep a ranked list of everyone's red flags", "One of my 'jokes' about a friend was not a joke"],
    10,
    ["friends", "secrets", "chaotic"]
  ),
  question(
    "gwia-2026-016",
    "What's the most unhinged thing I might do after discovering mutual attraction?",
    ["Book a weekend trip before the first kiss", "Send a calendar invite titled 'Bad Decisions'", "Confess every fantasy like it's a quarterly report", "Disappear for a week because feelings are terrifying"],
    10,
    ["dating", "attraction", "chaotic"]
  ),
  question(
    "gwia-2026-017",
    "Which private receipt would I least want displayed on the living-room TV?",
    ["My thirstiest saved posts", "The group chat where I analyzed one kiss", "My 2 AM search history", "The notes-app draft of texts I never sent"],
    10,
    ["privacy", "social", "embarrassment"]
  ),
  question(
    "gwia-2026-018",
    "If everyone involved enthusiastically agreed, which fantasy setup would intrigue me most?",
    ["A masquerade where nobody uses real names", "A three-person date with rules negotiated first", "A private performance with an invited audience", "A weekend where my partner plans every surprise"],
    10,
    ["sex", "fantasy", "consent"]
  ),
  question(
    "gwia-2026-019",
    "Which relationship secret could I hide with an Oscar-worthy straight face?",
    ["I read the message preview and pretended I didn't", "I know exactly who your hottest friend is", "I have an emergency breakup speech prepared", "I sometimes miss the drama of being single"],
    10,
    ["relationships", "secrets", "personal"]
  ),
  question(
    "gwia-2026-020",
    "What's my final form at a destination wedding with an open bar and zero supervision?",
    ["Flirting with the one person declared off-limits", "Starting a scandal in coordinated ethnic wear", "Giving relationship advice while making terrible choices", "Vanishing after midnight and returning with a legendary story"],
    10,
    ["dating", "social", "chaotic"]
  )
];

export const highLevelHotTakesQuestions: GameQuestion[] = [
  question(
    "ht-2026-001",
    "Checking an ex's profile while happily dating someone else is harmless curiosity.",
    ["Harmless — eyes aren't cheating", "It depends how often you're doing 'research'", "If it needs hiding, it isn't harmless"],
    8,
    ["relationships", "exes", "social"]
  ),
  question(
    "ht-2026-002",
    "A partner asking to share phone passwords is a red flag, not reassurance.",
    ["Trust doesn't need passwords", "Transparency can be comforting", "The reason matters more than the request"],
    8,
    ["relationships", "privacy", "boundaries"]
  ),
  question(
    "ht-2026-003",
    "Emotional cheating can be more damaging than a one-time physical mistake.",
    ["Emotional betrayal cuts deeper", "Physical cheating is still the clearer line", "Betrayal is betrayal — stop ranking it"],
    8,
    ["relationships", "cheating", "emotions"]
  ),
  question(
    "ht-2026-004",
    "Good chemistry can make people ignore incompatibility for far too long.",
    ["Chemistry is red-flag anesthesia", "Compatibility is overrated without spark", "You need both or the bill arrives later"],
    8,
    ["dating", "attraction", "relationships"]
  ),
  question(
    "ht-2026-005",
    "Flirting with other people can be healthy inside a secure relationship.",
    ["Flirting is fun, not a felony", "Only with boundaries agreed in advance", "Nope — keep that energy at home"],
    8,
    ["relationships", "flirting", "boundaries"]
  ),
  question(
    "ht-2026-006",
    "Couples should discuss their turn-ons as casually as their dinner plans.",
    ["Yes — communication is hot", "Some mystery keeps the magic alive", "Discuss it, but maybe not over dal chawal"],
    8,
    ["sex", "communication", "relationships"]
  ),
  question(
    "ht-2026-007",
    "Deleting dating apps before defining the relationship is performative loyalty.",
    ["Exactly — exclusivity needs a conversation", "Actions can define commitment first", "It depends whether the screenshots are for Instagram"],
    8,
    ["dating", "commitment", "social"]
  ),
  question(
    "ht-2026-008",
    "Sexual compatibility can be built; people use 'no spark' to avoid honest conversations.",
    ["Skills and trust can build chemistry", "Desire can't be negotiated into existence", "Some sparks grow, others need a fire extinguisher"],
    9,
    ["sex", "communication", "attraction"]
  ),
  question(
    "ht-2026-009",
    "Sharing intimate details with a best friend without your partner's consent is a betrayal.",
    ["Private means private", "Friends are allowed to be a support system", "Share feelings, not identifying details"],
    9,
    ["relationships", "privacy", "friends"]
  ),
  question(
    "ht-2026-010",
    "A consensual hall pass sounds better in theory than it feels in real life.",
    ["Jealousy always sends the invoice", "Secure couples can genuinely enjoy it", "The fantasy is usually the best part"],
    9,
    ["relationships", "sex", "jealousy"]
  ),
  question(
    "ht-2026-011",
    "People who say they hate labels often want relationship benefits without accountability.",
    ["No label is frequently a loophole", "Labels create pressure and fake certainty", "Clarity matters; the label itself doesn't"],
    9,
    ["dating", "commitment", "opinions"]
  ),
  question(
    "ht-2026-012",
    "Keeping old intimate photos after a breakup is disrespectful, even if you never view them.",
    ["Delete them — consent has an expiry date", "Private memories can remain private", "Ask once, then respect the answer"],
    9,
    ["privacy", "exes", "consent"]
  ),
  question(
    "ht-2026-013",
    "Wanting to be desired by others doesn't mean you're unhappy with your partner.",
    ["Validation and commitment can coexist", "That need signals something is missing", "Wanting is human; acting has boundaries"],
    9,
    ["relationships", "attraction", "psychology"]
  ),
  question(
    "ht-2026-014",
    "Scheduling intimacy is more romantic than waiting for spontaneity that never arrives.",
    ["Anticipation is underrated foreplay", "Calendar invites kill the mood", "Busy adults need logistics and chemistry"],
    9,
    ["sex", "relationships", "communication"]
  ),
  question(
    "ht-2026-015",
    "A couple can love each other deeply and still be completely wrong for monogamy.",
    ["Love doesn't dictate relationship structure", "Non-monogamy often disguises incompatibility", "It works only with radical honesty and equal freedom"],
    10,
    ["relationships", "monogamy", "commitment"]
  ),
  question(
    "ht-2026-016",
    "If your partner gives permission to read their messages, choosing not to is the greater act of trust.",
    ["Trust means leaving the door unopened", "Permission means transparency, not a test", "If you're tempted, the real issue is already here"],
    10,
    ["relationships", "privacy", "trust"]
  ),
  question(
    "ht-2026-017",
    "A fantasy involving someone you know is not a moral problem unless it changes how you treat them.",
    ["Thoughts aren't actions", "Some fantasies cross emotional boundaries", "The secrecy and behavior matter more than the fantasy"],
    10,
    ["fantasy", "morality", "relationships"]
  ),
  question(
    "ht-2026-018",
    "Couples who publicly overshare their love are often privately seeking reassurance.",
    ["The feed is sometimes relationship theatre", "Happy people are allowed to be loud", "Posting style proves absolutely nothing"],
    10,
    ["relationships", "social", "psychology"]
  ),
  question(
    "ht-2026-019",
    "Attraction to a close friend's partner should be confessed only if you plan to act on it.",
    ["Unacted feelings don't need a press conference", "Honesty protects the friendship", "Distance yourself; confession just transfers the burden"],
    10,
    ["friends", "attraction", "morality"]
  ),
  question(
    "ht-2026-020",
    "The most dangerous affair is the one both people insist is 'just an unusually close friendship.'",
    ["Emotional affairs love innocent labels", "Close friendship isn't automatically betrayal", "Ask whether the partner sees the full picture"],
    10,
    ["relationships", "cheating", "friends"]
  )
];

export const highLevelThisOrThatQuestions: GameQuestion[] = [
  question(
    "tot-2026-001",
    "Would you rather accidentally like your crush's photo from 2017 or send them the screenshot you took of their profile?",
    ["Ancient-photo like", "Screenshot sent"],
    8,
    ["dating", "social", "embarrassment"]
  ),
  question(
    "tot-2026-002",
    "Would you rather have undeniable chemistry with terrible timing or perfect timing with zero butterflies?",
    ["Chemistry, bad timing", "Perfect timing, no spark"],
    8,
    ["dating", "attraction", "relationships"]
  ),
  question(
    "tot-2026-003",
    "Would you rather your partner read your group-chat analysis of them or your ex read your current relationship diary?",
    ["Partner reads group chat", "Ex reads diary"],
    8,
    ["relationships", "privacy", "exes"]
  ),
  question(
    "tot-2026-004",
    "Would you rather kiss your hottest friend once or explain to them why you refused?",
    ["Kiss once", "Explain the refusal"],
    8,
    ["friends", "attraction", "dating"]
  ),
  question(
    "tot-2026-005",
    "Would you rather be amazing at flirting over text but awkward in person, or magnetic in person but reply like customer support?",
    ["Text flirt, real-life awkward", "Magnetic, terrible texter"],
    8,
    ["flirting", "social", "dating"]
  ),
  question(
    "tot-2026-006",
    "Would you rather learn exactly what your ex says about you or exactly what your crush hasn't said about you?",
    ["Ex's full review", "Crush's unspoken thoughts"],
    8,
    ["exes", "dating", "secrets"]
  ),
  question(
    "tot-2026-007",
    "Would you rather your family see your dating-app profile or your date see your family WhatsApp messages?",
    ["Family sees dating profile", "Date sees family chat"],
    8,
    ["dating", "family", "privacy"]
  ),
  question(
    "tot-2026-008",
    "Would you rather confess your wildest fantasy to your partner or let them guess it with three clues?",
    ["Confess directly", "Three dangerous clues"],
    9,
    ["sex", "fantasy", "communication"]
  ),
  question(
    "tot-2026-009",
    "Would you rather surrender control for the night or take charge and plan every detail?",
    ["Surrender control", "Plan every detail"],
    9,
    ["sex", "control", "relationships"]
  ),
  question(
    "tot-2026-010",
    "Would you rather receive a dangerously detailed voice note at work or an innocent message with a secret meaning at dinner?",
    ["Detailed work voice note", "Secret dinner message"],
    9,
    ["flirting", "sex", "social"]
  ),
  question(
    "tot-2026-011",
    "Would you rather run into your ex while holding hands with your crush or your crush while arguing with your ex?",
    ["Ex sees the hand-hold", "Crush sees the argument"],
    9,
    ["dating", "exes", "chaotic"]
  ),
  question(
    "tot-2026-012",
    "Would you rather have one night of perfect chemistry with no future or a slow-burn romance with a painfully awkward start?",
    ["Perfect one-night chemistry", "Awkward slow burn"],
    9,
    ["dating", "attraction", "relationships"]
  ),
  question(
    "tot-2026-013",
    "Would you rather hear your partner's honest ranking of your kisses or give them yours first?",
    ["Hear their ranking", "Give yours first"],
    9,
    ["relationships", "intimacy", "communication"]
  ),
  question(
    "tot-2026-014",
    "Would you rather try a blindfold with someone you trust or roleplay as strangers with someone you love?",
    ["Trusted blindfold", "Strangers roleplay"],
    9,
    ["sex", "roleplay", "trust"]
  ),
  question(
    "tot-2026-015",
    "Would you rather your best friend reveal your secret hookup or your ex reveal your most embarrassing romantic confession?",
    ["Secret hookup revealed", "Romantic confession revealed"],
    10,
    ["friends", "exes", "secrets"]
  ),
  question(
    "tot-2026-016",
    "Would you rather attend a party with everyone you've kissed or a dinner with everyone who wrongly thought you were flirting?",
    ["Kiss-history party", "Misread-flirting dinner"],
    10,
    ["dating", "social", "chaotic"]
  ),
  question(
    "tot-2026-017",
    "Would you rather have your private fantasies turned into a movie trailer or your dating history presented as a TED Talk?",
    ["Fantasy movie trailer", "Dating-history TED Talk"],
    10,
    ["fantasy", "dating", "embarrassment"]
  ),
  question(
    "tot-2026-018",
    "Would you rather explore a consensual fantasy with a partner or admit the fantasy to your entire friend group and never try it?",
    ["Explore it together", "Tell friends, never try"],
    10,
    ["sex", "fantasy", "friends"]
  ),
  question(
    "tot-2026-019",
    "Would you rather discover your partner once had a crush on your best friend or your best friend once had a crush on your partner?",
    ["Partner liked best friend", "Best friend liked partner"],
    10,
    ["relationships", "friends", "jealousy"]
  ),
  question(
    "tot-2026-020",
    "Would you rather let your ex narrate your next date through an earpiece or let your parents choose every question for it?",
    ["Ex narrates date", "Parents choose questions"],
    10,
    ["dating", "exes", "family"]
  )
];
