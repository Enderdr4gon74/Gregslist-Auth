import { Auth0Provider } from "@bcwdev/auth0provider"
import { housesService } from "../services/HousesService.js";
import BaseController from "../utils/BaseController.js";

export class HousesController extends BaseController {
  // TODO implement houses controller
  constructor() {
    super('api/houses')
    this.router
      .get('', this.getHouses)
      .get('/:houseId', this.getHouse)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.listHouse)
      .put('/:id', this.editHouse)
      .delete('/carId', this.deleteHouse)
  }

  async getHouses(req, res, next) {
    try {
      const houses = await housesService.getHouses()
      res.send(houses)
    } catch (error) {
      next(error)
    }
  }
  async getHouse(req, res, next) {
    try {
      const house = await housesService.getHouse(req.params.houseId)
      res.send(house)
    } catch (error) {
      next(error)
    }
  }
  async listHouse(req, res, next) {
    try {
      const formData =  req.body
      formData.sellerId = req.userInfo.id
      const house = await housesService.listHouse(formData)
      res.send(house)
    } catch (error) {
      next(error)
    }
  }
  async editHouse(req, res, next) {
    try {
      const house = await housesService.editHouse(req.body, req.userinfo, req.params.id)
      res.send(house)
    } catch (error) {
      next(error)
    }
  }
  async deleteHouse(req, res, next) {
    try {
      const house = await housesService.deleteHouse(req.params.houseId)
      res.send(house)

    } catch (error) {
      next(error)
    }
  }
}