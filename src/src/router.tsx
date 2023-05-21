import {HashRouter, Route, Router, Routes} from "react-router-dom";
import MainView from "./view/main.view";
import FlickersView from "./view/children/flickers/flickers.view";
import PerlinView from "./view/children/flickers/children/perlin/perlin.view";
import RadialView from "./view/children/flickers/children/radial/radial.view";

export const AppRouter = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<MainView/>}>
                    <Route path={'flickers'} element={<FlickersView/>}>
                        <Route path={'perlin'} element={<PerlinView/>}/>
                        <Route path={'radial'} element={<RadialView/>}/>
                    </Route>
                </Route>
            </Routes>
        </HashRouter>
    );
};