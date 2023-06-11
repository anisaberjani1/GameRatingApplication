import CreateGame from "./Games/CreateGame";
import EditGame from "./Games/EditGame";
import FilterGames from "./Games/FilterGames";
import GameDetails from "./Games/GameDetails";
import LandingPage from "./Games/LandingPage";
import IndexUsers from "./auth/IndexUsers";
import Login from "./auth/Login";
import Register from "./auth/Register";
import CreateBrand from "./brands/CreateBrand";
import EditBrand from "./brands/EditBrand";
import IndexBrand from "./brands/IndexBrand";
import CreateCategory from "./category/CreateCategory";
import EditCategory from "./category/EditCategory";
import IndexCategory from "./category/IndexCategory";
import CreateShop from "./shops/CreateShop";
import EditShop from "./shops/EditShop";
import IndexShops from "./shops/IndexShops";
import RedirectToLandingPage from "./utils/RedirectToLandingPage";

const routes = [
    {path: '/category', component: IndexCategory, exact:true, isAdmin: true},
    {path: '/category/create', component: CreateCategory, isAdmin: true},
    {path: '/category/edit/:id(\\d+)', component: EditCategory, isAdmin: true},

    {path: '/brands', component: IndexBrand, exact:true, isAdmin: true},
    {path: '/brands/create', component: CreateBrand, isAdmin: true},
    {path: '/brands/edit/:id(\\d+)', component: EditBrand, isAdmin: true},

    {path: '/shops', component: IndexShops, exact:true, isAdmin: true},
    {path: '/shops/create', component: CreateShop, isAdmin: true},
    {path: '/shops/edit/:id(\\d+)', component: EditShop, isAdmin: true},

    {path: '/games/create', component: CreateGame, isAdmin: true},
    {path: '/games/edit/:id(\\d+)', component: EditGame, isAdmin: true},
    {path: '/games/filter', component: FilterGames},
    {path: '/games/:id(\\d+)', component: GameDetails},

    {path: '/register', component: Register},
    {path: '/login', component: Login},
    {path: '/users', component: IndexUsers, isAdmin: true},


    {path: '/', component: LandingPage, exact:true},
    {path: '*', component: RedirectToLandingPage}
];

export default routes;