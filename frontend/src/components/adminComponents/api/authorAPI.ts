import { fetchAll, fetchOne, createEntity, updateEntity, deleteEntity } from "./entityAPI";

export interface Author {
  id: string;
  name: string;
}

const entity = "authors" as const;

export const fetchAuthors = () => fetchAll<Author>(entity);
export const getAuthorById = (id: string) => fetchOne<Author>(entity, id);
export const createAuthor = (data: { name: string }) => createEntity<Author>(entity, data);
export const updateAuthor = (id: string, data: { name: string }) => updateEntity<Author>(entity, id, data);
export const deleteAuthor = (id: string) => deleteEntity(entity, id);
