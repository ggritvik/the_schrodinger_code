
import { useState } from "react";
import { Camera, Upload, Loader2, Shirt, FileImage } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const UploadForm = ({ onUploadComplete }: { onUploadComplete: (imageUrl: string, garmentType?: string) => void }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [garmentType, setGarmentType] = useState<string>("");
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleFileSelect = (file: File) => {
    if (file.type.startsWith('image/')) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPG, PNG, or WEBP)",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!image) return;
    
    setIsLoading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          return 95; // Caps at 95% until real processing completes
        }
        return prev + 5;
      });
    }, 150);
    
    // Show an informative toast about AI detection
    toast({
      title: garmentType ? "Processing Your Selection" : "AI Detection Active",
      description: garmentType 
        ? "Using your selected garment type for accurate recommendations"
        : "Our AI is analyzing your garment to identify its type and features",
      duration: 5000,
    });
    
    try {
      // Pass to parent component for processing with the manually selected type if available
      if (imagePreview) {
        await onUploadComplete(imagePreview, garmentType || undefined);
      }
    } catch (error) {
      console.error("Error during upload:", error);
      toast({
        title: "Upload Failed",
        description: "There was a problem processing your image",
        variant: "destructive" 
      });
    } finally {
      clearInterval(interval);
      setUploadProgress(100);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
      <div 
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
          isDragging 
            ? "border-terracotta-400 bg-terracotta-50" 
            : imagePreview 
              ? "border-sage-400 bg-sage-50" 
              : "border-forest-200 hover:border-forest-300 bg-white"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById("file-upload")?.click()}
      >
        {imagePreview ? (
          <div className="space-y-4">
            <img 
              src={imagePreview} 
              alt="Garment preview" 
              className="max-h-80 mx-auto rounded-lg shadow-sm"
            />
            <p className="text-sm text-forest-600">
              Click or drag to change image
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="mx-auto w-20 h-20 rounded-full bg-sage-100 flex items-center justify-center">
              <Shirt className="h-10 w-10 text-forest-600" />
            </div>
            <div className="space-y-2">
              <p className="text-lg font-medium text-forest-800">
                Upload Your Traditional or Modern Garment
              </p>
              <p className="text-sm text-forest-600 max-w-xs mx-auto">
                Our AI will analyze your garment to suggest creative upcycling ideas
              </p>
              <p className="text-xs text-forest-500">
                Supports JPG, PNG, WEBP (Max 10MB)
              </p>
              <div className="flex gap-2 justify-center mt-2 flex-wrap">
                <span className="text-xs px-2 py-1 rounded-full bg-sage-100 text-forest-700">T-shirt</span>
                <span className="text-xs px-2 py-1 rounded-full bg-sage-100 text-forest-700">Saree</span>
                <span className="text-xs px-2 py-1 rounded-full bg-sage-100 text-forest-700">Kurta</span>
                <span className="text-xs px-2 py-1 rounded-full bg-sage-100 text-forest-700">Lehenga</span>
                <span className="text-xs px-2 py-1 rounded-full bg-sage-100 text-forest-700">Denim</span>
                <span className="text-xs px-2 py-1 rounded-full bg-sage-100 text-forest-700">Shirt</span>
              </div>
            </div>
          </div>
        )}
        
        <Input 
          id="file-upload" 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      
      {imagePreview && (
        <div className="mt-6 space-y-4">
          <div>
            <Label htmlFor="garment-type" className="text-forest-700 font-semibold flex items-center justify-between">
              <span>Select Garment Type (Optional)</span>
              <span className="text-sm text-forest-500 font-normal">AI will auto-detect if left empty</span>
            </Label>
            <Select value={garmentType} onValueChange={setGarmentType}>
              <SelectTrigger className="mt-1 border-forest-200 focus:ring-terracotta-300">
                <SelectValue placeholder="Let AI detect or choose manually" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Let AI detect (recommended)</SelectItem>
                <SelectItem value="tshirt">T-shirt</SelectItem>
                <SelectItem value="shirt">Shirt</SelectItem>
                <SelectItem value="saree">Saree</SelectItem>
                <SelectItem value="kurta">Kurta</SelectItem>
                <SelectItem value="lehenga">Lehenga</SelectItem>
                <SelectItem value="salwar">Salwar Kameez</SelectItem>
                <SelectItem value="dhoti">Dhoti</SelectItem>
                <SelectItem value="denim">Denim/Jeans</SelectItem>
                <SelectItem value="dress">Dress</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-forest-500 mt-1">
              {garmentType ? "Manual selection will override AI detection" : "Our AI will attempt to identify your garment automatically"}
            </p>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-terracotta-600 hover:bg-terracotta-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                {garmentType ? "Processing..." : "AI Analyzing..."} {uploadProgress}%
              </>
            ) : (
              <>
                <FileImage className="mr-2 h-4 w-4" /> 
                {garmentType ? "Generate Ideas from Selected Type" : "Analyze & Generate Upcycling Ideas"}
              </>
            )}
          </Button>
        </div>
      )}
    </form>
  );
};

export default UploadForm;
