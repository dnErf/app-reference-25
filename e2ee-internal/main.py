import os
import requests

es = os.environ["E2EE_SERVER"]
print('===')
print(es)
print('===')

response = requests.get(f'{es}/weatherforecast').json()

print(response)
