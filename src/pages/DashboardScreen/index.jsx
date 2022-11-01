import SidebarMenu from "../../components/SideBarMenu";
import Styles from "./Styles.module.css";

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
          <div className={Styles.containergrid}>
            <div className={Styles.area2}> CHART</div>
            <div className={Styles.area1}> CHART</div>
            <div className={Styles.area3}>CHART </div>
            <div className={Styles.area4}>CHART </div>
            <div className={Styles.area5}>CHART </div>
            <div className={Styles.area6}>CHART </div>
            <div className={Styles.area7}>CHART </div>
            <div className={Styles.area8}>CHART </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
