reviews

Remaining

5. arrange pagination poperly
6. remove everything that is not needed including console.log √
7.

8. media query √
9. use mastercard and visa icon instead of the ai generated components

10. the transaction page should be empty as default then when admin add transaction before user will see so admin needs a add transaction √

11. separate business logic from ui √
12. move a data to one file data.ts √
13. fix card swiper indicator √
14. rename donut chart component to what is actually representing√
15. make the loading stimulator a hook √
16. remove all pages that have coming soon √
17. export csv should be a utility function √
18. filter logic should be a utility √
19. make route to just be dashboard and transactions √
20. remove the side bar store and move the move the logic to the dashboard layout √
21. type and interface should be one file √
22. remove useMedia √

23. fix name convention for cashBackBanner √
24. delete send money modal in dashboard √
25. delete coming soon component √
26. remove all other action in the wallet action to but keep the send action √
27. Default user should be admin √

**note** This project helped me apply Atomic Design principles, build custom hooks for performance, and create a smooth, responsive user experience across devices.
I’m actively looking for Frontend Developer opportunitie

**use this as refer**

Skip to content
udayrd44688-lab
dashboard-frontend
Repository navigation
Code
Issues
Pull requests
Actions
Projects
Security and quality
Insights
Important update
On April 24 we'll start using GitHub Copilot interaction data for AI model training unless you opt out. Review this update and manage your preferences in your GitHub account settings.
Owner avatar
dashboard-frontend
Public
udayrd44688-lab/dashboard-frontend
Go to file
t
Name
udayrd44688-lab
udayrd44688-lab
Revise README for clarity and content updates
8b66d07
·
16 hours ago
css
Add files via upload
16 hours ago
js
Add files via upload
16 hours ago
README.md
Revise README for clarity and content updates
16 hours ago
index.html
Add files via upload
16 hours ago
Repository files navigation
README
Fin.Dash — Finance Dashboard
A personal finance dashboard I put together for a frontend assignment. It tracks your income, expenses, savings goals, and gives you some decent insights into where your moneys actually going.

Built entierly with plain HTML, CSS, and vanilla JavaScript — no frameworks, no npm, no build tools. Just open the file and you're good to go.

Getting Started
Just open index.html in a browser.

# if you want a local server (totally optional):

python -m http.server 8080
No npm install, no node_modules bloat, no webpack configs. All external stuff loads from CDN.

What's In Here
Dashboard
Four summary cards at the top (Total Balance, Income, Expenses, Savings Rate) with coloured top borders and animated counters
Balance Trend chart — line chart showing income vs expenses across 6 months
Daily Expenses — bar chart with previous period comparision
Summary donut chart with the total amount displayed right in the center
Transaction list with those nice colored initial circles
Savings Goal tracker with a progress bar
Quick Stats card (total transactions, average expense, top spending category, data span)
Personalized greeting that uses your account name
Transactions
Full sortable table with all 70 mock transactions
Search — just start typing and it filters instantly
Category and type filters
Column headers are clickable for sorting
Add, edit, delete (admin only obviously)
Export to CSV or JSON
Analytics
Same summary cards row as the dashboard for consistancy
Highest spending category breakdown
Month-over-month spending trends
Average expense calculations
Top 5 biggest expenses with category icons
Category breakdown with animated progress bars
Monthly summary table
Balance Trend chart alongside Monthly Comparision
User Accounts
Click on your name/avatar in the top right corner to open the account manager. You can:

Add new accounts — each one gets its own separate data
Switch between accounts — click any account to swap instantly
Remove accounts — trash icon (cant delete the last one though)
Each account has independant transactions, theme preferences, and role settings stored in localStorage.

Role-Based UI
Theres a role switcher in the top nav. Two modes:

Admin — full CRUD access, can add/edit/delete transactions
Viewer — read-only mode, all the edit buttons dissapear
Just frontend simulation, no actual authentication happening.

