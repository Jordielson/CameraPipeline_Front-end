import SidebarMenu from "../../components/SideBarMenu";

function Dashboard() {
  return (
    <>
      <div className="content">
        <SidebarMenu page="dashboard" />
        <div className="content-body">
          <nav className="navbar nav-camera">
            <div className="container-fluid">
              <a className="navbar-brand navbar-dark camera-title">Dashboard</a>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
