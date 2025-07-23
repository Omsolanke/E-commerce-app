import { SafeUrl } from "@angular/platform-browser";

export interface FileHandle {
type: any;
  file: File;
  url: SafeUrl;
}