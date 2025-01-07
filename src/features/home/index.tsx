import { HeaderLayout } from "@/features/layout";
import { Hero } from "./components";

export const Home = () => {
  return (
    <div className="h-full">
      <HeaderLayout />
      <Hero />
    </div>
  );
};
