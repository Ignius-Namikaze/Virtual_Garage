from flask import Flask, jsonify, request
import requests
from bs4 import BeautifulSoup
import urllib.parse

app = Flask(__name__)

# --- Helper function to find the Fandom URL ---
def get_fandom_url(car_name, year):
    search_query = f"Hot Wheels {car_name} {year}"
    search_url = f"https://hotwheels.fandom.com/wiki/Special:Search?query={urllib.parse.quote(search_query)}"
    try:
        response = requests.get(search_url, timeout=10)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        result_link = soup.select_one('ul.unified-search__results li.unified-search__result a')
        if result_link and result_link['href']:
            return result_link['href']
        return None
    except requests.RequestException:
        return None

# --- [UPDATED] Helper function to scrape the data ---
def scrape_car_data(url):
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        data = {}
        
        # --- ROBUST IMAGE SCRAPING LOGIC ---
        image_url = ''
        image_tag = soup.select_one('aside.portable-infobox img')
        if image_tag:
            # Prioritize 'data-src' for lazy-loaded images, fallback to 'src'
            raw_url = image_tag.get('data-src') or image_tag.get('src')
            if raw_url:
                # Clean the URL: remove query parameters like '?cb=...'
                # and any scaling info like '/scale-to-width-down/...'
                # This gets us the direct, original image file.
                image_url = raw_url.split('?')[0]
                if '/revision/latest' in image_url:
                     image_url = image_url.split('/revision/latest')[0]

        data['imageUrl'] = image_url
        # --- END OF IMAGE SCRAPING LOGIC ---

        # Scrape all text data points from the infobox
        infobox = soup.select('aside.portable-infobox section.pi-group')
        for group in infobox:
            items = group.select('div.pi-item')
            for item in items:
                key_element = item.find('h3', class_='pi-data-label')
                value_element = item.find('div', class_='pi-data-value')
                if key_element and value_element:
                    key = key_element.get_text(strip=True).replace(' ', '_').lower()
                    value = value_element.get_text(strip=True)
                    # Don't overwrite the already processed image URL
                    if key != 'image':
                        data[key] = value
        return data
    except requests.RequestException:
        return None

# The main API route
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    car_name = request.args.get('name')
    car_year = request.args.get('year')

    if not car_name or not car_year:
        return jsonify({'error': 'Car name and year are required'}), 400

    fandom_url = get_fandom_url(car_name, car_year)
    if not fandom_url:
        return jsonify({'error': 'Could not find a Fandom wiki page.'}), 404
        
    scraped_data = scrape_car_data(fandom_url)
    if not scraped_data:
        return jsonify({'error': 'Failed to scrape data from the Fandom page.'}), 500

    response = jsonify(scraped_data)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response