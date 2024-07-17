from flask import Flask, jsonify
from flask_cors import CORS
import requests
from datetime import datetime, timedelta
import os

app = Flask(__name__)
CORS(app)

GITHUB_USERNAME = 'SzewczykSzy'
GITHUB_TOKEN = os.getenv('GITHUB_TOKEN')

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


if __name__ == '__main__':
    app.run(debug=True)
