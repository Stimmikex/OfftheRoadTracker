export const toggleDisplay = async (data, type, subtype) => {
  /* eslint-disable */
  if (viewer.dataSources.getByName(type).find(typer => typer.time === subtype || typer.type === subtype)) {
    viewer.dataSources.getByName(type).forEach(async (typer) => {
      if (typer.time == subtype || typer.type == subtype) {
        await viewer.dataSources.remove(typer, true)
        console.log("DataSource has been removed")
      }
    })
  } else {
    await viewer.dataSources.add(data)
    console.log("DataSource has been added")
  }
}

export const changeDisplay = async (data, type) => {
  /* eslint-disable */
    viewer.dataSources.getByName(type).forEach(async (typer) => {
      await viewer.dataSources.remove(typer, true)
      console.log("DataSource has been removed")
    })
    await viewer.dataSources.add(data)
    console.log("DataSource has been added")
}

export const checkIfDataSource = async (name, subtype) => {
  const dataSources = await viewer.dataSources.getByName(name);

  if (dataSources.length > 0) {
    console.log(dataSources);
    
    return dataSources.some((dataSource) => dataSource.type === subtype);
  } else {
    return false;
  }
};

export default toggleDisplay