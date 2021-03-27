import {EventEmitter, Injectable} from '@angular/core';

declare var $: any;

@Injectable()
export class AppModals {
  private TEMPLATE = `<div id="{{id}}" class="modal fade" style="z-index: 1052">
                        <div class="modal-dialog">
                          <div class="modal-content {{classType}}">
                            <div class="modal-header">
                              <h4 class="modal-title">{{title}}</h4>
                              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span></button>
                            </div>
                            <div class="modal-body"></div>
                            <div class="modal-footer justify-content-between">
                              <button type="button" class="btn btn-light pull-left" data-dismiss="modal">Đóng</button>
                              <button id="typeBtn" type="button" class="btn {{btnPrimaryClass}} d-none" data-button-primary="true">{{valuePrimaryBtn}}</button>
                            </div>
                          </div>
                        </div>
                      </div>`;

  private confirmEvent: EventEmitter<boolean>;

  private currentPopupEl: any;
  private isConfirmPopup: boolean;
  private isDeletePopup: boolean;
  private confirmVal: boolean;

  info(message: string, title: string = 'Info') {
    this.showPopup('bg-info', title, message);
  }

  warn(message: string, title: string = 'Warn') {
    this.showPopup('bg-warning', title, message);
  }

  error(message: string, title: string = 'LỖI') {
    this.showPopup('bg-danger', title, message);
  }

  success(message: string, title: string = 'THÀNH CÔNG') {
    this.showPopup('bg-success', title, message);
  }

  confirm(message: string, title: string = 'XÁC NHẬN'): EventEmitter<boolean> {
    this.isDeletePopup = true;
    this.showPopup('modal-sm', title, message, true);
    this.confirmEvent = new EventEmitter<boolean>();
    this.confirmVal = false;
    return this.confirmEvent;
  }

  confirmUpdate(message: string, title: string = 'XÁC NHẬN'): EventEmitter<boolean> {
    this.isDeletePopup = false;
    this.showPopup('modal-sm', title, message, true);
    this.confirmEvent = new EventEmitter<boolean>();
    this.confirmVal = false;
    return this.confirmEvent;
  }

  private showPopup(cssClass: string, title: string, message: string, isConfirm: boolean = false) {
    this.isConfirmPopup = isConfirm;
    this.initPopup(cssClass, title, message);
    this.bindEvent();
  }

  private initPopup(cssClass: string, title: string, message: string) {
    const btnClass = this.isConfirmPopup ? 'btn-default' : 'btn-outline-light';
    const btnPrimaryClass = this.isDeletePopup ? 'btn-danger' : 'bg-success';
    const valuePrimaryBtn = this.isDeletePopup ? 'Xóa' : 'Đồng ý';
    const id = 'app_modal_' + new Date().getTime();
    const template = this.TEMPLATE.replace('{{classType}}', cssClass)
        .replace('{{id}}', id)
        .replace('{{title}}', title)
        .replace('{{btnClass}}', btnClass)
        .replace('{{btnPrimaryClass}}', btnPrimaryClass)
        .replace('{{valuePrimaryBtn}}', valuePrimaryBtn);

    $('body').append(template);
    this.currentPopupEl = $('#' + id);
    this.currentPopupEl.find('.modal-body').html(message);
    if (this.isConfirmPopup) {
      this.currentPopupEl.find('button.btn.d-none').removeClass('d-none');
    }

    this.currentPopupEl.modal('show');
    $('.modal-backdrop.fade.show').last().css('z-index', 1051);
  }

  private bindEvent(): void {
    // Bind all event when hiding modal
    this.currentPopupEl.on('hide.bs.modal', (e) => {
      if (this.isConfirmPopup) {
        this.confirmEvent.emit(this.confirmVal);
      }
    });

    this.currentPopupEl.on('hidden.bs.modal', (e) => {
      if ($('.modal.show').length) {
        $('body').addClass('modal-open');
      }
    });

    this.currentPopupEl.find('button[data-button-primary="true"]').on('click', () => {
      this.confirmVal = true;
      // Don't have to emit event, will be call on hide event that is defined above
      this.currentPopupEl.modal('hide');
    });
  }
}
