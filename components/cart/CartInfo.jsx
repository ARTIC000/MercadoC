import { Text, View } from 'react-native'

import { Button } from '../common/Buttons'

import { useAppSelector } from '@/hooks'
import { formatNumber } from '@/utils'

const CartInfo = props => {
  //? Porps
  const { handleRoute, cart } = props

  //? Store
  const { totalItems, totalPrice, totalDiscount } = useAppSelector(state => state.cart)

  //? Render(s)
  return (
    <View className="px-4 py-2 mt-2 space-y-5 lg:mt-0 lg:h-fit lg:py-4">
      {/* total cart price */}
      <View className="pb-2 border-b border-gray-200 flex flex-row justify-between">
        <Text className="text-sm">Precio productos ({formatNumber(totalItems)} artículos)</Text>
        <View className="flex-center flex-row">
          <Text className="ml-1">$</Text>
          <Text className="">{formatNumber(totalPrice)}</Text>
        </View>
      </View>

      {/* total cart items */}
      <View className="flex flex-row justify-between">
        <Text>Total del carrito</Text>
        <View className="flex-center flex-row">
          <Text className="ml-1">$</Text>
          <Text className="text-sm">{formatNumber(totalPrice - totalDiscount)}</Text>
        </View>
      </View>

      <Text className="inline-block w-full pb-2 border-b border-gray-200">
        El envío se calcula según la dirección, tiempo de entrega, peso y volumen
      </Text>

      {/* total cart profit */}
      <View className="flex flex-row justify-between">
        <Text className="text-red-500">Cantidad ahorrada en tu compra</Text>
        <View className="flex-center flex-row gap-x-1">
          <Text className="text-red-500 text-sm">
            ({((totalDiscount / totalPrice) * 100).toFixed(1)}%)
          </Text>
          <Text className="text-red-500">{formatNumber(totalDiscount)}</Text>
          <Text className="ml-1 text-red-500">$</Text>
        </View>
      </View>
    </View>
  )
}

export default CartInfo
