import { RouterPermissionMappingModel } from '../../data/data-components/router-permission-mapping.model';

export const USER_PERMISSION_CODE = {
  MANAGER: 'MANAGER',
  STAFF: 'STAFF'
};

export const ROUTER_USER_PERMISSION_MAPPER = [
  new RouterPermissionMappingModel({
    routerLink: '/',
    matchUrl: '',
    name: 'Trang Chủ',
    icon: 'fa-home',
    permissions: [USER_PERMISSION_CODE.MANAGER, USER_PERMISSION_CODE.STAFF],
    sort: 0,
    isMenu: false,
  }),
  new RouterPermissionMappingModel({
    routerLink: '/home',
    matchUrl: '',
    name: 'Trang Chủ',
    icon: 'fa-home',
    permissions: [USER_PERMISSION_CODE.MANAGER, USER_PERMISSION_CODE.STAFF],
    sort: 1,
    isMenu: true,
  }),
  new RouterPermissionMappingModel({
    routerLink: '/employee',
    matchUrl: '',
    name: 'Nhân viên',
    icon: 'fa-user-cog',
    permissions: [USER_PERMISSION_CODE.MANAGER],
    sort: 1,
    isMenu: true,
  }),
  new RouterPermissionMappingModel({
    routerLink: '/customer',
    matchUrl: '',
    name: 'Khách hàng',
    icon: 'fa-user',
    permissions: [USER_PERMISSION_CODE.MANAGER],
    sort: 1,
    isMenu: true,
  }),
  new RouterPermissionMappingModel({
    routerLink: '/agency',
    matchUrl: '',
    name: 'Chi nhánh',
    icon: 'fa-warehouse',
    permissions: [USER_PERMISSION_CODE.MANAGER],
    sort: 1,
    isMenu: true,
  }),
  new RouterPermissionMappingModel({
    routerLink: '/cost',
    matchUrl: '',
    name: 'Chi phí',
    icon: 'fa-box',
    permissions: [USER_PERMISSION_CODE.MANAGER, USER_PERMISSION_CODE.STAFF],
    sort: 1,
    isMenu: true,
  }),
];
