import { Entity, JulianDate } from "cesium";
import { getRoads } from './roads.js'

/* eslint-disable */

viewer.scene.globe.depthTestAgainstTerrain = true;
Entity.supportsMaterialsforEntitiesOnTerrain(viewer.scene);

export const displayData = async (data) => {
    /* eslint-disable */
    await viewer.dataSources.add(data);
    await viewer.zoomTo(data);
}

export const displayBilly = async (data) => {
    /* eslint-disable */
    const billies = await data
    billies.entities.values.forEach((entity) => {
        const billy = new Entity({
            position: entity.position.getValue(JulianDate.now()),
            billboard: entity.properties.billboard,
          });
          viewer.entities.add(billy);
    })
}

await displayData(await getRoads());

