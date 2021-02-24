import http from "@/http"

export interface ArticleData {
  title: string;
  content: string;
  cover: {
    name: string,
  }
}

/** 获取文章 */
export const getArticle = () => http.get('/article')

/** 新增文章 */
export const addArticle = (data: ArticleData) => http.put('/article', data)

/** 编辑文章 */
export const updateArticle = (data: ArticleData) => http.post('/article', data)
