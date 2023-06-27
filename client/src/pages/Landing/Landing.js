import nt from "../../assets/the N-T Collection.svg";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    navigate("/register");
  };
  return (
    <main>
      <section data-testid="landing-section" className="flex flex-col h-screen content-center justify-center flex-wrap">
        <img src={nt} alt="company logo" className="landing-img"/>
        <button
          onClick={handleClick}
          className="w-1/3 h-10 mx-auto bg-teal-500 text-white"
        >
          Get Started!
        </button>
      </section>
      <aside></aside>
    </main>
  );
};

export default Landing;
