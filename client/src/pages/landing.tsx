import { Target, FileSearch, BarChart3, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import heroImage from "@/assets/images/hero-abstract.png";

const features = [
  {
    icon: FileSearch,
    title: "AI Resume Parsing",
    description: "Upload your resume and our AI extracts your skills, experience, seniority level, and tools in seconds.",
  },
  {
    icon: BarChart3,
    title: "Brutally Honest Evaluations",
    description: "Get a hiring manager's unfiltered take on your fit. No sugarcoating, just evidence-based assessments.",
  },
  {
    icon: Clock,
    title: "Smart Follow-up Alerts",
    description: "Never let an application slip through the cracks. Automatic reminders for jobs that need attention.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary">
              <Target className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-base" data-testid="text-brand-name">Shortlist</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild data-testid="button-login-nav">
              <a href="/api/login">Sign In</a>
            </Button>
          </div>
        </div>
      </nav>

      <section className="relative pt-14 overflow-hidden">
        <div className="absolute inset-0 pt-14">
          <img
            src={heroImage}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-background" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="max-w-2xl">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Stop guessing.<br />Start knowing.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-white/80 leading-relaxed max-w-xl">
              Shortlist is your brutally honest AI job tracker. It tells you exactly where you stand,
              what's missing, and whether you should even bother applying.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="lg" asChild data-testid="button-get-started">
                <a href="/api/login">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="backdrop-blur-sm bg-white/10 text-white border-white/20" asChild>
                <a href="#features">See How It Works</a>
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/60">
              <span>Free to use</span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span>No credit card required</span>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
              Your unfair advantage in the job market
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Stop applying blindly. Get AI-powered insights that tell you the truth before you waste time.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="hover-elevate" data-testid={`card-feature-${feature.title.toLowerCase().replace(/\s+/g, "-")}`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary/10 mb-4">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 border-t">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-4">Ready to get honest about your job search?</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Sign up in seconds with your Google account or email. Your data stays private and secure.
          </p>
          <Button size="lg" asChild data-testid="button-cta-bottom">
            <a href="/api/login">
              Start Tracking Jobs
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
      </section>

      <footer className="border-t py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            <span>Shortlist</span>
          </div>
          <p>Brutally honest. Evidence-based.</p>
        </div>
      </footer>
    </div>
  );
}
