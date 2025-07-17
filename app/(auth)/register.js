import { yupResolver } from '@hookform/resolvers/yup'
import { Link, Stack, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ScrollView, Text, View, Modal, TouchableOpacity, StyleSheet } from 'react-native'

import { Button, HandleResponse, Logo, TextField } from '@/components'
import { useAppDispatch } from '@/hooks'
import { useCreateUserMutation } from '@/services'
import { userLogin } from '@/store'
import { registerSchema } from '@/utils'

export default function RegisterScreen() {
  //? Assets
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [showVerificationModal, setShowVerificationModal] = useState(false)
  const [otp, setOtp] = useState(['', '', '', ''])
  const [countdown, setCountdown] = useState(30)
  const [isVerified, setIsVerified] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)

  //? Create User
  const [createUser, { data, isSuccess, isError, isLoading, error }] = useCreateUserMutation()

  //? Form Hook
  const {
    handleSubmit,
    formState: { errors: formErrors },
    setFocus,
    control,
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  })

  //? Focus On Mount
  useEffect(() => {
    setFocus('name')
  }, [])

  //? Countdown for resend OTP
  useEffect(() => {
    if (countdown > 0 && showVerificationModal) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown, showVerificationModal])

  //? Handlers
  const onSubmit = ({ name, email, password }) => {
    if (name && email && password) {
      setFormSubmitted(true)
      createUser({
        body: { name, email, password },
      })
      setShowVerificationModal(true)
      setCountdown(30)
    }
  }

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
  }

  const handleResendOtp = () => {
    setCountdown(30)
    // Aquí llamarías a la API para reenviar el OTP
  }

  const handleVerifyOtp = () => {
    // Verificación simulada
    if (otp.join('').length === 4) {
      setIsVerified(true)
      setShowVerificationModal(false)
      dispatch(userLogin(data.data.token))
      router.back()
    } else {
      alert('Por favor ingresa un código OTP válido de 4 dígitos')
    }
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Registro',
          headerBackTitleVisible: false,
        }}
      />

      {/* Handle registration response */}
      {(isSuccess || isError) && !isVerified && (
        <HandleResponse
          isError={isError}
          isSuccess={isSuccess}
          error={error?.data?.message || 'Ha ocurrido un error'}
          message="Registro exitoso. Por favor verifica tu email."
        />
      )}

      <ScrollView className="h-[100%] bg-white pt-10">
        <View className="w-[100vw] px-8 py-6 space-y-4">
          <Logo className="mx-auto w-40 h-16" />
          <Text className=" mt-20">Registro</Text>
          <View className="space-y-0">
            <TextField
              errors={formErrors.name}
              placeholder="Ingresa tu nombre completo"
              name="name"
              control={control}
            />
            <TextField
              errors={formErrors.email}
              placeholder="Ingresa tu correo electrónico"
              name="email"
              keyboardType="email-address"
              autoCapitalize="none"
              control={control}
            />

            <TextField
              errors={formErrors.password}
              secureTextEntry
              placeholder="Ingresa tu contraseña"
              name="password"
              control={control}
            />
            <TextField
              control={control}
              errors={formErrors.confirmPassword}
              secureTextEntry
              placeholder="Confirma tu contraseña"
              name="confirmPassword"
            />
            <Button isLoading={isLoading} onPress={handleSubmit(onSubmit)} disabled={formSubmitted}>
              {formSubmitted ? 'Verifica tu email' : 'Registrarse'}
            </Button>
          </View>
          <View className="flex flex-row">
            <Text className="inline mr-2 text-gray-800 text-xs">¿Ya tienes cuenta?</Text>
            <Link replace href="/login" className="text-blue-400 text-xs">
              Iniciar Sesión
            </Link>
          </View>
        </View>
      </ScrollView>

      {/* Fullscreen Verification Modal */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={showVerificationModal}
        onRequestClose={() => {}}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Verificación de Email</Text>
            <Text style={styles.modalSubtitle}>
              Por favor ingresa el código OTP que te hemos enviado a tu correo electrónico
            </Text>

            {/* OTP Inputs */}
            <View style={styles.otpContainer}>
              {[0, 1, 2, 3].map(index => (
                <View key={index} style={styles.otpBox}>
                  <Text style={styles.otpText}>{otp[index]}</Text>
                </View>
              ))}
            </View>

            {/* Virtual Keypad */}
            <View style={styles.keypad}>
              <View style={styles.keypadRow}>
                {[1, 2, 3].map(num => (
                  <TouchableOpacity
                    key={num}
                    style={styles.keypadButton}
                    onPress={() => {
                      const emptyIndex = otp.findIndex(val => val === '')
                      if (emptyIndex !== -1) handleOtpChange(num.toString(), emptyIndex)
                    }}
                  >
                    <Text style={styles.keypadText}>{num}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.keypadRow}>
                {[4, 5, 6].map(num => (
                  <TouchableOpacity
                    key={num}
                    style={styles.keypadButton}
                    onPress={() => {
                      const emptyIndex = otp.findIndex(val => val === '')
                      if (emptyIndex !== -1) handleOtpChange(num.toString(), emptyIndex)
                    }}
                  >
                    <Text style={styles.keypadText}>{num}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.keypadRow}>
                {[7, 8, 9].map(num => (
                  <TouchableOpacity
                    key={num}
                    style={styles.keypadButton}
                    onPress={() => {
                      const emptyIndex = otp.findIndex(val => val === '')
                      if (emptyIndex !== -1) handleOtpChange(num.toString(), emptyIndex)
                    }}
                  >
                    <Text style={styles.keypadText}>{num}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.keypadRow}>
                <TouchableOpacity style={styles.keypadButton}>
                  <Text style={styles.keypadText}>*</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.keypadButton}
                  onPress={() => {
                    const emptyIndex = otp.findIndex(val => val === '')
                    if (emptyIndex !== -1) handleOtpChange('0', emptyIndex)
                  }}
                >
                  <Text style={styles.keypadText}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.keypadButton}>
                  <Text style={styles.keypadText}>#</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Button onPress={handleVerifyOtp} style={styles.verifyButton}>
              Verificar
            </Button>

            <TouchableOpacity
              onPress={handleResendOtp}
              disabled={countdown > 0}
              style={styles.resendButton}
            >
              <Text style={[styles.resendText, countdown > 0 && styles.resendDisabled]}>
                {countdown > 0
                  ? `Reenviar código en 00:${countdown < 10 ? `0${countdown}` : countdown}`
                  : 'Reenviar código'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
    color: '#666',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
    width: '100%',
  },
  otpBox: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpText: {
    fontSize: 24,
  },
  keypad: {
    width: '100%',
    marginBottom: 30,
  },
  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  keypadButton: {
    width: 80,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  keypadText: {
    fontSize: 24,
  },
  verifyButton: {
    width: '100%',
    marginBottom: 20,
  },
  resendButton: {
    alignSelf: 'center',
  },
  resendText: {
    color: '#3b82f6',
    fontSize: 16,
  },
  resendDisabled: {
    color: '#9ca3af',
  },
})
