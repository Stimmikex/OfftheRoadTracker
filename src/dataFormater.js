import { GeoJsonDataSource, Entity, Cartesian3, Color } from "cesium";
import { generateGEOJSON } from "./scripts/geoJson.js";
import { getData, getPointsOfIntrest, getTracks } from "./scripts/dataSets.js";

export const displayData = async (data) => {
    /* eslint-disable */
    const dataSource = await GeoJsonDataSource.load(await data, {clampToGround : true})
    await viewer.dataSources.add(dataSource);
    await viewer.zoomTo(dataSource);
}

export const displayBilly = async (data) => {
    /* eslint-disable */
    const billies = await data
    billies.features.forEach((entity) => {
        const billy = new Entity({
            position: Cartesian3.fromDegrees(entity.geometry.coordinates[0], entity.geometry.coordinates[1]),
            billboard: entity.properties.billboard,
          });
          viewer.entities.add(billy);
    })
}

export const sortTracks = async (type, search) => {
  const filteredEntities = [];
  const dataSource = await GeoJsonDataSource.load(await getTracks(), {clampToGround : true});
  dataSource.entities.values.forEach((entity) => {
    // console.log(entity.properties.name.getValue() + ": " + entity.properties.date.getValue())
      if (true) {
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

export const sortPointsOfIntrest = async (type, search) => {
    const filteredEntities = [];
    const dataSource = await GeoJsonDataSource.load(await getPointsOfIntrest(), {clampToGround : true});
    dataSource.entities.values.forEach((entity) => {
        if (entity.properties.natural.getValue() === type) {
            const pData = {
                "name": entity.properties.name.getValue(),
                "type": entity.properties.natural.getValue()
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
    const dataSource = await GeoJsonDataSource.load(await getData());
    const entities = dataSource.entities.values;
    const filteredEntities = [];
    entities.forEach((entity) => {
      if (entity.properties.ref && entity.properties.ref.getValue() === "208" || entity.properties.ref.getValue() === 'F208' || entity.properties.ref.getValue() === "F225") {
        const pData = {
            "id": entity.properties.osm_id.getValue(),
            "name": entity.properties.name.getValue(),
            "type": entity.properties.highway.getValue(),
          }
        const entityData = generateGEOJSON(pData, entity)
        filteredEntities.push(entityData);
      }
      if(entity.properties.highway && entity.properties.highway.getValue() === "track" || entity.properties.highway.getValue() === "unclassified") {
        const pData = {
          "id": entity.properties.osm_id.getValue(),
          "name": entity.properties.name.getValue(),
          "type": entity.properties.highway.getValue(),
        }
        const entityData = generateGEOJSON(pData, entity, Color.CYAN.withAlpha(0.5))
        filteredEntities.push(entityData);
      }
    });
    const dataform = {
        "type": "FeatureCollection",
        "features": filteredEntities
      }
    
    return dataform
}

// await displayData(getPointsOfIntrest())
await displayData(getRoads());
// await displayData(sortPointsOfIntrest("peak"));
await displayBilly(sortPointsOfIntrest("peak"))
// console.log(await getRoads())

