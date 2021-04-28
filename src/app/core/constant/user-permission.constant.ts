import { RouterPermissionMappingModel } from '../../data/data-components/router-permission-mapping.model';

export const USER_PERMISSION_CODE = {
  MANAGER: 'MANAGER',
  STAFF: 'STAFF'
};

export const ROUTER_USER_PERMISSION_MAPPER = [
  new RouterPermissionMappingModel({
    routerLink: '/',
    matchUrl: '',
    name: '',
    icon: 'fa-home',
    permissions: [USER_PERMISSION_CODE.MANAGER, USER_PERMISSION_CODE.STAFF],
    sort: 0,
    isMenu: false,
  }),
  new RouterPermissionMappingModel({
    routerLink: '/home',
    matchUrl: '',
    name: '',
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
    sort: 2,
    isMenu: true,
  }),
  new RouterPermissionMappingModel({
    routerLink: '/customer',
    matchUrl: '',
    name: 'Khách hàng',
    icon: 'fa-user',
    permissions: [USER_PERMISSION_CODE.MANAGER, USER_PERMISSION_CODE.STAFF],
    sort: 3,
    isMenu: true,
  }),
  new RouterPermissionMappingModel({
    routerLink: '/agency',
    matchUrl: '',
    name: 'Chi nhánh',
    icon: 'fa-warehouse',
    permissions: [USER_PERMISSION_CODE.MANAGER],
    sort: 4,
    isMenu: true,
  }),
  new RouterPermissionMappingModel({
    routerLink: '/category',
    matchUrl: '',
    name: 'Danh mục sản phẩm',
    icon: 'fa-pallet',
    permissions: [USER_PERMISSION_CODE.MANAGER],
    sort: 5,
    isMenu: true,
  }),
  new RouterPermissionMappingModel({
    routerLink: '/product',
    matchUrl: '',
    name: 'Sản phẩm',
    icon: 'fa-dolly-flatbed',
    permissions: [USER_PERMISSION_CODE.MANAGER],
    sort: 6,
    isMenu: true,
  }),
  new RouterPermissionMappingModel({
    routerLink: '/promotion',
    matchUrl: '',
    name: 'Giảm giá',
    icon: 'fa fa-clone',
    permissions: [USER_PERMISSION_CODE.MANAGER],
    sort: 7,
    isMenu: true,
  }),
  new RouterPermissionMappingModel({
    routerLink: '/material',
    matchUrl: '',
    name: 'Nguyên liệu',
    icon: 'fa-box',
    permissions: [USER_PERMISSION_CODE.MANAGER],
    sort: 8,
    isMenu: true,
  }),
  new RouterPermissionMappingModel({
    routerLink: '/inventory',
    matchUrl: '',
    name: 'Tồn kho',
    icon: 'fa-boxes',
    permissions: [USER_PERMISSION_CODE.MANAGER],
    sort: 9,
    isMenu: true,
  }),
  new RouterPermissionMappingModel({
    routerLink: '/cost-category',
    matchUrl: '',
    name: 'Danh mục chi phí',
    icon: 'fa-money-bill',
    permissions: [USER_PERMISSION_CODE.MANAGER],
    sort: 10,
    isMenu: true,
  }),
  new RouterPermissionMappingModel({
    routerLink: '/cost',
    matchUrl: '',
    name: 'Chi phí',
    icon: 'fa-money-bill',
    permissions: [USER_PERMISSION_CODE.MANAGER, USER_PERMISSION_CODE.STAFF],
    sort: 11,
    isMenu: true,
  }),
  new RouterPermissionMappingModel({
    routerLink: '/importing-material',
    matchUrl: '',
    name: 'Phiếu nhập NL',
    icon: 'fa-boxes',
    permissions: [USER_PERMISSION_CODE.MANAGER],
    sort: 12,
    isMenu: true,
  }),
  new RouterPermissionMappingModel({
    routerLink: '/bill',
    matchUrl: '',
    name: 'Hoá đơn',
    icon: 'fa-boxes',
    permissions: [USER_PERMISSION_CODE.MANAGER, USER_PERMISSION_CODE.STAFF],
    sort: 13,
    isMenu: true,
  }),
];
