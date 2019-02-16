import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import Login from './pages/Login';
import Feed from './pages/Feed';
import NewPost from './pages/NewPost';

const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        App: createStackNavigator({
            Feed,
            NewPost
        })
    })
);

export default Routes;