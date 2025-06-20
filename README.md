# EigenLayer Restaking Info API

This project is a backend REST API built with Node.js and MongoDB to aggregate and expose restaking data from EigenLayer. It provides detailed information about user restaking actions, validator metadata, and reward insights.

---

## 📁 Project Structure

eigenlayer-restaking-api/
├── server.js
├── config/
│ └── index.js
├── models/
│ ├── restaker.js
│ ├── validator.js
│ └── reward.js
├── controllers/
│ ├── restakerController.js
│ ├── validatorController.js
│ └── rewardController.js
├── routes/
│ ├── index.js
│ ├── restakers.js
│ ├── validators.js
│ └── rewards.js
├── scripts/
│ ├── fetchData.js
│ ├── seedTestData.js
│ └── testApi.js
├── utils/
│ └── web3Utils.js
├── .env
└── README.md 


---

## 🚀 Features

- **`GET /restakers`**: Returns a list of user restakers, amounts, and target operator.
- **`GET /validators`**: Lists all EigenLayer validators with delegated stake and slashing history.
- **`GET /rewards/:address`**: Shows reward insights for a given user wallet address.
- **`fetchData.js`**: Fetches data from Rated Network APIs and populates MongoDB.
- **`seedTestData.js`**: Seeds sample test data into the database for development.

---

## 🛠️ Getting Started

### 1. Clone the Repository

git clone https://github.com/Madhav-T/ZERU_Assignment_Eigenlayer
cd eigenlayer-restaking-api


2. Install Dependencies
    
    npm install

3. Create a .env File

    PORT=5000
    MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority


📡 Data Source
This API uses data from the Rated Network API for fetching EigenLayer-related information:

/v1/eigenlayer/rewards/rewards

/v1/eigenlayer/rewards/operator

/v1/eigenlayer/rewards/delegator

These endpoints offer trusted, real-time validator performance, rewards, and delegation data.

Why Rated?
Fast, ready-to-use API (avoids The Graph rate limits and subgraph issues).

Offers validator slashing, rewards breakdown, and historical metrics.


🧠 Assumptions Made
Slashing reasons may not always be available from public sources.

stETH is assumed as the default restaked asset; others can be added later.

API does not currently paginate; all results are returned at once.

All reward timestamps are UNIX epoch format for consistency.

📥 Running the API
1. Start MongoDB (if running locally)
If you’re not using MongoDB Atlas, start your local MongoDB:
    mongod

2. Start the Server

    node server.js

You should see:

    Server running on port 5000
    MongoDB Connected

🧪 Testing API Endpoints
Use Postman, Insomnia, or curl:

    GET http://localhost:5000/restakers
    GET http://localhost:5000/validators
    GET http://localhost:5000/rewards/0xTestUser123.....

🔁 Fetch Live Data
To populate your DB with live data from Rated:

    node scripts/fetchData.js

### 2. Tools and Libraries

**Node.js:**

- **Express.js:** Web framework for building the API.
- **Mongoose (for MongoDB):** ODM for interacting with MongoDB.
- **`sqlite3` (for SQLite):** Node.js driver for SQLite.
- **`axios`:** HTTP client for making requests to external APIs (subgraphs, Rated Network).
- **`web3.js`:** Ethereum JavaScript API for direct on-chain interaction.
- **`dotenv`:** To manage environment variables.

