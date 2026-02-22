import { OnboardingPage } from "@/screens/onboarding";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/onboarding")({
  component: RouteComponent,
});

function RouteComponent() {
  return <OnboardingPage />;
}
