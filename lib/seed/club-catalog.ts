import type { Club, ClubWarmStart } from "@/lib/types/club";
import { DEMO_MARA_ID } from "@/lib/auth/constants";

export type SeedPastSession = {
  id: string;
  startsAt: Date;
  locationArea: string;
  title: string;
  capacity: number;
  meetingPoint: string;
  warmStart: ClubWarmStart;
};

export type SeedClubMemory = {
  id: string;
  sessionId: string;
  sessionTitle: string;
  dateLabel: string;
  review: string;
  reviewerName: string;
  photoUrls: string[];
};

export type SeedClubInput = Omit<Club, "memories" | "membershipPriceCents"> & {
  hostUserId: string;
  pastSessions: SeedPastSession[];
  memories: SeedClubMemory[];
  membershipPriceCents?: number;
};

export const seedClubCatalog: SeedClubInput[] = [
  {
    id: "00000000-0000-4000-8000-000000000010",
    slug: "sunday-cinema-walks",
    name: "Sunday Cinema Walks",
    tagline: "A monthly walk, a screening, and coffee after the credits.",
    description:
      "A monthly walk and screening in Williamsburg. Mara picks one film, the group walks to a small room together, and stays for coffee after. Most people arrive alone the first time. By the third month, many of them are regulars.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1600&q=80",
    ritualLabel: "Every third Sunday · 4:00 PM",
    vibe: ["Walk first", "Small room", "Coffee after", "Come alone"],
    voice: {
      ritualTitle: "How it runs",
      promiseEyebrow: "First visit",
      promiseHeadline: "You will know where to meet before you leave home.",
      expectEyebrow: "The schedule",
      expectHeadline: "From the steps to the screening",
      memoriesEyebrow: "Recent nights",
      memoriesHeadline: "What it feels like",
      hostEyebrow: "Host",
    },
    firstTimerPromise:
      "You get the meeting point, a walk to the room with the group, and a short introduction before the film starts. Mara tracks who is new and who is returning. Most regulars started as first-timers showing up alone.",
    whatToExpect: [
      "Gather with the group before the walk starts.",
      "Walk together to the screening room. No rush. The film does most of the introducing.",
      "One film, then optional discussion. No expertise required.",
      "Coffee nearby. Stay as long as you want.",
    ],
    city: "Brooklyn, NY",
    neighborhood: "Williamsburg",
    latitude: 40.7081,
    longitude: -73.9571,
    hostUserId: DEMO_MARA_ID,
    host: {
      name: "Mara Okonkwo",
      bio: "Mara has hosted this walk for two years. She picks films that hold up to a second viewing and greets every first-timer by name.",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    },
    upcomingSession: {
      id: "00000000-0000-4000-8000-000000000110",
      startsAt: new Date("2026-07-12T16:00:00-04:00"),
      locationArea: "Riverside District",
      title: "Aftersun",
      capacity: 18,
      spotsRemaining: 18,
      meetingPoint: "Riverside steps · look for the red scarf",
      warmStart: {
        firstTenMinutes: [
          "Mara greets you by name at the riverside steps.",
          "Short walk together to the screening room.",
          "Quick intro circle before the lights go down.",
          "Film, then optional coffee nearby.",
        ],
        findTheGroup:
          "Meet at the riverside steps in the Riverside District. Mara wears a red scarf.",
        smallTalkLine:
          "Ask someone what film surprised them last month.",
        exactPin: "Riverside Steps, 220 River Walk",
      },
    },
    pastSessions: [
      {
        id: "00000000-0000-4000-8000-000000000111",
        startsAt: new Date("2026-05-18T16:00:00-04:00"),
        locationArea: "Riverside District",
        title: "Past Lives",
        capacity: 18,
        meetingPoint: "Riverside steps · look for the red scarf",
        warmStart: {
          firstTenMinutes: [
            "Mara greets you by name at the riverside steps.",
            "Short walk together to the screening room.",
            "Quick intro circle before the lights go down.",
          ],
          findTheGroup:
            "Meet at the riverside steps in the Riverside District. Mara wears a red scarf.",
          smallTalkLine: "Ask someone what film surprised them last month.",
          exactPin: "Riverside Steps, 220 River Walk",
        },
      },
      {
        id: "00000000-0000-4000-8000-000000000112",
        startsAt: new Date("2026-04-20T16:00:00-04:00"),
        locationArea: "Riverside District",
        title: "The Worst Person in the World",
        capacity: 18,
        meetingPoint: "Riverside steps · look for the red scarf",
        warmStart: {
          firstTenMinutes: [
            "Mara greets you by name at the riverside steps.",
            "Short walk together to the screening room.",
            "Film, then optional coffee nearby.",
          ],
          findTheGroup:
            "Meet at the riverside steps in the Riverside District. Mara wears a red scarf.",
          smallTalkLine: "Ask someone what film surprised them last month.",
          exactPin: "Riverside Steps, 220 River Walk",
        },
      },
    ],
    memories: [
      {
        id: "memory_sccw_may",
        sessionId: "00000000-0000-4000-8000-000000000111",
        sessionTitle: "Past Lives",
        dateLabel: "May 18",
        review:
          "I showed up alone in the rain. Mara knew my name. I left with two people I still text every week.",
        reviewerName: "Jordan",
        photoUrls: [
          "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80",
        ],
      },
      {
        id: "memory_sccw_april",
        sessionId: "00000000-0000-4000-8000-000000000112",
        sessionTitle: "The Worst Person in the World",
        dateLabel: "April 20",
        review:
          "I had never been to a film club before. The walk before the movie made showing up alone feel normal.",
        reviewerName: "Priya",
        photoUrls: [
          "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80",
        ],
      },
    ],
  },
  {
    id: "00000000-0000-4000-8000-000000000020",
    slug: "riverside-supper-club",
    name: "Riverside Supper Club",
    membershipPriceCents: 1800,
    tagline: "Six seats, one table, dinner every other Thursday.",
    description:
      "Six seats at a long table in Daniel's DUMBO dining room. Dinner every other Thursday at 7 PM. One shared menu. He caps the list so everyone sits together. Most guests arrive solo.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=80",
    ritualLabel: "Every other Thursday · 7:00 PM",
    vibe: ["Small table", "Shared menu", "Come alone", "Six seats"],
    voice: {
      ritualTitle: "How it runs",
      promiseEyebrow: "First visit",
      promiseHeadline: "Your seat is saved before you arrive.",
      expectEyebrow: "The evening",
      expectHeadline: "Door to dishes",
      memoriesEyebrow: "Recent nights",
      memoriesHeadline: "What it feels like",
      hostEyebrow: "Host",
    },
    firstTimerPromise:
      "You get the menu, the address, and confirmation that your seat is held before Thursday. Daniel keeps the table at six so everyone sits together. Tell him if you are nervous. He has hosted hundreds of first-timers.",
    whatToExpect: [
      "Daniel greets you at the door and walks you to the table.",
      "One shared main, two sides, and dessert when someone volunteers.",
      "A short toast before the first course.",
      "Stay for dishes and coffee, or leave when you are ready.",
    ],
    city: "Brooklyn, NY",
    neighborhood: "DUMBO",
    latitude: 40.7033,
    longitude: -73.9888,
    hostUserId: "00000000-0000-4000-8000-000000000003",
    host: {
      name: "Daniel Ruiz",
      bio: "Daniel hosts from his dining room in DUMBO. He keeps the guest list at six and answers the door himself.",
      imageUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    },
    upcomingSession: {
      id: "00000000-0000-4000-8000-000000000120",
      startsAt: new Date("2026-07-10T19:00:00-04:00"),
      locationArea: "Riverside",
      title: "Summer tomato pasta night",
      capacity: 6,
      spotsRemaining: 6,
      meetingPoint: "Ring the bell at the brownstone on Oak Lane",
      warmStart: {
        firstTenMinutes: [
          "Daniel answers the door with your name.",
          "Everyone sits at the long table.",
          "Toast before the first course.",
        ],
        findTheGroup: "Oak Lane brownstone, second bell from the left.",
        smallTalkLine: "Ask what someone would cook for a table of strangers.",
        exactPin: null,
      },
    },
    pastSessions: [
      {
        id: "00000000-0000-4000-8000-000000000121",
        startsAt: new Date("2026-06-12T19:00:00-04:00"),
        locationArea: "Riverside",
        title: "Lemon chicken & stories",
        capacity: 6,
        meetingPoint: "Ring the bell at the brownstone on Oak Lane",
        warmStart: {
          firstTenMinutes: [
            "Daniel answers the door with your name.",
            "Everyone sits at the long table.",
            "Toast before the first course.",
          ],
          findTheGroup: "Oak Lane brownstone, second bell from the left.",
          smallTalkLine: "Ask what someone would cook for a table of strangers.",
          exactPin: null,
        },
      },
    ],
    memories: [
      {
        id: "memory_rsc_june",
        sessionId: "00000000-0000-4000-8000-000000000121",
        sessionTitle: "Lemon chicken & stories",
        dateLabel: "June 12",
        review:
          "I was nervous about eating with strangers. Daniel used my name at the door and I forgot to be nervous.",
        reviewerName: "Sam",
        photoUrls: [
          "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80",
        ],
      },
    ],
  },
  {
    id: "00000000-0000-4000-8000-000000000030",
    slug: "tuesday-board-night",
    name: "Tuesday Board Night",
    tagline: "Weekly board games at a café table. Rules explained. Low pressure.",
    description:
      "Weekly board games at a café in East Austin. Priya brings the games, explains the rules, and pairs newcomers with someone who has played before. Short warm-up round, then a main game the group votes on. Food is ordered whenever people are hungry.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1611371805429-8b5c1b2c34ba?auto=format&fit=crop&w=1600&q=80",
    ritualLabel: "Every Tuesday · 6:30 PM",
    vibe: ["Café table", "Rules explained", "Low stakes", "Come alone"],
    voice: {
      ritualTitle: "How it runs",
      promiseEyebrow: "First visit",
      promiseHeadline: "You do not need prior experience.",
      expectEyebrow: "The evening",
      expectHeadline: "Warm-up to main game",
      memoriesEyebrow: "Recent nights",
      memoriesHeadline: "What it feels like",
      hostEyebrow: "Host",
    },
    firstTimerPromise:
      "Tell Priya what you have played before, even if the answer is almost nothing. She pairs you with a patient regular and picks a starter game that fits the evening. You are not expected to know the rules on arrival.",
    whatToExpect: [
      "Priya explains a warm-up game while the group assembles.",
      "Short warm-up round to get everyone talking.",
      "Vote on the main game. Priya walks through the rules.",
      "Order food from the café menu at any point.",
    ],
    city: "Austin, TX",
    neighborhood: "East Austin",
    latitude: 30.2624,
    longitude: -97.7278,
    hostUserId: "00000000-0000-4000-8000-000000000004",
    host: {
      name: "Priya Nair",
      bio: "Priya hosts Tuesday nights at a café in East Austin. She keeps a shelf of games at home and pairs every newcomer with a regular for their first round.",
      imageUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
    },
    upcomingSession: {
      id: "00000000-0000-4000-8000-000000000130",
      startsAt: new Date("2026-07-08T18:30:00-04:00"),
      locationArea: "Maple Street Café",
      title: "Wingspan & newcomers round",
      capacity: 12,
      spotsRemaining: 12,
      meetingPoint: "Back table by the window · stack of game boxes",
      warmStart: {
        firstTenMinutes: [
          "Find the table with the game stack.",
          "Priya pairs you with a regular for a warm-up game.",
          "Group picks the main game together.",
        ],
        findTheGroup: "Maple Street Café, back table by the window.",
        smallTalkLine: "Ask what game someone wishes more people played.",
        exactPin: null,
      },
    },
    pastSessions: [
      {
        id: "00000000-0000-4000-8000-000000000131",
        startsAt: new Date("2026-06-24T18:30:00-04:00"),
        locationArea: "Maple Street Café",
        title: "Catan chaos",
        capacity: 12,
        meetingPoint: "Back table by the window · stack of game boxes",
        warmStart: {
          firstTenMinutes: [
            "Find the table with the game stack.",
            "Priya pairs you with a regular for a warm-up game.",
            "Group picks the main game together.",
          ],
          findTheGroup: "Maple Street Café, back table by the window.",
          smallTalkLine: "Ask what game someone wishes more people played.",
          exactPin: null,
        },
      },
    ],
    memories: [
      {
        id: "memory_tbn_june",
        sessionId: "00000000-0000-4000-8000-000000000131",
        sessionTitle: "Catan chaos",
        dateLabel: "June 24",
        review:
          "I had never played Wingspan. Priya sat next to me and we won by accident. I came back the next Tuesday.",
        reviewerName: "Lee",
        photoUrls: [
          "https://images.unsplash.com/photo-1611371805429-8b5c1b2c34ba?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1606167668584-78717636cc76?auto=format&fit=crop&w=800&q=80",
        ],
      },
    ],
  },
  {
    id: "00000000-0000-4000-8000-000000000040",
    slug: "saturday-run-club",
    name: "Saturday Run Club",
    tagline: "Five miles at conversation pace. Coffee after. No timing.",
    description:
      "Saturday mornings in the Pearl District. Five miles at conversation pace along the river. Coffee after. Alex sets a steady pace; split times are not tracked.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?auto=format&fit=crop&w=1600&q=80",
    ritualLabel: "Every Saturday · 8:00 AM",
    vibe: ["Slow pace", "Coffee after", "All levels", "Come alone"],
    voice: {
      ritualTitle: "How it runs",
      promiseEyebrow: "First visit",
      promiseHeadline: "You get the route before Saturday.",
      expectEyebrow: "The morning",
      expectHeadline: "Statue to coffee",
      memoriesEyebrow: "Recent mornings",
      memoriesHeadline: "What it feels like",
      hostEyebrow: "Host",
    },
    firstTimerPromise:
      "Alex sends the route, the meeting pin, and who is on buddy duty before the run. Walk the first mile if you need to. Pace is set for conversation, not performance.",
    whatToExpect: [
      "Meet Alex and the group at the start of the route.",
      "Optional walk for the first half mile.",
      "Five miles along the river at conversation pace.",
      "Coffee after. Stay for one cup or longer.",
    ],
    city: "Portland, OR",
    neighborhood: "Pearl District",
    latitude: 45.5314,
    longitude: -122.6782,
    hostUserId: "00000000-0000-4000-8000-000000000005",
    host: {
      name: "Alex Kim",
      bio: "Alex started this run for people who want a reason to show up on Saturday mornings. He tracks who returns, not who is fastest.",
      imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
    },
    upcomingSession: {
      id: "00000000-0000-4000-8000-000000000140",
      startsAt: new Date("2026-07-11T08:00:00-04:00"),
      locationArea: "River Bridge",
      title: "Summer loop + iced lattes",
      capacity: 20,
      spotsRemaining: 20,
      meetingPoint: "Bridge statue · yellow cap",
      warmStart: {
        firstTenMinutes: [
          "Meet at the bridge statue. Look for the yellow cap.",
          "Walk the first half mile if you need to warm up.",
          "Five miles at conversation pace, then coffee.",
        ],
        findTheGroup: "River Bridge statue, northeast corner.",
        smallTalkLine: "Ask someone their usual route in the city.",
        exactPin: "River Bridge NE statue",
      },
    },
    pastSessions: [
      {
        id: "00000000-0000-4000-8000-000000000141",
        startsAt: new Date("2026-06-28T08:00:00-04:00"),
        locationArea: "River Bridge",
        title: "Misty five-miler",
        capacity: 20,
        meetingPoint: "Bridge statue · yellow cap",
        warmStart: {
          firstTenMinutes: [
            "Meet at the bridge statue. Look for the yellow cap.",
            "Walk the first half mile if you need to warm up.",
            "Five miles at conversation pace, then coffee.",
          ],
          findTheGroup: "River Bridge statue, northeast corner.",
          smallTalkLine: "Ask someone their usual route in the city.",
          exactPin: "River Bridge NE statue",
        },
      },
    ],
    memories: [
      {
        id: "memory_src_june",
        sessionId: "00000000-0000-4000-8000-000000000141",
        sessionTitle: "Misty five-miler",
        dateLabel: "June 28",
        review:
          "I thought I would be the slowest person there. Nobody cared. We talked the whole five miles.",
        reviewerName: "Chris",
        photoUrls: [
          "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1476480862126-209bfaa8fbc8?auto=format&fit=crop&w=800&q=80",
        ],
      },
    ],
  },
];

export const seedHostUsers = [
  {
    id: DEMO_MARA_ID,
    role: "host" as const,
    displayName: "Mara Okonkwo",
    bio: "Hosts Sunday Cinema Walks. Cares who comes back.",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    hostClubSlug: "sunday-cinema-walks",
  },
  {
    id: "00000000-0000-4000-8000-000000000003",
    role: "host" as const,
    displayName: "Daniel Ruiz",
    bio: "Supper club host.",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    hostClubSlug: "riverside-supper-club",
  },
  {
    id: "00000000-0000-4000-8000-000000000004",
    role: "host" as const,
    displayName: "Priya Nair",
    bio: "Board night host.",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
    hostClubSlug: "tuesday-board-night",
  },
  {
    id: "00000000-0000-4000-8000-000000000005",
    role: "host" as const,
    displayName: "Alex Kim",
    bio: "Run club host.",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
    hostClubSlug: "saturday-run-club",
  },
];
