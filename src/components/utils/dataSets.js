import { IonResource } from "cesium";

export const getData = async () => {
    const resource = await IonResource.fromAssetId(2349146);
    return resource
}

export const getMainRoads = async () => {
    const resource = await IonResource.fromAssetId(2349214);
    return resource
}

export const getPointsOfIntrest = async () => {
    const resource = await IonResource.fromAssetId(2349218);
    return resource
}

export default getData