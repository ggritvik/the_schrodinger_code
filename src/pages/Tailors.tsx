
import { useState } from "react";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import TailorCard, { TailorType } from "@/components/tailors/TailorCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, SlidersHorizontal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const Tailors = () => {
  // Mock data for Indian tailors
  const tailors: TailorType[] = [
    {
      id: 1,
      name: "Rajesh Sharma",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg",
      rating: 4.9,
      reviews: 128,
      specialties: ["Salwar Suits", "Kurta Alterations", "Denim Upcycling"],
      location: "Mumbai, Maharashtra",
      distance: "1.2 km",
      description: "Third-generation traditional tailor with 20+ years experience specializing in both traditional Indian attire and modern upcycling techniques.",
      transformations: 214,
      hourlyRate: "₹500-800",
      portfolio: [
        "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=385&q=80",
        "https://images.unsplash.com/photo-1622434641406-a158123450f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=404&q=80",
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
        "https://images.unsplash.com/photo-1619463071014-e6559951eacc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
      ]
    },
    {
      id: 2,
      name: "Lakshmi Iyer",
      avatar: "https://randomuser.me/api/portraits/women/39.jpg",
      rating: 4.7,
      reviews: 86,
      specialties: ["Embroidery", "Saree Revival", "Blouse Design"],
      location: "Delhi, NCR",
      distance: "2.8 km",
      description: "Expert in traditional Indian embroidery techniques with a modern twist. Specializes in reviving old sarees and creating designer blouses from scrap fabrics.",
      transformations: 152,
      hourlyRate: "₹600-1000",
      portfolio: [
        "https://images.unsplash.com/photo-1619463071014-e6559951eacc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
        "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
        "https://images.unsplash.com/photo-1600271886742-f049cd451bba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
        "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=385&q=80"
      ]
    },
    {
      id: 3,
      name: "Amit Patel",
      avatar: "https://randomuser.me/api/portraits/men/23.jpg",
      rating: 4.8,
      reviews: 104,
      specialties: ["Bandhani", "Kutch Work", "Zero Waste"],
      location: "Ahmedabad, Gujarat",
      distance: "0.6 km",
      description: "Specializes in traditional Gujarat textile techniques like Bandhani and Kutch embroidery. Creates zero-waste upcycled garments using traditional craft methods.",
      transformations: 187,
      hourlyRate: "₹400-700",
      portfolio: [
        "https://images.unsplash.com/photo-1622434641406-a158123450f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=404&q=80",
        "https://images.unsplash.com/photo-1633789242441-8a7916d43c0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
        "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
      ]
    },
    {
      id: 4,
      name: "Priya Reddy",
      avatar: "https://randomuser.me/api/portraits/women/62.jpg",
      rating: 4.6,
      reviews: 72,
      specialties: ["Kalamkari", "Block Printing", "Eco Dyeing"],
      location: "Bengaluru, Karnataka",
      distance: "3.2 km",
      description: "Artisan specializing in Kalamkari painting and block printing on upcycled fabrics. Creates stunning eco-friendly garments using natural dyes.",
      transformations: 134,
      hourlyRate: "₹550-950",
      portfolio: [
        "https://images.unsplash.com/photo-1600271886742-f049cd451bba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
        "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=385&q=80",
        "https://images.unsplash.com/photo-1619463071014-e6559951eacc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
        "https://images.unsplash.com/photo-1622434641406-a158123450f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=404&q=80"
      ]
    }
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"rating" | "distance" | "price">("rating");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const allSpecialties = Array.from(
    new Set(tailors.flatMap(tailor => tailor.specialties))
  ).sort();

  // Filter tailors based on search query and filters
  const filteredTailors = tailors.filter(tailor => {
    // Search filter
    const matchesSearch = 
      tailor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tailor.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tailor.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Specialty filter
    const matchesSpecialties = 
      selectedSpecialties.length === 0 ||
      tailor.specialties.some(s => selectedSpecialties.includes(s));
    
    // Price filter (simplified for demo - in a real app we'd parse the price range properly)
    const minPrice = parseInt(tailor.hourlyRate.replace(/[^0-9]/g, ''));
    const matchesPrice = minPrice >= priceRange[0] && minPrice <= priceRange[1];
    
    return matchesSearch && matchesSpecialties && matchesPrice;
  });

  // Sort tailors based on selected sort order
  const sortedTailors = [...filteredTailors].sort((a, b) => {
    switch (sortOrder) {
      case "rating":
        return b.rating - a.rating;
      case "distance":
        return parseFloat(a.distance.split(" ")[0]) - parseFloat(b.distance.split(" ")[0]);
      case "price":
        return parseInt(a.hourlyRate.replace(/[^0-9]/g, '')) - parseInt(b.hourlyRate.replace(/[^0-9]/g, ''));
      default:
        return 0;
    }
  });

  const toggleSpecialty = (specialty: string) => {
    setSelectedSpecialties(prev => 
      prev.includes(specialty)
        ? prev.filter(s => s !== specialty)
        : [...prev, specialty]
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16 md:pt-20">
        <section className="py-12 bg-sage-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-display font-bold text-forest-800 mb-4">
                Find Local Indian Tailors & Artisans
              </h1>
              <p className="text-lg text-forest-600 max-w-2xl mx-auto">
                Connect with skilled professionals who blend traditional Indian techniques with modern upcycling
              </p>
            </div>
            
            {/* Search and filter controls */}
            <div className="bg-white p-4 rounded-xl shadow-sm mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Location input */}
                <div className="relative flex-grow">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-forest-500 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Your location..."
                    defaultValue="Mumbai, Maharashtra"
                    className="pl-10 border-sage-200"
                  />
                </div>
                
                {/* Search input */}
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-forest-500 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search specialties, names..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-sage-200"
                  />
                </div>
                
                {/* Sort select */}
                <div className="w-full md:w-48">
                  <Select 
                    value={sortOrder} 
                    onValueChange={(value) => setSortOrder(value as any)}
                  >
                    <SelectTrigger className="border-sage-200">
                      <SelectValue placeholder="Sort by..." />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectGroup>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                        <SelectItem value="distance">Closest</SelectItem>
                        <SelectItem value="price">Price: Low to High</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Filter button (mobile) */}
                <div className="md:hidden">
                  <Drawer>
                    <DrawerTrigger asChild>
                      <Button variant="outline" className="w-full border-sage-200 text-forest-700">
                        <SlidersHorizontal className="h-4 w-4 mr-2" />
                        Filters
                      </Button>
                    </DrawerTrigger>
                    <DrawerContent className="bg-white">
                      <DrawerHeader>
                        <DrawerTitle>Filter Tailors</DrawerTitle>
                        <DrawerDescription>Narrow down your search results</DrawerDescription>
                      </DrawerHeader>
                      <div className="p-4 space-y-6">
                        {/* Price Range */}
                        <div>
                          <h4 className="font-medium text-forest-700 mb-3">Price Range</h4>
                          <div className="px-2">
                            <Slider
                              defaultValue={[0, 100]}
                              max={100}
                              step={5}
                              value={priceRange}
                              onValueChange={setPriceRange}
                              className="mb-2"
                            />
                            <div className="flex justify-between text-sm text-forest-600">
                              <span>₹{priceRange[0] * 10}</span>
                              <span>₹{priceRange[1] * 10}+</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Specialties */}
                        <div>
                          <h4 className="font-medium text-forest-700 mb-3">Specialties</h4>
                          <div className="space-y-2">
                            {allSpecialties.map((specialty) => (
                              <div key={specialty} className="flex items-center">
                                <Checkbox
                                  id={`specialty-${specialty}`}
                                  checked={selectedSpecialties.includes(specialty)}
                                  onCheckedChange={() => toggleSpecialty(specialty)}
                                />
                                <Label
                                  htmlFor={`specialty-${specialty}`}
                                  className="ml-2 text-sm text-forest-600 cursor-pointer"
                                >
                                  {specialty}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <DrawerFooter>
                        <Button 
                          className="bg-terracotta-600 hover:bg-terracotta-700 text-white"
                          onClick={() => {}}
                        >
                          Apply Filters
                        </Button>
                        <DrawerClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Filters (desktop) */}
              <div className="hidden lg:block">
                <div className="bg-white p-5 rounded-xl shadow-sm">
                  <h3 className="text-lg font-display font-semibold text-forest-800 mb-4">
                    Filters
                  </h3>
                  
                  <Accordion type="single" collapsible className="space-y-2">
                    {/* Price Range */}
                    <AccordionItem value="price" className="border-sage-200">
                      <AccordionTrigger className="text-forest-700 hover:text-forest-900 py-2">
                        Price Range
                      </AccordionTrigger>
                      <AccordionContent className="pt-2">
                        <div className="px-2">
                          <Slider
                            defaultValue={[0, 100]}
                            max={100}
                            step={5}
                            value={priceRange}
                            onValueChange={setPriceRange}
                            className="mb-2"
                          />
                          <div className="flex justify-between text-sm text-forest-600">
                            <span>₹{priceRange[0] * 10}</span>
                            <span>₹{priceRange[1] * 10}+</span>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    {/* Specialties */}
                    <AccordionItem value="specialties" className="border-sage-200">
                      <AccordionTrigger className="text-forest-700 hover:text-forest-900 py-2">
                        Specialties
                      </AccordionTrigger>
                      <AccordionContent className="pt-2 space-y-2">
                        {allSpecialties.map((specialty) => (
                          <div key={specialty} className="flex items-center">
                            <Checkbox
                              id={`desktop-specialty-${specialty}`}
                              checked={selectedSpecialties.includes(specialty)}
                              onCheckedChange={() => toggleSpecialty(specialty)}
                            />
                            <Label
                              htmlFor={`desktop-specialty-${specialty}`}
                              className="ml-2 text-sm text-forest-600 cursor-pointer"
                            >
                              {specialty}
                            </Label>
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                    
                    {/* Distance */}
                    <AccordionItem value="distance" className="border-sage-200">
                      <AccordionTrigger className="text-forest-700 hover:text-forest-900 py-2">
                        Distance
                      </AccordionTrigger>
                      <AccordionContent className="pt-2">
                        <div className="space-y-2">
                          {["Within 1 km", "Within 5 km", "Within 10 km", "Any distance"].map((option) => (
                            <div key={option} className="flex items-center">
                              <Checkbox id={`distance-${option}`} />
                              <Label
                                htmlFor={`distance-${option}`}
                                className="ml-2 text-sm text-forest-600 cursor-pointer"
                              >
                                {option}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  
                  <Button 
                    className="w-full mt-6 bg-terracotta-600 hover:bg-terracotta-700 text-white"
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
              
              {/* Tailor listings */}
              <div className="lg:col-span-3 space-y-6">
                {sortedTailors.length === 0 ? (
                  <div className="bg-white p-8 rounded-xl text-center">
                    <h3 className="text-xl font-display font-semibold text-forest-800 mb-2">
                      No tailors found
                    </h3>
                    <p className="text-forest-600 mb-4">
                      Try adjusting your filters or search terms
                    </p>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedSpecialties([]);
                        setPriceRange([0, 100]);
                      }}
                    >
                      Reset All Filters
                    </Button>
                  </div>
                ) : (
                  sortedTailors.map((tailor, index) => (
                    <div 
                      key={tailor.id} 
                      className="animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <TailorCard tailor={tailor} />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Tailors;
