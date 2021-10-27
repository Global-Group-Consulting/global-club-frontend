export interface Attachment {
  id: string;
  fileName: string;
  size: number;
  mimetype: string;
}

export interface NewAttachmentFile {
  url: string;
  file: File;
}
