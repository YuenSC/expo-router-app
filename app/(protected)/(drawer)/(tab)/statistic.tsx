import { MaterialCommunityIcons } from "@expo/vector-icons";
import { makeStyles, Text, useTheme } from "@rneui/themed";
import { useNavigation } from "expo-router";
import { Fragment, useEffect, useMemo, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Pressable, TouchableOpacity, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

import { useGetGroup } from "@/src/api/hooks/group/useGetGroup";
import { useGetGroupStatistics } from "@/src/api/hooks/statistics/useGetGroupStatistics";
import { useGetMe } from "@/src/api/hooks/useGetMe";
import {
  BillCategoryColor,
  BillCategoryEnum,
} from "@/src/api/types/BillCategories";
import DataDisplayTargetToggle from "@/src/components/common/DataDisplayTargetToggle";
import FullScreenLoading from "@/src/components/common/FullScreenLoading";
import { HStack, VStack } from "@/src/components/common/Stack";
import StyledScrollView from "@/src/components/common/StyledScrollView";
import { CurrencyCode } from "@/src/constants/Currency";
import { useAppContext } from "@/src/context/AppContext";
import { DataDisplayTarget } from "@/src/types/DataDisplayTarget";
import { formatAmount, roundAmountToDecimal } from "@/src/utils/payments";

const getAmountSum = (categoryExpense: Record<BillCategoryEnum, number>) => {
  return Object.values(categoryExpense).reduce((acc, curr) => acc + curr, 0);
};

const UncategorisedColor = "white";

const Page = () => {
  const styles = useStyles();
  const { theme } = useTheme();
  const { currentGroupId } = useAppContext();
  const { t } = useTranslation();
  const navigation = useNavigation();

  const {
    data: statistics,
    query: { isPending, refetch },
  } = useGetGroupStatistics({
    groupId: currentGroupId || "",
  });
  const { data: currentGroup } = useGetGroup({ id: currentGroupId || "" });
  const { data: profileUser } = useGetMe();

  const [target, setTarget] = useState<DataDisplayTarget>(
    DataDisplayTarget.You,
  );
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode | null>(
    null,
  );

  const hasMoreThanOneCurrency =
    Object.keys(statistics?.categoryExpenseByCurrency ?? {}).length > 1;

  const {
    pieData,
    categoryExpense,
    amountText,
    totalExpenseByCurrency,
    totalAmount,
  } = useMemo(() => {
    const categoryExpenseByCurrency =
      target === DataDisplayTarget.Group
        ? statistics?.categoryExpenseByCurrency
        : statistics?.userCategoryExpenseByCurrency;

    const categoryExpense =
      (selectedCurrency
        ? categoryExpenseByCurrency?.[selectedCurrency]
        : undefined) ?? ({} as Record<BillCategoryEnum, number>);

    const pieData = Object.entries(categoryExpense)
      .sort(([category1, value1], [category2, value2]) => value2 - value1)
      .map(([category, value]) => {
        return {
          value,
          color:
            BillCategoryColor[category as BillCategoryEnum] ??
            UncategorisedColor,
          gradientCenterColor: BillCategoryColor[category as BillCategoryEnum],
        };
      });

    const totalExpenseByCurrency = Object.fromEntries(
      Object.entries(categoryExpenseByCurrency ?? {}).map(
        ([code, expenses]) => [code, getAmountSum(expenses)],
      ),
    );

    return {
      pieData,
      categoryExpense,
      totalExpenseByCurrency,
      totalAmount: getAmountSum(categoryExpense),
      amountText: Object.entries(totalExpenseByCurrency)
        .map(([code, totalExpense]) => {
          return formatAmount(totalExpense, code as CurrencyCode);
        })
        .join(" / "),
    };
  }, [selectedCurrency, statistics, target]);

  useEffect(() => {
    const availableCurrencyCodes = Object.keys(
      statistics?.categoryExpenseByCurrency ?? {},
    ) as CurrencyCode[];

    if (!selectedCurrency && availableCurrencyCodes[0]) {
      setSelectedCurrency(availableCurrencyCodes[0]);
    }
  }, [selectedCurrency, statistics?.categoryExpenseByCurrency]);

  return (
    <StyledScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      refetch={refetch}
      onScroll={(event) => {
        const scrollPositionY = event.nativeEvent.contentOffset.y;
        navigation.setOptions({
          headerTitle:
            scrollPositionY > 50 ? t("StatisticScreen:statistics") : "",
        });
      }}
    >
      <HStack>
        <HStack justifyContent="flex-start">
          <Text h1>{t("StatisticScreen:statistics")}</Text>
          <DataDisplayTargetToggle target={target} setTarget={setTarget} />
        </HStack>

        {hasMoreThanOneCurrency && (
          <TouchableOpacity
            hitSlop={8}
            onPress={
              () => {}
              // navigation.navigate("CurrencyCodeSelect", {
              //   setSelectedCurrency,
              //   selectedCurrency,
              //   isCurrencyNullable: false,
              // })
            }
          >
            <HStack gap={4}>
              <Text style={styles.selectedCurrency}>{selectedCurrency}</Text>
              <MaterialCommunityIcons
                name="filter"
                size={24}
                color={theme.colors.primary}
              />
            </HStack>
          </TouchableOpacity>
        )}
      </HStack>
      <Trans
        i18nKey="StatisticScreen:subtitle" // optional -> fallbacks to defaults if not provided
        values={{
          amount: amountText,
          name:
            target === DataDisplayTarget.Group
              ? currentGroup?.name
              : profileUser?.name,
        }}
        components={{
          Highlight: <Text style={styles.highlight} />,
          Text: <Text />,
        }}
      />

      {isPending ? (
        <FullScreenLoading />
      ) : (
        <VStack>
          <View style={styles.pieChartContainer}>
            <PieChart
              data={pieData}
              showText
              donut
              showGradient
              radius={120}
              innerRadius={80}
              innerCircleColor={theme.colors.background}
              centerLabelComponent={() => {
                if (!selectedCurrency) return null;
                return (
                  <Text h4 style={{ textAlign: "center" }}>
                    {formatAmount(
                      totalExpenseByCurrency[selectedCurrency],
                      selectedCurrency,
                    )}
                  </Text>
                );
              }}
            />
          </View>

          <View style={styles.categoryContainer}>
            {Object.keys(categoryExpense)
              .sort(
                (cat1, cat2) =>
                  (categoryExpense[cat1 as BillCategoryEnum] ?? 0) -
                  (categoryExpense[cat2 as BillCategoryEnum] ?? 0),
              )
              .map((_key, index) => {
                const isLast =
                  index === Object.keys(BillCategoryEnum).length - 1;
                const key = _key as BillCategoryEnum;

                return (
                  <Fragment key={key}>
                    <Pressable>
                      <HStack style={styles.categoryItem}>
                        <HStack gap={8}>
                          <View
                            style={[
                              styles.categoryDot,
                              {
                                backgroundColor:
                                  BillCategoryColor[key] ?? UncategorisedColor,
                              },
                            ]}
                          />
                          <Text>{t(`BillCategoryEnum:${key}`)}</Text>
                        </HStack>
                        <HStack gap={8}>
                          <Text style={styles.amount}>
                            {formatAmount(
                              categoryExpense[key] ?? 0,
                              selectedCurrency,
                            )}
                          </Text>
                          <Text style={styles.percentage}>
                            {`${roundAmountToDecimal(((categoryExpense[key] ?? 0) * 100) / totalAmount, 1)}%`}
                          </Text>
                        </HStack>
                      </HStack>
                    </Pressable>

                    {isLast ? null : <View style={styles.divider} />}
                  </Fragment>
                );
              })}
          </View>
        </VStack>
      )}
    </StyledScrollView>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    flex: 1,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
  },
  highlight: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  pieChartContainer: {
    marginVertical: 32,
  },
  categoryContainer: {
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: theme.colors.divider,
    alignSelf: "stretch",
  },
  categoryDot: {
    backgroundColor: theme.colors.primary,
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.divider,
    marginHorizontal: 16,
  },
  amount: {
    // fontWeight: "bold",
  },
  percentage: {
    color: theme.colors.grey1,
    minWidth: 48,
    textAlign: "right",
  },

  selectedCurrency: {
    color: theme.colors.primary,
    fontWeight: "bold",
  },
  lottie: {
    height: 300,
    aspectRatio: 1,
    alignSelf: "center",
    marginBottom: 32,
  },
  emptyText: {
    textAlign: "center",
    marginBottom: 16,
    fontSize: 16,
    fontWeight: "500",
  },
}));

export default Page;
