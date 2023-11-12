import { GeoJsonDataSource } from "cesium";
import { generateGEOJSON } from "./scripts/geoJson.js";
import { getData, getPointsOfIntrest } from "./scripts/dataSets.js";

export const displayData = async (data) => {
    /* eslint-disable */
    const dataSource = await GeoJsonDataSource.load(await data)
    await viewer.dataSources.add(dataSource);
    await viewer.zoomTo(dataSource);
}

export const sortPointsOfIntrest = async (type, search) => {
    const filteredEntities = [];
    const dataSource = await GeoJsonDataSource.load(await getPointsOfIntrest());
    dataSource.entities.values.forEach((entity) => {
        if (entity.properties.natural.getValue() === type) {
            const pData = {
                "name": entity.properties.name.getValue(),
                "type": entity.properties.natural.getValue()
              }
            const entityData = generateGEOJSON(pData, entity)
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
    });
    const dataform = {
        "type": "FeatureCollection",
        "features": filteredEntities
      }
    
    return dataform
}

// await displayData(getPointsOfIntrest())
await displayData(getRoads());
await displayData(sortPointsOfIntrest("peak"));
// console.log(await getRoads())