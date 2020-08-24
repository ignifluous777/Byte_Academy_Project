import sqlite3

def schema(dbpath="twitchapp.db"):
    with sqlite3.connect(dbpath) as conn:
        cur = conn.cursor()

        cur.execute("""
        CREATE TABLE users (
            pk INTEGER PRIMARY KEY AUTOINCREMENT,
            email VARCHAR(32) UNIQUE NOT NULL,
            twitch_un VARCHAR(16) UNIQUE NOT NULL,
            twitch_id VARCHAR(16) UNIQUE NOT NULL,
            password VARCHAR(128),
            auth_token VARCHAR(16)
        );""")

        cur.execute("""
        CREATE TABLE performers (
            pk INTEGER PRIMARY KEY AUTOINCREMENT,
            id VARCHAR(16), 
            username VARCHAR(16) UNIQUE NOT NULL,
            bio VARCHAR(150),
            logo VARCHAR(500),
            banner VARCHAR(500)
        );""")

        cur.execute("""
        CREATE TABLE user_follows (
            pk INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id VARCHAR(16),
            performer_id VARCHAR(16)
        );""")

        cur.execute("""
        CREATE TABLE schedules (
            pk INTEGER PRIMARY KEY AUTOINCREMENT,
            sked_id VARCHAR(16),
            date VARCHAR(16),
            time_slot VARCHAR(16),
            performer_un VARCHAR(16)
        );""")

        cur.execute("""
        CREATE TABLE user_schedules (
            pk INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id VARCHAR(16),
            sked_id VARCHAR(16)
        );""")

if __name__ == "__main__":
    schema()

# schema()