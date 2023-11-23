export const toggleDisplay = async (data, type) => {
    /* eslint-disable */
    console.log(await data)
  if (await viewer.dataSources.getByName(type).length != 0) {
    viewer.dataSources.getByName(type).forEach(async (typer) => {
        await viewer.dataSources.remove(typer, true)
    }) 
    console.log("DataSource has been removed")
  } else {
    await viewer.dataSources.add(data)
    console.log("DataSource has been added")
  }
}

export default toggleDisplay