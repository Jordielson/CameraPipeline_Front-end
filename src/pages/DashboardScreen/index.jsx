import { ConsumedPipelineChart } from "../../components/chartsComponents/ConsumedPipelineChart";
import { InternetChart } from "../../components/chartsComponents/InternetChart";
import { StorageChart } from "../../components/chartsComponents/StorageComponent";
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
            <div className={Styles.area2}>
              {" "}
              <ConsumedPipelineChart />
            </div>
            <div className={Styles.area1}> CT</div>
            <div className={Styles.area3}>CHART </div>
            <div className={Styles.area4}>
              <StorageChart />
            </div>
            <div className={Styles.area5}>C </div>
            <div className={Styles.area6}>
              <InternetChart />{" "}
            </div>
            <div className={Styles.area7}>CHART </div>
            <div className={Styles.area8}>CHART </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
