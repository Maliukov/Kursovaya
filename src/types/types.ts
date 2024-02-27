export interface IUser {
  id: number;
  email: string;
  role: string;
  token: string;
}

export interface IUserData {
  // companyId: number;
  // companyName: string;
  email: string;
  password: string;
}

export interface IResponseUser {
  id: number,
  companyId: number;
  companyName: string;
  email: string;
  password: string;
  role: string;
  createAt: string,
  updateAt: string,
}

export interface IResponseUserData {
  token: string,
  user: IResponseUser,
}


export interface ISimpleData {
  id: number
  companyId: number
  name: string
  description: string
  createAt: string
  updateAt: string
}

export interface IWinTypeList extends ISimpleData {
  image: string
}

export interface IPriceList {
  id: number
  companyId: number
  name: string
  description: string
  createAt: string
  updateAt: string
  profSys: ISimpleData;
  furnSys: ISimpleData;
  glassSys: ISimpleData;
  winType: IWinTypeList;
  price: number; 
}

export interface IFilterParam {
  winTypeId: number;
  proSysId: number;
  furnSysId: number;
  glassId: number;
}

export enum EnumRole {
  SUPERADMIN = 'Superadmin',
  ADMIN = 'Admin',
  USER = 'User',
}

// export interface IData {
//   profData: IProfSysList[]
//   furnData: IFurnSysList[]
//   glassData: IGlassList[]
//   winTypeData: IWinTypeList[]
// }
