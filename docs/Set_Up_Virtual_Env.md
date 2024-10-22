## Setting Up Your Python Virtual Environment & Starting a Django Project

## Prerequisites

- Python must be installed on your system. You can check if Python is installed by running:

    bash
```bash
python --version
```

- If you dont have python, brew install:
```bash
```

## Steps to Set Up a Virtual Environment

1. Navigate to Your Project Directory:

First, navigate to the directory where you want to set up your project:

```bash
cd /path/to/your/project
```

2. Create a Virtual Environment:

Create a new virtual environment in the project directory:

```bash
python -m venv venv
```

This will create a new folder called venv in your project directory, containing the virtual environment.

3. Activate the Virtual Environment:

- On macOS/Linux:

```bash
source venv/bin/activate
```

On Windows:

```bash
.\venv\Scripts\activate
```

Once activated, your terminal prompt should change, showing that the environment is active.

4. Install Django:

Now that your virtual environment is activated, install Django:

```bash
pip install django
```


## If you want to create a new Django app or project follow steps 5 - 7, otherwise skip to Deactivating Virtual Env

5. Create a New Django Project:

With Django installed, you can create a new project. Replace myproject with the desired name for your project:

```bash
django-admin startproject myproject
```

6. Navigate Into the Project Folder:

Enter the new project folder:

```bash
cd myproject
```

7. Start a New Django App:

Inside the project, you can create an app. Replace myapp with the name of your app:

```bash
python manage.py startapp myapp
```

## Running the Django Development Server

1. Run the Django Server:

After setting up the project and app, run the development server to ensure everything works:

```bash
python manage.py runserver
```

2. Access the Project:

Open a browser and go to:

```bash
http://127.0.0.1:8000
```

## Deactivating the Virtual Environment

When you're done working, deactivate the virtual environment:

```bash
deactivate
```

## To Note List:

- Make sure to activate the virtual environment each time you start working on the project to ensure all dependencies are correctly managed.
