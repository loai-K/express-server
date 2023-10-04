-- create users table
-- CREATE SEQUENCE IF NOT EXISTS users.users_seq START WITH 1 INCREMENT BY 1 NOCACHE;
-- CREATE SEQUENCE IF NOT EXISTS users.users_seq START WITH 1 INCREMENT BY 1;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS users (
--     id SERIAL PRIMARY KEY,
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    first_name varchar(50),
    last_name varchar(50) NOT NULL,
    user_name varchar(50) UNIQUE NOT NULL,
    bio TEXT DEFAULT NULL,
    email varchar(255) NOT NULL UNIQUE,
    mobile varchar(255) UNIQUE DEFAULT NULL,
    password varchar(255) NOT NULL,
    status BOOLEAN DEFAULT false,
    last_login TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    registered_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)