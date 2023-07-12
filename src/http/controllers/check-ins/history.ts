import { makeFetchUsersCheckInsHistoryUseCase } from '@/use-cases/factories/make-fetch-users-check-ins-history-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function history(req: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = checkInHistoryQuerySchema.parse(req.query)

  const fetchUsersCheckInsHistoryUseCase =
    makeFetchUsersCheckInsHistoryUseCase()

  const { checkIns } = await fetchUsersCheckInsHistoryUseCase.execute({
    userId: req.user.sub,
    page,
  })

  return reply.status(200).send({
    checkIns,
  })
}
