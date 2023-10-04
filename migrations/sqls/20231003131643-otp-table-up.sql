-- create otp table
-- CREATE SEQUENCE IF NOT EXISTS otp.otp_seq START WITH 1 INCREMENT BY 1;
CREATE TYPE valid_otp_type AS ENUM ('check', 'forget', 'verification');

CREATE TABLE IF NOT EXISTS otp (
    id SERIAL PRIMARY KEY,
    user_id varchar(36) NOT NULL,
    otp_type valid_otp_type,
    otp_code varchar(8),
    expiration TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP

--     PRIMARY KEY (id, user_id)
--     CONSTRAINT fk_user_otp FOREIGN KEY(user_id) REFERENCES users(id)
)
