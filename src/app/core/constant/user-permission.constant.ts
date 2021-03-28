import { RouterPermissionMappingModel } from '../../data/data-components/router-permission-mapping.model';

export const USER_PERMISSION_CODE = {
};

export const ROUTER_USER_PERMISSION_MAPPER = [
  new RouterPermissionMappingModel({
    routerLink: '/',
    matchUrl: '',
    name: 'Trang Chủ',
    icon: 'fa-home',
    permissions: [],
    sort: 0,
    isMenu: false,
  }),
  new RouterPermissionMappingModel({
    routerLink: '/home',
    matchUrl: '',
    name: 'Trang Chủ',
    icon: 'fa-home',
    permissions: [],
    sort: 1,
    isMenu: true,
  }),
  new RouterPermissionMappingModel({
    routerLink: '/employee',
    matchUrl: '',
    name: 'Nhân viên',
    icon: 'fa-user-cog',
    permissions: [],
    sort: 1,
    isMenu: true,
  }),
];
