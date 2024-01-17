# Currency Exchange Web App Frontend

This project is the frontend for a currency exchange web application, designed to allow users to perform USD to PHP currency exchanges. It provides a user-friendly interface for quoting, executing, and viewing historical exchange orders.

## Features
- **Currency Quoting**: Users can fetch current exchange rates from USD to PHP.
- **Executing Orders**: Functionality to execute currency exchanges based on quoted rates.
- **Order History**: Users can view their past currency exchange orders.

## Getting Started

These instructions will guide you in setting up and running the project on your local machine for development and testing purposes.

### Prerequisites

- Node.js (version 12 or later)
- npm (comes with Node.js)
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone [repository URL]
   cd [repository directory]
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

### Running the Application

Execute the following command to start the React app:

```bash
npm start
```

This will run the app in development mode. Open `http://localhost:3000` to view it in the browser.

## Environment Variables

Create a `.env` file in the root directory of your project. Add environment-specific variables on new lines in the form of `NAME=VALUE`. For example:

```bash
REACT_APP_API_URL=http://localhost:8000
```

## Building for Production

To build the app for production, run:

```bash
npm run build
```

This builds the app for production to the `build` folder.

## Running Tests

Execute the following command to run tests:

```bash
npm test
```

## Screenshots
![image](https://github.com/matthewvedder/currency-exchange-front-end/assets/16331910/097363e1-74ee-4c12-9341-5d60e0e99b55)

![image](https://github.com/matthewvedder/currency-exchange-front-end/assets/16331910/da5291f5-61b5-4aec-baa3-8a05b57c452f)








## License

This project is licensed under the [MIT License](LICENSE.md).
