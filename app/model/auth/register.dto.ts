import type { UserPosition, UserRole } from "./authEmun";

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
  image: string;
  role: UserRole;
  position: UserPosition;
}

