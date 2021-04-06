import {Component, AfterContentChecked, OnInit, AfterViewChecked, ElementRef, HostListener} from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserService } from '../../../core/services/agency/current-user.service';
import { ROUTER_USER_PERMISSION_MAPPER, USER_PERMISSION_CODE } from '../../../core/constant/user-permission.constant';
import { RouterPermissionMappingModel } from '../../../data/data-components/router-permission-mapping.model';

declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.components.css'],
})
export class NavbarComponent implements AfterContentChecked, OnInit, AfterViewChecked {
  constructor(
      private router: Router,
      private currentUserService: CurrentUserService,
      private root: ElementRef) {

  }

  public cashGroups: RouterPermissionMappingModel[] = [];
  public bankGroups: RouterPermissionMappingModel[] = [];
  public importGroups: RouterPermissionMappingModel[] = [];
  public exportGroups: RouterPermissionMappingModel[] = [];
  public warehouseGroups: RouterPermissionMappingModel[] = [];
  public employeeGroups: RouterPermissionMappingModel[] = [];
  public customerGroups: RouterPermissionMappingModel[] = [];
  public productGroups: RouterPermissionMappingModel[] = [];
  public reportGroups: RouterPermissionMappingModel[] = [];
  public systemGroups: RouterPermissionMappingModel[] = [];
  public importDataGroups: RouterPermissionMappingModel[] = [];
  public debtClearingDataGroups: RouterPermissionMappingModel[] = [];
  public commissionGroups: RouterPermissionMappingModel[] = [];

  private elementRf: any = null;

  ngOnInit(): void {
    this.collectData();
  }

  ngAfterContentChecked(): void {}

  public isActive(): boolean {
    return this.router.url === '/' || this.router.url === '/trang-chu';
  }

  ngAfterViewChecked(): void {
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(target) {
    const clickedInside = this.root.nativeElement.querySelector('.custom-main-menu').contains(target);
    const hasShow = $(target).hasClass('fa-bars');
    if (!clickedInside && !hasShow) {
      $(this.root.nativeElement.querySelector('.custom-main-menu')).removeClass('show');
    }
    if ($(window).width() <= 600) {
      const submenu = $(target).parent().children().eq(1);
      if (submenu.hasClass('submenu')) {
        $(this.root.nativeElement.querySelectorAll('.submenu')).css('display', 'none').removeClass('selected');
        submenu.addClass('selected');
        submenu.css('display', 'block');
      }
    }
  }

  public openMenu(event: any) {
    event.preventDefault();
    event.stopPropagation();
    if ($(window).width() <= 600) {
      $(this.root.nativeElement.querySelectorAll('.submenu')).css('display', 'none').removeClass('selected');
    }
    $(this.root.nativeElement.querySelector('.custom-main-menu')).toggleClass('show');
  }

  public showCommonMgt() {
    return this.employeeGroups.length > 0 || this.systemGroups.length > 0
        || this.importDataGroups.length > 0;
  }

  private collectData(): void {
    const permission = this.currentUserService.getPermissions();
    const mapper = this.getPermissionMapping(permission);
    if (permission === USER_PERMISSION_CODE.MANAGER) {
      this.cashGroups = this.cashGroups.concat(mapper);
    }
    if (permission === USER_PERMISSION_CODE.STAFF) {
      this.cashGroups = this.cashGroups.concat(mapper);
    }
    this.cashGroups.sort(this.sortItems);
    if ($(window).width() > 600) {
      $('a').addClass('nohover');
    }
  }

  private getPermissionMapping(permissionCode: string): RouterPermissionMappingModel[] {
    const result: RouterPermissionMappingModel[] = [];
    for (const item of ROUTER_USER_PERMISSION_MAPPER) {
      // find routes which match PermissionCode
      const ind = item.permissions.findIndex((value) => {
        return value === permissionCode;
      });

      // add to array if valid conditions
      if (item.isMenu && ind !== -1) {
        result.push(new RouterPermissionMappingModel(item));
      }
    }

    return result;
  }

  private sortItems(a: RouterPermissionMappingModel, b: RouterPermissionMappingModel): number {
    if (a.sort < b.sort) {
      return -1;
    }
    if (a.sort > b.sort) {
      return 1;
    }
    return 0;
  }
}
