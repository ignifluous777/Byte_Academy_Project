import sqlite3
from .orm import ORM

class Users(ORM):

    def __init__(self, username, password, pk=None):
        self.pk = pk
        self.username = username
        self.password = password


    def _insert(self):
        """Add a new user to the database
        """
        with sqlite3.connect(self.dbpath) as conn:
            cursor = conn.cursor()
            sql = """INSERT INTO users (
                     username, password
                     ) VALUES(?, ?,)"""
            values = (self.username, self.password)
            cursor.execute(sql, values)

    # def _update(self):
    # """Add a new account to the database
    # """
    # with sqlite3.connect(self.dbpath) as conn:
    #     cursor = conn.cursor()
    #     sql = """UPDATE accounts SET api_key=?, balance=? WHERE pk=?"""
    #     cursor.execute(sql, (self.api_key, self.balance, self.pk))



