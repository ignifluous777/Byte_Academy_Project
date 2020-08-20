import sqlite3, random, string, requests
from .orm import ORM
from .performers import Performers
from pprint import pprint

class Users(ORM):

    def __init__(self, email, twitch_un, password, pk=None, twitch_id=None, auth_token=None):
        self.pk = pk
        self.email = email
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
                self.twitch_id = Users.lookup_id(self.twitch_un)
            sql = """INSERT INTO users (
                        email, twitch_un, twitch_id, password
                        ) VALUES(?, ?, ?, ?);"""
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
        endpoint = f"https://api.twitch.tv/kraken/users/{user_id}/follows/channels?limit=100"
        resp = requests.get(endpoint, headers=headers).json()
        follows = resp["follows"]
        return follows

    @classmethod
    def my_performers(cls, twitch_id):
        with sqlite3.connect(cls.dbpath) as conn:
            cursor = conn.cursor()
            sql = """SELECT performer_id FROM user_follows WHERE user_id=?;"""
            cursor.execute(sql, (twitch_id,))
            perf_ids = cursor.fetchall()
            perf_lst = []
            for tup in perf_ids:
                perf_lst.append(tup[0])
            data = []
            for p_id in perf_lst:
                sql2 = """SELECT username, bio, logo, banner FROM performers WHERE id=?;"""
                cursor.execute(sql2, (p_id,))
                info = cursor.fetchone()
                # obj = []
                # obj["username"] = info[0][0]
                # obj["bio"] = info[0][1]
                # obj["logo"] = info[0][2]
                data.append(info)
                # data.append(info)
            # print(data)
            return data

    # know whether they have an account to make sure we don't create duplicates
    @classmethod
    def email_exists(cls, input_email, twitch_un):
        with sqlite3.connect(cls.dbpath) as conn:
            cursor = conn.cursor()
            sql = """SELECT * FROM users WHERE email=?;"""
            cursor.execute(sql, (input_email, ))
            if cursor.fetchone():
                return True
            sql2 = """SELECT * FROM users WHERE twitch_un=?;"""
            cursor.execute(sql2, (twitch_un, ))
            if cursor.fetchone():
                return True
            return False

    # login in -- check credentials and do something to denote logged in status to react 
    @classmethod
    def login(cls, email, password):
        with sqlite3.connect(cls.dbpath) as conn:
            cursor = conn.cursor()
            sql = """SELECT * FROM users WHERE email=? AND password=?;"""
            values = (email, password)
            cursor.execute(sql, values)
            user = cursor.fetchall()
            if user:
                letters = string.ascii_letters
                token = ''.join(random.choice(letters) for i in range(16))
                cls.insert_token(email, token)
                return token
            return ""

    @classmethod
    def insert_token(cls, email, token):
        with sqlite3.connect(cls.dbpath) as conn:
            cursor = conn.cursor()
            sql = """UPDATE users SET auth_token=? WHERE email=?;"""
            values = (token, email)
            cursor.execute(sql, values)

    # know whether they're logged in --> from react's PoV
    # return some data from the database that can be sotred client-side and validated
    @classmethod
    def authenticate(cls, token):
        # select statement here to see if data exists where our unique id = input id
        # might return an instance, or a tuple etc.
        with sqlite3.connect(cls.dbpath) as conn:
            cursor = conn.cursor()
            sql = """SELECT * FROM users WHERE auth_token=?;"""
            cursor.execute(sql, (token,))
            data = cursor.fetchall()
            if data:
                # if user auth_token matches session storage
                return data
            return False

    # this will be called by a synch performers from twitch you your library function in flask
    @classmethod
    def performers_by_music(cls, user_id):
        # filter out the Musicians from a users follows
        perf_check = Users.get_performers(user_id)
        # pprint(perf_check)
        performers = filter((lambda x: x["channel"]["game"] == "Music & Performing Arts"), perf_check)    
        for performer in performers:
            new_artist = Performers(performer["channel"]["_id"],
                                   performer["channel"]["name"],
                                   performer["channel"]["description"],
                                   performer["channel"]["logo"],
                                   performer["channel"]["profile_banner"]
                                  )
            new_artist._insert()
            new_artist.bind_user_perf(user_id)
        if perf_check:
            return True
    
    def logout(self):
        with sqlite3.connect(self.dbpath) as conn:
            cursor = conn.cursor()
            sql = """UPDATE users SET auth_token = NULL WHERE email=?;"""
            cursor.execute(sql, (self.email,))
            # self.auth_token = None





