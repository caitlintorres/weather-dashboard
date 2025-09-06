# 🌤️ Angular Weather Dashboard

A simple weather dashboard built with **Angular** that fetches real-time
weather and a 5-day forecast from OpenWeatherMap.

## 🚀 Features

-   Search for a city and view current weather conditions
-   5-day forecast (daily overview)
-   Toggle between °C/°F
-   Stores recent searches locally
-   API key protection using a **serverless backend** or **Express
    proxy**

------------------------------------------------------------------------

## 📦 Setup

### 1. Clone repo & install dependencies

``` bash
git clone https://github.com/caitlintorres/weather-dashboard.git
cd weather-dashboard
npm install
```

### 2. Create environment files

Add your API key (only for local testing --- don't push it to GitHub).

**src/environments/environment.ts**

``` ts
export const environment = {
  production: false,
  openWeatherApiKey: 'YOUR_KEY_HERE'
};
```

### 3. Run locally

``` bash
ng serve -o
```

------------------------------------------------------------------------

## 🔒 Protecting Your API Key

Since Angular runs in the browser, **you cannot hide secrets** in
frontend code.\
To protect your OpenWeatherMap key:

### Option A: Serverless Function (Vercel/Netlify/Cloudflare)

-   Add `api/weather.ts` (see repo example)
-   Store your `OPENWEATHER_API_KEY` as a project **Environment
    Variable**
-   Angular calls `/api/weather?city=Seattle` instead of
    `api.openweathermap.org`

### Option B: Express Proxy

-   Create `server.js` with Express
-   Use `process.env.OPENWEATHER_API_KEY`
-   Run `node server.js` and point Angular to
    `http://localhost:8080/api/weather`

### Don't Commit Secrets

Add this to `.gitignore`:

    .env
    src/environments/environment*.local.ts

If you already committed a key: 1. Rotate it in OpenWeatherMap 2. Clean
your repo history (e.g. using BFG or git filter-repo)

------------------------------------------------------------------------

## 🛠 Technologies

-   Angular
-   RxJS
-   SCSS
-   OpenWeatherMap API
-   Optionally: Node/Express or Vercel/Netlify Functions

------------------------------------------------------------------------

## 📄 License

MIT
