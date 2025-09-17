import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({ name: 'safe', standalone: true })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url: string | null | undefined): SafeResourceUrl {
    if (!url) return '' as unknown as SafeResourceUrl;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
