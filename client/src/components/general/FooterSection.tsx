import {
  BookOpen,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  X,
} from "lucide-react";
import { Button } from "../ui/button";

const FooterSection = () => {
  return (
    <footer className="bg-muted/30 border-t border-border/50 w-full pt-16 pb-8">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            <div className="space-y-5">
              <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                DevInsight
              </h3>
              <p className="text-sm text-muted-foreground">
                The ultimate resource for web developers staying ahead of the
                curve with cutting-edge content and insights.
              </p>
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-full"
                >
                  <X className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-full"
                >
                  <Github className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-full"
                >
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-full"
                >
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Resources Section */}
            <div className="space-y-5">
              <h4 className="font-medium text-lg">Resources</h4>
              <ul className="space-y-3">
                {["Articles", "Guides", "Tutorials", "Documentation"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 group"
                      >
                        <span>{item}</span>
                        <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Company Section */}
            <div className="space-y-5">
              <h4 className="font-medium text-lg">Company</h4>
              <ul className="space-y-3">
                {["About Us", "Careers", "Contact", "Press"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 group"
                    >
                      <span>{item}</span>
                      <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Section */}
            <div className="space-y-5">
              <h4 className="font-medium text-lg">Legal</h4>
              <ul className="space-y-3">
                {[
                  "Privacy Policy",
                  "Terms of Service",
                  "Cookie Policy",
                  "GDPR",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 group"
                    >
                      <span>{item}</span>
                      <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-border/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground order-2 md:order-1 mt-4 md:mt-0">
              © {new Date().getFullYear()} DevInsight. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 order-1 md:order-2">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Contact
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
              >
                <BookOpen className="h-3 w-3" />
                <span>Sitemap</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
