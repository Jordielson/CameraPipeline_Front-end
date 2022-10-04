import EditComponent from "../../components/EditComponent";
import SidebarMenu from "../../components/SideBarMenu";

function EditVideoScreen() {
  return (
    <div className="content">
      <SidebarMenu page={"edicao"} />
      <div className="content-body">
        <EditComponent type="video" format="video/*" />
      </div>
    </div>
  );
}

export default EditVideoScreen;
