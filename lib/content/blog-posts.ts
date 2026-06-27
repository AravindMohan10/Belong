export type BlogSection =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  dek: string;
  publishedAt: string;
  readTime: string;
  sections: BlogSection[];
};

export const visitTwoIsTheWholeProduct: BlogPost = {
  slug: "visit-two-is-the-whole-product",
  title: "Visit Two Is the Whole Product",
  dek: "Most people who want to belong never make it past the first visit. That is not a character flaw. It is a design problem.",
  publishedAt: "2026-06-25",
  readTime: "8 min read",
  sections: [
    {
      type: "paragraph",
      text: "Something shifted after the pandemic, and we are still living in the afterglow of it. People say they are lonely at rates we have not seen in decades. Event listings are full. Group chats are active. And yet rooms stay half-empty, book clubs lose newcomers after week one, and hosts keep asking the same quiet question: where did everyone go?",
    },
    {
      type: "paragraph",
      text: "The answer is usually not interest. People are interested. They save the link. They react with an emoji. They mean to go. The drop-off happens somewhere between curiosity and the door.",
    },
    {
      type: "heading",
      text: "Shy is the default, not the exception",
    },
    {
      type: "paragraph",
      text: "We talk about extroverts and introverts like they are different species. In practice, most people are situational. They can be loud with old friends and mute in a room of strangers. They can want connection badly and still feel their throat close when they walk in alone.",
    },
    {
      type: "paragraph",
      text: "Hesitation is rational. A first visit is a bet: your evening, your dignity, your story about who you are. If the night is awkward, you do not just lose two hours. You confirm a fear you have been carrying since high school: maybe I do not fit in.",
    },
    {
      type: "paragraph",
      text: "So people wait. They wait for a friend to come with them. They wait until they feel less tired, less broke, less out of shape, less whatever. They tell themselves next week. The group chat keeps pinging. The RSVP stays at maybe. And the gathering keeps bleeding people who never quite arrived.",
    },
    {
      type: "heading",
      text: "Where the churn actually lives",
    },
    {
      type: "paragraph",
      text: "Meetup platforms and event pages solved discovery. They did not solve return. The industry metric nobody prints on a landing page is first-visit retention: how many people who show up once ever show up twice.",
    },
    {
      type: "paragraph",
      text: "For recurring gatherings, visit two is the whole product. Visit one is auditions. Visit two is when someone stops being a guest and starts being part of the room. Hosts feel this instinctively. The film club organizer who recognizes a new face. The run captain who remembers your pace. The supper host who saved you the seat by the window.",
    },
    {
      type: "paragraph",
      text: "But most tools stop caring after the RSVP. They treat every night like a transaction. Ticket sold. Headcount hit. Done. The awkward phase between interested and belonging is left entirely to chance.",
    },
    {
      type: "heading",
      text: "What the awkward phase feels like",
    },
    {
      type: "paragraph",
      text: "If you have ever stood outside a venue checking your phone, you know the texture of it. The door is right there. You have already committed on paper. Inside, people seem to know the rhythm. You do not know where to stand, whether to buy a drink first, whether anyone will talk to you or whether you will hover by the snack table until it is socially acceptable to leave.",
    },
    {
      type: "quote",
      text: "The night is not hard because the people are cold. It is hard because nothing in the architecture of the evening tells you that your arrival matters.",
    },
    {
      type: "paragraph",
      text: "That is the churn. Not cruelty. Friction. Small missing pieces that add up to a verdict: this was fine, but I probably will not go back.",
    },
    {
      type: "heading",
      text: "Why group chats cannot carry this",
    },
    {
      type: "paragraph",
      text: "Group chats are good at noise. Inside jokes, last-minute plan changes, photos from last time. They are terrible at lowering the threshold for someone who was not there last time.",
    },
    {
      type: "paragraph",
      text: "A newcomer opening a busy chat sees history they did not live. They do not know the tone. They do not know who to DM. Asking a basic question in public feels like admitting you are lost. So they lurk. They tell themselves they will come when they feel more in the loop. They never get in the loop because they never come.",
    },
    {
      type: "paragraph",
      text: "Belong does not try to replace the chat. The chat is for banter after you already belong. Belong is for the part before: the saved seat, the warm start, the memory that you came.",
    },
    {
      type: "heading",
      text: "Why breaking through matters",
    },
    {
      type: "paragraph",
      text: "For the person, getting past visit one is how life actually changes. The research on loneliness and health is blunt: weak ties and recurring rituals predict wellbeing as much as close friendships do. Not because strangers become family overnight, but because showing up regularly rewires your sense of what kind of person you are. Someone who goes. Someone who has a place.",
    },
    {
      type: "paragraph",
      text: "For the gathering, first-timers are oxygen. A club that only retains insiders slowly becomes a private party with a public invite. Hosts burn out. Regulars wonder why the energy faded. The ritual dies not with a bang but with a slow stop of new faces.",
    },
    {
      type: "paragraph",
      text: "Breaking the awkward gate is not a nice-to-have. It is how communities survive.",
    },
    {
      type: "heading",
      text: "What actually helps (before Belong, and with it)",
    },
    {
      type: "list",
      items: [
        "Knowing what will happen in the first ten minutes, not just what the theme is.",
        "Seeing that other first-timers are coming too, so you are not the only new story in the room.",
        "A host or regular who expects you by name, not a crowd that might notice you if you are lucky.",
        "A reason to return that is not guilt or FOMO, but a thread left open: a conversation, a ritual question, a next date that already feels like yours.",
      ],
    },
    {
      type: "paragraph",
      text: "Good hosts have always done pieces of this by hand. The problem is scale and memory. A host with sixteen RSVPs and a day job cannot personally text every first-timer with the same care every month. And a first-timer who had a good night but receives no signal that they were seen is likely to drift away anyway.",
    },
    {
      type: "heading",
      text: "How Belong steps in",
    },
    {
      type: "paragraph",
      text: "Belong is built for the gap. Not the billboard moment when you first hear about a club. The Tuesday night when you are deciding whether to leave your apartment.",
    },
    {
      type: "paragraph",
      text: "A club page that feels like an invitation, not a ticket listing. A Warm Start before you arrive: who will greet you, what the opening minutes look like, what to say if you hate small talk. For hosts, a clear view of who is new, who came back, who might need a saved seat. For regulars, a recap that turns one night into shared memory instead of a story only the people who were there can tell.",
    },
    {
      type: "paragraph",
      text: "None of this is magic. It is hospitality with structure. The same instincts that make a good host, made repeatable so shy people do not have to luck into a good first night.",
    },
    {
      type: "heading",
      text: "This hour asks for something gentler",
    },
    {
      type: "paragraph",
      text: "We are tired of performative connection. Tired of follower counts and engagement graphs. Tired of swiping and matching and still eating alone. The appetite for real life is back. So is the fear.",
    },
    {
      type: "paragraph",
      text: "The gatherings that will matter in this decade are not the loudest ones. They are the ones that make it easy to come once and possible to come back. The ones that treat the awkward gate as a design problem, not a moral test of how brave you are.",
    },
    {
      type: "paragraph",
      text: "If you have been hovering on maybe, you are not flaky. You are human. And if you host something worth returning to, your work does not end at the RSVP. It starts at the door.",
    },
    {
      type: "paragraph",
      text: "That is what we are building Belong for. The whole ritual. First-timers, hosts, regulars. The path from interested to I belong here.",
    },
  ],
};

const postsBySlug: Record<string, BlogPost> = {
  [visitTwoIsTheWholeProduct.slug]: visitTwoIsTheWholeProduct,
};

export function getBlogPost(slug: string): BlogPost | null {
  return postsBySlug[slug] ?? null;
}

export function getFeaturedBlogPost(): BlogPost {
  return visitTwoIsTheWholeProduct;
}
