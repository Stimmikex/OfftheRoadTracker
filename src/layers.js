/* eslint-disable no-undef */
import { IonImageryProvider } from "cesium"

export const toggleLayers = async () => {
    const layer = await IonImageryProvider.fromAssetId(2349463)
    // eslint-disable-next-line no-undef
    if (viewer.imageryLayers.get(1)) {
    // Remove the layer
    // eslint-disable-next-line no-undef
    viewer.imageryLayers.remove(viewer.imageryLayers.get(1));
    console.log('Layer removed');
    } else {
    // Add the layer back (you can replace this with your desired imagery provider)
    // eslint-disable-next-line no-undef
    viewer.imageryLayers.addImageryProvider(layer);
    console.log('Layer added');
    }
}

export const changeLayers = async () => {
    // eslint-disable-next-line no-undef
    viewer.imageryLayers.addImageryProvider(
        await IonImageryProvider.fromAssetId(2349463)
      );
}

export const removeLayers = async () => {
    // eslint-disable-next-line no-undef
    viewer.imageryLayers.remove(
        await IonImageryProvider.fromAssetId(2349463)
    );
}

export default changeLayers