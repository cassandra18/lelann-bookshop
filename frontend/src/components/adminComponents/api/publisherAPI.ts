import { fetchAll, fetchOne, createEntity, updateEntity, deleteEntity } from "./entityAPI";

export interface Publisher {
  id: string;
  name: string;
}

const entity = "publishers" as const;

export const fetchPublishers = () => fetchAll<Publisher>(entity);
export const getPublisherById = (id: string) => fetchOne<Publisher>(entity, id);
export const createPublisher = (data: { name: string }) => createEntity<Publisher>(entity, data);
export const updatePublisher = (id: string, data: { name: string }) => updateEntity<Publisher>(entity, id, data);
export const deletePublisher = (id: string) => deleteEntity(entity, id);
