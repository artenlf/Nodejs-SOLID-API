import { makeGetUserMetricsUseCase } from '@/use-cases/factories/make-get-user-metrics-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function metrics(req: FastifyRequest, reply: FastifyReply) {
  const gethUserCheckInMetricsUseCase = makeGetUserMetricsUseCase()

  const { checkInsCount } = await gethUserCheckInMetricsUseCase.execute({
    userId: req.user.sub,
  })

  return reply.status(200).send({
    checkInsCount,
  })
}
