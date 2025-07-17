import { Link } from 'expo-router'
import { Text, View } from 'react-native'
import { translateProductName } from '@/utils/translations' // Importa la función de traducción

import CartButtons from './CartButtons'
import DiscountCartItem from './DiscountCartItem'
import Icons from '../common/Icons'
import ResponsiveImage from '../common/ResponsiveImage'
import SpecialSell from '../product/SpecialSell'

import { formatNumber } from '@/utils'

const CartItem = props => {
  //? Props
  const { item } = props

  const translatedItem = {
    ...item,
    name: translateProductName(item.name),
    color: item.color ? {
      ...item.color,
      name: translateProductName(item.color.name)
    } : null,
    size: item.size ? {
      ...item.size,
      size: translateProductName(item.size.size)
    } : null
  }

  //? Render(s)
  return (
    <View className="flex flex-row px-4 py-5 space-x-4">
      {/* image & cartButtons */}
      <View className="space-y-4">
        <ResponsiveImage
          dimensions="w-28 h-28"
          imageStyles="w-28 h-28"
          source={translatedItem.img.url}
          alt={translatedItem.name}
        />

        <View className="mx-auto">
          <SpecialSell discount={translatedItem.discount} inStock={translatedItem.inStock} />
        </View>

        <View>
          <CartButtons item={translatedItem} />
        </View>
      </View>

      {/* name */}
      <View className="flex-auto">
        <Text className="mb-3 text-sm">
          <Link href={`/products/${translatedItem.productID}`}>
            {translatedItem.name}
          </Link>
        </Text>

        {/* info */}
        <View className="space-y-3">
          {translatedItem.color && (
            <View className="flex flex-row items-center gap-x-2">
              <View
                className="inline-block w-5 h-5 shadow rounded-xl"
                style={{ backgroundColor: translatedItem.color.hashCode }}
              />
              <Text>{translatedItem.color.name}</Text>
            </View>
          )}
          <View className="flex flex-row items-center gap-x-2">
            <Icons.Ionicons name="shield-checkmark-outline" size={20} className="icon" />
            <Text className="font-light">Garantía de autenticidad y garantía de entrega.</Text>
          </View>
          <View className="flex flex-row items-center gap-x-2">
            <Icons.MaterialIcons name="save" size={20} className="icon text-sky-400" />
            <Text className="font-light">Disponible en almacén</Text>
          </View>
          {translatedItem.discount > 0 ? (
            <View>

            </View>
          ) : (
            <View className="flex items-center gap-x-2">
              <Text className="">$</Text>
              <Text className="text-sm text-gray-700">
                {formatNumber(translatedItem.price)}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  )
}

export default CartItem