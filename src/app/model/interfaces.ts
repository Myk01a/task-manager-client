
export interface UserAuth {
  username: string
  password: string
  returnSecureToken?: boolean
}

export interface AuthResponse {
  [x: string]: string;
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

export interface Profile {
  idUserProfile: number,
  avatar?: string,
  dismissed?: number,
  name?: string,
  idUser: User
}


export interface Comment {
  id?: number,
  message?: string,
  creationTime?: Date,
  commentator: User,
  commentTask: Task,
  commentatorProf?: Profile,
  commentAttachment?: [Attachment]
}

export interface Attachment{
  id: number,
  fileName: string,
  fileDownloadUri: string,
  fileType: string,
  size: number
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
  attachment?: [Attachment]
  price?: number;
  done?: boolean;
}

export interface SearchParam {
  title: string,
  description: string,
  ownerId: number,
  grouppId: number,
  done: boolean,
  pageNumber: number,
  pageSize: number,
  sortColumn: string,
  sortDirection: string
}

export interface Page
{
  totalPages: number,
  totalElements: number,
  size: number,
  content: [
    Task
  ],
  number: number,
  sort: {
    sorted: boolean,
    unsorted: boolean,
    empty: boolean
  },
  numberOfElements: number,
  first: boolean,
  pageable: {
    offset: number,
    sort: {
      sorted: boolean,
      unsorted: boolean,
      empty: boolean
    },
    pageSize: number,
    pageNumber: number,
    paged: boolean,
    unpaged: boolean
  },
  last: boolean,
  empty: boolean
}

