
import { UpcyclingIdea } from './types';

// Mock ideas matched to garment types
export const garmentToIdeas: Record<string, UpcyclingIdea[]> = {
  "denim": [
    {
      id: 1,
      title: "Denim Potli Bag",
      description: "Transform your old jeans into a traditional Indian Potli bag with colorful drawstrings and mirror work for festivals and weddings.",
      difficulty: "Medium",
      timeNeeded: "3-4 hours",
      materials: ["Old jeans", "Colorful drawstring cord", "Mirror embellishments", "Needle & thread"],
      beforeImage: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=375&q=80",
      afterImage: "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=385&q=80"
    },
    {
      id: 2,
      title: "Denim Cushion Covers",
      description: "Create stylish cushion covers with block printing or embroidery inspired by traditional Indian patterns.",
      difficulty: "Easy",
      timeNeeded: "2 hours",
      materials: ["Old jeans", "Scissors", "Needle & thread", "Block printing materials (optional)"],
      beforeImage: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=375&q=80",
      afterImage: "https://images.unsplash.com/photo-1633789242441-8a7916d43c0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
    },
    {
      id: 3,
      title: "Kolhapuri-Style Denim Sandals",
      description: "Upcycle your jeans into uniquely Indian Kolhapuri-inspired sandals with leather accents.",
      difficulty: "Hard",
      timeNeeded: "5-6 hours",
      materials: ["Old jeans", "Leather pieces", "Rubber sole", "Strong adhesive", "Decorative beads"],
      beforeImage: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=375&q=80",
      afterImage: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
    }
  ],
  "tshirt": [
    {
      id: 4,
      title: "T-shirt Tote with Bandhani",
      description: "Transform your old t-shirt into a reusable tote with traditional Bandhani tie-dye patterns for an eco-friendly shopping bag.",
      difficulty: "Easy",
      timeNeeded: "1-2 hours",
      materials: ["Old t-shirt", "Scissors", "Fabric dye", "String for tie-dye"],
      beforeImage: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      afterImage: "https://images.unsplash.com/photo-1622434641406-a158123450f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=404&q=80"
    },
    {
      id: 5,
      title: "Kalamkari Embellished Crop Top",
      description: "Convert your t-shirt into a trendy crop top with hand-painted Kalamkari-inspired designs or fabric patches.",
      difficulty: "Medium",
      timeNeeded: "3 hours",
      materials: ["Old t-shirt", "Fabric paint/Kalamkari patches", "Scissors", "Thread & needle"],
      beforeImage: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      afterImage: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
    },
    {
      id: 12,
      title: "T-shirt Wall Hanging",
      description: "Transform your old t-shirt into a beautiful wall hanging with traditional Indian embroidery or block printing.",
      difficulty: "Medium",
      timeNeeded: "3-4 hours",
      materials: ["Old t-shirt", "Embroidery hoop", "Embroidery thread", "Needle", "Decorative beads/buttons"],
      beforeImage: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      afterImage: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
    },
    {
      id: 13,
      title: "T-shirt Yoga Headband",
      description: "Create comfortable yoga headbands from old t-shirts - perfect for your morning yoga sessions.",
      difficulty: "Easy",
      timeNeeded: "30 minutes",
      materials: ["Old t-shirt", "Scissors", "Measuring tape"],
      beforeImage: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      afterImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80"
    },
    {
      id: 14,
      title: "T-shirt Infinity Scarf",
      description: "Create a stylish infinity scarf with Indian-inspired beadwork or embellishments from your old t-shirt.",
      difficulty: "Easy",
      timeNeeded: "1 hour",
      materials: ["Old t-shirt", "Scissors", "Beads (optional)", "Needle & thread (optional)"],
      beforeImage: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      afterImage: "https://images.unsplash.com/photo-1520756086339-d3703aba6cc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
    },
    {
      id: 15,
      title: "Indian-Style Patchwork Cushion",
      description: "Create a colorful patchwork cushion using pieces from multiple old t-shirts with traditional Indian motifs.",
      difficulty: "Medium",
      timeNeeded: "3 hours",
      materials: ["Old t-shirts (multiple colors)", "Scissors", "Needle & thread", "Cushion stuffing"],
      beforeImage: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      afterImage: "https://images.unsplash.com/photo-1533090368676-1fd25485db88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80"
    }
  ],
  "dress": [
    {
      id: 6,
      title: "Kurtis from Western Dress",
      description: "Transform your western dress into one or more stylish kurtis with Indian embellishments and detailing.",
      difficulty: "Medium",
      timeNeeded: "4 hours",
      materials: ["Old dress", "Decorative lace", "Thread & needle", "Fabric scissors"],
      beforeImage: "https://images.unsplash.com/photo-1558471461-f077415d6dcc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
      afterImage: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
    }
  ],
  "shirt": [
    {
      id: 7,
      title: "Modi Jacket from Old Shirt",
      description: "Convert your formal shirt into a stylish Modi/Nehru jacket by altering the collar and adding traditional closures.",
      difficulty: "Hard",
      timeNeeded: "5 hours",
      materials: ["Old shirt", "Extra fabric for lining", "Thread & needle", "Traditional buttons"],
      beforeImage: "https://images.unsplash.com/photo-1558471461-f077415d6dcc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
      afterImage: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80"
    }
  ],
  "saree": [
    {
      id: 8,
      title: "Saree Tote Bags",
      description: "Convert old silk sarees into beautiful, durable tote bags with minimal stitching.",
      difficulty: "Easy",
      timeNeeded: "2 hours",
      materials: ["Old saree", "Scissors", "Sewing machine", "Lining fabric"],
      beforeImage: "https://images.unsplash.com/photo-1610189351945-f7a262702eda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
      afterImage: "https://images.unsplash.com/photo-1605518200282-7aaa6199e3b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
    },
    {
      id: 9,
      title: "Saree Kurta Set",
      description: "Transform an old saree into a modern kurta-palazzo set perfect for festivals or casual outings.",
      difficulty: "Hard",
      timeNeeded: "8 hours",
      materials: ["Old saree", "Scissors", "Sewing machine", "Thread", "Lining fabric"],
      beforeImage: "https://images.unsplash.com/photo-1610189351945-f7a262702eda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
      afterImage: "https://images.unsplash.com/photo-1580465446361-8aaa7f5ec0b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
    }
  ],
  "kurta": [
    {
      id: 10,
      title: "Upcycled Kurta Pillows",
      description: "Turn an old kurta with beautiful embroidery into decorative pillows for your home.",
      difficulty: "Easy",
      timeNeeded: "1-2 hours",
      materials: ["Old kurta", "Scissors", "Needle & thread", "Pillow stuffing"],
      beforeImage: "https://images.unsplash.com/photo-1606791100018-3fb86efd72e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
      afterImage: "https://images.unsplash.com/photo-1633789242441-8a7916d43c0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
    }
  ],
  "default": [
    {
      id: 11,
      title: "Fabric Jewelry with Indian Elements",
      description: "Create necklaces, bracelets or earrings using fabric scraps and traditional beads or mirror work.",
      difficulty: "Easy",
      timeNeeded: "1 hour",
      materials: ["Fabric scraps", "Beads", "Thread", "Jewelry findings"],
      beforeImage: "https://images.unsplash.com/photo-1558471461-f077415d6dcc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
      afterImage: "https://images.unsplash.com/photo-1619463071014-e6559951eacc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
    }
  ]
};
