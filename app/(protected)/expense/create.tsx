import { makeStyles, Text } from "@rneui/themed";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useWindowDimensions } from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";

import ExpenseDetailForm from "@/src/components/expense/ExpenseDetailForm";
import { ExpenseFormProvider } from "@/src/components/expense/ExpenseFormContext";
import PayerPayeeSelectForm from "@/src/components/expense/ExpenseFormPayerPayeeSelect";
import { ExpensePageEnum } from "@/src/components/expense/ExpensePageEnum";
import ExpenseTabBar from "@/src/components/expense/ExpenseTabBar";
import { useAppContext } from "@/src/context/AppContext";
import { useStep } from "@/src/hooks/useStep";

const scene = {
  [ExpensePageEnum.detail]: ExpenseDetailForm,
  [ExpensePageEnum.payer]: PayerPayeeSelectForm,
  [ExpensePageEnum.payee]: PayerPayeeSelectForm,
};

const renderScene = SceneMap(scene);

const Page = () => {
  const styles = useStyles();
  const { currentGroupId } = useAppContext();
  const { t } = useTranslation();
  const router = useRouter();
  const layout = useWindowDimensions();

  const [currentStep, helpers] = useStep({ maxStep: 3, defaultStep: 1 });
  const [routes] = useState([
    { key: ExpensePageEnum.detail, title: t("Expense:detail") },
    { key: ExpensePageEnum.payer, title: t("Expense:payer") },
    { key: ExpensePageEnum.payee, title: t("Expense:payee") },
  ]);

  if (!currentGroupId) {
    return <Text>Please select a group to continue</Text>;
  }

  return (
    <ExpenseFormProvider
      groupId={currentGroupId}
      {...helpers}
      currentStep={currentStep}
      onSuccess={() => router.navigate("/payments")}
    >
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
