# 💰 Budget Tracker

**Budget Tracker** is a full-stack web application designed to help users manage their personal finances efficiently. It enables users to track income and expenses, visualize financial data, and generate reports, all within an intuitive interface.

---

## 🚀 Features

- 🔐 **User Authentication** — Secure registration and login using JWT  
- 📊 **Dashboard Overview** — Visual representation of income and expenses using charts  
- 💵 **Income Management** — Add, view, and delete income entries  
- 💸 **Expense Management** — Add, view, and delete expense entries  
- 📑 **Data Export** — Download income and expense data as Excel files  
- 👤 **Profile Management** — Upload and manage user profile images  
- 📱 **Responsive Design** — Optimized for various devices and screen sizes  

---

## 🛠️ Tech Stack

### 🔹 Frontend
- React.js  
- Vite  
- Chart.js  
- Axios  

### 🔹 Backend
- Node.js  
- Express.js  
- MongoDB  
- Mongoose  
- JSON Web Tokens (JWT)  
- Multer (for image uploads)  
- CORS  

---

## 📁 Project Structure

```bash
budget-tracker-/
├── FrontEnd/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── vite.config.js
├── BackEnd/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── .env
└── README.md
```

---

## ⚙️ Installation

### 🔧 Prerequisites
- Node.js (v14 or higher)  
- MongoDB  

### 📥 Clone the Repository
```bash
git clone https://github.com/sachinkumar2222/budget-tracker-.git
cd budget-tracker-
```

---

### ▶️ Backend Setup
```bash
cd BackEnd
npm install
```

Create a `.env` file in the `BackEnd` directory and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend server:
```bash
npm start
```

---

### 💻 Frontend Setup
```bash
cd ../FrontEnd
npm install
```

Create a `.env` file in the `FrontEnd` directory and add:

```env
VITE_API_BASE_URL=http://localhost:5000
```

Start the frontend dev server:
```bash
npm run dev
```

---

## 🌐 Deployment

### 🔹 Frontend
Deployed on **Vercel**  
🔗 [https://budget-tracker-frontend.vercel.app](https://budget-tracker-frontend.vercel.app)

### 🔹 Backend
Deployed on **Render**  
🔗 [https://budget-tracker-app-pnwq.onrender.com](https://budget-tracker-app-pnwq.onrender.com)

> **Note:** In production, set `VITE_API_BASE_URL` in the frontend `.env` file to your deployed backend URL.

---

## 📄 API Endpoints

### 🔐 Authentication
- `POST /api/v1/auth/register` — Register a new user  
- `POST /api/v1/auth/login` — Login user  
- `GET /api/v1/auth/getUser` — Get user information  
- `POST /api/v1/auth/upload-image` — Upload user profile image  

### 💵 Income
- `POST /api/v1/income/add` — Add income entry  
- `GET /api/v1/income/get` — Get all income entries  
- `GET /api/v1/income/downloadexcel` — Download income data as Excel  
- `DELETE /api/v1/income/:incomeId` — Delete income entry  

### 💸 Expense
- `POST /api/v1/expense/add` — Add expense entry  
- `GET /api/v1/expense/get` — Get all expense entries  
- `GET /api/v1/expense/downloadexcel` — Download expense data as Excel  
- `DELETE /api/v1/expense/:expenseId` — Delete expense entry  

---

## 🧑‍💻 Contributing

Contributions are welcome! 🙌

1. Fork the repository  
2. Create a new branch:  
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit them:  
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to the branch:  
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request 🎉  

---

## 📄 License
This project is licensed under the **MIT License**.

---

## 📞 Contact

**Name**: Sachin Kumar  
**Email**: [sparky.sachin.dev@gmail.com](mailto:sparky.sachin.dev@gmail.com)  
