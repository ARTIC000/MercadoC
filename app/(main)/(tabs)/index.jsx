import { Stack } from 'expo-router'
import { ScrollView } from 'react-native'

import {
  BannerOne,
  BannerTwo,
  BestSellsSlider,
  Categories,
  DiscountSlider,
  Slider as MainSlider,
  MostFavouraiteProducts,
  FeedHeader,
  ShowWrapper,
} from '@/components'
import { useGetFeedInfoQuery } from '@/services'
import { translateProductName, translateObject } from '@/utils/translations'

export default function FeedScreen() {
  //? Assets

  //? Get Feeds Query
  const {
    data: { childCategories, currentCategory, sliders, bannerOneType, bannerTwoType },
    isLoading,
    isSuccess,
    isFetching,
    error,
    isError,
    refetch,
  } = useGetFeedInfoQuery(
    {},
    {
      selectFromResult: ({ data, ...args }) => ({
        data: data?.data || {},
        ...args,
      }),
    }
  )

  //? Translations
  const translatedSliders = sliders?.map(translateObject) || []
  const translatedChildCategories = childCategories?.map(translateObject) || []
  const translatedCurrentCategory = currentCategory ? translateObject(currentCategory) : null

  return (
    <>
      <Stack.Screen
        options={{
          header: props => <FeedHeader {...props} title="Inicio" icon="menu-outline" />,
        }}
      />
      <ShowWrapper
        error={error}
        isError={isError}
        refetch={refetch}
        isFetching={isFetching}
        isSuccess={isSuccess}
        type="detail"
      >
        <ScrollView className="bg-white flex h-full px-3">
          <>
            <DiscountSlider currentCategory={translatedCurrentCategory} />
            <BestSellsSlider categorySlug={translatedCurrentCategory?.slug} />
            <MostFavouraiteProducts categorySlug={translatedCurrentCategory?.slug} />
          </>
        </ScrollView>
      </ShowWrapper>
    </>
  )
}
