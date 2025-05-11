# 🎬 Movie Explorer App

**Movie Explorer** is a modern React web application for discovering, exploring, and managing your favorite movies. It fetches real-time data from [TMDb (The Movie Database)](https://www.themoviedb.org/) API and provides features like trending movies, search suggestions, favorites, login simulation, and search history all wrapped in a sleek, responsive UI.

**[✨ Deployed live link](https://rad-bunny-800d9b.netlify.app/)**

<div align="center">
  <img src="https://github.com/user-attachments/assets/5987c05b-1569-4981-aee6-679dc9a1f901" alt="App Preview" width="600" />
</div>

## 🚀 Features

- 🔍 **Search Movies** with real-time suggestions as you type
- 📈 **Trending & Popular Movie Sections** to discover new films
- ❤️ **Add to Favorites** and manage your personalized movie collection
- 🕵️ **Search History Tracking** with infinite scroll for previous searches
- 🎬 **Movie Details View** with metadata, cast information, trailers, and ratings
- 🔐 **Login Screen** with demo access for personalized features
- 🌙 **Dark/Light Mode Toggle** for comfortable viewing
- 📱 **Responsive Design** that works beautifully on all devices

## 🧰 Tech Stack

- **React** (with Hooks for state management)
- **React Router DOM** for navigation
- **Material-UI (MUI v5)** for modern, responsive styling
- **Axios** for efficient API communication
- **TMDb API** for comprehensive movie data
- **Local Storage** for saving user preferences

## 🛠️ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/basuru07/movie-explorer-app.git
cd movie-explorer-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm start
```

The app will be available at: [http://localhost:3000](http://localhost:3000)

### 4. Build for production
```bash
npm run build
```

## 🔑 TMDb API Usage

The app leverages TMDb API for movie data with these endpoints:

* `/movie/popular` - Popular movies section
* `/movie/top_rated` - Top rated movies collection
* `/trending/movie/day` - Daily trending movies
* `/search/movie?query=...` - Search functionality
* `/movie/{movie_id}` - Detailed movie information
* `/movie/{movie_id}/videos` - Movie trailers and clips
* `/movie/{movie_id}/credits` - Cast and crew data

⚠️ The API key is pre-configured inside `src/api/tmdb.js` using Axios. For production, it is recommended to use environment variables (`.env`).

## 🗂️ Project Structure

```
movie-explorer/
├── build/                 # Production build files
├── node_modules/          # Dependencies
├── public/                # Static files
│   ├── _redirects         # Netlify redirects configuration
│   ├── favicon.ico        # Site favicon
│   ├── index.html         # HTML entry point
│   ├── logo192.png        # App logo (small)
│   ├── logo512.png        # App logo (large)
│   ├── manifest.json      # PWA manifest file
│   └── robots.txt         # Search engine instructions
│
├── src/                   # Source code
│   ├── api/               # API configuration
│   │   └── tmdb.js        # TMDb API setup with Axios
│   ├── assets/            # Static assets (images, fonts)
│   ├── components/        # Reusable UI components
│   ├── context/           # React context providers
│   │   └── ThemeContext.js # Dark/light mode toggle
│   ├── pages/             # Application pages
│   ├── App.css            # App-level styles
│   ├── App.jsx            # Main App component with routing
│   ├── App.test.js        # App component tests
│   ├── index.css          # Global styles
│   ├── index.js           # React entry point
│   ├── logo.svg           # App logo in SVG format
│   ├── reportWebVitals.js # Performance monitoring
│   ├── setupTests.js      # Test configuration
│   └── theme.js           # Global theme configuration
│
├── .env                   # Environment variables
├── .gitignore            # Git ignore configuration
└── package-lock.json     # Dependency lock file
```

## 🧪 Test Login

Use these demo credentials to explore all features:
* **Username:** `admin`
* **Password:** `admin`

Once logged in, you can access:
* 💾 Favorites collection
* 🕓 Search history log
* 🎛️ Persistent login with localStorage

## 📸 Screenshots

<div align="center">
  <div style="display: flex; justify-content: center; margin-bottom: 20px;">
    <img src="https://github.com/user-attachments/assets/ac256cdd-f736-4a68-af00-2024fa8b1f0a" alt="Home Page" width="48%" style="margin-right: 2%"/>
    <img src="https://github.com/user-attachments/assets/c8874827-ecac-4e28-9e82-b012dd4d1333" alt="Movie Details" width="48%"/>
  </div>
  <div style="display: flex; justify-content: center;">
    <img src="https://github.com/user-attachments/assets/f6d61c63-3bf7-4b23-b06a-39811deab6f4" alt="Favorites Page" width="48%" style="margin-right: 2%"/>
    <img src="https://github.com/user-attachments/assets/c5171dac-b54d-4df3-aa91-b2b5c0c4e329" alt="Search Results" width="48%"/>
  </div>
</div>


## 🚀 Deployment

### Netlify Deployment (Current)
This project is deployed on Netlify at [https://rad-bunny-800d9b.netlify.app/](https://rad-bunny-800d9b.netlify.app/)

### Deploy to GitHub Pages
1. Install GitHub Pages package:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to package.json:
   ```json
   "homepage": "https://your-username.github.io/movie-explorer-app",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```

3. Deploy with:
   ```bash
   npm run deploy
   ```

