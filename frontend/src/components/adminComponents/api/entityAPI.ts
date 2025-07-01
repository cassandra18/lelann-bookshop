import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export type EntityType = "authors" | "publishers" | "categories" | "subcategories";

export interface BaseEntity {
  id: string;
  name: string;
}

const getToken = () => localStorage.getItem("token");

// ---------- GENERIC FUNCTIONS ----------

export const fetchAll = async <T>(entity: EntityType): Promise<T[]> => {
  const res = await fetch(`${API_URL}/${entity}`);
  if (!res.ok) throw new Error(`Failed to fetch ${entity}`);
  return res.json();
};

export const fetchOne = async <T>(entity: EntityType, id: string): Promise<T> => {
  const res = await fetch(`${API_URL}/${entity}/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch ${entity} with ID ${id}`);
  return res.json();
};

export const createEntity = async <T extends BaseEntity>(
  entity: EntityType,
  data: Partial<T>
): Promise<T> => {
  const token = getToken();

  const res = await axios.post(`${API_URL}/${entity}/add`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  return res.data;
};

export const updateEntity = async <T extends BaseEntity>(
  entity: EntityType,
  id: string,
  data: Partial<T>
): Promise<T> => {
  const token = getToken();

  const res = await axios.put(`${API_URL}/${entity}/update/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  return res.data;
};

export const deleteEntity = async (entity: EntityType, id: string) => {
  const token = getToken();

  const res = await fetch(`${API_URL}/${entity}/delete/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error(`Failed to delete ${entity} with ID ${id}`);
};
