
CREATE SEQUENCE  IF NOT EXISTS hibernate_sequence START WITH 1 INCREMENT BY 1;

CREATE TABLE product (
  id BIGINT NOT NULL,
   name VARCHAR(255),
   price FLOAT NOT NULL,
   CONSTRAINT pk_product PRIMARY KEY (id)
);
