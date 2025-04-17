
import { useState } from "react";
import { Heart, MessageCircle, Share2 } from "lucide-react";

export interface GalleryItemProps {
  id: number;
  beforeImage: string;
  afterImage: string;
  title: string;
  creator: {
    name: string;
    avatar: string;
  };
  likes: number;
  comments: number;
  daysAgo: number;
  description: string;
}

const GalleryItem = ({ item }: { item: GalleryItemProps }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(item.likes);

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-sage-100">
      {/* Image section with before/after hover effect */}
      <div 
        className="relative w-full aspect-square cursor-pointer overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img 
          src={isHovered ? item.afterImage : item.beforeImage} 
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-forest-900/70 to-transparent p-3">
          <span className="text-white text-sm font-medium">
            {isHovered ? "After" : "Before"} Transformation
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="bg-terracotta-500 text-white text-xs py-1 px-2 rounded-full">
            Hover to see {isHovered ? "before" : "after"}
          </span>
        </div>
      </div>
      
      {/* Content section */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <img 
              src={item.creator.avatar} 
              alt={item.creator.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm font-medium text-forest-800">
              {item.creator.name}
            </span>
          </div>
          <span className="text-xs text-forest-500">
            {item.daysAgo === 0 ? "Today" : `${item.daysAgo} days ago`}
          </span>
        </div>
        
        <h3 className="font-display text-lg font-semibold text-forest-800 mb-2">
          {item.title}
        </h3>
        
        <p className="text-sm text-forest-600 mb-4 line-clamp-2">
          {item.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              className={`flex items-center space-x-1 ${isLiked ? 'text-terracotta-600' : 'text-forest-600 hover:text-terracotta-600'} transition-colors`}
              onClick={handleLike}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : 'fill-none'}`} />
              <span className="text-sm">{likeCount}</span>
            </button>
            
            <button className="flex items-center space-x-1 text-forest-600 hover:text-forest-800 transition-colors">
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm">{item.comments}</span>
            </button>
          </div>
          
          <button className="text-forest-600 hover:text-forest-800 transition-colors">
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GalleryItem;
