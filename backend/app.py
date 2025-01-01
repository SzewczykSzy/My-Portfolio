from flask import Flask, jsonify
from flask_cors import CORS
import requests
from datetime import datetime, timedelta
import os
from stravalib.client import Client
import pickle
import time
import pytz
import redis
import json


app = Flask(__name__)
CORS(app)

GITHUB_USERNAME = 'SzewczykSzy'
GITHUB_TOKEN = os.getenv('GITHUB_TOKEN')

MY_STRAVA_CLIENT_ID = os.getenv('STRAVA_CLIENT_ID')
MY_STRAVA_CLIENT_SECRET = os.getenv('STRAVA_CLIENT_SECRET')
ATHLETE_ID = 41343981

REDIS_URL = os.getenv("REDIS_URL")
REDIS_DB_PASSWORD = os.getenv("REDIS_DB_PASSWORD")


redis_client = redis.Redis(host=REDIS_URL, port=11330, password=REDIS_DB_PASSWORD)


def expires_to_seconds(expires_time_str):
    expires_time = datetime.strptime(expires_time_str, '%Y-%m-%dT%H:%M:%SZ')
    expires_seconds = expires_time.timestamp()
    return int(expires_seconds)


def fetch_github_repos():
    headers = {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': f'token {GITHUB_TOKEN}'
    }
    response = requests.get(f'https://api.github.com/users/{GITHUB_USERNAME}/repos', headers=headers)
    if response.status_code != 200:
        raise Exception("Error fetching data from GitHub API")
    repos_data = response.json()
    return {
        'repository_count': len(repos_data),
    }


def fetch_github_contributions():
    headers = {
        'Authorization': f'bearer {GITHUB_TOKEN}'
    }
    query = """
    query($username: String!) {
        user(login: $username) {
            contributionsCollection {
                contributionCalendar {
                    weeks {
                        contributionDays {
                            date
                            contributionCount
                        }
                    }
                }
            }
        }
    }
    """
    variables = {
        'username': GITHUB_USERNAME
    }
    response = requests.post(
        'https://api.github.com/graphql',
        json={'query': query, 'variables': variables},
        headers=headers
    )
    if response.status_code != 200:
        raise Exception("Error fetching data from GitHub API")
    
    data = response.json()
    weeks = data['data']['user']['contributionsCollection']['contributionCalendar']['weeks']
    contributions = []
    for week in weeks:
        for day in week['contributionDays']:
            contributions.append({
                'date': day['date'],
                'count': day['contributionCount']
            })
    return contributions

def fetch_github_commits_and_prs():
    headers = {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': f'token {GITHUB_TOKEN}'
    }

    commits_response = requests.get(f'https://api.github.com/search/commits?q=author:{GITHUB_USERNAME}', headers=headers)
    if commits_response.status_code != 200:
        raise Exception("Error fetching data from GitHub API")
    commits_data = commits_response.json()
    commit_count = commits_data['total_count']
    

    prs_response = requests.get(f'https://api.github.com/search/issues?q=author:{GITHUB_USERNAME}+type:pr', headers=headers)
    if prs_response.status_code != 200:
        raise Exception("Error fetching data from GitHub API")
    prs_data = prs_response.json()
    pr_count = prs_data['total_count']
    
    return {
        'commit_count': commit_count,
        'pr_count': pr_count
    }


def store_token(token_data):
    redis_client.set('strava_access_token', token_data['access_token'])
    redis_client.set('strava_refresh_token', token_data['refresh_token'])
    redis_client.set('strava_expires_at', token_data['expires_at'])


def get_token():
    access_token = redis_client.get('strava_access_token')
    refresh_token = redis_client.get('strava_refresh_token')
    expires_at = redis_client.get('strava_expires_at')

    if access_token and refresh_token and expires_at:
        return {
            'access_token': access_token.decode('utf-8'),
            'refresh_token': refresh_token.decode('utf-8'),
            'expires_at': expires_at.decode('utf-8')
        }
    return None


