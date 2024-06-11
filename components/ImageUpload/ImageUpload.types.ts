export interface ImageData {
  name: string;
  file: File;
}

export interface ImageUploadProps {
  onImageSelected: (imageData: ImageData | null) => void;
  existingImageUrl?: string;
}
