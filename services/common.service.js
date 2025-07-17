import apiSlice from './api'

export const commonApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUploadToken: builder.query({
      query: () => ({
        url: `/api/upload/getToken`,
        method: 'GET',
      }),
    }),
    getFeedInfo: builder.query({
      transformResponse: response => {
        const { data, ...rest } = response
        const { translateObject } = require('@/utils/translations')
        if (data) {
          if (data.childCategories) data.childCategories = data.childCategories.map(translateObject)
          if (data.currentCategory) data.currentCategory = translateObject(data.currentCategory)
          if (data.sliders) data.sliders = data.sliders.map(translateObject)
          if (data.bannerOneType) data.bannerOneType = data.bannerOneType.map(translateObject)
          if (data.bannerTwoType) data.bannerTwoType = data.bannerTwoType.map(translateObject)
        }
        return { ...rest, data }
      },
      query: () => ({
        url: `/api/feed`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetFeedInfoQuery, useGetUploadTokenQuery, useLazyGetUploadTokenQuery } =
  commonApiSlice
