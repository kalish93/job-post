import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Target, Shield, Rocket, Globe, Award } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-12 pb-24 px-4 bg-background">
      <div className="max-w-5xl mx-auto space-y-24">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <Badge variant="secondary" className="px-4 py-1.5 text-secondary font-semibold bg-secondary/10">
            About JobConnect
          </Badge>
          <h1 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
            Bridging the Gap Between <br />
            <span className="text-primary">Talent and Opportunity</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Founded in 2024, JobConnect is Ethiopia's premier digital career platform. We are dedicated to modernizing
            the recruitment landscape through innovation, transparency, and trust.
          </p>
        </section>

        {/* Vision/Mission Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-border/50 shadow-xl bg-primary text-primary-foreground overflow-hidden group">
            <CardContent className="p-8 space-y-4 relative">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                <Target className="w-24 h-24" />
              </div>
              <h2 className="font-display text-3xl font-bold">Our Mission</h2>
              <p className="text-primary-foreground/80 text-lg leading-relaxed">
                To empower every professional in Ethiopia with accessible career opportunities and to provide employers
                with a streamlined, data-driven hiring experience.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-xl bg-card text-card-foreground overflow-hidden group">
            <CardContent className="p-8 space-y-4 relative">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform text-primary">
                <Globe className="w-24 h-24" />
              </div>
              <h2 className="font-display text-3xl font-bold">Our Vision</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                To become the most trusted workforce ecosystem in East Africa, fostering economic growth through
                verified skills matching and professional development.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="font-display text-3xl font-bold">Our Core Values</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              These principles guide every decision we make and every feature we build.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: "Security First", desc: "We prioritize the safety and privacy of our users." },
              { icon: Award, title: "Excellence", desc: "We strive for the highest quality in every interaction." },
              { icon: Rocket, title: "Innovation", desc: "Continuously evolving our tools for a better experience." },
              { icon: Users, title: "Community", desc: "Building strong relationships between seekers and hirers." },
            ].map((value, i) => (
              <Card key={i} className="border-border/50 hover:shadow-lg transition-shadow bg-muted/30">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto text-primary">
                    <value.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team Section (Placeholder) */}
        <section className="bg-muted/50 rounded-3xl p-12 lg:p-16 text-center space-y-8">
          <h2 className="font-display text-3xl font-bold">Powered by Innovation</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our diverse team of engineers, designers, and recruitment specialists are working tirelessly to build the
            future of work in Ethiopia.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-16 h-16 rounded-full bg-border animate-pulse" />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
