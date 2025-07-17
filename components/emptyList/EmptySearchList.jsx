import { Text, View } from 'react-native'

import EmptySearch from '../svgs/empty-search'

export default function EmptySearchList() {
  return (
    <View className="py-20">
      <EmptySearch className="mx-auto h-60 w-60" />
      <View className="max-w-md p-2 mx-auto space-y-2 border border-neutral-300 rounded-md">
        <View className="flex items-center gap-x-2">
          <Text>No se encontraron resultados</Text>
        </View>
        <Text className="text-gray-500">
          Utilice palabras más variables o verifique las propiedades de entrada{' '}
        </Text>
      </View>
    </View>
  )
}
