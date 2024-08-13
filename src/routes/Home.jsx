import Kanban from '../components/kanban/Kanban';
import UserList from '../components/vertical scroll list/UserList';

const Home = () => {
	return (
		<div className='p-4'>
			<Kanban />
			<UserList />
		</div>
	);
};

export default Home;
