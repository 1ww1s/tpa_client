import { Home } from "@/src/views/home";
import { Suspense } from "react";
import { LoadingScreen } from "@/src/shared/components/loadingScreen/LoadingScreen";

export default function HomePage() {

  return (
    // <Suspense fallback={<LoadingScreen />}>
      <Home />    
    // </Suspense>
  );
}
