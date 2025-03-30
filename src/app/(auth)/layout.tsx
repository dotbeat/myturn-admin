import { Box } from "@mui/material";
import SideNavigation from "@/components/common/SideNavigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SideNavigation className="fixed left-0 top-0 h-dvh w-52 overflow-x-hidden" />
      <Box className="flex flex-1 flex-col pl-52">{children}</Box>
    </>
  );
}
