import { GeoJsonDataSource } from "cesium";

export const toggleDisplay = async (data, type) => {
    /* eslint-disable */
    const dataSource = await GeoJsonDataSource.load(await data, {clampToGround : true})
    dataSource.name = type

  if (await viewer.dataSources.getByName(type).length != 0) {
    viewer.dataSources.getByName(type).forEach(async (typer) => {
        await viewer.dataSources.remove(typer, true)
    }) 
    console.log("DataSource has been removed")
  } else {
    await viewer.dataSources.add(dataSource)
    console.log("DataSource has been added")
  }
}

export default toggleDisplay