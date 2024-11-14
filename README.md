# Lelann Bookshop Website Project

## Overview

Lelann Bookshop is an e-commerce website that sells books, stationery, and uniforms. This project is built using Node.js, Express, PostgreSQL, Sequelize, Vite, Tailwind CSS, and TypeScript.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Database Setup](#database-setup)
  - [Running the Application](#running-the-application)
  - [Running Tests](#running-tests)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- User authentication and authorization
- Product listings for books, stationery, and uniforms
- Categories and subcategories for products
- Product search and filtering
- Shopping cart and checkout functionality
- Order management
- Admin dashboard for managing products and orders

## Technologies Used

#### Backend

- **Nodejs**: Core Library
- **Express**: Nodejs Framework used to develope backend
- **PostgreSQL**: Database
- **ORM**: Prisma

#### Frontend

- **React.js**: Core library
- **Tailwind CSS**: For styling
- **Redux Toolkit**: For state management
- **React Router**: For routing
- **Formik & Yup**: For forms and validation
- **Axios**: For API calls
- **Jest & React Testing Library**: For testing
- **Vite**: For build process
- **Material-UI**: For UI components
- **React Intl**: For internationalization
- **ESLint & Prettier**: For code quality
- **Storybook**: For component development

#### Testing

- **Jest**

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- PostgreSQL

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/cassandra18/lelann_bookshop.git
   cd lelann_bookshop
   ```

2. Install dependencies

   ```bash
     npm install
   ```

3. Create a .env file in the root of your project and add your database credentials:

### Database Setup

### Step 1: Install PostgreSQL

1.  **Download and Install PostgreSQL**:

    - Follow the instructions for your operating system to download and install PostgreSQL from the official [PostgreSQL website](https://www.postgresql.org/download/).

2.  **Start PostgreSQL**:

    - After installation, start the PostgreSQL service. This can usually be done via your operating system's service manager or by running the following command:

    `sudo service postgresql start`

3.  **Access PostgreSQL**:

    - Access the PostgreSQL command-line interface (psql) by running:

    `psql -U postgres`

### Step 2: Create a Database and User

1.  **Create a New Database**:

    - Once inside the PostgreSQL command-line interface, create a new database by running:

    `CREATE DATABASE mydatabase;`

2.  **Create a New User**:

    - Create a new user and grant privileges on the newly created database:

    ```
      CREATE USER myuser WITH PASSWORD 'mypassword';
      GRANT ALL PRIVILEGES ON DATABASE mydatabase TO myuser;
    ```

### Step 3: Set Up Prisma ORM

1.  **Initialize a New Node.js Project**:

    - If you haven't already, initialize a new Node.js project and install Prisma:

    ```
      mkdir myproject
      cd myproject
      npm init -y
      npm install prisma --save-dev
      npx prisma init
    ```

2.  **Install the Prisma Client**:

    - Install the Prisma Client as a dependency:

    `npm install @prisma/client`

3.  **Configure the .env File**:

    - In the root of your project, Prisma will have created a `.env` file. Add your database credentials to this file:

    `DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/mydatabase"`

### Step 4: Define Your Data Model

1.  **Update the Prisma Schema**:

    - Open the `prisma/schema.prisma` file and define your data model.

### Step 5: Migrate the Database

1.  **Create a Migration**:

    - Run the following command to create a migration based on your data model:

    `npx prisma migrate dev --name init`

2.  **Check the Database**:

    - Verify that the migration was successful and that the tables were created in your PostgreSQL database:

    ```
    psql -U myuser -d mydatabase
    \dt
    ```

### Step 6: Use Prisma Client in Your Project

1.  **Generate the Prisma Client**:

    - Generate the Prisma Client based on your schema:

    `npx prisma generate`

### Running the Application

1. Start the server

   ```bash
     npm start
   ```

2. The server will be running at `http://localhost:3000`.

### Running the Test

1. Run the tests using Jest:

```bash
  npm test
```

## Projeect Structure

```
lelann_bookshop/
├── backend/
│   ├── config/                 # Database configuration
│   ├── controllers/            # CRUD operations
│   ├── middleware/             # middleware
│   ├── prisma/                 # Database schema and migration
│   ├── routes/                 # RESTAPI endpoints
│   ├── uploads/                # Images uploaded to the databases
│   ├── utils/                  # Initialize database
│   ├── tests/                  # Test cases
│   ├── app.js                  # Application entry point
│   ├── .env                    # Environment variables
│   ├── .gitignore              # Git ignore file
│   ├── package.json            # Project metadata and dependencies
│   └── README.md               # Project documentation
├── frontend/
│   ├── public/                 # Public files like index.html
│   │   ├── index.html          # HTML template
│   │   ├── favicon.ico         # Favicon
│   │   └── manifest.json       # Web app manifest
│   ├── src/
│   │   ├── assets/             # Static assets like images, fonts
│   │   ├── components/         # Reusable components
│   │   │   ├── Header.js       # Header component
│   │   │   ├── Footer.js       # Footer component
│   │   │   └── ...
│   │   ├── pages/              # Page components
│   │   │   ├── HomePage.js     # Home page
│   │   │   ├── ProductPage.js  # Product details page
│   │   │   └── ...
│   │   ├── services/           # API calls
│   │   │   ├── api.js          # API service
│   │   │   └── ...
│   │   ├── App.js              # Main App component
│   │   ├── index.js            # Entry point
│   │   ├── routes.js           # Application routes
│   │   └── styles/             # Global styles
│   │       ├── index.css       # Global CSS
│   │       └── ...
│   ├── .gitignore              # Git ignore file
│   ├── package.json            # Project metadata and dependencies
│   ├── README.md               # Project documentation
│   └── .env                    # Environment variables for frontend
└── README.md                   # Root project documentation

```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.

2. Create a new branch (git checkout -b feature-branch).

3. Make your changes.

4. Commit your changes (git commit -m 'Add some feature').

5. Push to the branch (git push origin feature-branch).

6. Open a pull request.

## License

This project is licensed under the ISC License. See the LICENSE file for details.

## Contact

For any inquiries, please contact Cassandra Lelei at cassandralelei12@gmail.com or Levis Mbiu at levymbiu@gmail.com
