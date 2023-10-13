# Dividend Forecasting Tool

## Screenshot

![Main Page Screenshot](https://github.com/Khauzuki/DividendForecasting/blob/main/graphic/photo_2023-09-28_19-42-08.jpg)


## Overview

This project was created as part of a coursework assignment at Belarusian State University of Informatics and Radioelectronics (BSUIR). It is implemented using JavaScript, Node.js, and Express.js, with a MySQL database. The project's theme revolves around the **Design and Development of a Dividend Yield Forecasting Software Tool for Financial Instruments**.

## Project Description

The Dividend Forecasting Tool is designed to provide users with the capability to predict dividend yields for various financial instruments, helping them make informed investment decisions. It leverages historical data and predictive algorithms to generate forecasts.

## Features

- **Historical Data Analysis**: The tool allows users to input historical financial data for different securities.

- **Forecasting Algorithms**: It employs sophisticated forecasting algorithms to predict dividend yields based on historical trends and other relevant factors.

- **User-Friendly Interface**: The user interface is intuitive, making it accessible to a wide range of users, including investors and financial analysts.

- **Database Integration**: The application integrates with a MySQL database to store and retrieve historical data and forecasts.

## Database Setup

To set up the MySQL database for this project, follow these steps:

1. **Install MySQL Server 8.0 or higher**:
   - During installation:
     - Deploy the server on port 3306.
     - Create a user named "User" with the password "Qwer1234".

2. **Install MySQL Workbench**:
   - After installation, use MySQL Workbench to import the database file located in the "DB" folder onto your server.


## Installation

To run this project locally, follow these steps:

1. Clone the repository:
```bash
git clone https://github.com/Khauzuki/DividendForecasting.git
```

2. Navigate to the project directory:
```bash
cd dividend-forecasting-tool
```

3. Install dependencies:
```bash
npm install
```

4. Configure the MySQL database connection in the `config.js` file.

5. Start the application:
```bash
npm start
```

6. Open a web browser and access the application at `http://localhost:5000`.

## Usage

- Input historical financial data for the desired securities.

- Use the forecasting feature to generate dividend yield predictions.

- View and analyze the generated forecasts.

## Contributors

- [Natan Yepikhau](https://github.com/Khauzuki)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Special thanks to the faculty and instructors at BSUIR for their guidance and support throughout the project.

Feel free to contribute to this project by submitting issues or pull requests. Your feedback and contributions are highly appreciated!
