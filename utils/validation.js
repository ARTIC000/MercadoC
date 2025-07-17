import * as Yup from 'yup';

// Esquema de validación para inicio de sesión
export const logInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Formato de correo incorrecto')
    .required('Por favor ingresa tu correo'),
  password: Yup.string()
    .required('Por favor ingresa tu contraseña')
    .min(6, 'La contraseña debe tener mínimo 6 caracteres'),
});

// Esquema de validación para registro de usuario
export const registerSchema = Yup.object().shape({
  name: Yup.string()
    .required('Por favor ingresa tu nombre')
    .min(3, 'El nombre debe tener mínimo 3 caracteres'),
  email: Yup.string()
    .email('Formato de correo incorrecto')
    .required('Por favor ingresa tu correo'),
  password: Yup.string()
    .required('Por favor ingresa tu contraseña')
    .min(6, 'La contraseña debe tener mínimo 6 caracteres'),
  confirmPassword: Yup.string()
    .required('Por favor confirma tu contraseña')
    .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden'),
});

// Esquema de validación para categorías
export const categorySchema = Yup.object().shape({
  name: Yup.string().required('El nombre de la categoría es obligatorio'),
  slug: Yup.string().required('La URL amigable es obligatoria'),
  image: Yup.string()
    .required('La imagen es requerida')
    .url('Debe ser una URL válida')
    .matches(/\.(gif|jpe?g|png|webp)$/i, 'La URL debe apuntar a una imagen válida'),
});

// Esquema de validación para banners
export const bannerSchema = Yup.object().shape({
  title: Yup.string().required('El título del banner es obligatorio'),
  image: Yup.object().shape({
    url: Yup.string()
      .required('La URL de la imagen es obligatoria')
      .url('Debe ser una URL válida')
      .matches(/\.(gif|jpe?g|png|webp)$/i, 'La URL debe apuntar a una imagen válida'),
  }),
});

// Esquema de validación para sliders
export const sliderSchema = Yup.object().shape({
  title: Yup.string().required('El título del slider es obligatorio'),
  image: Yup.object().shape({
    url: Yup.string()
      .required('La URL de la imagen es obligatoria')
      .url('Debe ser una URL válida')
      .matches(/\.(gif|jpe?g|png|webp)$/i, 'La URL debe apuntar a una imagen válida'),
  }),
});

// Esquema de validación para reseñas
export const reviewSchema = Yup.object().shape({
  title: Yup.string()
    .required('El título de la reseña es obligatorio')
    .min(4, 'El título debe tener al menos 4 caracteres'),
  comment: Yup.string()
    .required('El comentario es obligatorio')
    .min(4, 'El comentario debe tener al menos 4 caracteres'),
});

// Esquema de validación para direcciones
export const addressSchema = Yup.object().shape({
  province: Yup.object().shape({
    name: Yup.string().required('La provincia es obligatoria'),
  }),
  city: Yup.object().shape({
    name: Yup.string().required('La ciudad es obligatoria'),
  }),
  area: Yup.object().shape({
    name: Yup.string().required('El área/distrito es obligatorio'),
  }),
  street: Yup.string().required('La calle/dirección es obligatoria'),
  postalCode: Yup.string().required('El código postal es obligatorio'),
});

export const nameSchema = Yup.object().shape({
  name: Yup.string()
    .required('El nombre es obligatorio')
    .min(3, 'El nombre debe tener al menos 3 caracteres'),
});

export const mobileSchema = Yup.object().shape({
  mobile: Yup.string()
    .required('El número de teléfono es obligatorio')
    .min(11, 'El número debe tener exactamente 11 dígitos')
    .max(11, 'El número debe tener exactamente 11 dígitos'),
});