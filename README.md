# Health Savvy: Tinnitus and Health Awareness

![Screenshot](https://github.com/jayaruhbee/RingRelief/assets/108156550/35977e7e-d7f6-4280-9496-6fb9c34275a6)

This project was created as part of the Women Who Code Hackathon for Social Good 2023.

## Project Overview


### Challenge Statement

Tinnitus is an under-researched and misunderstood condition, causing unnecessary suffering due to misinformation and lack of specialist care. Navigating a sea of complex information exacerbates this problem for sufferers. Our project simplifies this process by creating a powerful text summarization tool to provide concise insights from scientific papers. Additionally, it includes a social forum for support and information sharing. This solution benefits society by making crucial tinnitus-related information accessible and understandable, reducing the burden on those affected by the condition. Our chosen tech stack incorporates advanced text summarization techniques and robust features for fostering a supportive forum community, strengthening the project's capacity to efficiently tackle the challenge.


## Table of Contents

- [Getting Started](#getting-started)
- [Running the Project](#running-the-project)
- [Tech Stack](#tech-stack)
- [Collaborators](#collaborators)



## Getting Started 

1. **Prerequisites**: Before you begin, ensure you have the following prerequisites in place:
   - A Neon Tech Cloud account
   - Access to a Neon Tech Cloud PostgreSQL database
   - Create a Passage account if you don't have one already at [passage.id](https://passage.id/).
   - Environment variables set in a `.env` file (See Configuration section)

2. **Installation**: Clone the repository and install project dependencies in the project's root directory.
   ```shell
   git clone https://github.com/jayaruhbee/RingRelief.git
   pip install -r requirements.txt

3. **Configuration**: In root directory create your `.env` file, set the following environment variables with you details: 
```shell 
DJANGO_SECRET_KEY your_secret_key_here
NEONUSER = your_database_user
NEONPASSWORD = your_database_password
NEONHOST = your_database_host
PASSAGE_APP_ID = your_passage_app_id
```
In Front End Project folder create `.env` file and set the following environment variables:
```shell
PASSAGE_APP_ID = your_passage_app_id
```

## Running the Project

Follow these steps to run the project locally:

1. **Django Backend**:
   - Open a terminal and navigate to the `backend` directory 
   - Run the Django development server:
     ```shell
     python manage.py runserver
     ```
   - Your Django backend should now be running at `http://localhost:8000/`.

2. **React Frontend**:
   - Open a new terminal window.
   - Navigate to the `tinnitus_proj_fe ` directory.
   - Start the React development server:
     ```shell
     npm run dev
     ```
   - Your React frontend should now be running at `http://localhost:5173/`.


## Tech Stack

- ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
- ![Django](https://img.shields.io/badge/django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white)
- ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
- ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
- ![Matplotlib](https://img.shields.io/badge/Matplotlib-%23ffffff.svg?style=for-the-badge&logo=Matplotlib&logoColor=black)
- ![NumPy](https://img.shields.io/badge/numpy-%23013243.svg?style=for-the-badge&logo=numpy&logoColor=white)
- ![Pandas](https://img.shields.io/badge/pandas-%23150458.svg?style=for-the-badge&logo=pandas&logoColor=white)
- ![scikit-learn](https://img.shields.io/badge/scikit--learn-%23F7931E.svg?style=for-the-badge&logo=scikit-learn&logoColor=white)
- ![PyTorch](https://img.shields.io/badge/PyTorch-%23EE4C2C.svg?style=for-the-badge&logo=PyTorch&logoColor=white)

## Collaborators
Jessi Paarfus<br>
Nao Takahashi<br>
Nimra Sharnez<br>
Shaily Goyal<br>
Devipriya Raju<br>
Eshika Pawar
