import QRCode from 'qrcode';

export const shareService = {
  getWhatsAppShareUrl(message: string, url: string = window.location.href): string {
    const fullMessage = `${message} \n\n🔗 ${url}`;
    return `https://api.whatsapp.com/send?text=${encodeURIComponent(fullMessage)}`;
  },

  async shareNative(data: { title: string; text: string; url: string }): Promise<boolean> {
    if (navigator.share) {
      try {
        await navigator.share(data);
        return true;
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.warn('Share failed:', err);
        }
        return false;
      }
    }
    return false;
  },

  async copyToClipboard(text: string): Promise<boolean> {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        return successful;
      }
    } catch {
      return false;
    }
  },

  async generateQRCodeDataUrl(text: string): Promise<string> {
    try {
      return await QRCode.toDataURL(text, {
        width: 320,
        margin: 2,
        color: {
          dark: '#120508',
          light: '#FFF9EE'
        }
      });
    } catch (err) {
      console.error('Error generating QR code:', err);
      return '';
    }
  }
};
