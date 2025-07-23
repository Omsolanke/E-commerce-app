# 🛒 E-commerce Web Application

A full-stack modern E-commerce application developed using **Angular 15+**, **Spring Boot**, and **MySQL**, with a responsive UI powered by **Material UI** and **Bootstrap**. The app includes both **user-facing** and **admin** interfaces, complete with secure authentication, product management, order placement, and more.

---

## 🚀 Features

### 🧑‍💻 User Module
- ✅ User Registration & Login (JWT-based authentication)
- 🔐 Role-Based Access (User/Admin)
- 🛍️ Browse Products with Pagination
- 🔍 Real-time Product Search Bar
- ➕ Add to Cart and Checkout Flow
- 💳 Payment Integration (Simulated Payment Gateway)
- 📦 View Order History and Order Status

### 🧑‍💼 Admin Module
- 🧾 View All Orders and Manage Their Status
- 📦 Add / Edit / Delete Products
- 📊 Admin Dashboard
- 👤 Manage Users

---

## 🛠️ Tech Stack

| Layer        | Technology                             |
|--------------|----------------------------------------|
| Frontend     | Angular 19, Material UI, Bootstrap     |
| Backend      | Spring Boot (Latest Version), Spring Security |
| Database     | MySQL                                  |
| Authentication | JWT (JSON Web Tokens)                |
| Tools        | Git, Postman, VS Code, IntelliJ IDEA   |

---

## 📂 Project Structure

```
E-commerce Application/
├── E-commerce-frontend/    → Angular frontend
│   └── src/
│       └── app/
│           └── components/
│           └── services/
│           └── guards/
│           └── models/
├── E-commerce-backend/     → Spring Boot backend
│   └── src/
│       └── main/
│           └── java/com/ecommerce/
│               └── controller/
│               └── service/
│               └── entity/
│               └── repository/
│               └── security/
├── README.md
├── .gitignore
```

---

## 🔐 Authentication & Security

- JWT Token Generation at Login
- Role-based URL access (Admin/User)
- Passwords hashed using BCrypt
- Secure endpoints with Spring Security

---

## 💳 Payment

- Simulated Payment Gateway flow
- Order is created and tracked post-payment

---

## 🔍 Search & Pagination

- Product Search by name
- Client-side pagination with Angular Material Table

---

## 🧑‍🔧 Setup Instructions

### Backend (Spring Boot)

```bash
cd E-commerce-backend
mvn clean install
# Run application
```

- Make sure to configure `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce_db
spring.datasource.username=root
spring.datasource.password=yourpassword
jwt.secret=your_jwt_secret_key
```

### Frontend (Angular)

```bash
cd E-commerce-frontend
npm install
ng serve
```

- Access the app at: `http://localhost:4200/`

---

## 📸 Screenshots
![alt text](image.png)
---![alt text](image-1.png)
![alt text](image-2.png)

---

## 🤝 Contributing

Feel free to fork this repo and submit pull requests. For major changes, open an issue first to discuss what you would like to change.


## 📧 Contact

**Sitaram Sharad Solanke**  
📧 sitaramsolanke123@gmail.com  
📍 Pune, Maharashtra  
🔗 [GitHub](https://github.com/Omsolanke)

---

## ⭐️ Acknowledgements

Thanks to the open-source community and tools like Angular, Spring Boot, and MySQL that made this project possible.

---
