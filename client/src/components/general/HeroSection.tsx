import { motion } from "framer-motion";
import { SearchFilterProps } from "../../types";
import { AnimatedContainer } from "../blogs/AnimatedContainer";
import SearchFilter from "../blogs/SearchFilter";

interface HeroSectionProps extends SearchFilterProps {
  simplified?: boolean;
}

export const HeroSection = (props: HeroSectionProps) => {
  const { simplified = false, ...searchFilterProps } = props;

  return (
    <div className="text-center space-y-8 relative">
      <div className="absolute top-0 left-0 right-0 -z-10 overflow-hidden opacity-20">
        <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-primary/30 blur-3xl"></div>
        <div className="absolute top-16 -right-16 w-64 h-64 rounded-full bg-accent/30 blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10"
      >
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            DevInsight
          </span>
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
            Learn. Build. Grow.
          </span>
        </h1>

        <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
          Explore the latest insights on web development, design, and technology
          to elevate your skills and stay ahead in the industry.
        </p>
      </motion.div>

      {!simplified && (
        <AnimatedContainer delay={0.2}>
          <SearchFilter {...searchFilterProps} />
        </AnimatedContainer>
      )}
    </div>
  );
};
