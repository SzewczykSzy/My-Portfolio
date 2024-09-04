from stravalib.client import Client
from datetime import datetime
import pickle
import os
import time

client = Client()

MY_STRAVA_CLIENT_ID = os.getenv('STRAVA_CLIENT_ID')
MY_STRAVA_CLIENT_SECRET = os.getenv('STRAVA_CLIENT_SECRET')
# MY_STRAVA_ACCES_TOKEN = os.getenv('STRAVA_ACCESS_TOKEN')
# MY_STRAVA_REFRESH_TOKEN = os.getenv('STRAVA_REFRESH_TOKEN')

print (MY_STRAVA_CLIENT_ID)

# timestamp = '2024-09-04T13:38:16Z'
# expires_at = int(datetime.strptime(timestamp, "%Y-%m-%dT%H:%M:%SZ").timestamp())

# access_token_data = {
#     'access_token': MY_STRAVA_ACCES_TOKEN,  # replace with actual token if available
#     'refresh_token': MY_STRAVA_REFRESH_TOKEN,  # replace with actual token if available
#     'expires_at': expires_at
# }

# with open('strava/access_token.pickle', 'wb') as f:
#     pickle.dump(access_token_data, f)

# print('Pickle file created successfully with the following data:')
# print(access_token_data)

with open('strava/access_token.pickle', 'rb') as f:
    access_token = pickle.load(f)
    
print('Latest access token read from file:', access_token)

if time.time() > access_token['expires_at']:
    print('Token has expired, will refresh')
    refresh_response = client.refresh_access_token(client_id=MY_STRAVA_CLIENT_ID, 
                                               client_secret=MY_STRAVA_CLIENT_SECRET, 
                                               refresh_token=access_token['refresh_token'])
    access_token = refresh_response
    with open('strava/access_token.pickle', 'wb') as f:
        pickle.dump(refresh_response, f)
    print('Refreshed token saved to file')

    client.access_token = refresh_response['access_token']
    client.refresh_token = refresh_response['refresh_token']
    client.token_expires_at = refresh_response['expires_at']
        
else:
    print('Token still valid, expires at {}'
          .format(time.strftime("%a, %d %b %Y %H:%M:%S %Z", time.localtime(access_token['expires_at']))))

    client.access_token = access_token['access_token']
    client.refresh_token = access_token['refresh_token']
    client.token_expires_at = access_token['expires_at']

athlete = client.get_athlete()
print("Athlete's name is {} {}, based in {}, {}"
      .format(athlete.firstname, athlete.lastname, athlete.city, athlete.country))