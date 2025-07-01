import axiosInstance from "./axiosInstance";
export type EntityType = "authors" | "publishers" | "categories" | "subcategories";

export interface BaseEntity {
  id: string;
  name: string;
}

// ---------- GENERIC FUNCTIONS USING AXIOS INSTANCE ----------

export const fetchAll = async <T>(entity: EntityType): Promise<T[]> => {
  const res = await axiosInstance.get<T[]>(`/${entity}`);
  return res.data;
};

export const fetchOne = async <T>(entity: EntityType, id: string): Promise<T> => {
  const res = await axiosInstance.get<T>(`/${entity}/${id}`);
  return res.data;
};

export const createEntity = async <T = any>(
  entity: EntityType,
  data: Partial<T>
): Promise<T> => {
  const res = await axiosInstance.post<T>(`/${entity}/add`, data);
  return res.data;
};

export const updateEntity = async <T = any>(
  entity: EntityType,
  id: string,
  data: Partial<T>
): Promise<T> => {
  const res = await axiosInstance.put<T>(`/${entity}/update/${id}`, data);
  return res.data;
};

export const deleteEntity = async (entity: EntityType, id: string): Promise<void> => {
  await axiosInstance.delete(`/${entity}/delete/${id}`);
};
