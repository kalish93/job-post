import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, MessageSquare, Clock, Globe } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-12 pb-24 px-4 bg-background">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <section className="text-center space-y-6">
          <Badge variant="secondary" className="px-4 py-1.5 text-secondary font-semibold bg-secondary/10">
            Contact Us
          </Badge>
          <h1 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
            We're Here to <span className="text-primary">Help You</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you're a job seeker with questions or an employer looking to scale your hiring, we'd love to hear
            from you.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Details */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-border/50 shadow-lg bg-card overflow-hidden">
              <CardContent className="p-8 space-y-8">
                <div className="space-y-6">
                  <h3 className="font-display text-xl font-bold">Contact Information</h3>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-sm uppercase text-muted-foreground tracking-wider mb-1">Email</p>
                      <p className="text-foreground font-medium">support@jobconnect.et</p>
                      <p className="text-foreground font-medium">hiring@jobconnect.et</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-sm uppercase text-muted-foreground tracking-wider mb-1">Phone</p>
                      <p className="text-foreground font-medium">+251 11 123 4567</p>
                      <p className="text-foreground font-medium">+251 91 234 5678</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-sm uppercase text-muted-foreground tracking-wider mb-1">Office</p>
                      <p className="text-foreground font-medium">Bole Road, Mega Building</p>
                      <p className="text-foreground font-medium">Addis Ababa, Ethiopia</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>Open: Mon - Fri, 8:30 AM - 5:30 PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-lg bg-primary text-primary-foreground overflow-hidden">
              <CardContent className="p-8 space-y-4">
                <Globe className="w-12 h-12 opacity-50 mb-2" />
                <h3 className="font-display text-xl font-bold">Visit Our Help Center</h3>
                <p className="text-primary-foreground/80 text-sm">
                  Find answers to common questions about candidate profiles, job postings, and more.
                </p>
                <Button variant="secondary" className="w-full font-bold">
                  Browse FAQs
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-border/50 shadow-xl bg-card">
              <CardContent className="p-8 space-y-8">
                <div className="space-y-2">
                  <h3 className="font-display text-2xl font-bold">Send us a message</h3>
                  <p className="text-muted-foreground">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                </div>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" placeholder="John" className="bg-muted/30 border-none h-12" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" placeholder="Doe" className="bg-muted/30 border-none h-12" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className="bg-muted/30 border-none h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="How can we help?" className="bg-muted/30 border-none h-12" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Your message here..."
                      className="bg-muted/30 border-none min-h-[150px] resize-none"
                    />
                  </div>

                  <Button type="submit" className="w-full h-12 font-bold shadow-lg">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
