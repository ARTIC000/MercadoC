'use client'

import { Stack } from 'expo-router'
import { Text, View } from 'react-native'

import { FavoritesListEmpty } from '@/components'

const ListsScreen = () => {
  //? Render(s)
  return (
    <>
      <Stack.Screen
        options={{
          title: 'mi colección',
          headerBackTitleVisible: false,
        }}
      />
      <View className="py-20 bg-white h-full">
        <FavoritesListEmpty className="mx-auto h-52 w-52" />
        <Text className="text-center">Tu lista de favoritos está vacía</Text>
        <Text className="block my-3 text-base text-center text-amber-500">(Muy pronto)</Text>
      </View>
    </>
  )
}

export default ListsScreen
