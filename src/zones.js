import { getZones } from './scripts/dataSets.js'
import { sortTracks } from './tracks.js'
import { GeoJsonDataSource, Color, JulianDate } from "cesium";

export const getZonesVolume = async (height) => {
    /* eslint-disable */
    typeof height != undefined ? height = 1 : height
    const dataSource = await GeoJsonDataSource.load(await getZones(), {clampToGround:true})
    dataSource.name = "Zones"
    dataSource.entities.values.forEach((entity) => {
      if (entity.polygon) {
        entity.polygon.material = Color.fromAlpha(Color.BLUE, 0.2);
        entity.polygon.outline = true;
        entity.polygon.outlineColor = Color.BLACK;
        entity.polygon.extrudedHeight = 1200 + (100*height);
        entity.polygon.perPositionHeight = true;
        entity.polygon.clampToGround = true;
        viewer.scene.terrainExaggeration = 10.0;
      }
    })
    return dataSource
}

export const extrudZones = async () => {
    const volumes = await getZonesVolume();
    const points = await sortTracks();
    volumes.entities.values.forEach(polygonEntity => {
        if (polygonEntity.polygon) {
          const polygonPositions = polygonEntity.polygon.hierarchy.getValue(JulianDate.now()).positions;
      
          // Count the number of points inside the polygon
          let pointCountInsidePolygon = 0;
      
          // Iterate through each point
          points.entities.values.forEach(pointEntity => {
            if (pointEntity.position) {
              const point = pointEntity.position.getValue(JulianDate.now());
      
              // Check if the point is inside the polygon
              if (isPointInPolygon(point, polygonPositions)) {
                pointCountInsidePolygon++;
              }
            }
          });
          
          // Extrude the polygon based on the point count
          polygonEntity.polygon.extrudedHeight = 1200 + (100*pointCountInsidePolygon);
          polygonEntity.polygon.material = getColorMaterial(polygonEntity.polygon.extrudedHeight.getValue())

          polygonEntity.properties.addProperty('Counter', pointCountInsidePolygon)
          polygonEntity.label = {
                text: `Custom Property 1 ${pointCountInsidePolygon}`,
                show: true,
                font: '14px sans-serif',
            };
      
          console.log(`Polygon ID: ${polygonEntity.id}, Points inside: ${pointCountInsidePolygon}`);
        }
      });
      return volumes
}

// Function to check if a point is inside a polygon
const isPointInPolygon = (point, polygonPositions) => {
    let isInside = false;
    let j = polygonPositions.length - 1;
  
    for (let i = 0; i < polygonPositions.length; i++) {
      const xi = polygonPositions[i].x;
      const yi = polygonPositions[i].y;
      const xj = polygonPositions[j].x;
      const yj = polygonPositions[j].y;
  
      const intersect = ((yi > point.y) !== (yj > point.y)) &&
        (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi);
  
      if (intersect) {
        isInside = !isInside;
      }
  
      j = i;
    }
  
    return isInside;
}

const getColorMaterial = (extrudedHeight) => {
    // Map extrusion height to color (white to red)
    const minExtrusionHeight = 1200;
    const maxExtrusionHeight = 3000;
  
    const normalizedHeight = Math.min(Math.max((extrudedHeight - minExtrusionHeight) / (maxExtrusionHeight - minExtrusionHeight), 0), 1);
    const color = Color.fromCssColorString(`rgba(255, ${Math.round((1 - normalizedHeight) * 255)}, 0, 0.5)`);
  
    return color;
}


export default getZonesVolume;