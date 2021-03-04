import { getCategory } from "@/api/category"
import { ref } from "vue"

export interface ICategory {
  name: string;
  remark?: string;
}

export default () => {
  const categories = ref<ICategory[]>([])

  const getData = () => {
    getCategory()
      .then(({ data }) => categories.value = data)
      .catch((err) => console.log(err))
  }

  getData()

  return { categories, getCategory: getData }
}