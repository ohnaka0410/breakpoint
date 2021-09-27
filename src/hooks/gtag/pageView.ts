import { useRouter } from "next/router";
import { useEffect } from "react";
import { gaId } from "~/libs/client/Env";

export const usePageView = (): void => {
  const router = useRouter();

  useEffect(() => {
    if (gaId === undefined) {
      return;
    }

    const handleRouteChange = (path: string): void => {
      if (gaId === undefined) {
        return;
      }
      window.gtag("config", gaId, {
        page_path: path,
      });
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
};
