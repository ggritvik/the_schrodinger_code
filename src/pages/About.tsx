
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  const teamMembers = [
    {
      name: "Alex Morgan",
      role: "Founder & CEO",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
      bio: "Former fashion designer who became passionate about sustainable practices after witnessing the industry's waste first-hand."
    },
    {
      name: "Marcus Chen",
      role: "CTO",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "AI expert with a background in computer vision and generative models, focused on creating technology that serves sustainability."
    },
    {
      name: "Sophia Patel",
      role: "Head of Sustainability",
      image: "https://randomuser.me/api/portraits/women/76.jpg",
      bio: "Environmental scientist specializing in textile recycling and circular economy practices in the fashion industry."
    }
  ];

  const milestones = [
    {
      year: "2022",
      title: "The Beginning",
      description: "Stitch It Forward was founded with a mission to reduce textile waste through innovative technology."
    },
    {
      year: "2023",
      title: "AI Integration",
      description: "Launched our proprietary AI model for analyzing garments and generating creative upcycling ideas."
    },
    {
      year: "2024",
      title: "Community Growth",
      description: "Reached 10,000 users and partnered with 200+ local tailors across the country."
    },
    {
      year: "2025",
      title: "Global Expansion",
      description: "Planning international expansion and developing advanced features for broader impact."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-sage-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-display font-bold text-forest-800 mb-6">
                Our Mission
              </h1>
              <p className="text-xl text-forest-700 mb-8">
                At Stitch It Forward, we're revolutionizing fashion sustainability by connecting technology, creativity, and community.
              </p>
              <div className="flex justify-center">
                <div className="w-20 h-1 bg-terracotta-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-forest-800 mb-6">
                  Our Vision
                </h2>
                <p className="text-forest-600 mb-4">
                  We envision a world where garments never end up in landfills, but instead are continuously transformed into new, beautiful pieces that tell a story.
                </p>
                <p className="text-forest-600 mb-6">
                  The fashion industry is one of the largest polluters globally, with millions of tons of clothing ending up in landfills each year. Our platform leverages AI technology to provide creative solutions for extending the lifecycle of clothing.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="mr-3 mt-1 bg-sage-100 rounded-full p-1">
                      <ArrowRight className="h-4 w-4 text-terracotta-600" />
                    </div>
                    <p className="text-forest-700">
                      <span className="font-semibold">Reduce Waste:</span> Every garment upcycled is one less in a landfill
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-3 mt-1 bg-sage-100 rounded-full p-1">
                      <ArrowRight className="h-4 w-4 text-terracotta-600" />
                    </div>
                    <p className="text-forest-700">
                      <span className="font-semibold">Support Local:</span> Connect with skilled artisans in your community
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-3 mt-1 bg-sage-100 rounded-full p-1">
                      <ArrowRight className="h-4 w-4 text-terracotta-600" />
                    </div>
                    <p className="text-forest-700">
                      <span className="font-semibold">Create Unique:</span> Transform old garments into one-of-a-kind pieces
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img 
                    src="https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80" 
                    alt="Sustainable fashion" 
                    className="rounded-lg h-40 w-full object-cover"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                    alt="Textile waste" 
                    className="rounded-lg h-56 w-full object-cover"
                  />
                </div>
                <div className="space-y-4 pt-8">
                  <img 
                    src="https://images.unsplash.com/photo-1594534475808-b18fc33b045e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80" 
                    alt="Upcycling process" 
                    className="rounded-lg h-56 w-full object-cover"
                  />
                  {/* <img 
                    src="https://images.unsplash.com/photo-1581929955373-8e41da644abb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                    alt="Sustainable community" 
                    className="rounded-lg h-40 w-full object-cover"
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        {/* <section className="py-16 bg-sage-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold text-forest-800 mb-4">
                Our Team
              </h2>
              <p className="text-lg text-forest-600 max-w-2xl mx-auto">
                Meet the passionate individuals driving our mission forward
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl overflow-hidden shadow-sm border border-sage-100 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-display font-semibold text-forest-800 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-terracotta-600 mb-4">
                      {member.role}
                    </p>
                    <p className="text-forest-600">
                      {member.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* History Timeline */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold text-forest-800 mb-4">
                Our Journey
              </h2>
              <p className="text-lg text-forest-600 max-w-2xl mx-auto">
                From idea to impact - the story of Stitch It Forward
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {milestones.map((milestone, index) => (
                <div 
                  key={index}
                  className="flex flex-col md:flex-row mb-12 last:mb-0 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="md:w-1/4 mb-4 md:mb-0">
                    <div className="bg-terracotta-100 text-terracotta-800 font-display text-2xl font-bold py-2 px-4 rounded-lg inline-block">
                      {milestone.year}
                    </div>
                  </div>
                  <div className="md:w-3/4 md:border-l-2 border-sage-200 md:pl-6 relative">
                    <div className="hidden md:block absolute w-3 h-3 bg-terracotta-500 rounded-full -left-[7px] top-3"></div>
                    <h3 className="text-xl font-display font-semibold text-forest-800 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-forest-600">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-sage-100">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-display font-bold text-forest-800 mb-4">
                Join Our Mission
              </h2>
              <p className="text-lg text-forest-600 mb-8">
                Be part of the fashion revolution. Upload your first garment today and start making a difference.
              </p>
              <Button 
                asChild
                className="bg-terracotta-600 hover:bg-terracotta-700 text-white text-lg px-8 py-6"
              >
                <Link to="/upload">
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
