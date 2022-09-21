import { Auth0Provider } from "@bcwdev/auth0provider"
import { jobsService } from "../services/JobsService.js";
import BaseController from "../utils/BaseController.js";

export class JobsController extends BaseController {
  constructor() {
    super("api/jobs")
    this.router
      .get('', this.getJobs)
      .get('/:jobId', this.getJob)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.offerJob)
      .put('/:id', this.editJob)
      .delete("/:jobId", this.deleteJob)
  }

  async deleteJob(req, res, next) {
    try {
      const job = await jobsService.deleteJob(req.params.jobId)
      res.send(job)
    } catch (error) {
      next(error)
    }
  }

  async editJob(req, res, next) {
    try {
      const job = await jobsService.editJob(req.body, req.userInfo, req.params.id)
      res.send(job)
    } catch (error) {
      next(error)
    }
  }

  async offerJob(req, res, next) {
    try {
      const formData = req.body
      formData.sellerId = req.userInfo.id
      const job = await jobsService.offerJob(formData)
      res.send(job)
    } catch (error) {
      next(error)
    }
  }

  async getJobs(req, res, next) {
    try {
      const jobs = await jobsService.getJobs()
      res.send(jobs)
    } catch (error) {
      next(error)
    }
  }

  async getJob(req, res, next) {
    try {
      const job = await jobsService.getJob(req.params.jobId)
      res.send(job)
    } catch (error) {
      next(error)
    }
  }
}