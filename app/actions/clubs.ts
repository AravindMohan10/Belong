"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  clubSlugExists,
  createClubWithSession,
} from "@/db/queries/clubs";
import { getSession } from "@/lib/auth/session";
import { appendSlugSuffix, slugifyClubName } from "@/lib/clubs/slug";
import { createClubSchema } from "@/lib/validators/club";
import { isDatabaseConfigured } from "@/db/client";
import { getCityPreset } from "@/lib/location/presets";

export type CreateClubActionState = {
  error?: string;
};

export async function createClubAction(
  _prevState: CreateClubActionState,
  formData: FormData,
): Promise<CreateClubActionState> {
  if (!isDatabaseConfigured()) {
    return { error: "Database is not configured." };
  }

  const session = await getSession();

  if (!session) {
    redirect("/enter?next=/host/clubs/new");
  }

  const parsed = createClubSchema.safeParse({
    name: formData.get("name"),
    tagline: formData.get("tagline"),
    description: formData.get("description"),
    coverImageUrl: formData.get("coverImageUrl"),
    ritualLabel: formData.get("ritualLabel"),
    vibe: formData.get("vibe"),
    firstTimerPromise: formData.get("firstTimerPromise"),
    whatToExpect: formData.get("whatToExpect"),
    sessionTitle: formData.get("sessionTitle"),
    sessionStartsAt: formData.get("sessionStartsAt"),
    locationArea: formData.get("locationArea"),
    capacity: formData.get("capacity"),
    meetingPoint: formData.get("meetingPoint"),
    exactPin: formData.get("exactPin") || undefined,
    warmStartSteps: formData.get("warmStartSteps"),
    warmStartFindTheGroup: formData.get("warmStartFindTheGroup"),
    warmStartSmallTalkLine: formData.get("warmStartSmallTalkLine"),
    city: formData.get("city"),
    neighborhood: formData.get("neighborhood"),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Check the form and try again.",
    };
  }

  const data = parsed.data;
  const cityPreset = getCityPreset(data.city);

  if (!cityPreset) {
    return { error: "Pick a supported city." };
  }

  let slug = slugifyClubName(data.name);

  if (!slug) {
    return { error: "Choose a club name with letters or numbers." };
  }

  let suffix = 1;
  while (await clubSlugExists(slug)) {
    suffix += 1;
    slug = appendSlugSuffix(slugifyClubName(data.name), suffix);
  }

  const { slug: createdSlug } = await createClubWithSession({
    slug,
    name: data.name,
    tagline: data.tagline,
    description: data.description,
    coverImageUrl: data.coverImageUrl,
    ritualLabel: data.ritualLabel,
    vibe: data.vibe,
    firstTimerPromise: data.firstTimerPromise,
    whatToExpect: data.whatToExpect,
    city: cityPreset.city,
    neighborhood: data.neighborhood,
    latitude: cityPreset.latitude,
    longitude: cityPreset.longitude,
    hostUserId: session.id,
    session: {
      title: data.sessionTitle,
      startsAt: new Date(data.sessionStartsAt),
      locationArea: data.locationArea,
      capacity: data.capacity,
      meetingPoint: data.meetingPoint,
      exactPin: data.exactPin ?? null,
      warmStartFirstTenMinutes: data.warmStartSteps,
      warmStartFindTheGroup: data.warmStartFindTheGroup,
      warmStartSmallTalkLine: data.warmStartSmallTalkLine,
    },
  });

  revalidatePath("/");
  revalidatePath("/discover");
  revalidatePath(`/clubs/${createdSlug}`);
  revalidatePath("/host");
  redirect(`/host/clubs/${createdSlug}`);
}
