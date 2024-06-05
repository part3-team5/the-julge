export interface ImageData {
  name: string;
  imageUrl: string;
}

export interface ImageUploadProps {
  onImageSelected: (imageData: ImageData | null) => void;
}
