import { IonResource } from "cesium";

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
}

export const getZones = async () => {
    const resource = await IonResource.fromAssetId(2367983);
    return resource
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