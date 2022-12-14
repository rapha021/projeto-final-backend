export interface IAddressUpdate {
  complement?: string
  zipCode?: string
  number?: number
}

export interface IAddress {
  state: string
  city: string
  hood: string
  complement: string
  zipCode: string
  number: number
}

export interface IAddressRequest {
  complement?: string
  zipCode?: string
  number?: number
}

export interface IUserRequest {
  name: string
  email: string
  password: string
  isAdm: boolean
  address?: IAddressRequest
}

export interface IUserWithOutPasswordRequest {
  name: string
  email: string
  isAdm: boolean
  address?: IAddress
}

export interface IUserResponse extends IUserRequest {
  id: string
}

export interface IUser {
  id: string
  name: string
  email: string
  password: string
  isAdm: boolean
  address: IAddress
  createdAt: Date
  updatedAt: Date
}

export interface IUserLogin {
  email: string
  password: string
}

export interface IUserUpdate {
  id: string
  name: string
  email: string
  password: string
  address: IAddress
}

export interface ILoggedUser {
  id: string
  isAdm: boolean
}
