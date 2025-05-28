💰 Budget Tracker
Budget Tracker is a full-stack web application designed to help users manage their personal finances efficiently. It enables users to track income and expenses, visualize financial data, and generate reports, all within an intuitive interface.

🚀 Features
User Authentication: Secure registration and login using JWT.

Dashboard Overview: Visual representation of income and expenses using charts.

Income Management: Add, view, and delete income entries.

Expense Management: Add, view, and delete expense entries.

Data Export: Download income and expense data as Excel files.

Profile Management: Upload and manage user profile images.

Responsive Design: Optimized for various devices and screen sizes.

🛠️ Tech Stack
Frontend:

React.js

Vite

Chart.js

Axios

Backend:

Node.js

Express.js

MongoDB

Mongoose

JSON Web Tokens (JWT)

Multer (for image uploads)

CORS

📁 Project Structure
css
Copy
Edit
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
⚙️ Installation
Prerequisites
Node.js (v14 or higher)

MongoDB

Clone the Repository
bash
Copy
Edit
git clone https://github.com/sachinkumar2222/budget-tracker-.git
cd budget-tracker-
Backend Setup
bash
Copy
Edit
cd BackEnd
npm install
Create a .env file in the BackEnd directory and add the following:

env
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Start the backend server:

bash
Copy
Edit
npm start
Frontend Setup
bash
Copy
Edit
cd ../FrontEnd
npm install
Create a .env file in the FrontEnd directory and add the following:

env
Copy
Edit
VITE_API_BASE_URL=http://localhost:5000
Start the frontend development server:

bash
Copy
Edit
npm run dev
🌐 Deployment
Frontend
The frontend is deployed on Vercel: https://budget-tracker-frontend.vercel.app

Backend
The backend is deployed on Render: https://budget-tracker-app-pnwq.onrender.com

Ensure that the VITE_API_BASE_URL in the frontend .env file is set to the deployed backend URL for production.

📄 API Endpoints
Authentication
POST /api/v1/auth/register - Register a new user

POST /api/v1/auth/login - Login user

GET /api/v1/auth/getUser - Get user information

POST /api/v1/auth/upload-image - Upload user profile image

Income
POST /api/v1/income/add - Add income entry

GET /api/v1/income/get - Get all income entries

GET /api/v1/income/downloadexcel - Download income data as Excel

DELETE /api/v1/income/:incomeId - Delete income entry

Expense
POST /api/v1/expense/add - Add expense entry

GET /api/v1/expense/get - Get all expense entries

GET /api/v1/expense/downloadexcel - Download expense data as Excel

DELETE /api/v1/expense/:expenseId - Delete expense entry

🧑‍💻 Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.

Create a new branch: git checkout -b feature/your-feature-name

Make your changes and commit them: git commit -m 'Add your feature'

Push to the branch: git push origin feature/your-feature-name

Open a pull request.

📄 License
This project is licensed under the MIT License.

📞 Contact
For any inquiries or feedback, please contact:

Name: Sachin Kumar

Email: sparky.sachin.dev@gmail.com
