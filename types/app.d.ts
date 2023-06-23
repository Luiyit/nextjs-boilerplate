// Available app's roles
export enum RoleType { 
  guess = "guess",
  admin = "admin",
  user = "user",
  superadmin = "superadmin" 
}

export const roles: RoleType[] = Object.values(RoleType)