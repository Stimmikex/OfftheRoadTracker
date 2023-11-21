import { getCoordinates } from "./coords.js";
import { NearFarScalar } from "cesium";

export const generateGEOJSON = (pData, entity, color) => {
    let entityData = {}
    let gType = 'LineString';
    if (entity.position) {
        gType = 'Point'
        const customImageUrl = '../icons/scenery.png';
        entityData = {
          "type": 'Feature',
          "properties": {
              "data": pData,
              "billboard": {
                "image": customImageUrl,
                "width": 32,
                "height": 32,
                "scaleByDistance": new NearFarScalar(1.5e2, 1.0, 1.5e7, 0.1),
              },
          },
          "geometry": {
            "type": gType, // Default to Point type
            "coordinates": getCoordinates(entity),
          },
        };
        return entityData
    }
    entityData = {
        "type": 'Feature',
        "properties": {
            "data": pData,
            "polyline": {
              "material": color // Adjust the color and alpha as needed
          },   
        },
        "geometry": {
          "type": gType, // Default to Point type
          "coordinates": getCoordinates(entity),
        }
      };
    return entityData
}

export default generateGEOJSON