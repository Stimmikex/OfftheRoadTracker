import { GeoJsonDataSource, Entity, Color, JulianDate} from "cesium";
import { generateGEOJSON } from "./scripts/geoJson.js";
import { getData, getTracks } from "./scripts/dataSets.js";
import { getRoadMainColor, getRoadSecondColor } from "./scripts/utilityValues.js";

/* eslint-disable */

viewer.scene.globe.depthTestAgainstTerrain = true;
Entity.supportsMaterialsforEntitiesOnTerrain(viewer.scene);

export const displayData = async (data) => {
    /* eslint-disable */
    const dataSource = await GeoJsonDataSource.load(await data, {clampToGround:true})
    dataSource.entities.values.forEach((entity) => {
      if (entity.polygon) {
        entity.polygon.material = Color.fromAlpha(Color.BLUE, 0.5);
        entity.polygon.outline = true;
        entity.polygon.outlineColor = Color.BLACK;
        entity.polygon.extrudedHeight = 1200;
        entity.polygon.perPositionHeight = true;
        entity.polygon.clampToGround = true;
        viewer.scene.terrainExaggeration = 10.0;
      }
    })
    await viewer.dataSources.add(dataSource);
    await viewer.zoomTo(dataSource);
}

export const displayBilly = async (data) => {
    /* eslint-disable */
    const billies = await data
    billies.entities.values.forEach((entity) => {
        const billy = new Entity({
            position: entity.position.getValue(JulianDate.now()),
            billboard: entity.properties.billboard,
          });
          viewer.entities.add(billy);
    })
}

export const sortTracks = async (date) => {
  const filteredEntities = [];
  const dataSource = await GeoJsonDataSource.load(await getTracks(), {clampToGround : true});
  dataSource.entities.values.forEach((entity) => {
    // console.log(entity.properties.name.getValue() + ": " + entity.properties.date.getValue())
      if (date == null) {
        const pData = {
            "name": entity.properties.name.getValue(),
            "date": entity.properties.date.getValue(),
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
  return dataform
}

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

  // Add the filtered data source to the viewer
  await viewer.dataSources.add(filteredDataSource);
  await viewer.zoomTo(filteredDataSource);
};

await getRoads();
await sortPointsOfIntrest('peak')

