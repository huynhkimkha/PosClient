import {Injectable} from '@angular/core';

declare var $: any;

@Injectable()
export class AppLoading {
  private TEMPLATE = `<div style="z-index: 9999" data-app-loading class="overlay d-flex justify-content-center align-items-center">
                        <i class="fas fa-2x fa-sync fa-spin"></i>
                      </div>`;
  show(contentSelector: any = 'body') {
    if (contentSelector === undefined || contentSelector == null || contentSelector === '') {
      contentSelector = 'body';
    }

    $(contentSelector).addClass('overlay-wrapper');
    $(contentSelector).append(this.TEMPLATE);
  }

  hide(contentSelector: any = 'body') {
    if (contentSelector === undefined || contentSelector == null || contentSelector === '') {
      contentSelector = 'body';
    }
    $(contentSelector).find('[data-app-loading]').remove();
    $(contentSelector).removeClass('overlay-wrapper');
  }

  hideAll() {
    $(document).find('[data-app-loading]').remove();
    $(document).removeClass('overlay-wrapper');
  }
}
