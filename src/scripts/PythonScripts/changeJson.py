import json
import sys

with open('UVAfin.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

def changeGeometry(data): 
    # Process each year's data separately
    for year, entries in data.items():
        # Process the "geometry" values and update the data
        for entry in entries:
            if isinstance(entry, dict) and 'geometry' in entry:
                # Extract the geometry string from the dictionary
                geometry_str = entry['geometry']
                # Split the geometry string into latitude and longitude
                latitude, longitude = map(str.strip, geometry_str.split(','))
                # Update the entry with the array
                if entry['geometry'] == '':
                    entry['geometry'] = None
                else:
                    entry['geometry'] = [latitude, longitude]
    return data

def convert_to_geojson(data):
    geojson_data = {
        "type": "FeatureCollection",
        "features": []
    }
    geojson_nocoords = {
        "type": "FeatureCollection",
        "features": []
    }

    for year, entries in data.items():
        for entry in entries:
            if 'Length' not in entry:
                entry['Length'] = 0
            if 'geometry' not in entry and 'area' in entry:
                feature = {
                    "type": "Feature",
                    "properties": {
                        "name": entry['name'],
                        "date": entry['date'],
                        "length": entry['Length'],
                        "area": entry['area'],
                        "description": entry['description'],
                        "year": year
                    },
                    
                    "geometry": {
                        "type": "Point",
                        "coordinates": None
                    }
                }
                geojson_nocoords['features'].append(feature)
            if 'geometry' in entry and entry.get('description', '').strip() != '' and 'area' in entry:
                feature = {
                    "type": "Feature",
                    "properties": {
                        "name": entry['name'],
                        "date": entry['date'],
                        "length": entry['Length'],
                        "area": entry['area'],
                        "description": entry['description'],
                        "year": year
                    },
                    
                    "geometry": {
                        "type": "Point",
                        "coordinates": list(map(float, entry['geometry']))
                    }
                }
                geojson_data['features'].append(feature)

    return [geojson_nocoords, geojson_data]

geojson_data = convert_to_geojson(changeGeometry(data))

# Write the GeoJSON data to a new file with UTF-8 encoding
with open('nocoords.geojson', 'w', encoding='utf-8') as file:
    json.dump(geojson_data[0], file, indent=2, ensure_ascii=False)
with open('coords.geojson', 'w', encoding='utf-8') as file:
    json.dump(geojson_data[1], file, indent=2, ensure_ascii=False)

print("Conversion completed. Output written to 'output.geojson'")

