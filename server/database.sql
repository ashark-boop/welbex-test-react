create TABLE record(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    quantity INTEGER,
    distance INTEGER,
    dat TIMESTAMP
);