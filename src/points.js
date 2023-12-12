import { GeoJsonDataSource } from "cesium";
import { generateGEOJSON } from "./scripts/geoJson.js";
import { getPointsOfIntrest } from "./scripts/dataSets.js";

export const sortPointsOfIntrest = async (type, subtype) => {
    const filteredEntities = [];
    const dataSource = await GeoJsonDataSource.load(await getPointsOfIntrest(), {clampToGround : true});
    dataSource.entities.values.forEach((entity) => {
        if (entity.properties[type].getValue() === subtype) {
            const pData = {
                "name": entity.properties.name.getValue(),
                "type": entity.properties[type].getValue()
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
    redataSource.type = subtype
    return redataSource
}

export default sortPointsOfIntrest;