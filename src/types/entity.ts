export interface EntityId {
  _id?: any;
}

export interface Entity extends EntityId {
  createdAt?: Date;
  updatedAt?: Date;
}
