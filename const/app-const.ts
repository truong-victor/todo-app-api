export const textWhite = '#fff';

export enum ROLE {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export const PATH = {
  LOGIN: 'dang-nhap',
  REGISTER: 'dang-ky',
  FORGOT_PASSWORD: 'quen-mat-khau',
  PROFILE: 'thong-tin-ca-nhan',
  USER: 'user',
  ADMIN: 'admin',
  PRODUCT: 'san-pham',
  CART: 'gio-hang',
  ORDER: 'don-hang',
  WARRANTY: 'bao-hanh',
  CONFIRM_ACCOUNT: 'xac-nhan-tai-khoan',
};

export const TOKEN_KEY = process.env.TOKEN_KEY as string;
