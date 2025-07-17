import { yupResolver } from '@hookform/resolvers/yup'
import { Link, Stack, useRouter } from 'expo-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Text, View, Modal, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import { Button, Logo, TextField } from '@/components'
import { useAppDispatch } from '@/hooks'
import { useLoginMutation } from '@/services'
import { userLogin } from '@/store'
import { logInSchema } from '@/utils'

export default function LoginScreen() {
  // Hooks y estados
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [activeModal, setActiveModal] = useState(null) // 'forgot' o 'newPassword'

  // Mutación de login
  const [login, { isLoading }] = useLoginMutation()

  // Formularios
  const {
    control: loginControl,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm({
    resolver: yupResolver(logInSchema),
    defaultValues: { email: '', password: '' },
  })

  const {
    control: emailControl,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors },
  } = useForm({
    defaultValues: { email: '' },
  })

  const {
    control: passwordControl,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
  } = useForm({
    defaultValues: { newPassword: '', confirmPassword: '' },
  })

  // Handlers
  const onLoginSubmit = async ({ email, password }) => {
    try {
      const response = await login({ body: { email, password } }).unwrap()
      dispatch(userLogin(response.data.token))
      router.back()
    } catch (error) {
      Alert.alert('Error', error.data?.message || 'Error al iniciar sesión')
    }
  }

  const onEmailSubmit = data => {
    console.log('Email enviado:', data.email)
    setActiveModal('newPassword')
  }

  const onPasswordSubmit = data => {
    console.log('Nueva contraseña:', data)
    setActiveModal(null)
    Alert.alert('Éxito', 'Contraseña actualizada correctamente')
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Iniciar Sesión', headerBackTitleVisible: false }} />

      {/* Pantalla principal de login */}
      <View style={styles.container}>
        <View style={styles.content}>
          <Logo style={styles.logo} />
          <Text style={styles.title}>Iniciar Sesión</Text>

          <View style={styles.formContainer}>
            <TextField
              control={loginControl}
              name="email"
              placeholder="Ingresa tu correo electrónico"
              keyboardType="email-address"
              autoCapitalize="none"
              error={loginErrors.email?.message}
            />

            <TextField
              control={loginControl}
              name="password"
              placeholder="Ingresa tu contraseña"
              secureTextEntry
              error={loginErrors.password?.message}
            />

            <TouchableOpacity onPress={() => setActiveModal('forgot')}>
              <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>

            <Button
              loading={isLoading}
              onPress={handleLoginSubmit(onLoginSubmit)}
              style={styles.loginButton}
            >
              Iniciar Sesión
            </Button>
          </View>

          <View style={styles.socialContainer}>
            <Text style={styles.socialText}>O iniciar sesión con</Text>
            <View style={styles.socialIcons}>
              <FontAwesome name="apple" size={24} color="black" />
              <FontAwesome name="facebook" size={24} color="#3b5998" style={styles.icon} />
              <FontAwesome name="google" size={24} color="#DB4437" />
            </View>
          </View>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>¿No tienes cuenta?</Text>
            <Link replace href="/register" style={styles.registerLink}>
              Registrarse
            </Link>
          </View>
        </View>
      </View>

      {/* Modal de recuperación (pantalla completa) */}
      <Modal visible={activeModal === 'forgot'} animationType="slide">
        <View style={styles.fullscreenModal}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setActiveModal(null)}>
              <FontAwesome name="arrow-left" size={24} color="#3B82F6" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Recuperar Contraseña</Text>
            <View style={{ width: 24 }} />
          </View>

          <View style={styles.modalContent}>
            <Text style={styles.modalSubtitle}>
              Ingresa tu correo electrónico para recibir instrucciones
            </Text>

            <TextField
              control={emailControl}
              name="email"
              placeholder="Correo electrónico"
              keyboardType="email-address"
              autoCapitalize="none"
              error={emailErrors.email?.message}
              style={styles.input}
            />

            <Button onPress={handleEmailSubmit(onEmailSubmit)} style={styles.modalButton}>
              Continuar
            </Button>
          </View>
        </View>
      </Modal>

      {/* Modal de nueva contraseña (pantalla completa) */}
      <Modal visible={activeModal === 'newPassword'} animationType="slide">
        <View style={styles.fullscreenModal}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setActiveModal('forgot')}>
              <FontAwesome name="arrow-left" size={24} color="#3B82F6" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Nueva Contraseña</Text>
            <View style={{ width: 24 }} />
          </View>

          <View style={styles.modalContent}>
            <Text style={styles.modalSubtitle}>Crea una nueva contraseña para tu cuenta</Text>

            <TextField
              control={passwordControl}
              name="newPassword"
              placeholder="Nueva contraseña"
              secureTextEntry
              error={passwordErrors.newPassword?.message}
              style={styles.input}
            />

            <TextField
              control={passwordControl}
              name="confirmPassword"
              placeholder="Confirmar contraseña"
              secureTextEntry
              error={passwordErrors.confirmPassword?.message}
              style={styles.input}
            />

            <Button onPress={handlePasswordSubmit(onPasswordSubmit)} style={styles.modalButton}>
              Actualizar Contraseña
            </Button>
          </View>
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  // Estilos generales
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 40,
  },
  content: {
    paddingHorizontal: 24,
  },
  logo: {
    alignSelf: 'center',
    width: 160,
    height: 64,
    marginBottom: 48,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 32,
  },
  formContainer: {
    marginBottom: 24,
  },
  forgotPassword: {
    color: '#3B82F6',
    fontSize: 14,
    textAlign: 'right',
    marginBottom: 24,
  },
  loginButton: {
    marginBottom: 24,
  },
  socialContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  socialText: {
    color: '#6B7280',
    fontSize: 12,
    marginBottom: 16,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  icon: {
    marginHorizontal: 24,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerText: {
    color: '#6B7280',
    fontSize: 12,
    marginRight: 4,
  },
  registerLink: {
    color: '#3B82F6',
    fontSize: 12,
  },

  // Estilos para modales a pantalla completa
  fullscreenModal: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
  },
  modalContent: {
    flex: 1,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  modalButton: {
    marginTop: 24,
  },
})
