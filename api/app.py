from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
import urllib.parse

app = Flask(__name__)
CORS(app)

# This function finds the correct Fandom wiki URL for a car
def get_fandom_url(car_name, year):
    search_query = f"Hot Wheels {car_name} {year}"
    search_url = f"https://hotwheels.fandom.com/wiki/Special:Search?query={urllib.parse.quote(search_query)}"
    
    try:
        response = requests.get(search_url, timeout=10)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Find the first search result link
        result_link = soup.select_one('ul.unified-search__results li.unified-search__result a')
        if result_link and result_link['href']:
            return result_link['href']
        return None
    except requests.RequestException:
        return None

# This function scrapes the data from the car's page
def scrape_car_data(url):
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        
        data = {}
        
        # Scrape the main image
        image = soup.select_one('aside.portable-infobox img')
        data['imageUrl'] = image['src'] if image else ''

        # Scrape all data points from the infobox
        infobox = soup.select('aside.portable-infobox section.pi-group')
        for group in infobox:
            items = group.select('div.pi-item')
            for item in items:
                key_element = item.find('h3', class_='pi-data-label')
                value_element = item.find('div', class_='pi-data-value')
                if key_element and value_element:
                    key = key_element.get_text(strip=True).replace(' ', '_').lower()
                    value = value_element.get_text(strip=True)
                    data[key] = value
                    
        return data
    except requests.RequestException:
        return None

# This is the main API route that the frontend will call
@app.route('/get-car-details')
def get_car_details():
    car_name = request.args.get('name')
    car_year = request.args.get('year')

    if not car_name or not car_year:
        return jsonify({'error': 'Car name and year are required'}), 400

    fandom_url = get_fandom_url(car_name, car_year)
    
    if not fandom_url:
        return jsonify({'error': 'Could not find a Fandom wiki page for this car.'}), 404
        
    scraped_data = scrape_car_data(fandom_url)
    
    if not scraped_data:
        return jsonify({'error': 'Failed to scrape data from the Fandom page.'}), 500

    return jsonify(scraped_data)