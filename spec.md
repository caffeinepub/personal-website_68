# Specification

## Summary
**Goal:** Build a warm, personal multi-section website ("My Personal Space") with a homepage, Resume, Blogs, Memories, Articles, and Kids' Study Material sections, plus a simple owner-only admin mode for managing content.

**Planned changes:**
- Apply a consistent earthy, cozy visual theme (warm beige, forest green, soft terracotta) with serif/sans-serif typography across all pages
- Build a homepage with a hero section (owner name + bio, botanical background image), navigation bar linking to all five sections, and a site overview
- Implement a Resume section displaying summary, work experience timeline, education, and skills — data fetched from the backend
- Implement a Blog section with a post listing page (cards with title, date, tags) and full post view; posts stored in the backend
- Implement a Memories section with a grid/masonry photo gallery; each entry has a title, description, and image URL; stored in the backend
- Implement an Articles section with a listing page (cards with title, date, excerpt) and full article view; stored in the backend
- Implement a Kids' Study Material section with a subject-filterable grid using a slightly playful style; each item has a title, subject, description, and content/link; stored in the backend
- Add a PIN-protected admin mode that reveals "Add New" forms for each section (Blog, Memories, Articles, Study Material, Resume)
- Serve the hero background image as a static asset

**User-visible outcome:** Visitors can browse a warm, journal-style personal website across all five content sections; the owner can log into admin mode with a PIN to add and manage content directly on the site.
