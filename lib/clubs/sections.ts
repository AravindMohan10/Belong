export type HostFormField = {
  name: string;
  label: string;
  hint?: string;
  kind: "text" | "textarea" | "lines" | "url" | "number" | "datetime" | "select-city";
  required?: boolean;
  placeholder?: string;
  rows?: number;
};

export type HostFormSection = {
  id: string;
  title: string;
  audience: "public" | "gated";
  intro: string;
  fields: HostFormField[];
};

export function hostClubFormSections(): HostFormSection[] {
  return [
    {
      id: "club",
      title: "The club",
      audience: "public",
      intro:
        "What guests see on your public page. Keep neighborhood and vibe here, not addresses or how to find you.",
      fields: [
        { name: "city", label: "City", kind: "select-city", required: true },
        {
          name: "neighborhood",
          label: "Neighborhood",
          kind: "text",
          required: true,
          placeholder: "Williamsburg",
        },
        { name: "name", label: "Club name", kind: "text", required: true },
        {
          name: "ritualLabel",
          label: "Schedule line",
          kind: "text",
          required: true,
          placeholder: "Every third Sunday · 4:00 PM",
        },
        { name: "tagline", label: "Tagline", kind: "text", required: true },
        {
          name: "description",
          label: "How it runs",
          kind: "textarea",
          required: true,
          rows: 4,
          hint: "Neighborhood, ritual, and vibe. No street address or meetup cues.",
        },
        {
          name: "coverImageUrl",
          label: "Cover image URL",
          kind: "url",
          required: true,
          placeholder: "https://...",
        },
        {
          name: "vibe",
          label: "Vibe tags",
          kind: "text",
          required: true,
          placeholder: "Walk first, Small room, Come alone",
          hint: "Comma separated.",
        },
      ],
    },
    {
      id: "firstVisit",
      title: "First visit",
      audience: "public",
      intro:
        "Reassurance for people showing up alone. Describe the flow of the evening, not where to meet.",
      fields: [
        {
          name: "firstTimerPromise",
          label: "First-timer promise",
          kind: "textarea",
          required: true,
          rows: 3,
          hint: "What they get before they arrive. Warm Start unlocks after they save a seat.",
        },
        {
          name: "whatToExpect",
          label: "What happens when",
          kind: "lines",
          required: true,
          rows: 4,
          placeholder:
            "Gather with the group\nShort intro\nStay as long as you like",
          hint: "One step per line. Evening flow only, no addresses.",
        },
      ],
    },
    {
      id: "gathering",
      title: "First upcoming gathering",
      audience: "public",
      intro:
        "Date, area, and capacity show before guests confirm. Exact meetup details stay in Warm Start.",
      fields: [
        { name: "sessionTitle", label: "Gathering title", kind: "text", required: true },
        {
          name: "sessionStartsAt",
          label: "Starts at",
          kind: "datetime",
          required: true,
        },
        {
          name: "locationArea",
          label: "Area name",
          kind: "text",
          required: true,
          hint: "Neighborhood or venue name guests see before they RSVP.",
        },
        { name: "capacity", label: "Capacity", kind: "number", required: true },
      ],
    },
    {
      id: "warmStart",
      title: "Warm Start",
      audience: "gated",
      intro:
        "Only guests who save a seat see this. Put addresses, pins, and find-the-group cues here.",
      fields: [
        {
          name: "meetingPoint",
          label: "Meeting point",
          kind: "text",
          required: true,
          hint: "Short cue shown in Warm Start.",
        },
        {
          name: "exactPin",
          label: "Exact pin",
          kind: "text",
          hint: "Optional address or map pin.",
        },
        {
          name: "warmStartSteps",
          label: "First ten minutes",
          kind: "lines",
          required: true,
          rows: 4,
          hint: "One step per line.",
        },
        {
          name: "warmStartFindTheGroup",
          label: "How to find the group",
          kind: "textarea",
          required: true,
          rows: 2,
        },
        {
          name: "warmStartSmallTalkLine",
          label: "If small talk is hard",
          kind: "text",
          required: true,
        },
      ],
    },
  ];
}
