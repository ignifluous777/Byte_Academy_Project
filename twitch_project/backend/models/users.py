import sqlite3, random, string
from .orm import ORM
from .performers import Performers


class Users(ORM):

    def __init__(self, email, twitch_un, password, pk=None, twitch_id=None, auth_token=None):
        self.pk = pk
        self.email
        self.twitch_un = twitch_un
        self.twitch_id = twitch_id
        #hash here or elsewhere
        self.password = password
        self.auth_token = auth_token

    # create a new one in db
    def _insert(self):
        with sqlite3.connect(self.dbpath) as conn:
            cursor = conn.cursor()
            if not self.twitch_id:
                self.twitch_id = lookup_id(self.twitch_un)
            sql = """INSERT INTO users (
                        email, twitch_un, twitch_id, password
                        ) VALUES(?, ?, ?, ?)"""
            values = (self.email, self.twitch_un, self.twitch_id, self.password)
            cursor.execute(sql, values)
            # add performers by user and tie them to each to users probably don't want here

    @staticmethod
    def lookup_id(twitch_username):
        headers = {"Accept" : "application/vnd.twitchtv.v5+json",
                   "Client-ID": "3vgotwd98a0sj62us9ivoyp4rbuwdf"}
        endpoint = f"https://api.twitch.tv/kraken/users?login={twitch_username}"
        resp = requests.get(endpoint, headers=headers).json()
        twitch_id = resp["users"][0]["_id"]
        return twitch_id

    @staticmethod
    def get_performers(user_id):
        headers = {"Accept" : "application/vnd.twitchtv.v5+json",
                   "Client-ID": "3vgotwd98a0sj62us9ivoyp4rbuwdf"}
        endpoint = f"https://api.twitch.tv/kraken/users/{user_id}/follows/channels?limit=100&offset=100"
        resp = requests.get(endpoint, headers=headers).json()
        follows = resp["follows"]
        return follows

    @staticmethod
    def my_performers(twitch_id):
        with sqlite3.connect(cls.dbpath) as conn:
            cursor = conn.cursor()
            sql = f"""SELECT * FROM user_follows WHERE twitch_id = {twitch_id}"""
            cursor.execute(sql)
            return cursor.fetchall()
            # can optimize in future with a SQL JOIN

    # know whether they have an account to make sure we don't create duplicates
    @classmethod
    def email_exists(cls, input_email):
        with sqlite3.connect(cls.dbpath) as conn:
            cursor = conn.cursor()
            sql = f"""SELECT * FROM users WHERE email = {input_email}"""
            cursor.execute(sql)
            if cursor.fetchone():
                return True
            return False
            # return cls.select_one_where(f"WHERE email = {input_email}")

    # login in -- check credentials and do something to denote logged in status to react 
    @classmethod
    def login(cls, email, password):
        with sqlite3.connect(cls.dbpath) as conn:
            cursor = conn.cursor()
            sql = f"""SELECT * FROM users WHERE email = {email} AND password = {password}"""
            cursor.execute(sql)
            user = cursor.fetchone()
            if user:
                letters = string.ascii_letters
                token = ''.join(random.choice(letters) for i in range(16))
                self.auth_token = token
                insert_token(email, self.auth_token)
                return token
            return ""

    @staticmethod
    def insert_token(email, token):
        with sqlite3.connect(cls.dbpath) as conn:
            cursor = conn.cursor()
            sql = f"""UPDATE users SET auth_token = {token} WHERE email = {email}"""
            cursor.execute(sql)

    # know whether they're logged in --> from react's PoV
    # return some data from the database that can be sotred client-side and validated
    @classmethod
    def authenticate(cls, token):
        # select statement here to see if data exists where our unique id = input id
        # might return an instance, or a tuple etc.
        with sqlite3.connect(cls.dbpath) as conn:
            cursor = conn.cursor()
            sql = f"""SELECT * FROM users WHERE token = {token}"""
            cursor.execute(sql)
            if cursor.fetchall():
                # if token not there
                return cursor.fetchall()
            return False

    # this will be called by a synch performers from twitch you your library function in flask
    @classmethod
    def performers_by_music(cls, user_id):
        # filter out the Musicians from a users follows
        performers = get_performers(user_id).filter(
            lambda x: x["channel"]["game"] == "Music & Performing Arts")
        )
        for performer in performers:
            new_artist = Performer(performer["channel"]["_id"],
                                   performer["channel"]["name"],
                                   performer["channel"]["description"],
                                   performer["channel"]["profile_banner"],
                                  )
            new_artist._insert()
            new_artist.bind_user_perf(user_id)
    
    def logout(self):
        with sqlite3.connect(cls.dbpath) as conn:
            cursor = conn.cursor()
            sql = f"""UPDATE users SET auth_token = NULL WHERE email = {self.email}"""
            cursor.execute(sql)
            self.auth_token = None





