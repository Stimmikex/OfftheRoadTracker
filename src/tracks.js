import { getTracks } from './scripts/dataSets.js'
import { GeoJsonDataSource } from "cesium";
import { generateGEOJSON } from "./scripts/geoJson.js";

export const sortTracks = async () => {
    const filteredEntities = [];
    const dataSource = await GeoJsonDataSource.load(await getTracks(), {clampToGround : true});
    dataSource.entities.values.forEach((entity) => {
      // console.log(entity.properties.name.getValue() + ": " + entity.properties.date.getValue())
        if (true) {
          const pData = {
              "type": "tracks",
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
    // const redataSource = await GeoJsonDataSource.load(dataform, {clampToGround : true})
    return dataform
  }

export default sortTracks;