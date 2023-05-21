import {Outlet} from "react-router-dom";
import './main.view.scss';

const MainView = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <a href="/#/flickers/perlin">Perlin</a>
                    </li>
                    <li>
                        <a href="/#/flickers/radial">Radial</a>
                    </li>
                </ul>
            </nav>
            <main>
                <Outlet/>
            </main>
        </div>
    );
};

export default MainView;