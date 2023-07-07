import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInUseCase } from './check-in'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()

    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    gymsRepository.items.push({
      id: 'gym-01',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-22.9019746),
      longitude: new Decimal(-47.0582353),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('it should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.9019746,
      userLongitude: -47.0582353,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  // red, green, refactor --> TDD flow

  it('it should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.9019746,
      userLongitude: -47.0582353,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -22.9019746,
        userLongitude: -47.0582353,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('it should be able to check in twice in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.9019746,
      userLongitude: -47.0582353,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.9019746,
      userLongitude: -47.0582353,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('it should not be able to check in outside of a gym range', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'Smart Fit Cambuí II',
      description: '',
      phone: '',
      latitude: new Decimal(-22.8959371),
      longitude: new Decimal(-47.0794723),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -22.9019746,
        userLongitude: -47.058235,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