def fetch_strava_koms():
    client = Client()

    token_data = get_token()
    

    if not token_data or time.time() > int(token_data['expires_at']):
        refresh_response = client.refresh_access_token(client_id=MY_STRAVA_CLIENT_ID, 
                                                       client_secret=MY_STRAVA_CLIENT_SECRET, 
                                                       refresh_token=token_data['refresh_token'])
        token_data = refresh_response
        store_token(token_data)

    client.access_token = token_data['access_token']
    client.refresh_token = token_data['refresh_token']
    client.token_expires_at = token_data['expires_at']

    koms = list(client.get_athlete_koms(ATHLETE_ID))
    koms_dictionaries = []

    for kom in koms:
        type_ = kom.segment.activity_type.root
        name = kom.segment.name
        id_ = kom.segment.id
        dist = kom.segment.distance
        elev = round(kom.segment.elevation_high - kom.segment.elevation_low)
        minutes, seconds = divmod(kom.elapsed_time, 60)
        time_ = f"{minutes}:{seconds:02d}"
        date_ = kom.start_date_local.strftime('%b %d, %Y')

        temp_dict = {'type':type_, 'name':name, 'id':id_, 'distance':dist, 'elevation':elev, 'time':time_, 'date':date_}
        koms_dictionaries.append(temp_dict)
    return koms_dictionaries


def fetch_strava_last_activity():
    client = Client()

    token_data = get_token()

    if not token_data or time.time() > int(token_data['expires_at']):
        refresh_response = client.refresh_access_token(client_id=MY_STRAVA_CLIENT_ID, 
                                                       client_secret=MY_STRAVA_CLIENT_SECRET, 
                                                       refresh_token=token_data['refresh_token'])
        token_data = refresh_response
        store_token(token_data)

    client.access_token = token_data['access_token']
    client.refresh_token = token_data['refresh_token']
    client.token_expires_at = token_data['expires_at']

    last_activity = list(client.get_activities(limit=1))[0]

    id_ = last_activity.id
    achievements = last_activity.achievement_count
    avg_speed = round(last_activity.average_speed*3.6, 2)
    dist = round(last_activity.distance/1000, 2)

    time_ = f"{last_activity.elapsed_time // 3600}h {(last_activity.elapsed_time % 3600) // 60}m"
    elev_gain = last_activity.total_elevation_gain

    mov_time = f"{last_activity.moving_time // 3600}h {(last_activity.moving_time % 3600) // 60}m"
    name = last_activity.name
    type_ = last_activity.sport_type.root
    time_from_act = round((datetime.now(pytz.UTC) - last_activity.start_date - timedelta(seconds=last_activity.elapsed_time)).total_seconds() / 3600)

    temp_dict = {'type':type_, 'name':name, 'id':id_, 'distance':dist, 'elevation':elev_gain, 'mov_time':mov_time, 'time':time_, 'time_from_act':time_from_act, 'achievements':achievements, 'avg_speed':avg_speed}
    return temp_dict


@app.route('/api/github_repos', methods=['GET'])
def github_repos():
    stats = fetch_github_repos()
    return jsonify(stats)


@app.route('/api/github_contributions', methods=['GET'])
def github_contributions():
    contributions = fetch_github_contributions()
    return jsonify(contributions)


@app.route('/api/github_commits_prs', methods=['GET'])
def github_commits_prs():
    commits_prs = fetch_github_commits_and_prs()
    return jsonify(commits_prs)


@app.route('/api/strava_koms', methods=['GET'])
def strava_koms():
    koms = fetch_strava_koms()
    return koms

@app.route('/api/strava_last_activity', methods=['GET'])
def strava_last_activity():
    last_activity = fetch_strava_last_activity()
    return last_activity


if __name__ == '__main__':
    app.run()
    
