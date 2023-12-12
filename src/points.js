import { GeoJsonDataSource, BillboardGraphics, VerticalOrigin, HeightReference } from "cesium";
import { generateGEOJSON } from "./scripts/geoJson.js";
import { getPointsOfIntrest } from "./scripts/dataSets.js";

export const createDataSource = async (dataform, name, subtype) => {
    const dataSource = await GeoJsonDataSource.load(dataform, {
      clampToGround: true,
    });
  
    dataSource.name = name;
    dataSource.type = subtype;
  
    dataSource.entities.values.forEach((entity) => {
      const billboardGraphics = new BillboardGraphics({
        image: `./icons/${subtype}.png`, // Replace with the path to your billboard image
        verticalOrigin: VerticalOrigin.BOTTOM,
        heightReference: HeightReference.CLAMP_TO_GROUND,
        scale: 0.05,
      });
  
      entity.billboard = billboardGraphics;
    });
  
    return dataSource;
  };

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
    return createDataSource(dataform, "Points", subtype)
}

export default sortPointsOfIntrest;