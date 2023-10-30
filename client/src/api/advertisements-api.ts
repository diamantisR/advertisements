async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    // if (response.status === 401) {
    //     throw new UnauthorizedError(errorMessage);
    // } else if (response.status === 409) {
    //     throw new ConflictError(errorMessage);
    // } else {
    //     throw Error("Request failed with status: " + response.status + " message: " + errorMessage);
    // }
  }
}

export async function fetchAdvertisement(
  _id: string
): Promise<Advertisement[]> {
  const response = await fetchData(
    `http://localhost:5000/api/advertisements/${_id}`,
    {
      method: 'GET'
    }
  );
  return response?.json();
}

export async function fetchAdvertisements(): Promise<Advertisement[]> {
  const response = await fetchData('http://localhost:5000/api/advertisements', {
    method: 'GET'
  });
  return response?.json();
}

export interface AdvertisementInput {
  title?: string;
  type?: string;
  area?: string;
  description?: string;
  price?: number;
  activated?: boolean;
  file?: string;
}

export async function createAdvertisement(
  advertisement: Advertisement
): Promise<Advertisement> {
  const response = await fetch('http://localhost:5000/api/advertisements', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(advertisement)
  });
  return response?.json();
}

export async function updateAdvertisement(
  advertisementId: string,
  advertisement: AdvertisementInput
): Promise<Advertisement> {
  const response = await fetch(
    'http://localhost:5000/api/advertisements/' + advertisementId,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(advertisement)
    }
  );
  return response?.json();
}

export async function deleteAdvertisement(advertisementId: string) {
  await fetch('http://localhost:5000/api/advertisements/' + advertisementId, {
    method: 'DELETE'
  });
}
