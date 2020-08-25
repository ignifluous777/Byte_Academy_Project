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

    # this will need to be executed for each line in the schedule iteration likely happening in the controller
    def _insert(self):
        with sqlite3.connect(self.dbpath) as conn:
            cursor = conn.cursor()
            sql1 = """INSERT INTO schedules (
                sked_id, date, time_slot, performer_un
                ) VALUES(?, ?, ?, ?);"""
            values1 = (self.sked_id, self.date, self.time_slot, self.performer_un)
            cursor.execute(sql1, values1)
            sql2 = """INSERT INTO user_schedules (
                user_id, sked_id) VALUES(?, ?);"""
            values2 = (self.user_id, self.sked_id)
            cursor.execute(sql2, values2)
    
    @classmethod
    def get_sked_by_id(cls, sk_id):
        with sqlite3.connect(cls.dbpath) as conn:
            cursor = conn.cursor()
            sql = """SELECT * from schedules WHERE sked_id=?;"""
            values = (sk_id, )
            cursor.execute(sql, values)
            schedule = cursor.fetchall()
            print(schedule)
            sort_sked = [[], [], []]
            sort_sked[0].append(schedule[0][2])
            for i in range(len(schedule)):
                sort_sked[1].append(schedule[i][3])
                sort_sked[2].append(schedule[i][4])
            print(sort_sked)
            return sort_sked


            perf_ids = cursor.fetchall()
            perf_lst = []
            for tup in perf_ids:
                perf_lst.append(tup[0])
            data = []
            for p_id in perf_lst:
                sql2 = """SELECT username, bio, logo, banner FROM performers WHERE id=?;"""
                cursor.execute(sql2, (p_id,))
                info = cursor.fetchone()
                data.append(info)
            return data