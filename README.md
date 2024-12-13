# boardy.

boardy is a live collaboration whiteboarding tool designed to facilitate seamless brainstorming, planning, and collaboration across teams and individuals. The application provides an intuitive interface for real-time drawing, annotations, and team collaboration.

## Features

- **Real-time Collaboration**: Work together with your team in real-time on the same canvas.
- **Intuitive Drawing Tools**: Access a variety of tools to sketch, draw, and annotate ideas.
- **Customizable Canvas**: Resize and modify the canvas to fit your needs.
- **Secure Sessions**: Ensures safe and private collaboration environments.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Express.js
- **Authentication**: Custom JWT-based authentication
- **Database**: MongoDB

## Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Steps to Run Locally

1. **Clone the Repository**

   ```bash
   git clone https://github.com/rzn1337/boardy.git
   cd boardy
   ```

2. **Install Dependencies**

   Using npm:

   ```bash
   npm install
   ```

   Or using yarn:

   ```bash
   yarn install
   ```

3. **Set Up Environment Variables**

   Create a `.env` file in the root directory and add the following variables:

   ```env
   DATABASE_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

   Replace `your_mongodb_connection_string` and `your_jwt_secret` with the appropriate values.

4. **Start the Development Server**

   ```bash
   npm run dev
   ```

   Or using yarn:

   ```bash
   yarn dev
   ```

5. **Access the Application**

   Open your browser and navigate to `http://localhost:3000`.

## Usage

- **Creating a Session**: Start a new whiteboarding session by signing in and creating a room.
- **Collaborating**: Share the room link with your team to begin collaborating in real-time.
- **Exporting Work**: Save or export your whiteboards for future reference.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes with clear and descriptive messages.
4. Push your changes to your fork.
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For questions, feedback, or support, please reach out:

- **GitHub Issues**: [https://github.com/rzn1337/boardy/issues](https://github.com/rzn1337/boardy/issues)
- **Email**: [alirizwan2003@gmail.com](mailto:alirizwan2003@gmail.com)
