import type { Club } from "@/lib/types/club";

export const sundayCinemaWalks: Club = {
  id: "club_sunday_cinema_walks",
  slug: "sunday-cinema-walks",
  name: "Sunday Cinema Walks",
  tagline: "A monthly walk, a hidden screening, coffee after the credits.",
  description:
    "We meet near the river, walk through the neighborhood to a small screening room, watch something worth talking about, then linger over coffee while the film settles. Most people come alone the first time. By the third Sunday, it starts to feel like yours.",
  coverImageUrl:
    "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1600&q=80",
  ritualLabel: "Every third Sunday · 4:00 PM",
  vibe: ["Walk first", "Small room", "Coffee after", "Come alone"],
  firstTimerPromise:
    "If this is your first time, you are not walking in blind. We will save you a seat, tell you where to meet, and introduce you before the lights go down. Most regulars started exactly where you are.",
  whatToExpect: [
    "Meet at the riverside steps. Look for the red scarf.",
    "A 20-minute walk to the screening room. No rush, no small-talk pressure.",
    "One film, one discussion. Opinions welcome, expertise not required.",
    "Coffee nearby afterward. Stay for ten minutes or the whole evening.",
  ],
  host: {
    name: "Mara Okonkwo",
    bio: "Mara has hosted this walk for two years. She picks films that reward a second viewing and believes the walk there is half the ritual.",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
  },
  upcomingSession: {
    id: "session_sccw_july_2026",
    startsAt: new Date("2026-07-12T16:00:00-04:00"),
    locationArea: "Riverside District",
    title: "Aftersun",
    capacity: 18,
    spotsRemaining: 6,
  },
  memories: [
    {
      id: "memory_sccw_may",
      sessionTitle: "Past Lives",
      dateLabel: "May 18",
      excerpt:
        "Twelve of us walked through the drizzle. Someone cried quietly during the last scene. We stayed at the café until they started stacking chairs.",
    },
    {
      id: "memory_sccw_april",
      sessionTitle: "The Worst Person in the World",
      dateLabel: "April 20",
      excerpt:
        "Four first-timers, three returns. Mara paired newcomers with regulars at coffee. By the end, someone was already asking about the next one.",
    },
  ],
};

export const riversideSupperClub: Club = {
  id: "club_riverside_supper",
  slug: "riverside-supper-club",
  name: "Riverside Supper Club",
  tagline: "Six seats, one long table, recipes someone’s grandmother actually made.",
  description:
    "Every other Thursday we cook together or bring one dish to share. Names before napkins. Most people come solo and leave with a group text they actually keep muted on purpose.",
  coverImageUrl:
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=80",
  ritualLabel: "Every other Thursday · 7:00 PM",
  vibe: ["Small table", "Potluck energy", "Come alone", "Recipes swapped"],
  firstTimerPromise:
    "You’ll know the menu, the dress code (there isn’t one), and who’s saving you a chair before you knock on the door.",
  whatToExpect: [
    "Ring the bell at 7. Someone will answer with your name.",
    "One shared main, two sides, dessert if anyone’s feeling ambitious.",
    "A toast before the first bite. Stay for dishes or slip out after coffee.",
  ],
  host: {
    name: "Daniel Ruiz",
    bio: "Daniel hosts from his dining room. He keeps the guest list at six so nobody disappears into the kitchen alone.",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  },
  upcomingSession: {
    id: "session_rsc_july_2026",
    startsAt: new Date("2026-07-10T19:00:00-04:00"),
    locationArea: "Riverside",
    title: "Summer tomato pasta night",
    capacity: 6,
    spotsRemaining: 2,
  },
  memories: [
    {
      id: "memory_rsc_june",
      sessionTitle: "Lemon chicken & stories",
      dateLabel: "June 12",
      excerpt:
        "Two first-timers, four returns. Someone brought tiramisu from a recipe card stained with olive oil.",
    },
  ],
};

