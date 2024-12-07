# Skagite - Booking Management for a Guesthouse

Welcome to the **Skagite** project repository! This is a web application designed to manage bookings for three rooms in a fictional guesthouse.

## Features

- **Homepage**: General presentation of the guesthouse.
- **Room Details**: Detailed descriptions and information for each room.
- **Booking Panel**: Select dates and book rooms directly.
- **Customer Reviews**: Display of guest reviews retrieved from the database.

## Technologies Used

- **Front-end**: Angular 18
- **Styling**: Tailwind CSS
- **Back-end**: Supabase (API and database management)
- **Hosting**: Vercel

## Run the Application with Docker

To run the project locally using Docker, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/antoinepeltre/skagite.git
    cd skagite
    ```

2. **Run the environment setup script:**

    Before running the Docker container, execute the following command to fetch the required environment variables:

    ```bash
    ./fetch-env.sh
    ```

    The script will fetch the environment variables from a GitHub Gist and save them in the `.env` file.

3. **Build and run the Docker container:**

    Once the environment variables are set up, you can build and start the Docker container with:

    ```bash
    docker-compose up --build
    ```

4. **Access the application:**

    The application will be available at [http://localhost:4200].

## Live Demo and Repository

- **Live Website**: [Skagite on Vercel](https://skagite-i29ga3uw3-antoines-projects-8f75dbf3.vercel.app/)

## Notes

This project was developed as part of a technical test, aiming to demonstrate my skills in both front-end and back-end development.

Feel free to reach out if you have any questions or feedback!
