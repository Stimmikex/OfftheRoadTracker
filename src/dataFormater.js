import { IonResource, GeoJsonDataSource, JulianDate, Cartographic,  Cartesian3} from "cesium"

export const getData = async () => {
    const resource = await IonResource.fromAssetId(2349146);
    const roads = await GeoJsonDataSource.load(resource);

    return roads
}

export const displayData = async (data) => {
    // const roads = await getData();
    /* eslint-disable */
    await viewer.dataSources.add(data);
    await viewer.zoomTo(data);
}

export const getRoads = async () => {
    const data = await getData();
    const entities = data.entities.values;
    const filteredEntities = [];
    entities.forEach((entity) => {
      if (entity.properties.ref && entity.properties.ref.getValue() === "208" || entity.properties.ref.getValue() === 'F208' || entity.properties.ref.getValue() === "F225") {
          const entityData = {
            "type": 'Feature',
            "properties": {
                "id": entity.properties.osm_id.getValue(),
                "name": entity.properties.name.getValue(),
                "type": entity.properties.highway.getValue(),
            },
            "geometry": {
              "type": 'LineString', // Default to Point type
              "coordinates": getCoordinates(entity),
            },
          };
          filteredEntities.push(entityData);
      }
    });
    const dataform = {
        "type": "Features",
        "features": filteredEntities
      }
    const output = JSON.stringify(dataform, null, 2);
    
    await displayData(output)
}

const getCoordinates = (entity) => {
    const coordinates = [];
  
    // Check if the entity has a 'position' property
    if (entity.position) {
      const position = entity.position.getValue(JulianDate.now());
      coordinates.push(Cartesian3.unpack([position.x, position.y, position.z]));
    }
    // Check if the entity has a 'polyline' property
    if (entity.polyline) {
      const positions = entity.polyline.positions.getValue();
      positions.forEach((position) => {
        const trans = Cartesian3toSomethangReadable(position)
        coordinates.push(trans);
      });
    }
  
    // Add more checks for other geometry types as needed
  
    return coordinates;
  };
  
  function Cartesian3toSomethangReadable(cartesian3Pos) {
    let pos = Cartographic.fromCartesian(cartesian3Pos)
    return [pos.longitude / Math.PI * 180, pos.latitude / Math.PI * 180]
  }

await getRoads();