
import { Footer } from "../../components/Footer"

import { Information } from "./Information"
import { MoreInfo } from "./MoreInfo"
import { PriceNav } from "./PriceNav"
import { Pricing } from "./Pricing"
import { Qualification } from "./Qualification"

export const PricePage = () => {
  return (
    <div  className="font-sans" >
     <PriceNav/>
        <Pricing />
        <Qualification/>
        <Information/>
        <MoreInfo/>
        <Footer/>
        
    </div>
  )
}