Other Stuff
Dark & Light mode — toggle button in the top nav, preference saved per account
Glassmorphism — subtle backdrop-blur effect on cards and navigation, gives it that frosted glass look
Data persistence — everything saves to localStorage per user account
Export — download transactions as CSV or JSON files
Keyboard shortcuts — press 1/2/3 to switch pages, Ctrl+D toggles theme
Responsive — works on mobile with bottom navigation bar
Animations — counter animations, card fade-ins with staggerd delays, hover effects
Tech Stack
What Why
HTML/CSS/JS No framework needed for this scope, keeps it simple
Chart.js 4.4.8 Charting library, loaded from jsdelivr CDN
Lucide Icons 0.469.0 Clean SVG icon set, loaded from unpkg CDN
Google Fonts (Inter) Professional sans-serif typography
All external dependancies loaded via CDN with pinned versions. Did a security check on each one — no known vulnerabilites.

Project Structure
frontend assignment/
├── index.html # main app shell with top navigation
├── css/
│ └── styles.css # design system, glassmorphism, dark/light themes
├── js/
│ ├── data.js # mock transaction data + helper functions
│ ├── state.js # state management with multi-user account support
│ ├── charts.js # chart.js wrapper (line, bar, donut charts)
│ ├── dashboard.js # main dashboard page
│ ├── transactions.js # transactions table + CRUD modal
│ ├── insights.js # analytics/insights page
│ └── app.js # init, routing, theme, role, account manager
└── README.md
How the State Works
Went with a custom pub/sub store instead of pulling in a library for it. Its an IIFE that wraps the state object with subscribe(), setState(), and getState() methods. When anything changes, all the subscribers get notified so they can re-render there sections.

The multi-user system works by storing each account's data under a seperate localStorage key (finDash*state*{userId}). Switching accounts basically saves the current state, loads the new one, and triggers a full re-render. Probably overkill for a demo project but it was fun to implement.

Persistant stuff (transactions, theme, role) auto-saves to localStorage. Filters and page state dont get saved on purpose — felt wierd to refresh and still have a search query sitting there.

Key Technical Decisions
I want to walk through some of the decisions I made while building this, why I picked certain approaches, and what tradeoffs I was aware of.

Why No Framework?
Honestly, my first instinct was to reach for React since I've been using it in college projects. But I took a step back and thought about it — the assignment said I could use "any frontend framework or even plain JavaScript", and the scope didn't really need a virtual DOM or component lifecycle hooks. Its a dashboard with three pages and some charts, not a SaaS app.

So I went with vanilla JS. The main advantage is theres literally zero setup — no create-react-app, no npm install spinning for 2 minutes, no node_modules folder. You just open index.html and it works. I think that simplicity actually counts for something.

The tradeoff is obvious though — I had to handle my own rendering. Every time state changes, I'm basically re-writing innerHTML, which isn't great for performance. React's diffing algorithm would handle this way more efficently. But for 70 transactions and a few charts, it genuinly doesn't matter. Theres no perceptible lag.

If this was a real product with thousands of records and complex interactions, I'd definately go with React or Vue. But for this scope, vanilla felt like the right call.

Styling Approach
I used plain CSS with CSS custom properties (variables) for theming. No Tailwind, no SCSS, no CSS-in-JS. I know Tailwind is super popular right now and honestly I considered it, but since I wasn't using a build tool anyway, it didn't make sense to add one just for Tailwind.

The custom properties approach actually worked out really well for the dark/light theme switching. I define all my colors as variables in :root, and then override them under [data-theme="light"]. Switching themes is just one line — document.documentElement.setAttribute('data-theme', 'light') — and everything updates instantly because CSS does the heavy lifting.

