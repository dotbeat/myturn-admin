import { Box } from "@mui/material";
import SideNavigation from "@/components/common/SideNavigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SideNavigation className="fixed top-0 left-0 h-dvh w-52 overflow-x-hidden" />
      <Box className="flex flex-1 flex-col pl-52">{children}</Box>
    </>
  );
}
