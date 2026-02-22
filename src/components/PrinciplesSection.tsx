import { Shield, Users, Megaphone, Heart } from "lucide-react";

const principles = [
  {
    icon: Shield,
    title: "Direct Action",
    description:
      "We believe in taking matters into our own hands. No waiting for permission, no reliance on authority. Change happens when people act together.",
  },
  {
    icon: Users,
    title: "Mutual Aid",
    description:
      "Community care over charity. We build horizontal networks of support where everyone contributes and everyone benefits.",
  },
  {
    icon: Megaphone,
    title: "Anti-Hierarchy",
    description:
      "No leaders, no followers. Decisions are made collectively through consensus. Every voice carries equal weight.",
  },
  {
    icon: Heart,
    title: "Solidarity",
    description:
      "An injury to one is an injury to all. We stand with every struggle against oppression, exploitation, and domination.",
  },
];

const PrinciplesSection = () => {
  return (
    <section id="principles" className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-display text-foreground mb-4">
          OUR <span className="text-primary">PRINCIPLES</span>
        </h2>
        <div className="h-1 w-24 bg-primary mb-16" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {principles.map((p) => (
            <div
              key={p.title}
              className="border-2 border-foreground p-8 hover:border-primary transition-colors group"
            >
              <p.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-display text-foreground mb-3">{p.title}</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrinciplesSection;
