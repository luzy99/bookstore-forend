import ajax from "./ajax";

const BASE_URL = 'http://localhost:8082/api/book'

//添加出版社newProduct: true,
//                 recommend
export const reqAddBook = (book) => ajax(BASE_URL+'/addBook', {
  author: book.author,
  isbn: book.isbn,
  publisher: book.publish,
  releaseTime: book.releaseTime,
  price: book.price,
  price: book.price,
  remainNum: book.remainNum,
  description: book.description,
  put: book.put,
  bookName: book.bookName,
  newProduct: book.newProduct,
  recommend: book.recommend,
  bookSort: book.bookSort
}, 'POST')

export const reqModifyBook = (book) => ajax(BASE_URL+'/modifyBook', {
  author: book.author,
  isbn: book.isbn,
  publisher: book.publish,
  releaseTime: book.releaseTime,
  price: book.price,
  price: book.price,
  remainNum: book.remainNum,
  description: book.description,
  put: book.put,
  bookName: book.bookName,
  newProduct: book.newProduct,
  recommend: book.recommend,
  bookSort: book.bookSort,
  id: book.id
}, 'POST')


export const reqGetBookList = (type,kw)=>ajax(BASE_URL+'/getBookList',{type, kw})
export const reqGetBook = (ISBN)=>ajax(BASE_URL+'/getBookDetail',{ISBN})



export const reqGetBookImgPathList = (isbn)=>ajax(BASE_URL+'/getImgPaths',{isbn})


export const reqModifyPut = (bookId,put)=>ajax(BASE_URL+'/modifyPut',{bookId,put})
export const reqModifyRec = (bookId,recommend)=>ajax(BASE_URL+'/modifyRec',{bookId,recommend})
export const reqModifyNew = (bookId,newProduct)=>ajax(BASE_URL+'/modifyNew',{bookId,newProduct})

//getSortBookList
export const reqGetSortBookList = (sortId)=>ajax(BASE_URL+'/getSortBookList',{sortId})

//getSortBookListBySort
export const reqGetBookListBySort = (sortId,page,pageSize)=>ajax(BASE_URL+'/getBookListBySort',{sortId,page, pageSize})
