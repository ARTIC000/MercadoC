// services/api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { translateDeep } from '../utils/translations'

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.token
      if (token) headers.set('authorization', token)
      return headers
    },
  }),
  tagTypes: ['User', 'Review', 'Details', 'Order', 'Product', 'Category', 'Slider', 'Banner'],
  endpoints: builder => ({
    getProducts: builder.query({
      query: ({ category, page_size, page, sort, search, inStock, discount, price }) => ({
        url: '/api/products',
        method: 'GET',
        params: { category, page_size, page, sort, search, inStock, discount, price },
      }),
      transformResponse: response => {
        if (!response?.data) return response

        return {
          ...response,
          data: {
            ...response.data,
            products: translateDeep(response.data.products),
            pagination: response.data.pagination,
            mainMaxPrice: response.data.mainMaxPrice,
            mainMinPrice: response.data.mainMinPrice,
            productsLength: response.data.productsLength,
          },
        }
      },
      providesTags: result =>
        result?.data?.products
          ? [...result.data.products.map(({ _id }) => ({ type: 'Product', id: _id })), 'Product']
          : ['Product'],
    }),

    getCategories: builder.query({
      query: () => '/api/category',
      transformResponse: response => {
        if (!response?.data) return response

        return {
          ...response,
          data: {
            ...response.data,
            categories: translateDeep(response.data.categories),
          },
        }
      },
      providesTags: result =>
        result?.data?.categories
          ? [
              ...result.data.categories.map(({ _id }) => ({ type: 'Category', id: _id })),
              'Category',
            ]
          : ['Category'],
    }),

    getFeedInfo: builder.query({
      query: () => '/api/feed',
      transformResponse: response => translateDeep(response),
    }),

    getProductDetails: builder.query({
      query: ({ id }) => `/api/products/${id}`,
      transformResponse: response => translateDeep(response),
      providesTags: (result, error, arg) => [{ type: 'Details', id: arg.id }],
    }),

    getBanners: builder.query({
      query: () => '/api/banners',
      transformResponse: response => translateDeep(response),
      providesTags: ['Banner'],
    }),

    getSliders: builder.query({
      query: () => '/api/sliders',
      transformResponse: response => translateDeep(response),
      providesTags: ['Slider'],
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useGetFeedInfoQuery,
  useGetProductDetailsQuery,
  useGetBannersQuery,
  useGetSlidersQuery,
} = apiSlice

export default apiSlice
