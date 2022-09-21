import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { carsService } from "./CarsService.js"

class JobsService {
  async deleteJob(jobId) {
    const job = await dbContext.Jobs.findByIdAndRemove(jobId)
    return job
  }
  async editJob(jobData, userInfo, jobId) {
    const job = await this.getJob(jobId)
    if (userInfo.id != job.sellerId.toString()) {
      throw new Forbidden("Thats not your job!")
    }
    job.company = jobData.company || job.company
    job.jobTitle = jobData.jobTitle || job.jobTitle
    job.hours = jobData.hours || job.hours
    job.rate = jobData.rate || job.rate
    job.description = jobData.description || job.description

    await job.save()
    return job
  }
  async offerJob(formData) {
    const job = await dbContext.Jobs.create(formData)
    return job
  }
  async getJob(jobId) {
    const job = await dbContext.Jobs.findById(jobId).populate("seller", "name picture")
    if (!job) {
      throw new BadRequest('Invalid Job Id')
    }
    return job
  }
  async getJobs() {
    const jobs = await dbContext.Jobs.find()
    return jobs
  }

}

export const jobsService = new JobsService()