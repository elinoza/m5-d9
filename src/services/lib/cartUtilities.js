  
const { readJSON, writeJSON } = require("fs-extra")
const { join } = require("path")

const cartsPath = join(__dirname, "../carts/carts.json")

const readDB = async filePath => {
  try {
    const fileJson = await readJSON(filePath)
    return fileJson
  } catch (error) {
    throw new Error(error)
  }
}

const writeDB = async (filePath, fileContent) => {
  try {
    await writeJSON(filePath, fileContent)
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  getcarts: async () => readDB(cartsPath),
  writecarts: async cartsData => writeDB(cartsPath, cartsData),
}