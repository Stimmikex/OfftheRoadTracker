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
  
//   if (!await viewer.dataSources.contains(dataSource)) {
//     console.log(dataSource.entities.values)
//     dataSource.entities.values.forEach(async (entity) => {
//       if(entity.properties.data.type.getValue() == "tracks") {
//           await viewer.entities.remove(entity)
//       }
//       console.log(entity.properties.data.getValue())
//     })
//     console.log('Removed dataSource')
//   } else {
//     console.log(await viewer.dataSources.add(dataSource))
//     console.log(await viewer.dataSources.contains(dataSource))
//     // await viewer.dataSources.add(dataSource)
//     console.log('Added dataSource')
//   }
    // removeEntitiesByType('tracks')
}

export const removeEntitiesByType = (type) => {
    let entitiesToRemove = viewer.entities.values.filter(function(entity) {
        console.log(entity)
        return entity.type === type;
    });

    entitiesToRemove.forEach(function(entity) {
        // console.log(entity)
        viewer.entities.remove(entity);
    });
    // console.log("Has been removed")
}

export default toggleDisplay