import { Injectable, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class NotificationUtilService {
  confirmationService = inject(ConfirmationService);
  messageService = inject(MessageService);

  configDelete(title: string, message: string, onAccept: () => void, onReject?: () => void) {
    return this.confirmationService.confirm({
      acceptVisible: false,
      rejectVisible: false,
      closable: false,
      header: title,
      message: message,
      icon: 'bx bx-info-circle',

      accept: () => {
        onAccept();
      },
      reject: () => {
        if (onReject) {
          onReject();
        }
      },
    });
  }
}
