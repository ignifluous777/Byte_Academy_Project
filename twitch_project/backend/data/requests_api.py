import json
import requests, sqlite3
from pprint import pprint

dbpath = "twitchapp.db"

headers = {"Accept" : "application/vnd.twitchtv.v5+json",
           "Client-ID": "3vgotwd98a0sj62us9ivoyp4rbuwdf"}

user_login = "dj_ignifluous"
user_id = "512690582"

endpoint_user = f"https://api.twitch.tv/kraken/users?login={user_login}"

endpoint_follows = f"https://api.twitch.tv/kraken/users/{user_id}/follows/channels?limit=100&offset=100"

performer_data = {"id": 0, "name": "test", "bio": "test", "logo": "test"}

def get_user():

    resp1 = requests.get(endpoint_user, headers=headers)

    with open('user_data.json', 'w') as file_object:
        json.dump(resp1.json(), file_object, indent=4)

    r = resp1.json()
    performer_data["id"] = r["users"][0]["_id"]
    performer_data["name"] = r["users"][0]["name"]
    performer_data["bio"] = r["users"][0]["bio"]
    performer_data["logo"] = r["users"][0]["logo"]
    print(performer_data)
    # print(resp1.status_code)
    # pprint(resp1.json())
    return

def get_user_follows():

    resp2 = requests.get(endpoint_follows, headers=headers)

    with open('follows_data.json', 'w') as file_object:
        json.dump(resp2.json(), file_object, indent=4)

    # print(resp1.status_code)
    # pprint(resp2.json())
    return

get_user()
# get_user_follows()

with sqlite3.connect(dbpath) as conn:
        cursor = conn.cursor()
        sql = """INSERT INTO performers (
                    id, username, bio, logo
                    ) VALUES(?,?,?,?)"""
        values = (performer_data["id"], performer_data["name"], performer_data["bio"], performer_data["logo"])
        cursor.execute(sql, values)