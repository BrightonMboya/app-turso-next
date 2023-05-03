## Purpose

This repo shows how to integrate Turso in a next App. It includes how to add and querying the tables.

### Getting Started

Afer Cloning the repo, you need to install the dependencies by running the following command on your terminal:

```sh
npm install
```

## Setting up the database

Install the Turso CLI by following the [Documentation](https://docs.turso.tech/reference/turso-cli#installation)


### Create a new turso database.

```sh
turso db create [DATABASE-NAME]
```

### Access the database through the Turso CLI Shell
    
```sh
turso db shell [DATABASE-NAME]
```

### Create tables and indexes

Here are the SQL statements to set up Turso for the project

```sql
-- create the popular destinations table
CREATE TABLE popular_destinations (
    id SERIAL PRIMARY KEY,
    country VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    image_url VARCHAR(255) NOT NULL
);

-- Seeding up the database
INSERT INTO popular_destinations (country, name, location, image_url)
VALUES
    ('United States', 'New York City', 'New York', 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bmV3JTIweW9ya3xlbnwwfDB8MHx8&auto=format&fit=crop&w=500&q=60');
INSERT INTO popular_destinations (country, name, location, image_url)
VALUES
    ('France', 'Paris', 'Ile-de-France', 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGFyaXN8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60');
INSERT INTO popular_destinations (country, name, location, image_url)
VALUES
	('Japan', 'Tokyo', 'Kanto Region', 'https://images.unsplash.com/photo-1578469645742-46cae010e5d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8a3lvdG98ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60');
INSERT INTO popular_destinations (country, name, location, image_url)
VALUES
	('Australia', 'Sydney', 'New South Wales', 'https://images.unsplash.com/photo-1526958977630-bc61b30a2009?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80');

INSERT INTO popular_destinations (country, name, location, image_url)
VALUES
('London', 'UK', 'United Kingdom', 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bG9uZG9ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60');


-- Quitting the shell
.quit

```


### Filling the Env variables
You need to add two variables on your env file, the first one is the database url, you can get it by running the following command on your terminal:


```sh
turso db show [DATABASE-NAME] --url
```
The second one is the authentication token, you can generate it by running the following command on your terminal:
```sh
turso db tokens create [DATABASE-NAME] 
```

On the root folder add the .env file and add the following variables:
```sh
url=YOUR_DATABASE_URL
authToken=YOUR_AUTH_TOKEN
```
```

### Running the dev server


Start the development server on http://localhost:3000
```
npm run dev
```

When the page is loaded, the data is fetched from the database and displayed on the page.
The data is fetched using a useFetch hook that is defined in the hooks folder.

The Images used are from [Unsplash](https://unsplash.com/)


