import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Toaster } from "@/components/ui/sonner";
import { useActor } from "@/hooks/useActor";
import AboutPage from "@/pages/AboutPage";
import BlogPage from "@/pages/BlogPage";
import BlogPostPage from "@/pages/BlogPostPage";
import BookingCalendarPage from "@/pages/BookingCalendarPage";
import ComparisonPage from "@/pages/ComparisonPage";
import ContactPage from "@/pages/ContactPage";
import ConversionsPage from "@/pages/ConversionsPage";
import FranchisePage from "@/pages/FranchisePage";
import HomePage from "@/pages/HomePage";
import ServicesPage from "@/pages/ServicesPage";
import VehicleDetailPage from "@/pages/VehicleDetailPage";
import VehiclesPage from "@/pages/VehiclesPage";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { useEffect } from "react";

const SEED_KEY = "jsr_seeded_v3";

function SeedInitializer() {
  const { actor, isFetching } = useActor();

  useEffect(() => {
    if (!actor || isFetching) return;
    const alreadySeeded = localStorage.getItem(SEED_KEY);
    if (!alreadySeeded) {
      actor
        .seedData()
        .then(() => {
          localStorage.setItem(SEED_KEY, "true");
        })
        .catch((e: unknown) => {
          console.warn("Seed failed:", e);
        });
    }
  }, [actor, isFetching]);

  return null;
}

function RootLayout() {
  return (
    <>
      <SeedInitializer />
      <Navbar />
      <Outlet />
      <Footer />
      <WhatsAppButton />
      <Toaster richColors position="top-right" />
    </>
  );
}

// Routes
const rootRoute = createRootRoute({
  component: RootLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});

const vehiclesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/vehicles",
  component: VehiclesPage,
});

const vehicleDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/vehicles/$id",
  component: VehicleDetailPage,
});

const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services",
  component: ServicesPage,
});

const conversionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/conversions",
  component: ConversionsPage,
});

const franchiseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/franchise",
  component: FranchisePage,
});

const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog",
  component: BlogPage,
});

const blogPostRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog/$slug",
  component: BlogPostPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: ContactPage,
});

const compareRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/compare",
  component: ComparisonPage,
});

const bookingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/booking",
  component: BookingCalendarPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  vehiclesRoute,
  vehicleDetailRoute,
  servicesRoute,
  conversionsRoute,
  franchiseRoute,
  blogRoute,
  blogPostRoute,
  contactRoute,
  compareRoute,
  bookingRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
