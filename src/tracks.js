import { getTracks } from './scripts/dataSets.js'
import { GeoJsonDataSource } from "cesium";
import { generateGEOJSON } from "./scripts/geoJson.js";

export const sortTracks = async (year) => {
    const filteredEntities = [];
    const dataSource = await GeoJsonDataSource.load(await getTracks(), {clampToGround : true});
    dataSource.entities.values.forEach((entity) => {
      if (year == 'All' || year === undefined || entity.properties.year.getValue() == year) {
        const pData = {
            "type": "tracks",
            "year": entity.properties.year.getValue(),
            "name": entity.properties.name.getValue(),
            "date": entity.properties.date.getValue(),
            "area": entity.properties.area.getValue(),
            "length": entity.properties.length.getValue(),
            "description": entity.properties.description.getValue()
          }
        const entityData = generateGEOJSON(pData, entity);
        filteredEntities.push(entityData);
      }
    })
    const dataform = {
        "type": "FeatureCollection",
        "features": filteredEntities
    }
    const redataSource = await GeoJsonDataSource.load(dataform, {clampToGround : true})
    redataSource.name = "Tracks"
    redataSource.time = year
    return redataSource
  }

  export const getUniqueYears = async () => {
    try {
      const dataSource = await GeoJsonDataSource.load(await getTracks(), { clampToGround: true });
      const uniqueYearsSet = new Set(dataSource.entities.values.map(entity => entity.properties.year.getValue()));
      const uniqueYearsArray = Array.from(uniqueYearsSet);
      return uniqueYearsArray;
    } catch (error) {
      console.error("Error fetching unique years:", error);
      throw error; // Rethrow the error to be caught in the mounted hook
    }
  };
export default sortTracks;