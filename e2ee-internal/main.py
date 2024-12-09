import requests

response = requests.get('http://localhost:5160/weatherforecast').json()

print(response)
