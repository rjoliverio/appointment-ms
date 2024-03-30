import { Setter } from './Setter'

export interface User {
  id: string
  setter: Setter
}

export interface UserResponse {
  data?: User
}
