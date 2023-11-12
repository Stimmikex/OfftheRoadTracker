import { getCoordinates } from "./coords.js";

export const generateGEOJSON = (pData, entity) => {
    let gType = 'LineString';
    if (entity.position) {
        gType = 'Point'
    }
    const entityData = {
        "type": 'Feature',
        "properties": {
            pData
        },
        "geometry": {
          "type": gType, // Default to Point type
          "coordinates": getCoordinates(entity),
        },
      };
    return entityData
}

export default generateGEOJSON