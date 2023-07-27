import GradgenBuilder from "../../components/GradgenPage/GradgenBuilder/GradgenBuilder";
import { ActiveTabContextProvider } from "../../context/ActiveTabContext";

function Gradgen() {
  return (
    <section>
      <ActiveTabContextProvider>
        <GradgenBuilder />
      </ActiveTabContextProvider>
    </section>
  );
}

export default Gradgen;
