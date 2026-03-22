import { useSSO, useUser } from "@clerk/expo";
import * as AuthSession from "expo-auth-session";
import { useNavigation, useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React, { useCallback, useEffect } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "./services/Colors";
import { axiosClient } from "./services/GlobalApi";

// Preloads the browser for Android devices to reduce authentication load time
// See: https://docs.expo.dev/guides/authentication/#improving-user-experience
export const useWarmUpBrowser = () => {
  useEffect(() => {
    if (Platform.OS !== "android") return;
    void WebBrowser.warmUpAsync();
    return () => {
      // Cleanup: closes browser when component unmounts
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function Index() {
  const navigation = useNavigation();
  useWarmUpBrowser();

  // Use the `useSSO()` hook to access the `startSSOFlow()` method
  const { startSSOFlow } = useSSO();
  const router = useRouter();
  const { user } = useUser();
  console.log(user);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user) {
      createNewUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const createNewUser = async () => {
    try {
      const result = await axiosClient.post("/user-lists", {
        data: {
          fullName: user?.fullName,
          email: user?.primaryEmailAddress?.emailAddress,
        },
      });
      console.log(result.data);
      router.replace("/tabs/Home");
    } catch (e) {
      console.log(e);
      router.replace("/tabs/Home");
    }
  };

  const onPress = useCallback(async () => {
    try {
      // Start the authentication process by calling `startSSOFlow()`
      const { createdSessionId, setActive, signIn, signUp } =
        await startSSOFlow({
          strategy: "oauth_google",
          // For web, defaults to current path
          // For native, you must pass a scheme, like AuthSession.makeRedirectUri({ scheme, path })
          // For more info, see https://docs.expo.dev/versions/latest/sdk/auth-session/#authsessionmakeredirecturioptions
          redirectUrl: AuthSession.makeRedirectUri(),
        });

      // If sign in was successful, set the active session
      if (createdSessionId) {
        setActive!({
          session: createdSessionId,
          // Handle session tasks
          // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
          navigate: async ({ session, decorateUrl }) => {
            if (session?.currentTask) {
              console.log(session?.currentTask);
              router.replace("/tabs/Home");
              return;
            }

            router.replace("/tabs/Home");
          },
        });
      } else {
        // If there is no `createdSessionId`,
        // there are missing requirements, such as MFA
        // See https://clerk.com/docs/guides/development/custom-flows/authentication/oauth-connections#handle-missing-requirements
      }
    } catch (err) {
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  }, [router, startSSOFlow]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/welcome.png")}
        style={{ width: "100%", height: 270, marginTop: 130, marginBottom: 25 }}
      />
      <Text style={styles.heading}>Welcome to</Text>
      <Text style={styles.heading}>Business Directory</Text>
      <View
        style={{
          padding: 20,
          backgroundColor: Colors.WHITE,
          margin: 20,
          borderRadius: 20,
        }}
      >
        <Text
          style={{ fontFamily: "appFont", fontSize: 20, textAlign: "center" }}
        >
          Discover thousands of local businesses in one click.
        </Text>
        <TouchableOpacity
          onPress={onPress}
          style={[
            styles.button,
            {
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
              gap: 3,
            },
          ]}
        >
          <Image
            source={require("../assets/images/google.png")}
            style={{ width: 20, height: 20 }}
          />
          <Text
            style={{ fontFamily: "appFont", fontSize: 18, textAlign: "center" }}
          >
            Sign In With Google
          </Text>
        </TouchableOpacity>
        <View
          style={[
            styles.button,
            { backgroundColor: Colors.PRIMARY, borderColor: Colors.PRIMARY },
          ]}
        >
          <Text
            style={{
              fontFamily: "appFont",
              fontSize: 18,
              textAlign: "center",
              color: Colors.WHITE,
            }}
          >
            Skip
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.PRIMARY,
    height: "100%",
  },
  heading: {
    fontFamily: "appFontBold",
    fontSize: 30,
    color: Colors.WHITE,
    textAlign: "center",
  },
  button: {
    borderWidth: 1,
    borderRadius: 99,
    padding: 15,
    marginTop: 15,
  },
});
