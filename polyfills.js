import { BackHandler } from 'react-native'

// Store original addEventListener method
const originalAddEventListener = BackHandler.addEventListener
const subscriptions = new Map()

// Polyfill for older react-native-screens compatibility
if (!BackHandler.removeEventListener) {
  // Override addEventListener to track subscriptions
  BackHandler.addEventListener = function(eventName, handler) {
    const subscription = originalAddEventListener.call(this, eventName, handler)
    
    // Store subscription for potential removal
    const key = `${eventName}_${handler.toString()}`
    subscriptions.set(key, subscription)
    
    return subscription
  }
  
  // Add removeEventListener method
  BackHandler.removeEventListener = function(eventName, handler) {
    const key = `${eventName}_${handler.toString()}`
    const subscription = subscriptions.get(key)
    
    if (subscription && typeof subscription.remove === 'function') {
      subscription.remove()
      subscriptions.delete(key)
    }
  }
}
