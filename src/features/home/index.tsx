import { HeaderLayout } from "@/features/layout";
import { Button } from "primereact/button";
import { Image } from "primereact/image";

export const Home = () => {

  return (
    <div className="h-full">
      <HeaderLayout />
      <div className="grid grid-nogutter text-800 mt-8">
        <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center">
          <section>
            <span className="block text-6xl font-bold mb-1">
              Now you can withdraw
            </span>
            <div className="text-6xl text-primary font-bold mb-3">
              your blocked assets
            </div>
            <p className="mt-0 mb-4 text-700 line-height-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>

            <Button
              label="Withdraw"
              type="button"
              className="mr-3 p-button-raised"
            />
          </section>
        </div>
        <div className="col-12 md:col-6 overflow-hidden py-8">
          <Image
            src="/images/cryptowallet.png"
            alt="hero-1"
            className="md:ml-auto block md:h-fit"
            style={{
              clipPath: "polygon(8% 0, 100% 0%, 100% 100%, 0 100%)",
            }}
          />
        </div>
      </div>
    </div>
  );
};
