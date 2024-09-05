from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse, parse_qs
from stravalib import Client
import os


client = Client()


MY_STRAVA_CLIENT_ID = os.getenv('STRAVA_CLIENT_ID')
MY_STRAVA_CLIENT_SECRET = os.getenv('STRAVA_CLIENT_SECRET')


REDIRECT_URI = 'http://localhost:5000/authorization'


class StravaAuthHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        query = urlparse(self.path).query
        params = parse_qs(query)

        if 'code' in params:
            code = params['code'][0]
            self.send_response(200)
            self.end_headers()
            self.wfile.write(b"Authorization code received. You can close this tab.")
            print(f"Authorization Code: {code}")

            token_response = client.exchange_code_for_token(client_id=MY_STRAVA_CLIENT_ID,
                                                            client_secret=MY_STRAVA_CLIENT_SECRET,
                                                            code=code)
            print("Access Token: ", token_response['access_token'])
            print("Refresh Token: ", token_response['refresh_token'])
        else:
            self.send_response(400)
            self.end_headers()
            self.wfile.write(b"Authorization code not found in the URL.")


def start_server():
    server_address = ('', 5000)
    httpd = HTTPServer(server_address, StravaAuthHandler)
    print("Server running at http://localhost:5000")
    httpd.serve_forever()

if __name__ == '__main__':
    auth_url = client.authorization_url(client_id=MY_STRAVA_CLIENT_ID, redirect_uri=REDIRECT_URI, scope=['read', 'activity:read'])
    print(f"Open this URL in your browser: {auth_url}")
    
    start_server()
