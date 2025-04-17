
import { useState } from "react";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import GalleryItem, { GalleryItemProps } from "@/components/gallery/GalleryItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, ArrowUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Gallery = () => {
  // Mock data for gallery items
  const galleryData: GalleryItemProps[] = [
    {
      id: 1,
      beforeImage: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=375&q=80",
      afterImage: "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=385&q=80",
      title: "Jeans to Stylish Tote Bag",
      creator: {
        name: "Sarah K.",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
      },
      likes: 243,
      comments: 18,
      daysAgo: 2,
      description: "Transformed my old worn-out jeans into this practical and fashionable tote bag. Perfect for grocery shopping and reducing plastic waste!"
    },
    {
      id: 2,
      beforeImage: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      afterImage: "https://yourdesignstore.s3.amazonaws.com/uploads/yds/productImages/thumb/167783564469961647006467622b5303cbf8dYDS_Product_92x.jpg",
      title: "T-Shirt to Chic Crop Top",
      creator: {
        name: "Alex M.",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      likes: 187,
      comments: 12,
      daysAgo: 5,
      description: "Gave new life to an old oversized t-shirt by transforming it into a trendy crop top with some simple cuts and stitches. No more fast fashion!"
    },
    {
      id: 3,
      beforeImage: "https://images.unsplash.com/photo-1558471461-f077b515d0b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
      afterImage: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
      title: "Old Dress to Modern Skirt",
      creator: {
        name: "Jamie T.",
        avatar: "https://randomuser.me/api/portraits/women/62.jpg"
      },
      likes: 315,
      comments: 27,
      daysAgo: 1,
      description: "This dress was too damaged on top, but I loved the fabric pattern. Turned it into a beautiful flowy skirt with an elastic waistband!"
    },
    {
      id: 4,
      beforeImage: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      afterImage: "https://images.unsplash.com/photo-1626497764746-6dc36546b388?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2026&q=80",
      title: "Button-up Shirt to Pillow Covers",
      creator: {
        name: "Morgan P.",
        avatar: "https://randomuser.me/api/portraits/women/89.jpg"
      },
      likes: 128,
      comments: 9,
      daysAgo: 7,
      description: "My husband's old shirts were too worn for donation, so I turned them into these adorable pillow covers. Great way to preserve sentimental clothing!"
    },
    {
      id: 5,
      beforeImage: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=725&q=80",
      afterImage: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
      title: "Sweater to Mittens and Hat",
      creator: {
        name: "Chris D.",
        avatar: "https://randomuser.me/api/portraits/men/52.jpg"
      },
      likes: 276,
      comments: 21,
      daysAgo: 3,
      description: "Used my old wool sweater to make these cozy winter accessories. The process was surprisingly simple and now I have matching mittens and a hat!"
    },
    {
      id: 6,
      beforeImage: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
      afterImage: "https://images.unsplash.com/photo-1619463071014-e6559951eacc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
      title: "Leather Jacket to Stylish Bag",
      creator: {
        name: "Taylor R.",
        avatar: "https://randomuser.me/api/portraits/men/22.jpg"
      },
      likes: 392,
      comments: 34,
      daysAgo: 0,
      description: "My vintage leather jacket was too damaged to wear, but the material was still beautiful. Repurposed it into this unique crossbody bag!"
    }
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "popular">("newest");

  // Filter gallery items based on search query
  const filteredItems = galleryData.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.creator.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort gallery items based on the selected order
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortOrder === "newest") {
      return a.daysAgo - b.daysAgo;
    } else {
      return b.likes - a.likes;
    }
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16 md:pt-20">
        <section className="py-12 bg-sage-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-display font-bold text-forest-800 mb-4">
                Community Gallery
              </h1>
              <p className="text-lg text-forest-600 max-w-2xl mx-auto">
                Get inspired by these incredible before-and-after transformations from our community of sustainable fashion enthusiasts
              </p>
            </div>
            
            {/* Search and filter controls */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-forest-500 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search transformations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white border-sage-200"
                />
              </div>
              
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="border-sage-200 text-forest-700">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white">
                    <DropdownMenuItem>All Transformations</DropdownMenuItem>
                    <DropdownMenuItem>Clothing to Accessories</DropdownMenuItem>
                    <DropdownMenuItem>Upcycled Clothes</DropdownMenuItem>
                    <DropdownMenuItem>Home Decor</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="border-sage-200 text-forest-700">
                      <ArrowUpDown className="h-4 w-4 mr-2" />
                      {sortOrder === "newest" ? "Newest" : "Most Popular"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white">
                    <DropdownMenuItem onClick={() => setSortOrder("newest")}>
                      Newest
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortOrder("popular")}>
                      Most Popular
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            {/* Gallery grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedItems.map((item, index) => (
                <div 
                  key={item.id} 
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <GalleryItem item={item} />
                </div>
              ))}
            </div>
            
            {/* Load more button */}
            <div className="text-center mt-12">
              <Button variant="outline" className="border-forest-600 text-forest-700 hover:bg-forest-50">
                Load More
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Gallery;
