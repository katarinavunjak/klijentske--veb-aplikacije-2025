import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UtilsService {
  constructor() {}

  formatDate(iso: string): string {
    return new Date(iso).toLocaleString('sr-RS', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  }

  formatPrice(price: number): string {
    return `${price} RSD`;
  }

  toYouTubeEmbed(url: string, useNoCookie = true): string | null {
    try {
      const u = new URL(url);
      const host = u.hostname.replace('www.', '');
      const base = useNoCookie ? 'https://www.youtube-nocookie.com' : 'https://www.youtube.com';

      const list = u.searchParams.get('list');
      if (list && (!u.searchParams.get('v') || u.pathname.includes('/playlist'))) {
        return `${base}/embed/videoseries?list=${list}`;
      }

      let id = '';
      if (u.searchParams.get('v')) id = u.searchParams.get('v')!;
      else if (host === 'youtu.be') id = u.pathname.slice(1);
      else if (u.pathname.startsWith('/shorts/')) id = u.pathname.split('/')[2];
      else if (u.pathname.startsWith('/embed/')) return url;

      if (!id) return null;

      const t = u.searchParams.get('t') || u.searchParams.get('start');
      const start = t ? this.parseYouTubeTimeToSeconds(t) : 0;

      return `${base}/embed/${id}${start ? `?start=${start}` : ''}`;
    } catch {
      return null;
    }
  }

  private parseYouTubeTimeToSeconds(t: string): number {
    const n = Number(t);
    if (!Number.isNaN(n)) return n;
    const m = /(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?/i.exec(t);
    if (!m) return 0;
    const h = Number(m[1] || 0), min = Number(m[2] || 0), s = Number(m[3] || 0);
    return h * 3600 + min * 60 + s;
  }
}

