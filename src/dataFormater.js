import { Entity } from "cesium";
import { getRoads } from './roads.js'

/* eslint-disable */

viewer.scene.globe.depthTestAgainstTerrain = true;
Entity.supportsMaterialsforEntitiesOnTerrain(viewer.scene);

export const displayData = async (data) => {
    /* eslint-disable */
    await viewer.dataSources.add(data);
    await viewer.zoomTo(data);
}

await displayData(await getRoads());

