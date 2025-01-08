# Habituo

![Build Status](https://img.shields.io/github/actions/workflow/status/YashPatil0105/Habituo/node.js.yml?branch=main)
![License](https://img.shields.io/github/license/YashPatil0105/Habituo)
![Contributors](https://img.shields.io/github/contributors/YashPatil0105/Habituo)

A powerful habit-tracking platform that transforms personal development through gamified challenges and rewards.

<img src="/api/placeholder/800/400" alt="Habituo Dashboard Preview" />

## ✨ Features

- **Smart Habit Tracking**: Automated streak monitoring with progress visualization
- **Challenge System**: Create and participate in community challenges
- **Reward Engine**: Points, badges, and milestone achievements
- **Flexible Planning**: Daily, weekly, and monthly goal management
- **Smart Notifications**: Customizable reminders and progress alerts

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Testing**: Postman

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB
- npm/yarn

### Setup

```bash
# Clone repository
git clone https://github.com/YashPatil0105/Habituo.git

# Install dependencies
cd Habituo
npm install
cd client && npm install

# Configure environment
# Create .env in root directory:
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

# Start development servers
npm run dev     # Concurrent backend & frontend
# or
npm run server  # Backend only
cd client && npm start  # Frontend only
```

## 📱 API Endpoints

- **Auth**: `POST /api/v1/auth/[register|login]`
- **Challenges**: `GET|POST /api/v1/challenges`
- **Plans**: `GET|POST /api/v1/plans`
- **Rewards**: `GET /api/v1/rewards`
- **Notifications**: `GET /api/v1/notifications`

<img src="/api/placeholder/600/300" alt="API Structure" />

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add: AmazingFeature'`)
4. Push branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

[MIT License](LICENSE)

## 👤 Contact

Yash Patil
- GitHub: [@YashPatil0105](https://github.com/YashPatil0105)
