import { Button, Input, makeStyles } from "@rneui/themed";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";

import Config from "@/src/Config";
import { PostSignUpPayload } from "@/src/api/types/SignUp";
import PasswordRules from "@/src/components/PasswordRules";
import { useAuth } from "@/src/context/AuthContext";

const Page = () => {
  const insets = useSafeAreaInsets();
  const styles = useStyles(insets);
  const { t } = useTranslation();
  const { onSignUp } = useAuth();
  const { handleSubmit, control, getValues } = useForm<PostSignUpPayload>({
    defaultValues:
      Config.env === "local"
        ? {
            email: "c@c.com",
            password: "Pw@123456",
            retypedPassword: "Pw@123456",
          }
        : {
            email: "",
            password: "",
            retypedPassword: "",
          },
  });

  const onSubmit: SubmitHandler<PostSignUpPayload> = (values) => {
    onSignUp(values);
  };

  const rules = [
    {
      id: "length",
      test: (pw: string) => pw.length >= 8,
      message: t("SignUp:password-length"),
    },
    {
      id: "uppercase",
      test: (pw: string) => /[A-Z]/.test(pw),
      message: t("SignUp:password-uppercase"),
    },
    {
      id: "lowercase",
      test: (pw: string) => /[a-z]/.test(pw),
      message: t("SignUp:password-lowercase"),
    },
    {
      id: "number",
      test: (pw: string) => /[0-9]/.test(pw),
      message: t("SignUp:password-number"),
    },
    {
      id: "special",
      test: (pw: string) => /[^A-Za-z0-9]/.test(pw),
      message: t("SignUp:password-special"),
    },
  ];

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
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={{ required: t("SignUp:password-is-required") }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <View style={{ marginBottom: 8 }}>
              <Input
                renderErrorMessage={false}
                containerStyle={{ marginBottom: 8 }}
                label={t("SignUp:password-label")}
                onChangeText={onChange}
                placeholder={t("SignUp:password-placeholder")}
                secureTextEntry
                value={value}
                textContentType="oneTimeCode" // This is a workaround for iOS https://github.com/facebook/react-native/issues/21911
              />
              <View style={{ marginLeft: 8 }}>
                <PasswordRules password={value} rules={rules} />
              </View>
            </View>
          )}
        />

        <Controller
          control={control}
          name="retypedPassword"
          rules={{
            required: t("SignUp:retypedPassword-is-required"),
            validate: (value) =>
              value === getValues("password") || t("SignUp:passwordsMustMatch"),
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <Input
                errorMessage={error?.message}
                label={t("SignUp:retypedPassword-label")}
                onChangeText={onChange}
                placeholder={t("SignUp:password-placeholder")}
                secureTextEntry
                value={value}
                textContentType="oneTimeCode" // This is a workaround for iOS https://github.com/facebook/react-native/issues/21911
              />
            </>
          )}
        />

        <Button
          title={t("common:login")}
          containerStyle={styles.buttonContainer}
          onPress={handleSubmit(onSubmit)}
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
}));

export default Page;
