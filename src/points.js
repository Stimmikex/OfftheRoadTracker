import { GeoJsonDataSource } from "cesium";
import { generateGEOJSON } from "./scripts/geoJson.js";
import { getPointsOfIntrest } from "./scripts/dataSets.js";

export const sortPointsOfIntrest = async (type) => {
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
    const redataSource = await GeoJsonDataSource.load(dataform, {clampToGround : true})
    redataSource.name = "Points"
    return redataSource
}

export default sortPointsOfIntrest;