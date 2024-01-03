import { IonResource } from "cesium";

let headers = new Headers();

headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');

headers.append('Access-Control-Allow-Origin', 'http://localhost:8000');
headers.append('Access-Control-Allow-Credentials', 'true');

headers.append('GET', 'POST', 'OPTIONS');

export const getData = async () => {
    const resource = await IonResource.fromAssetId(2350499);
    return resource
}

export const getMainRoads = async () => {
    const resource = await IonResource.fromAssetId(2349214);
    return resource
}

export const getPointsOfIntrest = async () => {
    const resource = await IonResource.fromAssetId(2349218);
    return resource
}

export const getTracks = async () => {
    const resource = await IonResource.fromAssetId(2368104);
    return resource
    // try {
    //   const response = await fetch("http://localhost:8000/track/");
    //   const data = await response.json();
    //   return data;
    // } catch (error) {
    //   console.error('Error fetching GeoJSON:', error);
    //   throw error;
    // }
}

export const getZones = async () => {
  const resource = await IonResource.fromAssetId(2367983);
  return resource
    // try {
    //   const response = await fetch("http://localhost:8000/zone");
    //   const data = await response.json();
    //   return data;
    // } catch (error) {
    //   console.error('Error fetching GeoJSON:', error);
    //   throw error;
    // }
}

export const getTracksWithNoCoords = async () => {
    try {
      const response = await fetch("./data/nocoords.geojson");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching GeoJSON:', error);
      throw error;
    }
  }


export default getData