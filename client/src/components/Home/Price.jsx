import { Title } from "../Title";

import PriceCard from "../PriceCard";

const Price = () => {
  return (
    <>
      <section
        className="price py-12 justify-center ml-10 mr-10 mt-14 md:ml-0 md:mr-0 md:mt-20  sm:mr-0 sm:mt-20 xs:ml-0 xs:mr-0 xs:mt-20 "
        id="pricing"
      >
        {" "}
        {/* Added md, sm, xs classes for margin adjustments */}
        <Title title="Pricing" subtitle="PricePlan" />
        <div className=" max-w-screen-md mx-auto grid md:grid-cols-2  p-10 ">
          <PriceCard />
        </div>
      </section>
    </>
  );
};

export default Price;
