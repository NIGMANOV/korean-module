Admin Panel with OTP and Product Management  
===========================================

This is a single-page web application (SPA) built using TypeScript, TailwindCSS, Vite, and Express.js.

It includes full functionality for:
- Admin registration with OTP email verification
- Admin login
- Dashboard with product creation
- Display of all created products


==============================
🛠 Technologies Used
==============================

Frontend:
- Vite
- TypeScript
- TailwindCSS

Backend:
- Node.js
- Express
- PostgreSQL with Sequelize ORM

Other:
- OTP (One-Time Password) verification
- LocalStorage for client-side session
- Email validation and routing


==============================
🚀 How to Run the Project
==============================

Frontend:

1. Navigate to the client folder:
   cd client

2. Install dependencies:
   npm install

3. Start development server:
   npm run dev

Backend:

1. Navigate to the server folder:
   cd server

2. Install dependencies:
   npm install

3. Start the server:
   npm run dev

Frontend URL: http://localhost:5173  
Backend URL: http://localhost:3000


==============================
📦 API Endpoints
==============================

--- Admin ---
POST    /api/admin           -> Register a new admin  
GET     /api/admin           -> Get all admins  
POST    /api/admin/auth      -> Authenticate admin (login)  
POST    /api/admin/otp       -> Verify OTP code sent to email

--- Products ---
POST    /api/products        -> Create a new product  
GET     /api/products        -> Get all products  
GET     /api/products/:id    -> Get a product by ID


==============================
🧩 Client Functionalities
==============================

- Admin Registration:
  - Includes name, email, password fields
  - OTP (6-digit) verification via email

- Admin Login:
  - Stores authenticated email in localStorage
  - Redirects to dashboard upon success

- OTP Verification:
  - Validates a 6-digit code sent via backend
  - Redirects to login after successful verification

- Dashboard:
  - Displays welcome message
  - Product form with the following fields:
    - Name (English & French)
    - Description (English & French)
    - GTIN, Brand, Country of Origin
    - Weight (Gross, Net, Unit)
    - Company Info (default values)
  - Displays list of all products with full details

- Route Protection:
  - Dashboard is only accessible if logged in
  - 404 page for invalid routes


==============================
📁 Project Structure
==============================

project-root/
├── client/
│   ├── main.ts
│   ├── style.css
│   └── ...
├── server/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── ...
├── README.txt


==============================
✅ Future Improvements (optional)
==============================

- Password hashing
- Product editing and deletion
- Email delivery service for OTP (e.g. Nodemailer)


==============================
📄 License
==============================

This project is licensed under the MIT License.