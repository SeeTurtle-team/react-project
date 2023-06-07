import Home from '../App';
import Calendar from '../App';
import Documentation from '../App';
// import FoodReview from '@/views/FoodReview';

const routes = [
    {
        path: "/Home",
        name: "Home",
        component: Home,
        meta: {name:"Store List", icon: "mdi-view-list"},
    },
    {
        path: "/Calendar",
        name: "Calendar",
        component: Calendar,
        meta: {name:"Create List", icon: "mdi-view-list"},
    },
    {
        path: "/Documentation",
        name: "Documentation",
        component: Documentation,
    },
]


export default routes;