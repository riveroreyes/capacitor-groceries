import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, FilesystemDirectory } from '@capacitor/filesystem';
import { Receipt } from '../models/receipt.model';

@Injectable({ providedIn: 'root' })
export class CameraService {
  async takePhoto(): Promise<Receipt> {
    const image = await Camera.getPhoto({
      quality: 60,
      width: 1024,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    });
    const fileName = `receipt_${Date.now()}.jpeg`;

    if (image.base64String) {
      const saved = await Filesystem.writeFile({
        path: fileName,
        data: image.base64String,
        directory: FilesystemDirectory.Data
      });
      return {
        id: crypto.randomUUID(),
        fileUri: saved.uri,
        capturedAt: Date.now()
      };
    } else {
      throw new Error('No image data');
    }
  }
}
