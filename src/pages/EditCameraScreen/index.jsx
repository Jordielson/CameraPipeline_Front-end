import EditComponent from "../../components/EditComponent";
import SidebarMenu from "../../components/SideBarMenu";

function EditCameraScreen() {
  return (
    <div className="content">
      <SidebarMenu page={"edicao"} />
      <div className="content-body">
        <EditComponent type="camera" format="string/*" />
      </div>
    </div>
  );
}

export default EditCameraScreen;
