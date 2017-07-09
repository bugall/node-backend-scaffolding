import development from './development'
import product from './product'

let config = null

if (process.env.NODE_ENV === 'development') {
  config = development
} else if (process.env.NODE_ENV === 'product') {
  config = product
}

export default config