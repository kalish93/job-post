import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Zap, Building2, Crown } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      icon: Zap,
      price: "0",
      description: "Ideal for small businesses or first-time hirers.",
      features: ["Post 1 Job per month", "Basic candidate matching", "Standard support", "CV summary views"],
      buttonText: "Get Started",
      buttonVariant: "outline" as const,
    },
    {
      name: "Professional",
      icon: Building2,
      price: "1,500",
      description: "For growing companies with consistent hiring needs.",
      features: [
        "Post up to 5 Jobs/month",
        "Advanced AI matching",
        "Priority email support",
        "Unlimited CV summary views",
        "Custom skill assessments",
      ],
      buttonText: "Upgrade to Pro",
      buttonVariant: "default" as const,
      popular: true,
    },
    {
      name: "Enterprise",
      icon: Crown,
      price: "Custom",
      description: "Customized solutions for large organizations.",
      features: [
        "Unlimited job postings",
        "Dedicated account manager",
        "API integration access",
        "Advanced recruitment analytics",
        "White-labeled testing platform",
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const,
    },
  ]

  return (
    <div className="min-h-screen pt-12 pb-24 px-4 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <section className="text-center space-y-6">
          <Badge variant="secondary" className="px-4 py-1.5 text-secondary font-semibold bg-secondary/10">
            Employer Pricing
          </Badge>
          <h1 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
            Transparent Pricing for <br />
            <span className="text-primary">Every Business Size</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your recruitment strategy. <br />
            <span className="font-bold text-foreground">Candidates always browse and apply for free.</span>
          </p>
        </section>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <Card
              key={i}
              className={`relative border-border/50 shadow-xl transition-all duration-300 hover:scale-[1.02] flex flex-col ${
                plan.popular ? "border-primary ring-2 ring-primary/20 bg-primary/5" : "bg-card"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1 shadow-lg font-bold">
                    Most Popular
                  </Badge>
                </div>
              )}
              <CardHeader className="space-y-4 pt-10">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${plan.popular ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                >
                  <plan.icon className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="font-display text-2xl">{plan.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
                </div>
                <div className="pt-2">
                  {plan.price === "Custom" ? (
                    <span className="text-4xl font-extrabold tracking-tight">Custom</span>
                  ) : (
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold tracking-tight">{plan.price}</span>
                      <span className="text-muted-foreground font-medium text-lg">ETB/mo</span>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-1 space-y-6 pt-6">
                <div className="space-y-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">What's included</p>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm">
                        <Check className="w-5 h-5 text-primary shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="pb-8">
                <Button asChild variant={plan.buttonVariant} className="w-full h-12 font-bold shadow-md">
                  <Link href={plan.price === "Custom" ? "/contact" : "/employer/register"}>{plan.buttonText}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* FAQ Teaser */}
        <section className="text-center pt-8">
          <p className="text-muted-foreground">
            Have questions about our enterprise solutions?{" "}
            <Link href="/contact" className="text-primary font-bold hover:underline">
              Talk to our team
            </Link>
          </p>
        </section>
      </div>
    </div>
  )
}
