# Security Notes

Current npm audit shows moderate transitive dev/build dependency warnings:

- Next.js nested PostCSS audit warning
- drizzle-kit transitive esbuild warning

We are not running `npm audit fix --force` because it would downgrade or break core framework packages.

Current mitigation:
- No user-submitted CSS is parsed and embedded into HTML in this app.
- `drizzle-kit` is used as a local development/migration tool, not shipped to the browser/runtime.
- We will keep dependencies updated and revisit before final deployment.