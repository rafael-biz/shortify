CREATE SCHEMA shortify;

CREATE TABLE shortify."User"
(
    "Id" serial NOT NULL,
    "Login" text,
    CONSTRAINT "User_pkey" PRIMARY KEY ("Id"),
    CONSTRAINT "User_Login_key" UNIQUE ("Login")
) WITH (OIDS=FALSE);

CREATE TABLE shortify."Url"
(
    "Id" serial NOT NULL,
    "UserId" integer NOT NULL,
    "Url" text NOT NULL,
    "Hits" integer NOT NULL DEFAULT 0,
    CONSTRAINT "Url_pkey" PRIMARY KEY ("Id"),
    CONSTRAINT "Url_UserId_fkey" FOREIGN KEY ("UserId")
    REFERENCES shortify."User" ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE CASCADE,
        CONSTRAINT "Url_Url_key" UNIQUE ("Url")
) WITH (OIDS=FALSE);