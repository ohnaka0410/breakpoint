import Script from "next/script";
import { gaId } from "~/libs/client/Env";

export const GoogleAnalytics: React.VFC = () => (
  <>
    {gaId && (
      <>
        <Script defer src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
        <Script id="ga" defer strategy="afterInteractive">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
          `}
        </Script>
      </>
    )}
  </>
);
