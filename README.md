# Multi Tenant App in NextJS

I am creating the baseline for the Multi Tenant App in NextJs with inspiration [platform starter kit](https://demo.vercel.pub/platforms-starter-kit) from vercel.

You can also check the more details [here](https://vercel.com/templates/next.js/platforms-starter-kit).

## The structure of the project

In this project I wanted to have the following logic and structure:
1. We will have a homepage for the app. More like a landing page
2. On the main route `/` we will be able to add any other url route. For now we have `/other` as well
3. The will be a `app.youpagename.com` route that will be only accessible if the user is logged in. If he is not logged in he will need to sign in our sign up to the application first and will be routed to the `login` page of the app
4. Inside the the `auth` route the user will be landing in the dashboard. In this case I build different routes in the app, `listings` and `settings`.
5. The user will need to create his profile in the `settings` page and would be able to add `listings` to his app. We should also be adding the `home-guides` for the user to start to share their guides with the world
6. When creating a listing the user will need to the subdomain that he wants for it as well as the description so that it builds the `[domain]` page 

```
app
 ┣ [domain]
 ┃ ┣ home-guides
 ┃ ┃ ┗ page.js
 ┃ ┣ layout.js
 ┃ ┗ page.js
 ┣ app
 ┃ ┣ (auth)
 ┃ ┃ ┣ (dashboard)
 ┃ ┃ ┃ ┣ listings
 ┃ ┃ ┃ ┃ ┗ page.js
 ┃ ┃ ┃ ┣ settings
 ┃ ┃ ┃ ┃ ┗ page.js
 ┃ ┃ ┃ ┗ page.js
 ┃ ┃ ┗ login
 ┃ ┃ ┃ ┗ page.js
 ┃ ┗ layout.js
 ┣ home
 ┃ ┣ other
 ┃ ┃ ┗ page.js
 ┃ ┗ page.js
 ┣ favicon.ico
 ┣ globals.css
 ┣ layout.js
 ┗ not-found.js    
```

## Questions for the middleware 

I am was not able to solve a couple of things in the way that I put together the middleware yet:

- [ ] When I do not have the subdomain specified I shouldn't show the page to my user, I should route him to a 404. How should I do that? 
- [ ] If the user tries to go the `home-guides` from the main page he shouldn't be able to. 


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.




