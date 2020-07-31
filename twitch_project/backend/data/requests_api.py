import json
import requests
from pprint import pprint

headers = {"Accept" : "application/vnd.twitchtv.v5+json",
           "Client-ID": "3vgotwd98a0sj62us9ivoyp4rbuwdf"}

user_login = "dj_ignifluous"
user_id = "512690582"

endpoint_user = f"https://api.twitch.tv/kraken/users?login={user_login}"

endpoint_follows = f"https://api.twitch.tv/kraken/users/{user_id}/follows/channels"

def get_user():
    response = requests.get(endpoint, headers=headers)
    # pprint(response.content)
    # print(response.status_code)
    # print(response.headers)
    pprint(response.json())
    return

get_user()
