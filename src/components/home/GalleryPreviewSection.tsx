
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const GalleryPreviewSection = () => {
  // Mock gallery items with Indian-specific upcycling projects
  const galleryItems = [
    {
      id: 1,
      beforeImage: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=375&q=80",
      afterImage: "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=385&q=80",
      title: "Denim to Potli Bag",
      creator: "Divya K.",
      likes: 243,
      location: "Mumbai"
    },
    {
      id: 2,
      beforeImage: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      afterImage: "https://images.unsplash.com/photo-1622434641406-a158123450f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=404&q=80",
      title: "T-Shirt to Bandhani Crop Top",
      creator: "Arjun R.",
      likes: 187,
      location: "Ahmedabad"
    },
    {
      id: 3,
      beforeImage: "https://images.unsplash.com/photo-1558471461-f077415d6dcc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
      afterImage: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
      title: "Western Dress to Anarkali",
      creator: "Meera S.",
      likes: 315,
      location: "Jaipur"
    }
  ];

  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-forest-800 mb-4">
            Community Transformations
          </h2>
          <p className="text-lg text-forest-600 max-w-3xl mx-auto">
            Get inspired by these amazing before-and-after upcycling projects from our Indian community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {galleryItems.map((item, index) => (
            <div 
              key={item.id} 
              className="bg-white rounded-xl overflow-hidden shadow-md border border-sage-100 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={hoveredItem === item.id ? item.afterImage : item.beforeImage} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 ease-in-out"
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-forest-900/60 to-transparent p-4">
                  <p className="text-white font-medium">
                    {hoveredItem === item.id ? "After" : "Before"}
                  </p>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-display text-lg font-semibold text-forest-800 mb-1">
                  {item.title}
                </h3>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-forest-600">
                    by {item.creator}
                  </p>
                  <span className="text-xs bg-sage-100 text-forest-700 px-2 py-0.5 rounded-full">
                    {item.location}
                  </span>
                </div>
                <div className="flex items-center text-sm text-forest-600">
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {item.likes}
                  </span>
                  <span className="ml-4 text-xs text-forest-500">
                    Hover to see transformation
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" className="border-forest-600 text-forest-700 hover:bg-forest-50">
            <Link to="/gallery">View Full Gallery</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GalleryPreviewSection;
