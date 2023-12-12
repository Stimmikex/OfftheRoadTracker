import { getCoordinates } from "./coords.js";

export const generateGEOJSON = (pData, entity) => {
    let entityData = {}
    let gType = 'LineString';
    if (entity.position) {
        gType = 'Point'
        entityData = {
          "type": 'Feature',
          "properties": {
              "data": pData,
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
        },
        "geometry": {
          "type": gType, // Default to Point type
          "coordinates": getCoordinates(entity),
        }
      };
    return entityData
}

export default generateGEOJSON