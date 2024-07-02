import { Helmet } from "react-helmet-async";
import About from "../../Components/About/About";
import Banner from "../../Components/Banner/Banner";
import FeatureSection from "../../Components/FeaturedSection/FeatureSection";
import Newsletter from "../../Components/Newsletter/Newsletter";
import TeamSection from "../../Components/Team/TeamSection";
import Testimonials from "../../Components/Testimonials/Testimonials";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home | FitScheduler</title>
      </Helmet>
      <Banner />
      <FeatureSection />
      <TeamSection/>
      <Testimonials />
      <About/>
      <Newsletter />
    </div>
  );
};

export default Home;
