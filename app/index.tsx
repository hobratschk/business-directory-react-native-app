import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Colors from "./services/Colors";

export default function Index() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <View
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
        </View>
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
