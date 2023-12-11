import { getZones, getTracksWithNoCoords } from './scripts/dataSets.js'
import { sortTracks } from './tracks.js'
import { GeoJsonDataSource, Color, JulianDate } from "cesium";

const minExtrusionHeight = 1200;
const maxExtrusionHeight = 3000;

export const countGeoJSON = async (type ,value) => {
  const nocoords = await getTracksWithNoCoords();
  let counter = 0
  nocoords.features.forEach((feature) => {
    if(feature.properties[type] == value)
      counter++
  })
  return counter
}

export const getZonesVolume = async (height) => {
    /* eslint-disable */
    typeof height != undefined ? height = 1 : height
    const dataSource = await GeoJsonDataSource.load(await getZones(), {clampToGround:true})
    dataSource.name = "Zones"
    dataSource.entities.values.forEach((entity) => {
      if (entity.polygon) {
        entity.polygon.material = Color.fromAlpha(Color.VIOLET, 0.2);
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
export const extrudZonesByDate = async (newPoints) => {
  const volumes = await getZonesVolume();
  const points = await newPoints;

  const baseValueHeight = 1200;
  const heightChangePerPoint = 1000;  

  volumes.entities.values.forEach(async polygonEntity => {
      if (polygonEntity.polygon) {
        const polygonPositions = polygonEntity.polygon.hierarchy.getValue(JulianDate.now()).positions;
    
        // Count the number of points inside the polygon
        let pointCountInsidePolygon = 0;
    
        // Iterate through each point
        await points.entities.values.forEach(pointEntity => {
          // console.log(pointEntity.properties.data.getValue().area)
          if (pointEntity.position) {
            const point = pointEntity.position.getValue(JulianDate.now());
            
            // Check if the point is inside the polygon
            if (isPointInPolygon(point, polygonPositions)) {
              pointCountInsidePolygon++;
            }

          }
          // console.log(await countGeoJSON(nocoords, polygonEntity.properties.data.getValue().area))
        });
        // pointCountInsidePolygon += await countGeoJSON('area', polygonEntity.properties.name.getValue())

        polygonEntity.polygon.extrudedHeight = baseValueHeight + (heightChangePerPoint*pointCountInsidePolygon);
        polygonEntity.polygon.material = getColorMaterial(polygonEntity.polygon.extrudedHeight.getValue())

        polygonEntity.properties.addProperty('Counter', pointCountInsidePolygon)
        polygonEntity.description =
        `<div>
          <p>Counter: ${pointCountInsidePolygon} tracks</p>
        </div>`
      }
    });
    return volumes
} 
export const extrudZones = async () => {
    const volumes = await getZonesVolume();
    const points = await sortTracks();

    const baseValueHeight = 1200;
    const heightChangePerPoint = 100;  

    volumes.entities.values.forEach(async polygonEntity => {
        if (polygonEntity.polygon) {
          const polygonPositions = polygonEntity.polygon.hierarchy.getValue(JulianDate.now()).positions;
      
          // Count the number of points inside the polygon
          let pointCountInsidePolygon = 0;
      
          // Iterate through each point
          points.entities.values.forEach(pointEntity => {
            // console.log(pointEntity.properties.data.getValue().area)
            if (pointEntity.position) {
              const point = pointEntity.position.getValue(JulianDate.now());
              
              // Check if the point is inside the polygon
              if (isPointInPolygon(point, polygonPositions)) {
                pointCountInsidePolygon++;
              }

            }
          });
          pointCountInsidePolygon += await countGeoJSON('area', polygonEntity.properties.name.getValue())

          // Extrude the polygon based on the point count
          polygonEntity.polygon.extrudedHeight = baseValueHeight + (heightChangePerPoint*pointCountInsidePolygon);
          polygonEntity.polygon.material = getColorMaterial(polygonEntity.polygon.extrudedHeight.getValue())
          polygonEntity.description =
          `<div>
            <p>Counter: ${pointCountInsidePolygon} tracks</p>
            <p>None Geo Marker: ${await countGeoJSON('area', polygonEntity.properties.name.getValue())}</p>
          </div>`
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
    const normalizedHeight = Math.min(Math.max((extrudedHeight - minExtrusionHeight) / (maxExtrusionHeight - minExtrusionHeight), 0), 1);
    const color = Color.fromCssColorString(`rgba(255, ${Math.round((1 - normalizedHeight) * 255)}, 0, 0.5)`);
    return color;
}

export const getColorGradian = () => {
  const minColor = getColorMaterial(minExtrusionHeight).toCssColorString();
  const maxColor = getColorMaterial(maxExtrusionHeight).toCssColorString();
  return [minColor, maxColor]
}


export default getZonesVolume;