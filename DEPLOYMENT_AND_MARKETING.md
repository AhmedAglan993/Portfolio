# How to Deploy Your Portfolio & Get Hired

Your portfolio is code-complete! To share it with recruiters or run ads, it needs to be **live on the internet**.

## 1. Deploy for Free (Recommended: Vercel)
Vercel is the industry standard for React portfolios. It's free, fast, and gives you a link like `ahmed-aglan.vercel.app` instantly.

### Option A: Drag & Drop (Easiest)
1. Open your terminal in this folder and run: 
   `npm run build`
   *(This creates a `dist` folder with your finished site)*.
2. Go to [Vercel.com](https://vercel.com) and sign up.
3. Drag the `dist` folder onto their dashboard.
4. **Done!** They give you a link.

### Option B: Connect to GitHub (Professional)
1. Push this project to a new GitHub Repository.
2. Go to Vercel, click "Add New Project", and select your GitHub repo.
3. Vercel will auto-detect "Vite" settings. Click **Deploy**.
4. **Benefit:** Every time you push code changes to GitHub, your live site updates automatically.

---

## 2. Prepare for Sharing (Social Media)
I have added special "**Open Graph**" tags to your code. This means when you share your link on LinkedIn or WhatsApp, it will show a nice preview card instead of just text.

**Action Item:**
1. Take a nice screenshot of your Hero section (the top of your site).
2. Name it `og-preview.jpg`.
3. Put it in your `public` folder.
*(If you don't do this, the link preview image will be blank).*

---

## 3. Marketing Strategy for Game Devs

### Where to Advertise?
Running "general" ads (like Google Search) might be expensive and vague. Target specific networks:
*   **LinkedIn Ads:** Target specific Job Titles (e.g., "CTO", "Game Director", "Studio Head") in specific companies (e.g., "Ubisoft", "Zynga", or local studios).
*   **Reddit Ads:** Target subreddits like `r/gamedev`, `r/unity3d`, `r/unrealengine`.
*   **Twitter/X:** Use hashtags like `#gamedev #VR #AR` with a video of your project hover effects.

### What to Share?
Don't just share the link!
*   **Record a video** of you using the website. Show off the "Mouse Hover" video playback and the "Chat with Nexus" AI feature.
*   **Post Caption:** *"I built a portfolio that builds itself. My AI assistant Nexus knows my entire 10-year career history. Ask it anything! [Link]"*
*   **Why?** Recruiters love interactive stuff. The AI feature is a huge hook.

## 4. Analytics
If you are paying for ads, you MUST know if people are visiting.
1. Sign up for a free **Google Analytics** account.
2. Get your "Measurement ID" (starts with `G-`).
3. I can add a snippet to your code to track visitors if you provide that ID.
