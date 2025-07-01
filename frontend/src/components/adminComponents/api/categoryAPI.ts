import { fetchAll, fetchOne, createEntity, updateEntity, deleteEntity } from "./entityAPI";

export interface Category {
  id: string;
  name: string;
}

const entity = "categories" as const;

export const fetchCategories = () => fetchAll<Category>(entity);
export const getCategoryById = (id: string) => fetchOne<Category>(entity, id);
export const createCategory = (data: { name: string }) => createEntity<Category>(entity, data);
export const updateCategory = (id: string, data: { name: string }) => updateEntity<Category>(entity, id, data);
export const deleteCategory = (id: string) => deleteEntity(entity, id);
