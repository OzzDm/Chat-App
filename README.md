
# Real-Time Chat Application

This is a real-time chat application built using Socket.IO, JavaScript, Mustache, HTML, and CSS. It supports multiple users in various chat rooms and allows for instant communication.
Visit [Chat-App](https://chat-app-ss0p.onrender.com) to access the application.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)

## Features

- Real-time messaging between users.
- Support for multiple chat rooms.
- User-friendly and responsive interface.
- Displays a list of active users in each chat room.
- Auto scroll.
- Notifications when users join or leave a chat room.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/OzzDm/Chat-App.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd chat-app
   ```

3. **Install the dependencies:**

   ```bash
   npm install
   ```

4. **Start the server:**

   ```bash
   npm run dev
   ```

5. **Open your browser and go to:**

   ```bash
   http://localhost:3000
   ```

## Usage

1. Open the chat application in your browser.
2. Enter a username and chat room.
3. Start chatting with other users in real-time.

## Technologies

- **Socket.IO**: Used for real-time, bidirectional communication between web clients and servers.
- **JavaScript**: Provides the logic for the chat application.
- **Mustache**: Used for rendering templates on the client side.
- **HTML/CSS**: Used for structuring and styling the application.

## Project Structure

```
├── public
│   ├── css
│   │   └── styles.css
│   ├── js
│   │   └── chat.js
│   ├── img
│   │   └── favicon.png
│   ├── index.html
│   └── chat.html
├── src
│   ├── utils
│   │   ├── message.js
│   │   └── users.js
│   ├── img
│   │   └── favicon.png
│   └── index.js
├── package.json
└── README.md
```

- `public/`: Contains all the client-side files.
- `src/index.js`: The main server file handling socket connections.
- `package.json`: Lists the dependencies and scripts for the project.

## Contributing

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes.
4. Push to your branch.
5. Open a pull request.

## Acknowledgements
This project has been created for learning purposes. We acknowledge the valuable resources and tutorials from the developer community that have contributed to the creation of this app.

Thank you for using the Weather App! We hope it helps you stay informed about the weather in your area.