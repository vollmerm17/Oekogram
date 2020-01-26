This is an Angular/Django project conducted by students of the UAS JOANNEUM as part of the Software-Engeneering Selectiv project of [Information Management](https://www.fh-joanneum.at/informationsmanagement/bachelor/). The goal was to build a social media with the focus on ecological living.

# Requirements

*  Python 3.7
* Django Server
* Angular Cli Server 8.3.18
* PyCharm as IDE recommended
* IntelliJ as IDE recommended


# Responsible Persons

* @vollmerm17 is responsible for the components: mediainput, profile, profile-form, community, date, register, following, follower, register

* @juliagruber is responsible for the components: comment, write-mail, login, logout

* @markusAUT-FH is responsible for the components: comment, posting, write-mail

* @BeckerDavid is responsible for the components: profile-form, profile-detail,
write-posting, profile-icons

# Project

Here is guidance to run this project.
* Backend: Django
* Frontend: Angular


### Django

1. Install required Python packages using pip and requirements.txt  

    `venv\Scripts\pip.exe install -r requirements.txt`

2. Create database

      `venv\Scripts\python.exe manage.py makemigrations`
      `venv\Scripts\python.exe manage.py migrate`

3. Load initial data to database using Django fixtures

      `venv\Scripts\python.exe manage.py loaddata initial_data`

4. Run App

      `python manage.py runserver 8000`

### Angular

 1. Install all required packages using package.json

      `npm install`

 2. Run the development server

      `ng serve`

 3.  Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

4. To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
