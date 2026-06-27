import { demoPersonas } from "@/lib/auth/demo-personas";
import { upsertDemoUser } from "@/db/queries/users";
import { getDb, isDatabaseConfigured } from "@/db/client";

async function seed() {
  if (!isDatabaseConfigured()) {
    console.error("DATABASE_URL is not set. Skipping seed.");
    process.exit(1);
  }

  await getDb();

  for (const persona of demoPersonas) {
    await upsertDemoUser({
      id: persona.id,
      role: persona.role,
      displayName: persona.displayName,
      hostClubSlug: persona.hostClubSlug,
    });
    console.log(`Seeded ${persona.displayName} (${persona.role})`);
  }

  console.log("Demo users ready.");
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
