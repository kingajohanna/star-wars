import { renderHook } from '@testing-library/react-hooks';
import { useSwapiSearch } from '../../../src/network/useSwapiSearch';
import { SWAPI_BASE_URL } from '../../../src/constants/api';

describe('useSwapiSearch', () => {
  it('should fetch data from SWAPI API and update the state', async () => {
    const query = 'Luke Skywalker';
    const mockData = [
      { name: 'Luke Skywalker', eye_color: 'blue', created: '2021-09-01' },
      { name: 'Anakin Skywalker', height: '188', created: '2021-09-02' },
    ];
    const mockResponse = { results: mockData };

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const { result, waitForNextUpdate } = renderHook(() => useSwapiSearch(query));

    expect(result.current.data).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);

    await waitForNextUpdate();

    expect(result.current.data).toEqual(mockData);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);

    expect(global.fetch).toHaveBeenCalledWith(`${SWAPI_BASE_URL}/people/?search=${query}`);
  });

  it('should handle errors when fetching data', async () => {
    const query = 'InvalidQuery';
    const mockError = new Error('Failed to fetch data');

    global.fetch = jest.fn().mockRejectedValue(mockError);

    const { result, waitForNextUpdate } = renderHook(() => useSwapiSearch(query));

    expect(result.current.data).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);

    await waitForNextUpdate();

    expect(result.current.data).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(mockError.message);

    expect(global.fetch).toHaveBeenCalledWith(`${SWAPI_BASE_URL}/people/?search=${query}`);
  });

  it('should not fetch data if query is empty', async () => {
    const query = '';

    global.fetch = jest.fn();

    const { result } = renderHook(() => useSwapiSearch(query));

    expect(result.current.data).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);

    expect(global.fetch).not.toHaveBeenCalled();
  });
});
