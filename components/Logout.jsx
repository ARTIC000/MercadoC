import { Text, TouchableOpacity } from 'react-native'
import Toast from 'react-native-toast-message'

import Icons from './common/Icons'

import { useAppDispatch } from '@/hooks'
import { userLogout } from '@/store'

export default function Logout() {
  //? Assets
  const dispatch = useAppDispatch()

  //? Handlers
  const handleLogout = () => {
    dispatch(userLogout())
    Toast.show({
      type: 'success',
      text2: 'success',
    })
  }

  //? Render(s)
  return (
    <TouchableOpacity
      className="flex flex-row justify-between items-center transition-colors py-4 text-xs text-gray-700 w-full"
      onPress={handleLogout}
    >
      <Text className="text-gray-700">abandonar</Text>
      <Icons.MaterialIcons name="logout" size={24} className="text-gray-700" />
    </TouchableOpacity>
  )
}
