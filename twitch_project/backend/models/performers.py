import sqlite3
from .orm import ORM
# from .users import Users

class Performers(ORM):

    def __init__(self, twitch_id, username, bio, prof_pic, pk=None):
        self.pk = pk
        self.twitch_id = twitch_id
        self.username = username
        self.bio = bio
        self.prof_pic = prof_pic

    def _insert(self):
    # Add a new performer to the database
        with sqlite3.connect(self.dbpath) as conn:
            cursor = conn.cursor()
            sql1 = """SELECT * from performers WHERE id=?;"""
            values1 = (self.twitch_id)
            cursor.execute(sql1, values1)
            exists = cursor.fetchone()
            if not exists:
                sql2 = """INSERT INTO performers (
                            id, username, bio, prof_pic
                            ) VALUES(?,?,?,?);"""
                values2 = (self.id, self.username, self.bio, self.prof_pic)
                cursor.execute(sql2, values2)

    def bind_user_perf(self, user_id):
    # Tie a user with a performer
        with sqlite3.connect(self.dbpath) as conn:
            cursor = conn.cursor()
            sql1 = """SELECT * from user_follows WHERE user_id=? AND performer_id=?;"""
            values1 = (user_id, self.twitch_id)
            cursor.execute(sql1, values1)
            exists = cursor.fetchone()
            if not exists:
                sql2 = """INSERT INTO user_follows (
                            user_id, performer_id
                            ) VALUES(?,?);"""
                values2 = (user_id, self.twitch_id)
                cursor.execute(sql2, values2)
    
    def _update(self):
    # Update performer in the database, will add much more functionality later
        with sqlite3.connect(self.dbpath) as conn:
            cursor = conn.cursor()
            sql = """UPDATE performers SET bio=?, prof_pic=? WHERE twitch_id=?;"""
            values = (self.bio, self.prof_pic, self.twitch_id)
            cursor.execute(sql, values)
