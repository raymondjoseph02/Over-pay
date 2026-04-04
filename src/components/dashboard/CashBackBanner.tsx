import CashBackImage from "../../assets/img/cash-back-banner.png";
import { ArrowNarrowRight } from "../../assets/svg/icons";
import { Button } from "../global-ui";
export const CashBackBanner = () => {
  return (
    <div
      style={{
        backgroundImage: `url('${CashBackImage}')`,
      }}
      className="py-6 px-5 rounded-xl bg-cover bg-center bg-no-repeat space-y-4 max-w-178.25 xl:p-8 md:space-y-6 w-full h-fit"
    >
      <div className="space-y-2">
        <p className="text-xl font-black leading-[135%] tracking-[0.2px] text-white md:text-2xl">
          Unlimited Cashback
        </p>
        <p className="text-xs md:text-sm md:max-w-none font-normal leading-[150%] tracking-[0.4px] text-white max-w-53">
          Instant 2% back on all your spend to your account
        </p>
      </div>
      <div className="w-fit">
        <Button variants="secondary">
          <span>Upgrade Now</span>
          <span className="">
            <ArrowNarrowRight />
          </span>
        </Button>
      </div>
    </div>
  );
};
