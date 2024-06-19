import { Text, makeStyles } from "@rneui/themed";
import { memo } from "react";
import { View } from "react-native";

type ISampleComponentProps = object;

const SampleComponent = memo<ISampleComponentProps>(() => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Text>SampleComponent</Text>
    </View>
  );
});

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
}));

SampleComponent.displayName = "SampleComponent";

export default SampleComponent;
