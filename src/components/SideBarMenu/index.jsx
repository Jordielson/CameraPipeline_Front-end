import "./styles.css";

function SidebarMenu() {
  return (
    <>
      <div class="wrapper">
        <nav id="sidebar">
          <div className="main-nav">
            <div class="sidebar-header">
              <img
                alt=""
                src="/logo.svg"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{" "}
              <h5>Câmera Pipeline</h5>
            </div>

            <ul class="list-unstyled components">
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#home">Mosaico</a>
              </li>
              <li class="active">
                <a href="/pipeline">Pipelines</a>
              </li>
              <li>
                <a href="#home">Câmeras</a>
              </li>
              <li>
                <a href="/pdi">PDIs</a>
              </li>
              <li>
                <a href="#home">Alterar senha</a>
              </li>
            </ul>
          </div>

          <div class="account">
            <div>
              <span>example@email.com</span>
            </div>
            <div>
              <a href="#home" class="logout">
                sair
              </a>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default SidebarMenu;
