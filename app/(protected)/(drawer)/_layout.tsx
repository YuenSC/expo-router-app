import { Drawer } from "expo-router/drawer";

import DrawerContent from "@/src/components/drawer/DrawerContent";

const DrawerLayout = () => {
  return (
    <Drawer
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="(tab)" />
    </Drawer>
  );
};

export default DrawerLayout;
