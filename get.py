import requests

for year in range(1960,2016,5):
	print(year)
	requests.get("https://www.populationpyramid.net/hnp/birth-rate-crude-per-1000-people/{}".format(year))