import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import ErrorElement from './components/ErrorElement'

const Home = lazy(() => import('./routes/Home'))

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorElement />,
		children: [
			{
				errorElement: <ErrorElement />,
				children: [
					{
						index: true,
						element: (
							<Suspense fallback={'Loading...'}>
								<Home />
							</Suspense>
						),
					},
				],
			},
		],
	},
])
