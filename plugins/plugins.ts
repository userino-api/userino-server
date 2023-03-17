import { Router } from 'express'
import FirebasePlugin from './firebase'
import firebasePlugin from './firebase/plugin'

// new style
export const plugins = [firebasePlugin]

/**
 * @NOTE: This functionality must be automated in future.
 *  At the moment we need just to check what features it must provide.
 * */

// todo plugin probably want also use consumer subs or so on...
const Plugins = {
  // what about admin routes? Maybe we need to use: addUserRoutes, addAdminRoutes?
  addRoutes(app:Router) {
    FirebasePlugin.addRoutes(app)
  },
}

export default Plugins
