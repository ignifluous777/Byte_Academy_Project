import sqlite3
from .orm import ORM

class Performers(ORM):

    def __init__(self, id, username, bio, logo, pk=None):
        self.pk = pk
        self.id = id
        self.username = username
        self.bio = bio
        self.logo = logo


    def _insert(self):
        """Add a new performer to the database
        """
        with sqlite3.connect(self.dbpath) as conn:
            cursor = conn.cursor()
            sql = """INSERT INTO performers (
                     id, username, bio, logo
                     ) VALUES(?,?,?,?)"""
            values = (self.id, self.username, self.bio, self.logo)
            cursor.execute(sql, values)

    # def _update(self):
    # """Add a new account to the database
    # """
    # with sqlite3.connect(self.dbpath) as conn:
    #     cursor = conn.cursor()
    #     sql = """UPDATE accounts SET api_key=?, balance=? WHERE pk=?"""
    #     cursor.execute(sql, (self.api_key, self.balance, self.pk))
