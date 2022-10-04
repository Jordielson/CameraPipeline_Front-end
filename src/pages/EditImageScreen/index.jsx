import EditComponent from "../../components/EditComponent";
import SidebarMenu from "../../components/SideBarMenu";

function EditImageScreen() {
  return (
    <div className="content">
      <SidebarMenu page={"edicao"} />
      <div className="content-body">
        <EditComponent type="imagem" format="image/png,image/jpeg" />
      </div>
    </div>
  );
}

export default EditImageScreen;
