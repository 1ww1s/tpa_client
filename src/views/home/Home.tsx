import { WhyChooseUs } from "@/src/entities/whyChooseUs";
import { MainSlider } from "@/src/widgets/mainSlider";
import { SeparatorHome } from "@/src/widgets/separator";
import OurProducts from "@/src/widgets/ourProducts";
import LatestDevelopments from "@/src/widgets/latestDevelopmentsHome";
import PartnersList from "@/src/widgets/partners";


export default async function Home() {

    return (
        <div>
            <MainSlider />
            <OurProducts />
            <SeparatorHome />
            <WhyChooseUs />
            <SeparatorHome />
            <LatestDevelopments />
            <PartnersList />
        </div>
    )
}