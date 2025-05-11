# 🎬 Movie Explorer App

**Movie Explorer** is a modern React web application for discovering, exploring, and managing your favorite movies. It fetches real-time data from [TMDb (The Movie Database)](https://www.themoviedb.org/) API and provides features like trending movies, search suggestions, favorites, login simulation, and search history — all wrapped in a sleek, responsive UI.

---

## 🚀 Features Implemented

- 🔍 **Search Movies** with real-time suggestions
- 📈 **Trending & Popular Movie Sections**
- ❤️ **Add to Favorites** and manage personalized list
- 🕵️ **Search History Tracking** with infinite scroll
- 🎬 **Movie Details View** with metadata, cast, trailer, and ratings
- 🔐 **Login Screen** (mock login for demo)
- 🌙 **Dark/Light Mode Toggle**
- 📱 **Responsive Design** for all screen sizes

---

## 🧰 Tech Stack

- **React** (with Hooks)
- **React Router DOM**
- **Material-UI (MUI v5)** for styling
- **Axios** for API communication
- **TMDb API** for movie data

---

## 🛠️ Project Setup

### 1. **Clone the repository**
```bash
git clone https://github.com/basuru07/movie-explorer-app.git
cd movie-explorer-app
```

### 2. **Install dependencies**
```bash
npm install
```

### 3. **Run the development server**
```bash
npm start
```

The app will be available at: https://rad-bunny-800d9b.netlify.app/

## 🔑 TMDb API Usage

This app uses TMDb API for movie data. API calls include:
* `/movie/popular`
* `/movie/top_rated`
* `/trending/movie/day`
* `/search/movie?query=...`
* `/movie/{movie_id}`
* `/movie/{movie_id}/videos`
* `/movie/{movie_id}/credits`

⚠️ The API key is pre-configured inside `src/api/tmdb.js` using Axios. For production, it is recommended to use environment variables (`.env`).

## 🗂️ Folder Structure

```
src/
├── api/            # Axios TMDb setup
├── components/     # Reusable UI components
├── context/        # Theme context for dark/light mode
├── pages/          # Route-based pages (Home, Login, Favorites, etc.)
├── App.jsx         # Main App with routing
├── index.js
```

## 🧪 Test Login

This is a **demo login** for basic authentication simulation.
* **Username:** `admin`
* **Password:** `admin`

Once logged in, you can access:
* 💾 Favorites
* 🕓 Search History
* 🎛️ Persistent login with localStorage

## 📸 Screenshots

![Home Page](screenshots/home.png)
![Movie Detail](screenshots/details.png)
