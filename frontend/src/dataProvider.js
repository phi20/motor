// src/dataProvider.js
import { fetchUtils } from 'react-admin';

const apiUrl = 'http://localhost:8000/api';
const httpClient = fetchUtils.fetchJson;

const dataProvider = {
  getList: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;

    const filter = params.filter || {};
    const filterQuery = Object.keys(filter)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(filter[key])}`)
      .join('&');

    const url = `${apiUrl}/${resource}/?page=${page}&page_size=${perPage}&ordering=${order === 'ASC' ? '' : '-'}${field}${filterQuery ? '&' + filterQuery : ''}`;

    const { json } = await httpClient(url);
    return {
      data: json.results,
      total: json.count,
    };
  },

  getOne: async (resource, params) => {
    const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}/`);
    return { data: json };
  },

  getMany: async (resource, params) => {
    const query = params.ids.map(id => `id=${id}`).join('&');
    const url = `${apiUrl}/${resource}/?${query}`;
    const { json } = await httpClient(url);
    return { data: json.results || json }; // handle both paginated and non-paginated
  },

  getManyReference: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const filter = {
      ...params.filter,
      [params.target]: params.id,
    };
    const filterQuery = Object.keys(filter)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(filter[key])}`)
      .join('&');

    const url = `${apiUrl}/${resource}/?page=${page}&page_size=${perPage}&ordering=${order === 'ASC' ? '' : '-'}${field}${filterQuery ? '&' + filterQuery : ''}`;

    const { json } = await httpClient(url);
    return {
      data: json.results,
      total: json.count,
    };
  },
};

export default dataProvider;
