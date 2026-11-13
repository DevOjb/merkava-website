# Frontend Development Guide

## 1. Development setup
The site is plain HTML, CSS and JavaScript. No build command is required. Open `index.html` through VS Code Live Server for local development.

Recommended editor setup:
- VS Code
- Prettier using the repository `.prettierrc`
- Browser developer tools
- A current Chromium- or Firefox-based browser

## 2. Application lifecycle
1. Browser loads `index.html`.
2. CSS files load in the declared order.
3. JavaScript files load in the declared order.
4. `app.js` reads `location.hash` (default `#home`).
5. `render()` selects a matching `V` view, renders shared navigation/footer and the page body.
6. User actions call functions declared in `js/actions/`.
7. The demo store mutates `DB` and persists it in localStorage.

## 3. View/action separation
Keep the distinction:
- **View files** (`js/views/`) return markup and display state.
- **Action files** (`js/actions/`) validate user input, coordinate workflows and update data.
- **Store/data adapter** (`js/store.js`) supplies and persists records in the demo.
- **Utilities** (`js/utils.js`) contains generic helpers.

Do not put server credentials, database access or payment verification logic in views or actions. Production browser actions should call a service/API adapter; the server owns privileged operations.

## 4. Shared state and naming
The existing application uses shared globals such as `V`, `DB`, `S`, `IMG`, `S.uid` and named action handlers. This is a deliberate legacy/classic-script architecture. Preserve the existing public names when making small compatible changes. For larger changes, introduce a planned module/service boundary and update the script-loading strategy in one controlled refactor.

Before adding a new global:
- search the project for an existing helper with the same responsibility;
- use a descriptive name;
- document ownership and dependencies;
- avoid reusing short names across unrelated responsibilities.

## 5. Adding or editing a view
1. Find the matching view file in `js/views/`.
2. Add or update the view function on the existing `V` object.
3. Add the route title in `TITLES` in `js/app.js` if needed.
4. Add navigation links only if the view should be directly accessible.
5. Put event handlers in the appropriate `js/actions/` file.
6. Add styling to the most relevant CSS layer.
7. Test direct hash navigation, refresh, back/forward navigation and mobile layout.

## 6. Editing business content
`js/config.js` is the central location for contact information, tagline, asset paths and optional client-provided content. Route prices, times, vehicles and passenger capacities are currently seeded in `js/store.js`. These are demo values and should be moved to backend-managed data after integration.

Do not put customer-specific data or credentials into static source files.

## 7. Accessibility and responsive behaviour
Preserve semantic labels, input labels, focus visibility, keyboard access, meaningful image alternative text, reduced-motion support and the responsive rules. Test with keyboard-only navigation and at least one screen reader/browser combination before launch.

## 8. Frontend API boundary
The backend integration should be introduced behind a dedicated API/service adapter rather than scattering raw `fetch()` calls throughout every view. The adapter should:
- centralise the API base URL;
- add authentication credentials according to the agreed session strategy;
- parse and normalise responses;
- handle non-2xx errors and network failures;
- expose predictable methods to actions;
- never expose private API or payment secrets.

The final adapter design depends on the backend's agreed API contract.
