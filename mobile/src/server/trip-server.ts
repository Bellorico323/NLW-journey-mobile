import { api } from "./api"

export type TripDetails = {
  id: string
  destination: string
  starts_at: string
  ends_at: string
  is_confirmed: boolean
}

type TripCreate = Omit<TripDetails, 'id' | 'is_confirmed'> & {
  emails_to_invite: string[]
}

async function getById(id: string) {
  try {
    const { data } = await api.get<{ trip: TripDetails }>(`/trips/${id}`)
    return data.trip

  } catch(err) {
    throw err
  }
}

async function create({ destination, ends_at, starts_at, emails_to_invite }: TripCreate) {
  try {
     const { data } = await api.post<{tripId: string}>('/trips', {
      destination,
      starts_at,
      ends_at,
      emails_to_invite,
      owner_name: 'Murillo Orico',  
      owner_email: 'murillo.orico@gmail.com'
     })

    return data
  } catch(err) {
    throw err
  }
}

async function update({ 
  destination, 
  ends_at, 
  starts_at,
  id 
}: Omit<TripDetails, 'is_confirmed'>) {
  try {
    await api.put(`/trips/${id}`, {
      starts_at,
      ends_at, 
      destination, 
    })
  } catch (error) {
    throw error
  }
}

export const tripServer = { getById, create, update }