
import { useState } from "react";
import { MapPin, Star, MessageSquare, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export interface TailorType {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  reviews: number;
  specialties: string[];
  location: string;
  distance: string;
  description: string;
  transformations: number;
  hourlyRate: string;
  portfolio: string[];
}

interface TailorCardProps {
  tailor: TailorType;
}

const TailorCard = ({ tailor }: TailorCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-sage-100 hover:shadow-md transition-shadow">
      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-sage-200">
            <img src={tailor.avatar} alt={tailor.name} className="w-full h-full object-cover" />
          </div>
          
          {/* Info */}
          <div className="flex-grow">
            <h3 className="font-display text-xl font-semibold text-forest-800 mb-1">
              {tailor.name}
            </h3>
            
            <div className="flex items-center mb-2">
              <div className="flex items-center mr-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(tailor.rating) 
                        ? "fill-yellow-400 text-yellow-400" 
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-1 text-sm text-forest-600">
                  {tailor.rating} ({tailor.reviews})
                </span>
              </div>
              
              <div className="flex items-center text-sm text-forest-600">
                <MapPin className="h-3.5 w-3.5 mr-1" />
                {tailor.distance} away
              </div>
            </div>
            
            <p className="text-sm text-forest-600 line-clamp-2 mb-3">
              {tailor.description}
            </p>
            
            <div className="flex flex-wrap gap-1.5 mb-2">
              {tailor.specialties.map((specialty, index) => (
                <span 
                  key={index} 
                  className="text-xs px-2 py-0.5 bg-sage-100 text-forest-700 rounded-full"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-center border-t border-sage-100 pt-3 mt-3">
          <div className="flex items-center text-sm text-forest-600 mb-2 sm:mb-0">
            <span className="font-medium text-forest-800">{tailor.hourlyRate}</span>
            <span className="mx-2">•</span>
            <span>{tailor.transformations} transformations</span>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="default" className="bg-terracotta-600 hover:bg-terracotta-700 text-white">
                View Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white max-w-3xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-display font-semibold text-forest-800">
                  {tailor.name}
                </DialogTitle>
                <DialogDescription className="text-forest-600">
                  Sustainable fashion specialist based in {tailor.location}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 py-4">
                {/* Left column: Info */}
                <div className="md:col-span-2 space-y-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src={tailor.avatar} 
                      alt={tailor.name} 
                      className="w-20 h-20 rounded-full object-cover border-2 border-sage-200" 
                    />
                    <div>
                      <div className="flex items-center mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(tailor.rating) 
                                ? "fill-yellow-400 text-yellow-400" 
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-forest-600">
                        {tailor.reviews} reviews • {tailor.transformations} transformations
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-forest-800 mb-1">About</h4>
                    <p className="text-sm text-forest-600">
                      {tailor.description}
                      {" "}Specializing in sustainable fashion transformations with over 5 years of experience in creative garment reconstruction.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-forest-800 mb-1">Specialties</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {tailor.specialties.map((specialty, index) => (
                        <span 
                          key={index} 
                          className="text-xs px-2 py-0.5 bg-sage-100 text-forest-700 rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-forest-800 mb-1">Location</h4>
                    <p className="flex items-center text-sm text-forest-600">
                      <MapPin className="h-4 w-4 mr-1.5" />
                      {tailor.location} • {tailor.distance} from you
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-forest-800 mb-1">Rate</h4>
                    <p className="text-sm text-forest-600">
                      Starting at {tailor.hourlyRate} per project
                    </p>
                  </div>
                </div>
                
                {/* Right column: Portfolio */}
                <div className="md:col-span-3">
                  <h4 className="font-medium text-forest-800 mb-3">Portfolio</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {tailor.portfolio.map((image, index) => (
                      <div key={index} className="rounded-lg overflow-hidden">
                        <img 
                          src={image} 
                          alt={`Portfolio item ${index + 1}`}
                          className="w-full h-32 object-cover hover:opacity-90 transition-opacity cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <DialogFooter className="flex-col sm:flex-row gap-3">
                <Button className="flex-1 gap-2 bg-forest-700 hover:bg-forest-800 text-white">
                  <MessageSquare className="h-4 w-4" />
                  Message
                </Button>
                <Button className="flex-1 gap-2 bg-terracotta-600 hover:bg-terracotta-700 text-white">
                  <Calendar className="h-4 w-4" />
                  Book Consultation
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default TailorCard;
