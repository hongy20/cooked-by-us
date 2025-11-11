# 🍳 Cooked by Us

**Cooked by Us** is a personal hobby project for managing and sharing home-made recipes — a digital notebook of trusted dishes that have been cooked, tasted, and perfected.

Visitors can browse and enjoy curated recipes, while authenticated users (selected accounts) can create, update, and manage their own collection.

---

## 🥘 Project Overview

**Cooked by Us** is designed to be a **simple, authentic recipe management app** that combines modern web technologies with a personal touch.
Every recipe featured here is home-tested — no AI-generated fluff, just real dishes that have been cooked and refined in the kitchen.

---

## ✨ Key Features

- 🧾 **Public Recipe Library** – Anyone can browse and read recipes.
- 👨‍🍳 **Authenticated Recipe Management** – Logged-in users can **Create**, **Read**, **Update**, and **Delete** recipes.
- 🔐 **Google Login (Restricted Access)** – Social login via Google, limited to selected accounts only.
- 📸 **Recipe Details** – Each recipe includes title, ingredients, instructions, cooking time, and optional images.
- 🧂 **Tags & Categories** – Organize recipes by cuisine type, difficulty, or meal category.
- 💾 **Persistent Storage** – Recipes are saved in a database for easy retrieval.

---

## 🧠 Tech Stack

| Layer            | Technology                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------------ |
| **Frontend**     | [Next.js 16](https://nextjs.org/) (App Router)                                             |
| **UI**           | [Tailwind CSS](https://tailwindcss.com/) + [Framer Motion](https://www.framer.com/motion/) |
| **Auth**         | [Better Auth](https://better-auth.vercel.app/) with Google provider                        |
| **Database**     | [MongoDB](https://www.mongodb.com/) with Mongoose or Prisma adapter                        |
| **Image Upload** | [Cloudinary](https://cloudinary.com/)                                                      |
| **Hosting**      | [Vercel](https://vercel.com/)                                                              |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/hongy20/cooked-by-us.git
cd cooked-by-us
```

### 2. Install Dependencies

```bash
bun install
```

### 3. Environment Variables

Create a .env file with the following keys:

```bash
# TBD
ALLOWED_GOOGLE_EMAILS="email1@example.com,email2@example.com"
```

### 4. Run the Development Server

```bash
bun dev
```

Visit: http://localhost:3000

## 🧩 Authentication Logic

Only users with email addresses listed in `ALLOWED_GOOGLE_EMAILS` can perform CRUD operations.
All other users can still visit and read published recipes.

## 💬 Motivation

There’s no shortage of recipes online — from blogs to YouTube channels — yet many are hard to replicate in an ordinary home kitchen. Missing ingredients, unclear instructions, or simply the difference between a professional setup and what a typical family actually has at home.

When a recipe works well in a regular home kitchen, it’s useful to have a reliable place to store it — without digging through bookmarks or rewatching entire videos. Don’t get me wrong, cooking videos are great for learning. It’s just that they aren’t always practical when you’re standing by the stove, with smoking oil in the pan, wondering what to do next.

**Cooked by Us** is a way to bring those scattered lessons together into one organized, personal recipe collection — real, tested, and ready to cook from.

## 📜 License

This project is released under the MIT License — feel free to fork and adapt for your own home recipes.
