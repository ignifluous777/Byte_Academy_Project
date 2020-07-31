import sqlite3


def schema(dbpath="twitchapp.db"):
    with sqlite3.connect(dbpath) as conn:
        cur = conn.cursor()

        cur.execute("""
        CREATE TABLE users (
            pk INTEGER PRIMARY KEY AUTOINCREMENT,
            username VARCHAR(16) UNIQUE NOT NULL,
            password VARCHAR(128),
        );""")

        cur.execute("""
        CREATE TABLE performers (
            pk INTEGER PRIMARY KEY AUTOINCREMENT,
            username VARCHAR(16) UNIQUE NOT NULL,
            password VARCHAR(128),
        );""")

if __name__ == "__main__":
    schema()
