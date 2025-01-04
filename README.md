# Calco-Assessment

## Overview
This project is designed to manage job creation and retrieval using a Next.js API. The project includes a form for creating jobs and an API route for handling job-related requests.

## Table of Contents
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [Time Report](#time-report)
- [Contributing](#contributing)
- [License](#license)

## Setup Instructions

### Prerequisites
- Node.js (v14.x or later)
- npm (v6.x or later) or yarn (v1.x or later)

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/zohran/Calco-Assessment.git
    cd Calco-Assessment
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm run dev
    ```

4. Open your browser and navigate to `http://localhost:3000`.

## Usage
- To create a job, fill out the form on the main page and submit it.
- The job data will be sent to the `/api/jobs` endpoint and stored in the job queue.
- You can retrieve all jobs by sending a GET request to the `/api/jobs` endpoint.

## Time Report

### Sections and Time Spent
1. **Project Setup**: 1 hours
    - Get the basic setup repo from internet

2. **API Development**: 3-5 hours (approximately)
    - Creating the job queue library
    - Implementing the GET and POST API routes

3. **Frontend Development**: 2-3 hours ( approximately as some components I picked from the interet. i.e. Toaster)
    - Creating the job creation form
    - Handling form submission and API integration

4. **Testing and Debugging**: 2 hours
    - Writing unit tests for API routes
    - Debugging issues related to static generation and dynamic routes

5. **Documentation**: 9-12 hour
    - Writing the README file
    - Documenting setup instructions and usage

### Total Time Spent: 10 hours