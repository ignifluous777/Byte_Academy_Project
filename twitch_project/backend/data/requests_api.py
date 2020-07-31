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

    resp1 = requests.get(endpoint_user, headers=headers)
    resp2 = requests.get(endpoint_follows, headers=headers)

    with open('user_data.json', 'w') as file_object:
        json.dump(resp1.json(), file_object, indent=4)
    
    with open('follows_data.json', 'w') as file_object:
        json.dump(resp2.json(), file_object, indent=4)

    # print(resp1.status_code)
    pprint(resp1.json())
    pprint(resp2.json())
    return

get_user()
