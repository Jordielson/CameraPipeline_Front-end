import { ConsumedPipelineChart } from "../../components/chartsComponents/ConsumedPipelineChart";
import { CurrentUsageChart } from "../../components/chartsComponents/CurrentUsageChart";
import { InternetChart } from "../../components/chartsComponents/InternetChart";
import { ProcessByPipelineChart } from "../../components/chartsComponents/ProcessByPipeline";
import { StorageChart } from "../../components/chartsComponents/StorageComponent";
import { ConsumedAPIChart } from "../../components/chartsComponents/ConsumedAPIChart";
import { ConsumedAPIAreaChart } from "../../components/chartsComponents/ConsumedAPIAreaChart";
import { HistoryConsumedPipelineChart } from "../../components/chartsComponents/HistoryConsumedPipelineChart";
import { ConsumedAPILineChart } from "../../components/chartsComponents/ConsumedAPILineChart";
import { PipelinesCreated } from "../../components/chartsComponents/PipelinesCreatedPerPeriodChart";
import { PipelinesActive } from "../../components/chartsComponents/PipelineActive";
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
              <a className="navbar-brand navbar-dark camera-title mx-2">
                Dashboard
              </a>
            </div>
          </nav>
          <div className={Styles.containergrid}>
            <div className={Styles.area2}>
              {" "}
              <ConsumedPipelineChart />
            </div>
            <div className={Styles.area1}><PipelinesActive /></div>
            <div className={Styles.area3}><PipelinesCreated /> </div>
            <div className={Styles.area4}>
              <StorageChart />
            </div>
            <div className={Styles.area5}>
              <CurrentUsageChart />  
            </div>
            <div className={Styles.area6}>
              <InternetChart />{" "}
            </div>
            <div className={Styles.area7}>
              <ProcessByPipelineChart />
            </div>
            <div className={Styles.area8}>
            <ConsumedAPIAreaChart/>
            {/* <ConsumedAPILineChart/> */}
              {/* <HistoryConsumedPipelineChart/> */}
              {/* <ConsumedAPIChart/> */}
            </div>
          </div>
          {/* <div class="dashboard">
            <div class="grid grid-a1-a2 grid-white grid-updating">
              <h1 class="grid-title">Daily</h1>
              <div class="list">
                <div class="list-row ranking ranking-working">
                  <div class="ranking-rank">1</div>
                  <div class="ranking-title">Henrik</div>
                  <div class="ranking-status">23:36</div>
                </div>

                <div class="list-row ranking ranking-break">
                  <div class="ranking-rank">2</div>
                  <div class="ranking-title">Joachim</div>
                  <div class="ranking-status">Short break</div>
                </div>

                <div class="list-row ranking">
                  <div class="ranking-rank">3</div>
                  <div class="ranking-title">Lasse</div>
                  <div class="ranking-status">-</div>
                </div>

                <div class="list-row ranking ranking-break">
                  <div class="ranking-rank">4</div>
                  <div class="ranking-title">Mette</div>
                  <div class="ranking-status">Long break</div>
                </div>

                <div class="list-row ranking ranking-working">
                  <div class="ranking-rank">5</div>
                  <div class="ranking-title">Mads</div>
                  <div class="ranking-status">23:36</div>
                </div>

                <div class="list-row ranking">
                  <div class="ranking-rank">6</div>
                  <div class="ranking-title">Lars</div>
                  <div class="ranking-status">-</div>
                </div>

                <div class="list-row ranking">
                  <div class="ranking-rank">7</div>
                  <div class="ranking-title">Jesper</div>
                  <div class="ranking-status">-</div>
                </div>

                <div class="list-row ranking ranking-working">
                  <div class="ranking-rank">8</div>
                  <div class="ranking-title">Martin</div>
                  <div class="ranking-status">23:36</div>
                </div>
              </div>
            </div>
            <div class="grid grid-b1-b1 grid-blue">
              <h1 class="grid-title">Weekly</h1>
            </div>
            <div class="grid grid-c1-c1 grid-orange">
              <h1 class="grid-title">Monthly</h1>
            </div>
            <div class="grid grid-b2-c2 grid-red">
              <h1 class="grid-title">Wired in</h1>
            </div>
            <div class="grid grid-d1-d2 grid-green">
              <h1 class="grid-title">Free</h1>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
