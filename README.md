
# 🌦 Weather Journal App

A full-stack weather journal app where users can:
- Search live weather by location (city, zip, or GPS)
- Create journal entries linked to locations
- See a 5-day forecast
- View related YouTube videos and Google Maps
- Export entries as JSON or CSV

Built with **React**, **Node.js**, **Express**, and **MongoDB**. Weather data is powered by **OpenWeatherMap API**.

---

## ✨ Features

- 🔍 **Live weather** search by city or GPS
- 🗓 **Journal entry CRUD** (Create, Read, Update, Delete)
- 🛰 **Google Maps** and 📺 **YouTube videos** for each location
- 📁 **Export** entries as JSON or CSV
- ⚙️ Built with modular backend (MongoDB + Express)

---

## 🖼️ Demo Screenshots

> *(Add your screenshots here! You can drag images into GitHub after pushing)*

---

## 🚀 Technologies Used

| Frontend | Backend  | APIs / Tools            |
|----------|----------|--------------------------|
| React    | Node.js  | OpenWeatherMap API       |
| Tailwind CSS | Express | YouTube Data API       |
| Axios    | MongoDB Atlas | Google Maps Embed API |
| React Icons | Nodemon | json2csv               |

---

## 📦 Project Structure

```
weather-app/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env                # MongoDB URI
│
├── src/
│   ├── components/
│   ├── pages/
│   └── App.js
├── .env                    # API keys for OpenWeather, YouTube, etc.
└── README.md
```

---

## 🔐 Environment Variables

Create two `.env` files:

### 📁 `/backend/.env`

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### 📁 `/weather-app/.env`

```
REACT_APP_WEATHER_API_KEY=your_openweather_key
REACT_APP_YOUTUBE_API_KEY=your_youtube_key
REACT_APP_GOOGLE_MAPS_API_KEY=your_maps_key
```

---

## 🛠️ Setup Instructions

### 1. Clone this repo

```bash
git clone https://github.com/your-username/weather-journal-app.git
cd weather-journal-app
```

### 2. Install dependencies

```bash
# Frontend
npm install

# Backend
cd backend
npm install
```

### 3. Set environment variables

Create the `.env` files as described above.

### 4. Run the app

In two terminals:

```bash
# Terminal 1: Start backend
cd backend
npm run dev

# Terminal 2: Start frontend
cd ..
npm start
```

---

## 🧪 API Test Endpoints

- `GET /api/entries` → fetch all entries
- `POST /api/entries` → create a new entry
- `DELETE /api/entries/:id` → delete an entry
- `GET /api/entries/export/csv` → download CSV
- `GET /api/entries/export/json` → download JSON

---

## 📤 Deployment Ideas

- Frontend: [Vercel](https://vercel.com/)
- Backend: [Render](https://render.com/), [Railway](https://railway.app/), or [Fly.io](https://fly.io/)

---

## 📌 To-Do / Future Ideas

- [ ] Dark mode toggle
- [ ] Markdown support in journal notes
- [ ] Editable journal entries (Update feature)
- [ ] User authentication (optional)

---

## 👨‍💻 Author

Made by **[Your Name]**  
Feel free to [connect with me](https://github.com/your-username)!

---

> ⚠️ Be sure to exclude your `.env` files from Git by keeping them listed in `.gitignore`.
