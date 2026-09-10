require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");

const Service = require("../models/Service");
const Project = require("../models/Project");
const TeamMember = require("../models/TeamMember");
const Testimonial = require("../models/Testimonial");
const BlogPost = require("../models/BlogPost");

const services = [
  {
    title: "Building Construction",
    description:
      "Turn your vision into reality with our expert commercial and residential building services, ensuring top-tier engineering standards.",
    icon: "building",
    order: 1,
  },
  {
    title: "Renovation",
    description:
      "Breathe new life into existing spaces. From layout changes to complete modernizations, we upgrade your structures flawlessly.",
    icon: "hammer",
    order: 2,
  },
  {
    title: "Civil Engineering",
    description:
      "Expertly managing complex infrastructure works. We handle massive ground-up structures with complete regulatory compliance.",
    icon: "ruler",
    order: 3,
  },
  {
    title: "Roofing",
    description:
      "Engineered roofing solutions designed to withstand extreme weather conditions, backed by durable industrial materials.",
    icon: "roof",
    order: 4,
  },
  {
    title: "Interior",
    description:
      "Comprehensive custom fit-outs combining premium materials and layout design to match modern, highly functional standards.",
    icon: "home",
    order: 5,
  },
  {
    title: "Electrical & Plumbing",
    description:
      "Full-scale mechanical engineering, heavy electrical infrastructure, and structural plumbing built to endure generations.",
    icon: "wrench",
    order: 6,
  },
];

const projects = [
  {
    title: "Seaside Residence",
    description:
      "A stunning modern waterfront estate featuring advanced steel framing and extreme-weather coastal resilience solutions.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
    status: "Completed",
    category: "Residential",
    order: 1,
  },
  {
    title: "Kandy Retail Plaza",
    description:
      "Multi-story complex development incorporating high-efficiency plumbing and structural commercial civil engineering.",
    image:
      "https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&w=900&q=80",
    status: "Ongoing",
    category: "Commercial",
    order: 2,
  },
  {
    title: "Riverside Bridge Access Road",
    description:
      "Massive scale infrastructural development involving heavy concrete civil works and precise topographical surveying.",
    image:
      "https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?auto=format&fit=crop&w=900&q=80",
    status: "Upcoming",
    category: "Civil",
    order: 3,
  },
];

const team = [
  {
    name: "John Smith",
    role: "Founder & Principal Engineer",
    bio: "Over 25 years of civil engineering excellence. John founded Buildcore with a commitment to uncompromised construction quality.",
    photo:
      "https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&w=500&q=80",
    order: 1,
  },
  {
    name: "Emily Johnson",
    role: "Lead Architect",
    bio: "A visionary architect specializing in green, sustainable structural designs and advanced structural integration.",
    photo:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80",
    order: 2,
  },
  {
    name: "Michael Davis",
    role: "Head of Project Management",
    bio: "Master planner who keeps large-scale commercial and civil developments running precisely on time and exactly within budget margins.",
    photo:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=500&q=80",
    order: 3,
  },
];

const testimonials = [
  {
    quote:
      "Buildcore transformed our commercial site. Anushka's architectural plans and Sanjeewa's project tracking kept our commercial warehouse ahead of schedule. Truly elite work.",
    name: "Dilani Fernando",
    title: "Managing Director, Landmark Holdings",
    order: 1,
  },
  {
    quote:
      "We hired Buildcore for our home construction. They were entirely accountable from foundation to roofing handover. No hidden costs. On time. Built correctly.",
    name: "Ruwan Perera",
    title: "Residential Homeowner, Negombo",
    order: 2,
  },
];

const blog = [
  {
    title: "5 Questions to Ask Before You Hire a Contractor",
    excerpt:
      "Not all builders are built the same. Ensure your investment is safe by querying licensing, warranty programs, insurance coverage, and engineering credentials before any deposit is made.",
    category: "Featured Guide",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80",
    featured: true,
  },
  {
    title: "Cost Management in Modern Infrastructure Projects",
    excerpt:
      "Strategies for keeping large-scale civil projects on budget without compromising materials or safety standards.",
    category: "Finance",
  },
  {
    title: "Understanding Concrete Curing Times & Climate Impact",
    excerpt:
      "How humidity, heat, and material composition affect the strength and reliability of poured concrete structures.",
    category: "Engineering",
  },
  {
    title: "Safety Standard Protocols on Active High-Rise Sites",
    excerpt:
      "A look at the layered safety compliance procedures Buildcore enforces across every active vertical construction site.",
    category: "Compliance",
  },
];

const run = async () => {
  await connectDB();
  await Promise.all([
    Service.deleteMany({}),
    Project.deleteMany({}),
    TeamMember.deleteMany({}),
    Testimonial.deleteMany({}),
    BlogPost.deleteMany({}),
  ]);

  await Service.insertMany(services);
  await Project.insertMany(projects);
  await TeamMember.insertMany(team);
  await Testimonial.insertMany(testimonials);
  await BlogPost.insertMany(blog);

  console.log("Database seeded successfully.");
  mongoose.connection.close();
};

run().catch((err) => {
  console.error(err);
  mongoose.connection.close();
  process.exit(1);
});
