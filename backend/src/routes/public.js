import { Router } from "express";

const router = Router();

const stats = [
  { label: "Active Students", value: "500K+" },
  { label: "Learning Resources", value: "50K+" },
  { label: "Success Rate", value: "95%" },
  { label: "Languages Supported", value: "25+" },
];

const features = [
  {
    icon: "🤖",
    title: "AI Personalization",
    desc: "Adaptive learning paths that adjust to each student's pace and style.",
  },
  {
    icon: "📱",
    title: "Offline-First",
    desc: "Download lessons for offline access. Sync progress automatically.",
  },
  {
    icon: "🌐",
    title: "Multilingual Support",
    desc: "Learn in your native language.",
  },
  {
    icon: "👥",
    title: "Community Learning",
    desc: "Connect with peers & mentors.",
  },
  {
    icon: "📊",
    title: "Smart Analytics",
    desc: "Track progress & insights.",
  },
  {
    icon: "🎮",
    title: "Gamified Experience",
    desc: "Earn badges & rewards.",
  },
];

const benefits = [
  { icon: "🏫", title: "For Rural Students", desc: "Download content & learn offline." },
  { icon: "🏙️", title: "For Urban Students", desc: "Affordable AI-powered tools." },
  { icon: "👨‍🏫", title: "For Educators", desc: "Analytics dashboard." },
  { icon: "🏛️", title: "For Institutions", desc: "Scalable & flexible system." },
];

// Public APIs
router.get("/stats", (req, res) => res.json(stats));
router.get("/features", (req, res) => res.json(features));
router.get("/benefits", (req, res) => res.json(benefits));

export default router;
