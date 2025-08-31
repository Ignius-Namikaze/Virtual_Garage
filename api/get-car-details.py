from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
import json
import requests
from bs4 import BeautifulSoup
import urllib.parse

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

# --- Helper function to scrape the data ---
def scrape_car_data(url):
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        data = {}
        image = soup.select_one('aside.portable-infobox img')
        data['imageUrl'] = image['src'] if image else ''
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

# --- Main Vercel Handler ---
# This class is the entry point for Vercel's Python runtime.
class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        # Parse query parameters from the URL (e.g., ?name=...&year=...)
        parsed_path = urlparse(self.path)
        query_params = parse_qs(parsed_path.query)
        car_name = query_params.get('name', [None])[0]
        car_year = query_params.get('year', [None])[0]

        # Handle errors
        if not car_name or not car_year:
            self.send_response(400)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'error': 'Car name and year are required'}).encode())
            return

        fandom_url = get_fandom_url(car_name, car_year)
        if not fandom_url:
            self.send_response(404)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'error': 'Could not find a Fandom wiki page.'}).encode())
            return
            
        scraped_data = scrape_car_data(fandom_url)
        if not scraped_data:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'error': 'Failed to scrape data from the Fandom page.'}).encode())
            return

        # Send the successful response
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*') # Add CORS header
        self.end_headers()
        self.wfile.write(json.dumps(scraped_data).encode())
        return