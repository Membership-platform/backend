import { DatabaseError } from 'sequelize';

export default interface Error extends DatabaseError {
  fields?: {
    [key: string]: string;
  };
  code?: number;
  path: string;
  message: string;
  errors?: {
    forEach: (cb: (err: { path: string; message: string }) => void) => void;
    errors?: [];
  };
}
