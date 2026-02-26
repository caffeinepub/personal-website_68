import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { AdminProvider } from './contexts/AdminContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ResumePage from './pages/ResumePage';
import BlogListingPage from './pages/BlogListingPage';
import BlogPostPage from './pages/BlogPostPage';
import MemoriesPage from './pages/MemoriesPage';
import ArticlesListingPage from './pages/ArticlesListingPage';
import ArticlePage from './pages/ArticlePage';
import StudyMaterialPage from './pages/StudyMaterialPage';

// Root layout
const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  ),
});

// Routes
const indexRoute = createRoute({ getParentRoute: () => rootRoute, path: '/', component: HomePage });
const resumeRoute = createRoute({ getParentRoute: () => rootRoute, path: '/resume', component: ResumePage });
const blogsRoute = createRoute({ getParentRoute: () => rootRoute, path: '/blogs', component: BlogListingPage });
const blogPostRoute = createRoute({ getParentRoute: () => rootRoute, path: '/blogs/$id', component: BlogPostPage });
const memoriesRoute = createRoute({ getParentRoute: () => rootRoute, path: '/memories', component: MemoriesPage });
const articlesRoute = createRoute({ getParentRoute: () => rootRoute, path: '/articles', component: ArticlesListingPage });
const articleRoute = createRoute({ getParentRoute: () => rootRoute, path: '/articles/$id', component: ArticlePage });
const studyRoute = createRoute({ getParentRoute: () => rootRoute, path: '/study-material', component: StudyMaterialPage });

const routeTree = rootRoute.addChildren([
  indexRoute,
  resumeRoute,
  blogsRoute,
  blogPostRoute,
  memoriesRoute,
  articlesRoute,
  articleRoute,
  studyRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <AdminProvider>
      <RouterProvider router={router} />
    </AdminProvider>
  );
}