export const tuesdayBoardNight: Club = {
  id: "club_tuesday_board",
  slug: "tuesday-board-night",
  name: "Tuesday Board Night",
  tagline: "Strategy games, bad jokes, and someone who explains the rules without sighing.",
  description:
    "We meet at the back table of a café that doesn’t mind dice rolls. New games every month, same friendly faces. If you’ve never played anything harder than Uno, you’re in the right place.",
  coverImageUrl:
    "https://images.unsplash.com/photo-1611371805429-8b5c1b2c34ba?auto=format&fit=crop&w=1600&q=80",
  ritualLabel: "Every Tuesday · 6:30 PM",
  vibe: ["Café table", "Rules explained", "Low stakes", "Come alone"],
  firstTimerPromise:
    "We’ll pair you with someone who’s played before and pick a starter game that doesn’t take three hours.",
  whatToExpect: [
    "Grab the table by the window. Look for the stack of boxes.",
    "Warm-up game first, then whatever the group votes on.",
    "Order food whenever. Nobody waits for a perfect turn.",
  ],
  host: {
    name: "Priya Nair",
    bio: "Priya keeps a shelf of games at home and believes the best nights start with someone saying ‘I’ve never played this.’",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
  },
  upcomingSession: {
    id: "session_tbn_july_2026",
    startsAt: new Date("2026-07-08T18:30:00-04:00"),
    locationArea: "Maple Street Café",
    title: "Wingspan & newcomers round",
    capacity: 12,
    spotsRemaining: 4,
  },
  memories: [
    {
      id: "memory_tbn_june",
      sessionTitle: "Catan chaos",
      dateLabel: "June 24",
      excerpt:
        "Three first-timers learned sheep trading. Someone stayed until closing arguing about ports.",
    },
  ],
};

export const saturdayRunClub: Club = {
  id: "club_saturday_run",
  slug: "saturday-run-club",
  name: "Saturday Run Club",
  tagline: "Five miles, slow pace, coffee after. No PRs required.",
  description:
    "We run the river path at conversation speed. Walkers welcome for the first mile. The ritual is the café afterward, not the split time.",
  coverImageUrl:
    "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?auto=format&fit=crop&w=1600&q=80",
  ritualLabel: "Every Saturday · 8:00 AM",
  vibe: ["Slow pace", "Coffee after", "All levels", "Come alone"],
  firstTimerPromise:
    "You’ll get the route, the meetup pin, and who’s running buddy duty before lacing up.",
  whatToExpect: [
    "Meet at the bridge statue. Someone in a yellow cap.",
    "Walk the first half mile if you need to warm up.",
    "Coffee at the corner shop. Stay ten minutes or the whole morning.",
  ],
  host: {
    name: "Alex Kim",
    bio: "Alex started this run so newcomers had one less excuse to skip Saturday mornings.",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
  },
  upcomingSession: {
    id: "session_src_july_2026",
    startsAt: new Date("2026-07-11T08:00:00-04:00"),
    locationArea: "River Bridge",
    title: "Summer loop + iced lattes",
    capacity: 20,
    spotsRemaining: 9,
  },
  memories: [
    {
      id: "memory_src_june",
      sessionTitle: "Misty five-miler",
      dateLabel: "June 28",
      excerpt:
        "Four first-timers, twelve returns. Someone forgot shoes and walked the first mile anyway.",
    },
  ],
};

const demoClubsBySlug: Record<string, Club> = {
  [sundayCinemaWalks.slug]: sundayCinemaWalks,
  [riversideSupperClub.slug]: riversideSupperClub,
  [tuesdayBoardNight.slug]: tuesdayBoardNight,
  [saturdayRunClub.slug]: saturdayRunClub,
};

export function getDemoClubBySlug(slug: string): Club | null {
  return demoClubsBySlug[slug] ?? null;
}

export function getFeaturedDemoClubs(): Club[] {
  return [
    sundayCinemaWalks,
    riversideSupperClub,
    tuesdayBoardNight,
    saturdayRunClub,
  ];
}
