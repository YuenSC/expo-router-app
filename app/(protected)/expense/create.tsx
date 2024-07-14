import { makeStyles, Text } from "@rneui/themed";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useWindowDimensions, View } from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";

import ExpenseDetailForm from "@/src/components/expense/ExpenseDetailForm";
import { ExpenseFormProvider } from "@/src/components/expense/ExpenseFormContext";
import ExpenseTabBar from "@/src/components/expense/ExpenseTabBar";
import { useAppContext } from "@/src/context/AppContext";
import { useStep } from "@/src/hooks/useStep";

const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#ff4081" }} />
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#673ab7" }} />
);

const scene = {
  detail: ExpenseDetailForm,
  payerSelect: FirstRoute,
  payeeSelect: SecondRoute,
};

const renderScene = SceneMap(scene);

const Page = () => {
  const styles = useStyles();
  const { currentGroupId } = useAppContext();
  const { t } = useTranslation();
  const layout = useWindowDimensions();

  const [currentStep, helpers] = useStep({ maxStep: 3, defaultStep: 1 });
  const [routes] = useState([
    { key: "detail", title: t("Expense:detail") },
    { key: "payerSelect", title: t("Expense:payer") },
    { key: "payeeSelect", title: t("Expense:payee") },
  ]);

  if (!currentGroupId) {
    return <Text>Please select a group to continue</Text>;
  }

  return (
    <ExpenseFormProvider groupId={currentGroupId} {...helpers}>
      <TabView
        navigationState={{ index: currentStep - 1, routes }}
        renderScene={renderScene}
        renderTabBar={(props) => <ExpenseTabBar {...props} />}
        onIndexChange={(index) => helpers.setStep(index + 1)}
        initialLayout={{ width: layout.width }}
        keyboardDismissMode="on-drag"
        style={styles.container}
      />
    </ExpenseFormProvider>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
}));

export default Page;
