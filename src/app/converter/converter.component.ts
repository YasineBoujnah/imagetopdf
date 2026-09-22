import { Component, NgZone } from '@angular/core';
import { jsPDF } from 'jspdf';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent {
  images: { url: SafeUrl; imgElement: HTMLImageElement; width: number; height: number; format: string }[] = [];

  constructor(private ngZone: NgZone, private sanitizer: DomSanitizer) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }

    const files = Array.from(input.files);
    let filesProcessed = 0;

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        const url = reader.result as string;
        const img = new Image();

        img.onload = () => {
          let format = 'JPEG';
          if (file.type.toLowerCase().includes('png') || file.name.toLowerCase().endsWith('.png')) {
            format = 'PNG';
          } else if (file.type.toLowerCase().includes('webp') || file.name.toLowerCase().endsWith('.webp')) {
            format = 'WEBP';
          }

          this.ngZone.run(() => {
            this.images.push({
              url: this.sanitizer.bypassSecurityTrustUrl(url), // Sanitize for Angular
              imgElement: img,
              width: img.naturalWidth || img.width || 500,
              height: img.naturalHeight || img.height || 500,
              format
            });

            filesProcessed++;
            if (filesProcessed === files.length) {
              input.value = '';
            }
          });
        };

        img.onerror = (err) => {
          console.error('Image load error on DataURL:', err);
          alert(`Could not process image: ${file.name}.\n\nThe browser successfully read the file, but it is not a valid image format or it is corrupted.`);
          filesProcessed++;
          if (filesProcessed === files.length) {
            input.value = '';
          }
        };

        img.src = url;
      };

      reader.onerror = (err) => {
        console.error('FileReader error:', reader.error);
        alert(`Could not read file: ${file.name}.\n\nIf this file is in a synced folder (like OneDrive or iCloud) or a ZIP archive, please extract/download it locally first.`);
        
        filesProcessed++;
        if (filesProcessed === files.length) {
          input.value = '';
        }
      };

      // We read as DataURL so Angular doesn't hit sanitized object URL issues easily.
      reader.readAsDataURL(file);
    });
  }

  generatePdf() {
    if (this.images.length === 0) {
      alert('Please select at least one image.');
      return;
    }

    try {
      const pdf = new jsPDF();

      this.images.forEach((imgData, index) => {
        if (index !== 0) {
          pdf.addPage();
        }

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const ratio = Math.min(pageWidth / imgData.width, pageHeight / imgData.height);
        const targetWidth = imgData.width * ratio;
        const targetHeight = imgData.height * ratio;

        const x = (pageWidth - targetWidth) / 2;
        const y = (pageHeight - targetHeight) / 2;

        try {
            pdf.addImage(imgData.imgElement, imgData.format, x, y, targetWidth, targetHeight);
        } catch(e) {
            console.error("jsPDF addImage error:", e);
            // fallback if direct image element fails for some reason
            pdf.addImage((imgData.imgElement as HTMLImageElement).src, imgData.format, x, y, targetWidth, targetHeight);
        }
      });

      pdf.save('images.pdf');
    } catch (err: any) {
      alert('Failed to generate PDF. Make sure your images are valid. Error: ' + err.message);
      console.error(err);
    }
  }

  removeImage(index: number) {
    this.images.splice(index, 1);
  }
}
