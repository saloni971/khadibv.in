KhadiBV.IN – Empowering Tradition Through Technology
________________________________________
👥 Team Members
•	Kashish Mishra (2216839)
•	Kirti (2216843)
•	Saloni Agrawal (2216886)
•	Shambhavi Gupta (2216895)
Under the Supervision of:
Dr. Mainaz Faridi
Department of Computer Science, Banasthali Vidyapith
________________________________________
📝 Project Overview
KhadiBV is a full-stack e-commerce platform designed to promote sustainable fashion and empower local artisans by digitizing the sale of Khadi products. It bridges the gap between traditional craftsmanship and modern consumers through a user-friendly interface and innovative features like product customization, chatbot support, and multilingual accessibility.
________________________________________
🚀 Features
•	🧶 Product Repository – Kurtas, sarees, accessories, and customized outfits
•	🎨 Customization Engine – Real-time tailoring options (neck design, sleeve, fabric)
•	🛒 Shopping Cart & Wishlist – Save, update, and manage items
•	🔐 User Authentication – Secure login for buyers and sellers
•	📦 Order Management – Track orders, checkout system, status updates
•	🧾 Admin Dashboard – Manage products, users, and seller records
________________________________________
💻 Tech Stack
Layer	Technology Used
Frontend	HTML, CSS, JavaScript
Templating	EJS
Backend	Node.js, Express.js
Database	MongoDB
IDE	Visual Studio Code
Tools	Postman
________________________________________
📁 Project Structure
KhadiBV/
│
├── backend/                      → User-side application
│   ├── routes/                   → User-related routes
│   ├── public/                   → Static assets (CSS, JS, images)
│   ├── models/                   → MongoDB schemas for users, products, etc.
│   ├── controllers/              → Logic for handling user requests
│   ├── views/                    → EJS templates for user interface
│   └── app.js                    → Entry point for user backend
│
├── admin-panel/                  → Admin-side application
│   ├── routes/                   → Admin-related routes
│   ├── public/                   → Admin-specific static assets
│   ├── models/                   → Schemas used for admin operations
│   ├── controllers/              → Admin logic (user management, product control)
│   ├── views/                    → EJS templates for admin panel
│   └── admin.js                  → Entry point for admin backend
│
└── README.docx                   → Documentation file________________________________________
⚙️ Installation & Setup Instructions
1.	Install Dependencies
           npm install
2.	Setup MongoDB
o	Make sure MongoDB is running.              
o	   At: mongodb://localhost:27017/backend
3.	Run the Application
npx nodemon app.js (for backend -user side)
npx nodemon admin.js(for admin side)
o	Visit: http://localhost:5500 (User Side)
o	Visit: http://localhost:5000 (Admin Side)
________________________________________
✅ Functional Modules
•	User Registration & Login
•	Seller Authentication
•	Product Management
•	Add to Cart & Wishlist
•	Product Customization
•	Order Placement & Checkout
•	Admin Dashboard
•	Notifications & Chat Support
________________________________________
🧪 Testing Strategy
•	Postman – API testing for user authentication, cart, orders
•	Manual Testing – Edge cases, responsive behavior, error handling
•	Focused on usability, form validation, cart updates, and order logic
________________________________________
📚 References
•	W3Schools – https://www.w3schools.com
•	MDN Web Docs – https://developer.mozilla.org
•	Postman Learning – https://learning.postman.com
•	Khadi & Village Industries Commission – https://www.kviconline.gov.in
________________________________________
🌍 Objective
To preserve the essence of India’s Khadi heritage by building a scalable and accessible digital platform that benefits both consumers and local artisans. KhadiBV merges traditional values with digital innovation, enabling a future-ready platform for sustainable and culturally rich fashion.

