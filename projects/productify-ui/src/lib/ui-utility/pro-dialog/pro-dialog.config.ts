export class ProDialogConfig<D = any> {
    data?: D;
    position?: 'TOP' | 'BOTTOM' | 'RIGHT' | 'LEFT' | 'CENTER';
    background?: 'BLACK' | 'TRANSPARENT' = 'BLACK';
    closeOnOverlayClick?: true;
  }
  