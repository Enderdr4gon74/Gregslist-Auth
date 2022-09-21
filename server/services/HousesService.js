import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { jobsService } from "./JobsService.js"

class HousesService {
  async getHouse(houseId) {
    const house = await dbContext.Houses.findById(houseId).populate("seller", "name picture")
    if (!house) {
      throw new BadRequest("Invalid House Id")
    }
    return house
  }
  async getHouses() {
    const houses = await dbContext.Houses.find()
    return houses
  }
  async listHouse(formData) {
    const house = await dbContext.Houses.create(formData)
    return house
  }
  async editHouse(houseData, userinfo, id) {
    const house = await this.getHouse(id)
    if (userinfo.id != house.sellerId.toString()) {
      throw new Forbidden("Thats not your house!")
    }
    house.bedrooms = houseData.bedrooms || house.bedrooms
    house.bathrooms = houseData.bathrooms || house.bathrooms
    house.levels = houseData.levels || house.levels
    house.imgUrl = houseData.imgUrl || house.imgUrl
    house.year = houseData.year || house.year
    house.price = houseData.price || house.price
    house.description = houseData.description || house.description
    await house.save()
    return house
    }
  async deleteHouse(houseId) {
    const house = await dbContext.Houses.findByIdAndRemove(houseId)
    return house
  }
  // TODO implement houses service
}

export const housesService = new HousesService()