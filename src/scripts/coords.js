import { JulianDate, Cartographic } from "cesium"

export const getCoordinates = (entity) => {
    const coordinates = [];
    // Check if the entity has a 'position' property
    if (entity.position) {
      const position = entity.position.getValue(JulianDate.now());
      const trans = Cartesian3toSomethangReadable(position)
      return trans;
    }
    // Check if the entity has a 'polyline' property
    if (entity.polyline) {
      const positions = entity.polyline.positions.getValue();
      positions.forEach((position) => {
        const trans = Cartesian3toSomethangReadable(position)
        coordinates.push(trans);
      });
    }
    return coordinates;
  };
  
export const Cartesian3toSomethangReadable = (cartesian3Pos) => {
    let pos = Cartographic.fromCartesian(cartesian3Pos)
    return [pos.longitude / Math.PI * 180, pos.latitude / Math.PI * 180]
}

export default getCoordinates
