import sqlite3
from .orm import ORM

class Performers(ORM):

    def __init__(self, twitch_id, username, bio, prof_pic, pk=None):
        self.pk = pk
        self.twitch_id = twitch_id
        self.username = username
        self.bio = bio
        self.prof_pic = prof_pic

    #  move to users
    # @classmethod
    # def performers_by_music(cls, user_id):
    #     performers = get_performers(user_id)
    #     # will probably return response.get("follows"), i.e data associated with
    #     # the "follows key" --> list of followed
    #     # performers is now a list of dictionaries, the value that corresponds to the "follows" key in response
    #     # filter out the Music & Performers
    #     for performer in performers:
    #         if performer["channel"]["game"] == "Music & Performing Arts":
    #             new_artist = Performer(performer["channel"]["_id"],
    #                                    performer["channel"]["name"],
    #                                    performer["channel"]["description"],
    #                                    performer["channel"]["profile_banner"],
    #                                    )
    #             new_artist._insert()
    # @staticmethod
    # def get_performers(user_id):
    #     headers = {"Accept" : "application/vnd.twitchtv.v5+json",
    #                "Client-ID": "3vgotwd98a0sj62us9ivoyp4rbuwdf"}
    #     endpoint = f"https://api.twitch.tv/kraken/users/{user_id}/follows/channels?limit=100&offset=100"
    #     resp = requests.get(endpoint, headers=headers).json()
    #     follows = resp["follows"]
    #     return follows

    def _insert(self):
    # Add a new performer to the database
        with sqlite3.connect(self.dbpath) as conn:
            cursor = conn.cursor()
            sql = """INSERT INTO performers (
                     id, username, bio, prof_pic
                     ) VALUES(?,?,?,?)"""
            values = (self.id, self.username, self.bio, self.prof_pic)
            cursor.execute(sql, values)
        

    def _update(self):
    # Update performer in the database
        with sqlite3.connect(self.dbpath) as conn:
            cursor = conn.cursor()
            sql = """UPDATE performers SET bio=?, prof_pic=? WHERE twitch_id=?"""
            cursor.execute(sql, (self.bio, self.prof_pic, self.twitch_id))
