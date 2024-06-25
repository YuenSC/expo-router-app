import { Button, CheckBox, Input, makeStyles } from "@rneui/themed";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";

import { PostLoginPayload } from "@/src/api/types/Login";
import { useAuth } from "@/src/components/AuthContext";
import PasswordInput from "@/src/components/PasswordInput";

const Page = () => {
  const insets = useSafeAreaInsets();
  const styles = useStyles(insets);
  const { t } = useTranslation();
  const { onLogin, authState, localCredential } = useAuth();
  const { handleSubmit, control } = useForm<PostLoginPayload>({
    defaultValues: {
      email: localCredential.email || "",
      password: localCredential.password || "",
      rememberMe: true,
    },
  });

  const onSubmit: SubmitHandler<PostLoginPayload> = (values) => {
    onLogin(values);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Controller
          control={control}
          name="email"
          rules={{ required: t("SignUp:email-is-required") }}
          render={({
            field: { onChange, value, onBlur },
            fieldState: { error },
          }) => (
            <Input
              autoFocus
              errorMessage={error?.message}
              keyboardType="email-address"
              label={t("SignUp:email-label")}
              onChangeText={onChange}
              placeholder={t("SignUp:email-placeholder")}
              textContentType="emailAddress"
              value={value}
              style={styles.input}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={{ required: t("SignUp:password-is-required") }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <PasswordInput
              errorMessage={error?.message}
              label={t("SignUp:password-label")}
              onChangeText={onChange}
              placeholder={t("SignUp:password-placeholder")}
              value={value}
              textContentType="oneTimeCode" // This is a workaround for iOS https://github.com/facebook/react-native/issues/21911
              style={styles.input}
            />
          )}
        />

        <Controller
          control={control}
          name="rememberMe"
          render={({ field: { onChange, value } }) => (
            <CheckBox
              checked={Boolean(value)}
              onPress={() => onChange(!value)}
              title={t("SignUp:remember-me")}
              containerStyle={styles.checkBoxContainer}
            />
          )}
        />

        <Button
          title={t("common:login")}
          containerStyle={styles.buttonContainer}
          onPress={handleSubmit(onSubmit)}
          loading={authState.isPending}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const useStyles = makeStyles((theme, insets: EdgeInsets) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingVertical: 16,
    paddingHorizontal: 8,
    gap: 8,
  },
  buttonContainer: {
    paddingBottom: insets.bottom + 16,
  },
  checkBoxContainer: {
    paddingVertical: 0,
    marginLeft: 0,
  },
  errorText: {
    color: "red",
  },
  input: {
    // Add common input styles here if needed
  },
}));

export default Page;
