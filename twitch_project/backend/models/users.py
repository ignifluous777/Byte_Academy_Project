import sqlite3
from .orm import ORM

class Users(ORM):

    def __init__(self, email, twitch_un, password, pk=None, twitch_id=None, token=None):
        self.pk = pk
        self.email
        self.twitch_un = twitch_un
        self.twitch_id = twitch_id
        #hash here or elsewhere
        self.password = password
        self.token = token

    # know whether they have an account to make sure we don't create duplicates
    @classmethod
    def email_exists(cls, input_email):
        with sqlite3.connect(cls.dbpath) as conn:
        cursor = conn.cursor()
        sql = f"""SELECT * FROM users WHERE email = {input_email}"""
        try:
            cursor.execute(sql)
        except sqlite3.Error:
            # if email does not exist, create users
            self._insert()
        return cls.select_one_where(f"WHERE email = {input_email}")

    @classmethod
    def select_one_where(class, where_string):
        with sqlite3.connect(cls.dbpath) as conn:
        cursor = conn.cursor()
        sql = f"""SELECT * FROM users """ + where_string
        cursor.execute(sql)
        return cursor.fetchone()

    # know whether they're logged in --> from react's PoV
    # return some data from the database that can be sotred client-side and validated
    @classmethod
    def authenticate(cls, token):
        # select statement here to see if data exists where our unique id = input id
        # might return an instance, or a tuple etc.
        with sqlite3.connect(cls.dbpath) as conn:
        cursor = conn.cursor()
        sql = f"""SELECT * FROM users WHERE token = {token}"""
        try:
            cursor.execute(sql)
        except sqlite3.Error:
            # if token not there
            return False
        return True

    # create a new one in db
    def insert(self):
        with sqlite3.connect(self.dbpath) as conn:
        cursor = conn.cursor()
        self.twitch_id = lookup_id(self.twitch_un)
        sql = """INSERT INTO users (
                    email, twitch_un, twitch_id, password
                    ) VALUES(?, ?, ?, ?)"""
        values = (self.email, self.twitch_un, self.twitch_id, self.password)
        cursor.execute(sql, values)


    # login in -- check credentials and do something to denote logged in status to react
    @classmethod
    def login(cls, email, password):
        with sqlite3.connect(cls.dbpath) as conn:
        cursor = conn.cursor()
        sql = f"""SELECT * FROM users WHERE email = {email} AND password = {password}"""
        try:
            cursor.execute(sql)
            return True
        except sqlite3.Error:
            # if email and password do not match
            return False
        return False

    #  look up and set twitch id from twitch_un that is given
    # def set_twitch_id(self, _twitch_un):
    #     # get id from twitch using username
    #     self.twitch_id = lookup_id(_twitch_un)
    #     return self.twitch_id

    def my_performers(self):
        with sqlite3.connect(cls.dbpath) as conn:
        cursor = conn.cursor()
        sql = f"""SELECT * FROM user_follows WHERE twitch_id = {self.twitch_id}"""
        cursor.execute(sql)
        return cursor.fetchall()
        # can optimize in future with a SQL JOIN
    
    def lookup_id(self, _twitch_un):
        headers = {"Accept" : "application/vnd.twitchtv.v5+json",
                   "Client-ID": "3vgotwd98a0sj62us9ivoyp4rbuwdf"}
        endpoint = f"https://api.twitch.tv/kraken/users?login={_twitch_un}"
        resp = requests.get(endpoint, headers=headers).json()
        self.twitch_id = resp["users"][0]["_id"]
        return self.twitch_id