For the visual style, I took inspiration from some finance dashboards I found on Dribbble and also looked at how platforms like TradingView handle dense financial data. I went with a near-black background (#0d0f12), glassmorphism on cards (the backdrop-filter: blur thing), and colored top-borders on the summary cards. The glassmorphism is subtle — its more about adding a tiny bit of depth then going full frosted-glass, you know?

One tradeoff here is that all my styles live in a single styles.css file which is around 1300 lines. In a bigger project I'd probably split it into multiple files or use something like CSS modules. But for a single-page dashboard, one file with clear section comments felt managable enough.

State Management
This is probably the part I spent the most time thinking about. I needed a way to:

Share data between the dashboard, transactions, and insights pages
Persist stuff to localStorage
React to changes (like when someone adds a transaction, the dashboard should update)
I built a simple pub/sub store using the module pattern (IIFE). It exposes setState(), get(), subscribe(), and some CRUD methods for transactions. When state changes, it saves to localStorage and notifies all subscribers.

I looked at using something like Zustand or even just the Observer pattern from a library, but importing a state management library for a vanilla JS project felt weird. The custom implementation is like 200 lines and does exactly what I need.

The multi-user account system was a later addition and its handled by storing each user's data under a seperate localStorage key. When you switch accounts, it saves the current state, loads the new user's data, and re-renders everything. Its a bit hacky — ideally each user would have server-side data — but it works surprisingly well for a frontend-only demo.

Tradeoff I'm aware of: My approach of re-rendering entire page sections on state change is not efficient. If I was using React, I'd get automatic DOM diffing. With vanilla JS, I'm replacing entire chunks of HTML which means all the DOM nodes get recreated. For this project its fine, but its not scalable. If I had more time, I'd probably implement a simple virtual DOM or at least do targeted updates instead of full re-renders.

Charting
I went with Chart.js because its the most well-documented charting library I've worked with and its available on CDN. I considered D3.js (which would give way more flexability) but D3 has a steep learning curve and I didn't want to spend days just on charts when Chart.js could handle line charts, bar charts, and donut charts out of the box.

I wrapped all the Chart.js stuff in a ChartManager module that handles creating, updating, and destroying chart instances. This was important because Chart.js doesn't clean up after itself — if you navigate away and come back, you need to destroy the old instance before creating a new one or you get memory leaks and weird rendering issues. Learned this the hard way during development lol.

The donut chart has a center text showing the total amount. I did this with a positioned HTML overlay instead of a Canvas plugin because CSS is easier to style and theme-switch then drawing text on a canvas.

Data & Mock Transactions
I created 70 mock transactions spread across 6 months with realistic descriptions ("Grocery Store", "Netflix Subscription", "Monthly Salary", etc). Tried to make them feel like actual spending patterns — salaries come in once a month, bills are recurring, there's more spending in December because holidays.

All the financial calculations (totals, averages, category breakdowns, running balance) are pure functions in data.js. I kept them seperate from the rendering logic so they're easy to test if I ever add unit tests.

What I'd Do Differently
Looking back, there are a few things I'd change if I started over:

Use TypeScript — I caught a couple bugs during development that TypeScript would have caught at compile time. Variable name typos, wrong function arguments, that sort of thing.
Component-based architecture — Even without React, I could have implemented a more structured component system with a base Component class that handles rendering and lifecycle.
CSS organization — One big CSS file works but its getting unwieldy. CSS modules or at least splitting into partials would be cleaner.
Better error handling — My localStorage operations have try/catch but theres not much user-facing error feedback. If localStorage is full or unavailable, the app just silently fails.
Accessability — I should have paid more attention to ARIA labels and keyboard navigation beyond the basic shortcuts. Screen reader support is probably not great right now.
Browser Support
Works in all modern browsers — Chrome, Firefox, Safari, Edge. Haven't tested IE11 becuase... its 2026 and I'm not putting myself through that.

Known Limitations
No real backend — all data is mocked and stored client-side
Role switching is just UI simulation, not actual authorization
Account data lives in localStorage so clearing browser data wipes everthing
Charts render fresh each time you navigate (no caching)
The glassmorphism effect might not be super visible on some monitors depending on contrast settings
Made for a frontend assignment. Definately not production-ready but I think it demonstrates the core concepts and shows what you can build with just vanilla web technologies. Learned alot while making this honestly.

About
zorvyn assignment

Resources
Readme
Activity
Stars
0 stars
Watchers
0 watching
Forks
0 forks
Report repository
Releases
No releases published
Packages
No packages published
Contributors
1
@udayrd44688-lab
udayrd44688-lab
Languages
JavaScript
67.9%

CSS
28.8%

HTML
3.3%
Footer
© 2026 GitHub, Inc.
Footer navigation
Terms
Privacy
Security
Status
Community
Docs
Contact
Manage cookies
Do not share my personal information
