import { getTracks, getTracksWithNoCoords } from './scripts/dataSets.js'
import { GeoJsonDataSource } from "cesium";
import { generateGEOJSON } from "./scripts/geoJson.js";

const convertTimeFormat = (value) => {
  const [day, month, year] = value.split('/').map(Number);
  const dater = new Date(year, month - 1, day);
  return dater
}

export const getTimelineOfTracks = async () => {
  const dataSource = await GeoJsonDataSource.load(await getTracks(), { clampToGround: true });
  const dates = new Set();

  dataSource.entities.values.forEach((entity) => {
    const dateString = entity.properties.date.getValue();
    const standardizedDate = convertTimeFormat(dateString).toISOString().split('T')[0];
    dates.add(standardizedDate);
  });

  const nocoords = await getTracksWithNoCoords();
  nocoords.features.forEach((feature) => {
    const dateString = feature.properties['date'];
    const standardizedDate = convertTimeFormat(dateString).toISOString().split('T')[0];
    dates.add(standardizedDate);
  });

  const uniqueDates = Array.from(dates);
  return uniqueDates;
};

export const getTracksByDate = async (date) => {
  const filteredEntities = [];
  const dataSource = await GeoJsonDataSource.load(await getTracks(), {clampToGround : true});
  dataSource.entities.values.forEach((entity) => {
    if (convertTimeFormat(entity.properties.date.getValue()).toISOString().split('T')[0] == date) {
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
  redataSource.time = date

  // eslint-disable-next-line no-undef
  // viewer.dataSources.add(redataSource);
  console.log(redataSource)
  return redataSource
}

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