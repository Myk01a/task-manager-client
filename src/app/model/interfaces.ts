export interface UserAuth {
  username: string
  password: string
  returnSecureToken?: boolean
}

export interface AuthResponse {
  token: string
}

export interface Group {
  id?: number,
  name: string
}

export interface User {
  id?: number,
  email?: string,
  password?: string,
  username?: string,
  roles?: any[]
}

export enum Roles {
  ROLE_ADMIN,
  ROLE_CLIENT,
}



export interface CommentAttachment {
  id: number,
  url: string
}

export interface Comment {
  id: number,
  message: string,
  creationTime: Date,
  commentator: User,
  commentAttachment: [CommentAttachment]
}

export interface TaskAttachment {
  id: number,
  url: string
}

export interface Task {
  id: number,
  title?: string,
  description?: string,
  category?: Group,
  completed?: Date,
  creation?: Date,
  deadline?: Date,
  owner?: User,
  executor?: User,
  observer?: [User],
  comment?: [Comment],
  taskAttachment?: [TaskAttachment]
}


