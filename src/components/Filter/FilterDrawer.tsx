import { useUrlState } from "../../hooks/useUrlState";
import SideModal from "../SideModal";

const FilterDrawer = () => {
  const { clearQueryParam, value } = useUrlState();
  const showFilter = !!value("filter");

  const handleClose = () => {
    clearQueryParam("filter");
  };

  return (
    <SideModal
      className="w-[500px] my-[10px] bg-white shadow-xl mr-[10px] rounded-[20px] text-white"
      show={showFilter}
      onClose={handleClose}
    >
      <section className="w-full h-full flex flex-col">
        <header className=""></header>
      </section>
    </SideModal>
  );
};

export default FilterDrawer;
