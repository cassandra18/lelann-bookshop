import { fetchAll, fetchOne, createEntity, updateEntity, deleteEntity } from "./entityAPI";

export interface Subcategory {
  id: string;
  name: string;
}

const entity = "subcategories" as const;

export const fetchSubcategories = () => fetchAll<Subcategory>(entity);
export const getSubcategoryById = (id: string) => fetchOne<Subcategory>(entity, id);
export const createSubcategory = (data: { name: string }) => createEntity<Subcategory>(entity, data);
export const updateSubcategory = (id: string, data: { name: string }) => updateEntity<Subcategory>(entity, id, data);
export const deleteSubcategory = (id: string) => deleteEntity(entity, id);
