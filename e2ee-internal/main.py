import os
import requests

response = requests.get(f'{os.environ["E2EE_SERVER"]}/weatherforecast').json()

print(response)
