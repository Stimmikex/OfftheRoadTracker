import { GeoJsonDataSource } from "cesium";
import { getData } from "./scripts/dataSets.js";
import { getRoadMainColor, getRoadSecondColor } from "./scripts/utilityValues.js";

export const getRoads = async () => {
    const dataSource = await GeoJsonDataSource.load(await getData(), { clampToGround: true });
    const entities = dataSource.entities.values;
  
    // Filter entities based on conditions
    const filteredEntities = entities.filter((entity) => {
      if (
        (entity.properties.ref &&
          (entity.properties.ref.getValue() === '208' ||
            entity.properties.ref.getValue() === 'F208' ||
            entity.properties.ref.getValue() === 'F225')) ||
        (entity.properties.highway &&
          (entity.properties.highway.getValue() === 'track' ||
            entity.properties.highway.getValue() === 'unclassified'))
      ) {
        return true; // Include this entity in the filtered list
      }
      return false; // Exclude this entity from the filtered list
    });
  
    // Create a new data source with only the filtered entities
    const filteredDataSource = new GeoJsonDataSource({ clampToGround: true });
    filteredEntities.forEach((entity) => {
      if(entity.properties.ref.getValue() === '208' ||
      entity.properties.ref.getValue() === 'F208' ||
      entity.properties.ref.getValue() === 'F225') {
        entity.polyline.material = getRoadMainColor();
        entity.polyline.width = 6;
      }
      if((entity.properties.highway.getValue() === 'track' ||
      entity.properties.highway.getValue() === 'unclassified')){
        entity.polyline.material = getRoadSecondColor();
        entity.polyline.width = 4;
      }
      filteredDataSource.entities.add(entity);
    });

    return filteredDataSource;
  
    // // Add the filtered data source to the viewer
    // await viewer.dataSources.add(filteredDataSource);
    // await viewer.zoomTo(filteredDataSource);
  };

export default getRoads;