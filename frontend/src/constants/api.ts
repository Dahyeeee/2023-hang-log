export const BASE_URL = '/';

export const END_POINTS = {
  TRIPS: '/trips',
  TRIP: (tripId: number) => `/trips/${tripId}`,
  DAY_LOG: (tripId: number, dayLogId: number) => `/trips/${tripId}/daylog/${dayLogId}`,
  DAY_LOG_ORDER: (tripId: number, dayLogId: number) => `/trips/${tripId}/daylog/${dayLogId}/order`,
  CREATE_TRIP_ITEM: (tripId: number) => `/trips/${tripId}/items`,
  CHANGE_TRIP_ITEM: (tripId: number, itemId: number) => `/trips/${tripId}/items/${itemId}`,
} as const;