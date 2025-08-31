# 🦀 Create Rust on Vercel

<div align="center">

![Rust](https://img.shields.io/badge/rust-%23000000.svg?style=for-the-badge&logo=rust&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![Next.js](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

**A beautiful CLI tool to scaffold Rust projects for Vercel with Next.js frontend**

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Project Structure](#-project-structure) • [Contributing](#-contributing)

</div>

## ✨ Features

- 🚀 **One-command setup** - Create a full-stack Rust + Next.js project instantly
- 📦 **Automatic dependency management** - Handles both npm and cargo dependencies
- 🎨 **Beautiful CLI experience** - Rich colors, emojis, and progress indicators
- 🔧 **Smart configuration** - Automatically updates project names and imports
- 🦀 **Rust API endpoints** - Pre-configured serverless functions for Vercel
- ⚡ **Next.js frontend** - Modern React setup with TypeScript
- 📝 **Database ready** - Includes SQLx setup and migrations
- 🔐 **Authentication** - JWT-based auth system included
- 🎯 **Type-safe** - Full TypeScript integration with Rust types

## 🚀 Installation

### NPX (Recommended)

```bash
npx create-rust-on-vercel my-awesome-project
```

### Global Installation

```bash
npm install -g create-rust-on-vercel
create-rust-on-vercel my-awesome-project
```

### Local Development

```bash
git clone https://github.com/peterkyle01/create-rust-on-vercel.git
cd create-rust-on-vercel
npm install
npm link
```

## 🎯 Usage

### Interactive Mode

```bash
npx create-rust-on-vercel
```

The CLI will prompt you for a project name if not provided.

### Direct Mode

```bash
npx create-rust-on-vercel my-project-name
```

### What happens when you run it:

1. 📥 **Downloads template** from GitHub repository
2. 📝 **Updates configuration** files with your project name
3. 🔄 **Updates Rust imports** to match your project structure
4. 📦 **Installs Node.js dependencies** via npm
5. 🦀 **Builds Rust project** via cargo
6. 🎉 **Ready to go!**

## 📁 Project Structure

```
my-awesome-project/
├── 🦀 api/                    # Rust serverless functions
│   ├── auth/                  # Authentication endpoints
│   │   ├── signin.rs         # User login
│   │   ├── signup.rs         # User registration
│   │   └── me.rs             # Get current user
│   └── routes/               # API routes
│       └── products.rs       # Example CRUD operations
├── ⚛️  app/                   # Next.js App Router
│   ├── (auth)/              # Auth pages
│   ├── dashboard/           # Protected dashboard
│   └── layout.tsx           # Root layout
├── 🎨 components/            # Reusable React components
├── 📚 lib/                   # Shared utilities
│   ├── rust/                # Rust utilities
│   └── utils.ts             # TypeScript utilities
├── 🗄️  migrations/           # Database migrations
├── 🔧 types/                 # TypeScript type definitions
├── ⚙️  Cargo.toml            # Rust dependencies
├── 📦 package.json          # Node.js dependencies
└── 🚀 vercel.json           # Vercel configuration
```

## 🛠️ Development Workflow

After creating your project:

```bash
cd my-awesome-project

# Start development server
npm run dev

# Build Rust functions
cargo build

# Run database migrations
cargo run --bin migrate

# Generate TypeScript types from Rust
cargo run --bin generate_ts
```

## 🔧 Configuration

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

```env
DATABASE_URL="postgresql://user:password@localhost/dbname"
JWT_SECRET="your-super-secret-jwt-key"
NEXTAUTH_SECRET="your-nextauth-secret"
```

### Vercel Deployment

The project includes a `vercel.json` configuration for seamless deployment:

```bash
vercel deploy
```

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. 🍴 Fork the repository
2. 🌟 Create a feature branch: `git checkout -b feature/amazing-feature`
3. 💫 Commit your changes: `git commit -m 'Add amazing feature'`
4. 📤 Push to the branch: `git push origin feature/amazing-feature`
5. 🎉 Open a Pull Request

### Development Setup

```bash
git clone https://github.com/peterkyle01/create-rust-on-vercel.git
cd create-rust-on-vercel
npm install

# Make your changes to index.js
# Test locally
npx ./index.js test-project
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Peter Mwangi**

- 📧 Email: kylepeterkone4@gmail.com
- 🐙 GitHub: [@peterkyle01](https://github.com/peterkyle01)

## 🙏 Acknowledgments

- 🦀 [Rust](https://www.rust-lang.org/) - Systems programming language
- ⚡ [Vercel](https://vercel.com/) - Deployment platform
- ⚛️ [Next.js](https://nextjs.org/) - React framework
- 🎨 [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

## 📊 Stats

<div align="center">

![GitHub stars](https://img.shields.io/github/stars/peterkyle01/create-rust-on-vercel?style=social)
![GitHub forks](https://img.shields.io/github/forks/peterkyle01/create-rust-on-vercel?style=social)
![GitHub issues](https://img.shields.io/github/issues/peterkyle01/create-rust-on-vercel)
![GitHub license](https://img.shields.io/github/license/peterkyle01/create-rust-on-vercel)

</div>

---

<div align="center">

**Made with ❤️ and 🦀 by Peter Mwangi**

[⭐ Star this repo](https://github.com/peterkyle01/create-rust-on-vercel) • [🐛 Report Bug](https://github.com/peterkyle01/create-rust-on-vercel/issues) • [💡 Request Feature](https://github.com/peterkyle01/create-rust-on-vercel/issues)

</div>
