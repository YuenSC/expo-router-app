import { Button, Input, makeStyles, Text, useTheme } from "@rneui/themed";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

import { usePostResendOtpVerificationEmail } from "@/src/api/hooks/usePostResendOtpVerificationEmail";
import OtpTextInput from "@/src/components/common/OtpTextInput";
import { HStack, VStack } from "@/src/components/common/Stack";
import { useAuth } from "@/src/context/AuthContext";

const Page = () => {
  const styles = useStyles();
  const { theme } = useTheme();
  const { email } = useLocalSearchParams<{ email: string }>();
  const [otp, setOtp] = useState("");
  const { t } = useTranslation();
  const {
    onVerifyEmail,
    authState: { isPending },
  } = useAuth();

  const { mutate, isPending: isPendingPostResendOtpVerificationEmail } =
    usePostResendOtpVerificationEmail({
      onSuccess: () => {
        Toast.show({
          type: "success",
          text1: "OTP sent successfully",
          text2: "Please check your email",
        });
      },
    });

  if (!email) {
    return (
      <VStack style={styles.errorContainer} justifyContent="center">
        <Text style={styles.errorTitle}>
          {t(
            "otp-email-verification:invalid-email-please-go-back-and-sign-up-again",
          )}
        </Text>
      </VStack>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Input
          autoFocus
          label={t("SignUp:email-label")}
          placeholder={t("SignUp:email-placeholder")}
          textContentType="emailAddress"
          value={email}
          disabled
        />
        <VStack alignItems="stretch" style={styles.otpContainer} gap={12}>
          <HStack gap={8}>
            <Text style={styles.label}>
              {t("otp-email-verification:enter-one-time-password")}
            </Text>
            {isPending && <ActivityIndicator color={theme.colors.primary} />}
          </HStack>
          <OtpTextInput
            value={otp}
            onChangeText={setOtp}
            numberOfDigits={6}
            onComplete={(otp) =>
              onVerifyEmail?.({ email, otp }).catch(() => {
                setOtp("");
              })
            }
          />
          <Button
            type="outline"
            title={t("otp-email-verification:resend-otp")}
            style={styles.resendOtpButton}
            onPress={() => mutate({ email })}
            loading={isPendingPostResendOtpVerificationEmail}
          />
        </VStack>
      </View>
    </TouchableWithoutFeedback>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 16,
  },
  label: {
    fontSize: 16,
    color: theme.colors.grey3,
    fontWeight: "bold",
  },
  otpContainer: {
    marginHorizontal: 8,
    marginBottom: 32,
  },
  button: {
    marginTop: 32,
  },
  resendOtpButton: {
    marginTop: 16,
  },

  errorContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingBottom: 60,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 32,
  },
}));

export default Page;
