import React, { useState } from 'react'
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native'
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons'

const { height } = Dimensions.get('window')

const SocialHomeScreen = () => {
  // Datos de productos (simulados)
  const productsData = {
    selectedProducts: [
      { id: '1', name: 'Taming', brand: 'Ladies' },
      { id: '2', name: '3CE', brand: 'Night Cream' },
      { id: '3', name: 'Lad Shampoo', brand: 'Andora Pink' },
    ],
    favorites: [
      { id: '4', name: 'Ladies', brand: 'Commites' },
      { id: '5', name: 'Chanel Corset', brand: 'Dust Lady' },
      { id: '6', name: 'Eye Cream', brand: 'Body Serum' },
      { id: '7', name: 'Hair Volunteer', brand: 'Color D' },
    ],
  }

  // Datos de usuarios random
  const randomUsers = [
    { name: 'Emma Johnson', avatar: 'https://randomuser.me/api/portraits/women/22.jpg' },
    { name: 'Liam Smith', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { name: 'Olivia Williams', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { name: 'Noah Brown', avatar: 'https://randomuser.me/api/portraits/men/55.jpg' },
    { name: 'Ava Jones', avatar: 'https://randomuser.me/api/portraits/women/66.jpg' },
    { name: 'William Garcia', avatar: 'https://randomuser.me/api/portraits/men/77.jpg' },
  ]

  // Generar publicaciones random
  const generateRandomPosts = () => {
    const postMessages = [
      'Acabo de probar esta nueva paleta de sombras, ¡es increíble! 💄',
      '¿Alguien ha probado el nuevo serum? Estoy pensando en comprarlo...',
      'Mi rutina de noche favorita 😍 #skincare',
      '¡Look completo con los nuevos productos que compré!',
      'Recomendaciones para piel seca, por favor 🙏',
      'Antes y después de usar este tratamiento por 30 días',
      '¿Cuál es tu producto de belleza imprescindible?',
      'Mi colección de labiales sigue creciendo 💋',
    ]

    return Array.from({ length: 5 }, (_, i) => {
      const randomUser = randomUsers[Math.floor(Math.random() * randomUsers.length)]
      const randomMessage = postMessages[Math.floor(Math.random() * postMessages.length)]
      const randomHour = Math.floor(Math.random() * 12) + 1
      const randomMinutes = Math.floor(Math.random() * 60)
        .toString()
        .padStart(2, '0')
      const amPm = Math.random() > 0.5 ? 'AM' : 'PM'
      const randomTime = `${randomHour}:${randomMinutes} ${amPm}`
      const randomLikes = Math.floor(Math.random() * 1000) + 50

      return {
        id: (i + 100).toString(),
        user: randomUser.name,
        avatar: randomUser.avatar,
        message: randomMessage,
        time: randomTime,
        image: `https://picsum.photos/500/400?random=${i + 100}`,
        likes: randomLikes,
        comments: Array.from({ length: Math.floor(Math.random() * 5) }, (_, j) => ({
          id: `${i}-${j}`,
          user: randomUsers[Math.floor(Math.random() * randomUsers.length)].name,
          text: [
            '¡Me encanta!',
            '¿Dónde lo compraste?',
            'Se ve increíble 😍',
            'Tengo que probarlo',
            'Gracias por la recomendación',
          ][Math.floor(Math.random() * 5)],
          time: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 60)
            .toString()
            .padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
        })),
        liked: false,
      }
    })
  }
  const [posts, setPosts] = useState([
    {
      id: '1',
      user: 'Sophia Doyle',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
      message: 'Acabo de probar esta nueva paleta de sombras, ¡es increíble! 💄',
      time: '6:41 AM',
      image: 'https://picsum.photos/500/300?random=makeup',
      likes: 1243,
      comments: [
        {
          id: 'c1',
          user: 'Emma Johnson',
          text: '¡Se ve hermosa! ¿Dónde la compraste?',
          time: '7:15 AM',
        },
        { id: 'c2', user: 'Liam Smith', text: 'Me encantan los colores 😍', time: '8:30 AM' },
      ],
      liked: false,
    },
    ...generateRandomPosts(),
  ])

  const [newPostText, setNewPostText] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)
  const [productsModalVisible, setProductsModalVisible] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState([])
  const [productLink, setProductLink] = useState('')
  const [commentsModalVisible, setCommentsModalVisible] = useState(false)
  const [selectedPostComments, setSelectedPostComments] = useState([])
  const [newComment, setNewComment] = useState('')

  const handleLike = postId => {
    setPosts(
      posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            liked: !post.liked,
            likes: post.liked ? post.likes - 1 : post.likes + 1,
          }
        }
        return post
      })
    )
  }

  const toggleProductSelection = product => {
    setSelectedProducts(prev => {
      const exists = prev.some(p => p.id === product.id)
      if (exists) {
        return prev.filter(p => p.id !== product.id)
      } else {
        return [...prev, product]
      }
    })
  }

  const createPost = () => {
    if (newPostText.trim() === '' && selectedOption !== 'Products') return

    let postImage = null
    if (selectedOption === 'Photo') {
      postImage = 'https://picsum.photos/500/300?random=' + Date.now()
    } else if (selectedOption === 'Products' && selectedProducts.length > 0) {
      postImage = 'https://picsum.photos/500/300?random=product' + selectedProducts[0].id
    }

    const newPost = {
      id: Date.now().toString(),
      user: 'Sophia Doyle',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
      message:
        newPostText ||
        `Estoy compartiendo estos productos: ${selectedProducts.map(p => p.name).join(', ')}`,
      time: 'Ahora',
      image: postImage,
      products: selectedOption === 'Products' ? selectedProducts : null,
      likes: 0,
      comments: [],
      liked: false,
    }

    setPosts([newPost, ...posts])
    setNewPostText('')
    setSelectedOption(null)
    setSelectedProducts([])
    setProductsModalVisible(false)
  }

  const openCommentsModal = postId => {
    const post = posts.find(p => p.id === postId)
    setSelectedPostComments(post.comments || [])
    setCommentsModalVisible(true)
  }

  const addComment = () => {
    if (newComment.trim() === '') return

    const comment = {
      id: Date.now().toString(),
      user: 'Sophia Doyle',
      text: newComment,
      time: 'Ahora',
    }

    setSelectedPostComments([...selectedPostComments, comment])
    setNewComment('')

    // Actualizar los comentarios en el post correspondiente
    setPosts(
      posts.map(post => {
        if (post.id === selectedPostComments.postId) {
          return {
            ...post,
            comments: [...post.comments, comment],
          }
        }
        return post
      })
    )
  }

  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.user}</Text>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
      </View>

      <Text style={styles.postMessage}>{item.message}</Text>

      {item.image && (
        <Image source={{ uri: item.image }} style={styles.postImage} resizeMode="cover" />
      )}

      {item.products && (
        <View style={styles.productsPreview}>
          <Text style={styles.productsTitle}>Productos compartidos:</Text>
          {item.products.map(product => (
            <Text key={product.id} style={styles.productItem}>
              • {product.name} ({product.brand})
            </Text>
          ))}
        </View>
      )}

      <View style={styles.postStats}>
        <Text style={styles.likesText}>{item.likes.toLocaleString()} Me gusta</Text>
        <TouchableOpacity onPress={() => openCommentsModal(item.id)}>
          <Text style={styles.commentsText}>{item.comments.length} Comentarios</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.postFooter}>
        <TouchableOpacity style={styles.footerButton} onPress={() => handleLike(item.id)}>
          <Ionicons
            name={item.liked ? 'heart' : 'heart-outline'}
            size={22}
            color={item.liked ? '#ff6b81' : '#666'}
          />
          <Text style={[styles.footerText, item.liked && styles.likedText]}>Me gusta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerButton} onPress={() => openCommentsModal(item.id)}>
          <Ionicons name="chatbubble-outline" size={20} color="#666" />
          <Text style={styles.footerText}>Comentar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="share-social-outline" size={22} color="#666" />
          <Text style={styles.footerText}>Compartir</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Beauty Community</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Crear publicación */}
      <View style={styles.createPostContainer}>
        <View style={styles.createPostHeader}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/65.jpg' }}
            style={styles.smallAvatar}
          />
          <TextInput
            style={styles.postInput}
            placeholder="Have something to share with the community?"
            value={newPostText}
            onChangeText={setNewPostText}
          />
        </View>

        <View style={styles.postOptions}>
          <TouchableOpacity
            style={[styles.optionButton, selectedOption === 'Photo' && styles.selectedOption]}
            onPress={() => setSelectedOption('Photo')}
          >
            <Ionicons
              name="image"
              size={20}
              color={selectedOption === 'Photo' ? '#ff6b81' : '#666'}
            />
            <Text
              style={[styles.optionText, selectedOption === 'Photo' && styles.selectedOptionText]}
            >
              Photo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.optionButton, selectedOption === 'Video' && styles.selectedOption]}
            onPress={() => setSelectedOption('Video')}
          >
            <Ionicons
              name="videocam"
              size={20}
              color={selectedOption === 'Video' ? '#ff6b81' : '#666'}
            />
            <Text
              style={[styles.optionText, selectedOption === 'Video' && styles.selectedOptionText]}
            >
              Video
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.optionButton, selectedOption === 'Products' && styles.selectedOption]}
            onPress={() => {
              setSelectedOption('Products')
              setProductsModalVisible(true)
            }}
          >
            <MaterialIcons
              name="shopping-bag"
              size={20}
              color={selectedOption === 'Products' ? '#ff6b81' : '#666'}
            />
            <Text
              style={[
                styles.optionText,
                selectedOption === 'Products' && styles.selectedOptionText,
              ]}
            >
              Products
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[
            styles.postButton,
            newPostText.trim() === '' && selectedProducts.length === 0 && styles.disabledButton,
            selectedOption && styles.activePostButton,
          ]}
          onPress={createPost}
          disabled={newPostText.trim() === '' && selectedProducts.length === 0}
        >
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de publicaciones */}
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Modal de Productos */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={productsModalVisible}
        onRequestClose={() => setProductsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Create New Post</Text>
            <TouchableOpacity onPress={() => setProductsModalVisible(false)}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <View style={styles.userInfoModal}>
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/women/65.jpg' }}
              style={styles.smallAvatar}
            />
            <Text style={styles.userNameModal}>Sophia Doyle</Text>
          </View>

          <Text style={styles.modalSubtitle}>Have something to share with the community?</Text>

          <TextInput
            style={styles.productLinkInput}
            placeholder="Paste the product link here..."
            value={productLink}
            onChangeText={setProductLink}
          />

          <ScrollView style={styles.productsScroll}>
            <Text style={styles.sectionTitle}>Selected Products</Text>
            {productsData.selectedProducts.map(product => (
              <TouchableOpacity
                key={product.id}
                style={[
                  styles.productItemContainer,
                  selectedProducts.some(p => p.id === product.id) && styles.selectedProductItem,
                ]}
                onPress={() => toggleProductSelection(product)}
              >
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productBrand}>{product.brand}</Text>
                </View>
                {selectedProducts.some(p => p.id === product.id) && (
                  <Ionicons name="checkmark-circle" size={20} color="#ff6b81" />
                )}
              </TouchableOpacity>
            ))}

            <Text style={styles.sectionTitle}>Your Favourites</Text>
            {productsData.favorites.map(product => (
              <TouchableOpacity
                key={product.id}
                style={[
                  styles.productItemContainer,
                  selectedProducts.some(p => p.id === product.id) && styles.selectedProductItem,
                ]}
                onPress={() => toggleProductSelection(product)}
              >
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productBrand}>{product.brand}</Text>
                </View>
                {selectedProducts.some(p => p.id === product.id) && (
                  <Ionicons name="checkmark-circle" size={20} color="#ff6b81" />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TouchableOpacity
            style={[styles.postButton, styles.modalPostButton]}
            onPress={createPost}
            disabled={selectedProducts.length === 0}
          >
            <Text style={styles.postButtonText}>Post</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Modal de Comentarios */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={commentsModalVisible}
        onRequestClose={() => setCommentsModalVisible(false)}
      >
        <View style={styles.commentsModalContainer}>
          <View style={styles.commentsModalContent}>
            <View style={styles.commentsModalHeader}>
              <Text style={styles.commentsModalTitle}>Comentarios</Text>
              <TouchableOpacity onPress={() => setCommentsModalVisible(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.commentsList}>
              {selectedPostComments.length > 0 ? (
                selectedPostComments.map(comment => (
                  <View key={comment.id} style={styles.commentItem}>
                    <Image
                      source={{ uri: 'https://randomuser.me/api/portraits/women/65.jpg' }}
                      style={styles.commentAvatar}
                    />
                    <View style={styles.commentContent}>
                      <Text style={styles.commentUser}>{comment.user}</Text>
                      <Text style={styles.commentText}>{comment.text}</Text>
                      <Text style={styles.commentTime}>{comment.time}</Text>
                    </View>
                  </View>
                ))
              ) : (
                <Text style={styles.noCommentsText}>No hay comentarios aún</Text>
              )}
            </ScrollView>

            <View style={styles.commentInputContainer}>
              <TextInput
                style={styles.commentInput}
                placeholder="Escribe un comentario..."
                value={newComment}
                onChangeText={setNewComment}
              />
              <TouchableOpacity
                style={styles.commentButton}
                onPress={addComment}
                disabled={newComment.trim() === ''}
              >
                <Ionicons
                  name="send"
                  size={20}
                  color={newComment.trim() === '' ? '#ccc' : '#ff6b81'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  createPostContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  createPostHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  smallAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  postInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#f0f2f5',
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  postOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: '#f0f2f5',
  },
  selectedOption: {
    backgroundColor: '#ffecef',
  },
  optionText: {
    marginLeft: 5,
    color: '#666',
    fontSize: 14,
  },
  selectedOptionText: {
    color: '#ff6b81',
  },
  postButton: {
    backgroundColor: '#ff6b81',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  activePostButton: {
    backgroundColor: '#ff4757',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  postButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
  postContainer: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  timeText: {
    fontSize: 12,
    color: '#65676b',
    marginTop: 2,
  },
  postMessage: {
    fontSize: 15,
    color: '#333',
    marginBottom: 15,
    lineHeight: 20,
  },
  postImage: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 10,
  },
  productsPreview: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  productsTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productItem: {
    marginLeft: 10,
    marginBottom: 3,
  },
  postStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f2f5',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f2f5',
    marginBottom: 5,
  },
  likesText: {
    color: '#65676b',
    fontSize: 14,
  },
  commentsText: {
    color: '#65676b',
    fontSize: 14,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  footerText: {
    marginLeft: 5,
    color: '#65676b',
    fontSize: 14,
  },
  likedText: {
    color: '#ff6b81',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 40,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  userInfoModal: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userNameModal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  productLinkInput: {
    height: 40,
    backgroundColor: '#f0f2f5',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  productsScroll: {
    flex: 1,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    marginTop: 15,
  },
  productItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedProductItem: {
    backgroundColor: '#ffecef',
    borderColor: '#ff6b81',
    borderWidth: 1,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  productBrand: {
    fontSize: 12,
    color: '#666',
  },
  modalPostButton: {
    marginBottom: 20,
  },
  commentsModalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  commentsModalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: height * 0.75,
  },
  commentsModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  commentsModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  commentsList: {
    flex: 1,
    marginBottom: 15,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  commentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
  },
  commentUser: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  commentText: {
    color: '#333',
    marginBottom: 2,
  },
  commentTime: {
    fontSize: 12,
    color: '#999',
  },
  noCommentsText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  commentInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#f0f2f5',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  commentButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f2f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default SocialHomeScreen
