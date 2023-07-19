import { NETWORK } from '@constants/api';
import { useQuery } from '@tanstack/react-query';
import type { CityData } from '@type/city';
import { AxiosError } from 'axios';

import { getCities } from '@api/city/getCities';

export const useCityQuery = () => {
  const { data: citiesData } = useQuery<CityData[], AxiosError>(['city'], getCities, {
    retry: NETWORK.RETRY_COUNT,
    // suspense: true,
    // useErrorBoundary: true,
  });

  return { citiesData };
};