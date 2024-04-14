import Properties from "../components/Properties";
import { useComponentContext } from "../context/componentsContext";
import { renderProptiyFields } from "../utils/renderFields";

const PropertyPanel = () => {
  const { selectedComponent } = useComponentContext();
  return (
    <section className="w-3/12 flex overflow-scroll">
      {selectedComponent ? (
        <Properties
          component={selectedComponent}
          fields={renderProptiyFields(selectedComponent)}
        />
      ) : (
        <p className="my-auto text-center font-bold text-lg mx-10 text-dark">
          Select any component to edit it's Properties
        </p>
      )}
    </section>
  );
};

export default PropertyPanel;
