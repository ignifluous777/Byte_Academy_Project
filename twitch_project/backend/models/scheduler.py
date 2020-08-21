import sqlite3, random, string, requests
from .orm import ORM
from .performers import Performers
from .users import Users
from pprint import pprint

class Schedule(ORM):

    def __init__(self, user_id, date, time_slot, performer_un, sked_id=None, pk=None,):
        self.pk = pk
        self.user_id = user_id
        self.date = date
        self.time_slot = time_slot
        self.performer_un = performer_un
        self.sked_id = sked_id

        # CREATE TABLE schedules (
        #     pk INTEGER PRIMARY KEY AUTOINCREMENT,
        #     sked_id VARCHAR(16),
        #     date VARCHAR(16),
        #     time_slot VARCHAR(16),
        #     performer_un VARCHAR(16),

        # CREATE TABLE user_schedules (
        # pk INTEGER PRIMARY KEY AUTOINCREMENT,
        # user_id VARCHAR(16),
        # sked_id VARCHAR(16)

    # this will need to be executed for each line in the schedule iteration likely happening in the controller
    def _insert(self):
        with sqlite3.connect(self.dbpath) as conn:
            cursor = conn.cursor()
            sql1 = """INSERT INTO schedules (
                sked_id, date, time_slot, performer_un
                ) VALUES(?, ?, ?, ?);"""
            values1 = (self.sked_id, self.date, self.time_slot, self.performer_un)
            cursor.execute(sql, values1)
            sql2 = """INSERT INTO user_schedules (
                user_id, sked_id) VALUES(?, ?);"""
            values2 = (self.user_id, self.sked_id)
            cursor.execute(sql, values2)
