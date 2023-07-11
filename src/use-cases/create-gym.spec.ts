import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })
  it('should be able to register', async () => {
    const { gym } = await sut.execute({
      title: 'Academia Uno',
      description: null,
      phone: null,
      latitude: -22.9019746,
      longitude: -47.0582353,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
