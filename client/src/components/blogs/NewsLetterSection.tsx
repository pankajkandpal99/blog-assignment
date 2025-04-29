import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { AnimatedContainer } from "./AnimatedContainer";

const NewsLetterSection = () => {
  return (
    <AnimatedContainer delay={0.6}>
      <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 md:p-12 border border-border/50">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            Stay Updated with DevInsight
          </h2>
          <p className="text-muted-foreground">
            Subscribe to our newsletter to receive the latest articles,
            tutorials, and development insights directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="rounded-full h-12"
            />
            <Button size="lg" className="rounded-full px-6">
              Subscribe
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            By subscribing, you agree to our terms and privacy policy. You can
            unsubscribe at any time.
          </p>
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default NewsLetterSection;
