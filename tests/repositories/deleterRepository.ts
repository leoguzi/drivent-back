import { getConnection, EntityTarget, BaseEntity } from "typeorm";

export default async function deleteAll(entity: EntityTarget<BaseEntity>) {
  return getConnection()
    .createQueryBuilder()
    .delete()
    .from(entity)
    .where("id >= :id", { id: 1 })
    .execute();
}
