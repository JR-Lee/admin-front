import http from "@/http"

export interface IArticle {
  _id: string;
  title: string;
  content: string;
  cover: { name: string };
  categoryId: string;
}

export interface IFilter {
  hidden?: number;
  categoryId?: string;
  startTime?: number;
  endTime?: number;
}

/** 获取文章 */
export const getArticle = (filter: IFilter) => http.get('/article', { params: filter })

/** 新增或编辑文章 */
export const setArticle = (data: IArticle, _id?: string) => _id ? http.post(`/article/${_id}`, data) : http.put('/article', data)

/** 删除文章 */
export const deleteArticle = (_id: string) => http.delete(`/article/${_id}`)
