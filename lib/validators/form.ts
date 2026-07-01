/** FormData.get returns null for missing fields; Zod expects undefined for optional strings. */
export function formField(value: FormDataEntryValue | null): string | undefined {
  return typeof value === "string" ? value : undefined;
}
