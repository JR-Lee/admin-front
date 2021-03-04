import http from "@/http";

export interface ICategory {
  _id?: string;
  name: string;
  remark?: string;
  [key: string]: unknown;
}

/** 获取文章分类 */
export const getCategory = () => http.get('/category')

/** 新增或编辑文章 */
export const setCategory = (data: ICategory, _id?: string) => _id ? http.post(`/category/${_id}`, data) : http.put('/category', data)

/** 删除文章分类 */
export const deleteCategory = (_id: string) => http.delete(`/category/${_id}`)
