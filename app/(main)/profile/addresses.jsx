import { useState } from 'react'
import { Stack } from 'expo-router'
import { Pressable, Text, View, TextInput, Modal } from 'react-native'
import { Address, Icons } from '@/components'

const Addresses = () => {
  const [isModalVisible, setModalVisible] = useState(false)
  const [street, setStreet] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [savedAddress, setSavedAddress] = useState(null)

  const handleSaveAddress = () => {
    if (!street.trim() || !postalCode.trim()) return
    
    setIsLoading(true)
    
    // Simular guardado (reemplazar con tu lógica real)
    setTimeout(() => {
      setSavedAddress({ street, postalCode })
      setModalVisible(false)
      setIsLoading(false)
      setStreet('')
      setPostalCode('')
    }, 800)
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Dirección',
          headerBackTitleVisible: false,
        }}
      />
      
      {/* Modal para agregar/editar dirección */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 p-4 bg-white">
          <Text className="text-xl font-bold mb-6">Ingresa tu dirección</Text>
          
          <TextInput
            className="border border-gray-300 p-3 rounded-lg mb-4"
            placeholder="Calle y número"
            value={street}
            onChangeText={setStreet}
            autoFocus
          />
          
          <TextInput
            className="border border-gray-300 p-3 rounded-lg mb-6"
            placeholder="Código postal"
            value={postalCode}
            onChangeText={setPostalCode}
            keyboardType="numeric"
          />
          
          <View className="flex-row space-x-3">
            <Pressable
              className="flex-1 bg-gray-200 p-3 rounded-lg items-center"
              onPress={() => setModalVisible(false)}
            >
              <Text className="text-gray-800 font-medium">Cancelar</Text>
            </Pressable>
            
            <Pressable
              className={`flex-1 p-3 rounded-lg items-center ${!street || !postalCode ? 'bg-blue-300' : 'bg-blue-500'}`}
              onPress={handleSaveAddress}
              disabled={!street || !postalCode || isLoading}
            >
              <Text className="text-white font-medium">
                {isLoading ? 'Guardando...' : 'Guardar'}
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Contenido principal */}
      <View className="flex-1 bg-white p-4">
        {savedAddress ? (
          <View className="border border-gray-200 rounded-lg p-4">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-lg font-medium">Tu dirección</Text>
              <Pressable 
                onPress={() => {
                  setStreet(savedAddress.street)
                  setPostalCode(savedAddress.postalCode)
                  setModalVisible(true)
                }}
                className="p-2"
              >
                <Icons.FontAwesome5 name="edit" size={16} />
              </Pressable>
            </View>
            
            <View className="space-y-2">
              <View className="flex-row items-center">
                <Icons.MaterialIcons name="location-on" size={18} className="mr-2 text-gray-500" />
                <Text>{savedAddress.street}</Text>
              </View>
              
              <View className="flex-row items-center">
                <Icons.MaterialIcons name="local-post-office" size={18} className="mr-2 text-gray-500" />
                <Text>{savedAddress.postalCode}</Text>
              </View>
            </View>
          </View>
        ) : (
          <View className="flex-1 items-center justify-center">
            <Address className="h-40 w-40 opacity-50 mb-6" />
            <Text className="text-gray-500 mb-6">No has agregado una dirección</Text>
            <Pressable
              className="bg-blue-500 px-8 py-3 rounded-lg"
              onPress={() => setModalVisible(true)}
            >
              <Text className="text-white font-medium">Agregar dirección</Text>
            </Pressable>
          </View>
        )}
      </View>
    </>
  )
}

export default Addresses