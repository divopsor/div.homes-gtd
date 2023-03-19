import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import Footer from "@divops/component-footer";
import { ReactNode } from "react";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <Component {...pageProps} />
        <Footer />
      </Container>
    </QueryClientProvider>
  );
}

type Styled = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => JSX.Element;

const Container: Styled = ({ children }) => {
  return (
    <div
      css={{
        margin: "0 auto",
        width: "1200px",
      }}
      children={children}
    />
  );
};
