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
- 📸 **Recipe Details** – Each recipe includes name, description, ingredients, instructions, cooking time, images, etc.
- 🧂 **Tags & Categories** – Organize recipes by cuisine type, meal category, or other keywords.
- 💾 **Persistent Storage** – Recipes are saved in a database for easy retrieval.

---

## 🧠 Tech Stack

| Layer            | Technology                                                                     |
| ---------------- | ------------------------------------------------------------------------------ |
| **Frontend**     | [Next.js 16](https://nextjs.org/) (App Router)                                 |
| **UI**           | [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) |
| **Auth**         | [Better Auth](https://better-auth.vercel.app/) with Google provider            |
| **Database**     | [MongoDB](https://www.mongodb.com/) with Mongoose                              |
| **Image Upload** | [Cloudinary](https://cloudinary.com/)                                          |
| **Hosting**      | [Vercel](https://vercel.com/)                                                  |

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
# Better Auth Config. https://www.better-auth.com/docs/installation
BETTER_AUTH_SECRET= # A secret value used for encryption and hashing
BETTER_AUTH_URL= # Base URL of your app

# MongoDB Connection String. https://www.mongodb.com/docs/manual/reference/connection-string/
MONGODB_URI=mongodb+srv://myDatabaseUser:D1fficultP%40ssw0rd@cluster0.example.mongodb.net/?...

# Google API client ID. https://developers.google.com/identity/oauth2/web/guides/get-google-api-clientid
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=

# Comma-separated list of Google account emails that are allowed to sign in.
# Only users whose Google login email appears in this list will be granted access
ALLOWED_GOOGLE_EMAILS=email1@example.com,email2@example.com #

# Cloudinary API Keys. https://cloudinary.com/documentation/node_integration
CLOUDINARY_URL=cloudinary://my_key:my_secret@my_cloud_name
CLOUDINARY_FOLDER= # Folder for your app

# Next.js Environment Variables for the Browser. https://nextjs.org/docs/app/guides/environment-variables
NEXT_PUBLIC_BASE_URL=http://localhost:3000
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

There’s no shortage of recipes online — from blogs to YouTube channels — yet many are hard to replicate in an ordinary home kitchen. Missing ingredients, unclear instructions, or simply the difference between a professional setup and what a typical family actually have at home.

When a recipe works well in a regular home kitchen, it’s useful to have a reliable place to store it — without digging through bookmarks or rewatching entire videos. Don’t get me wrong, cooking videos are great for learning. It’s just that they aren’t always practical when you’re standing by the stove, with smoking oil in the pan, and wondering what to do next.

**Cooked by Us** is a way to bring those scattered lessons together into one organized, personal recipe collection — real, tested, and ready to cook from.

## ⚙️ Next.js Features & Technical Decisions

This project uses several modern **Next.js 16 features** and thoughtful technical decisions to make it scalable, maintainable, and performant.

For a detailed explanation of things used in this hobby project, see the full documentation here:

➡️ [Technical Details](TechnicalDetails.md)

## 📜 License

This project is released under the MIT License — feel free to fork and adapt for your own home recipes.
