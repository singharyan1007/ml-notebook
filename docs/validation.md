# Validation — 28 October 2026

- Astro production build succeeds; Pagefind builds the full-text index.
- Generated output: overview, four notes, and a 404 page.
- All four source note bodies match the approved starter note bodies exactly.
- Internal-link check passes across 6 pages and 200 internal links and assets, including GitHub Pages base paths and heading fragments. Canonical metadata links are excluded from navigation validation.
- Desktop browser: sidebar navigation, wiki links rendered as page links, full-text search for regularization, highlighted snippets, and search links to the Regularization section.
- 390px iframe (375px content width): mobile menu opens, a note link navigates and closes the menu, Pagefind returns no results for quasarxyz, activation finds Neural networks, search links open a note, and the mobile table of contents navigates to Forward propagation. No horizontal page overflow on the tested note.
- Workflow: builds on master pushes and pull requests; deploys master pushes after the owner approved public GitHub Pages hosting. Pull-request builds do not deploy.
- Existing private Sites deployment remains unchanged.
