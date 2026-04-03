import Colors from "@/app/services/Colors";
import { useUser } from "@clerk/expo";
import React from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";

export default function Header() {
  const { user } = useUser();

  return (
    <View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Image
            source={{ uri: user?.imageUrl }}
            style={{ width: 50, height: 50, borderRadius: 99 }}
          />
          <View>
            <Text style={styles.heading}>Welcome,</Text>
            <Text style={[styles.heading, { fontFamily: "appFontBold" }]}>
              {user?.firstName}
            </Text>
          </View>
        </View>
        <Image
          source={require("../../assets/images/bell.png")}
          style={{ width: 40, height: 40 }}
        />
      </View>
      <TextInput
        placeholder="Search"
        style={{
          marginTop: 15,
          backgroundColor: Colors.WHITE,
          padding: 15,
          borderRadius: 99,
          fontSize: 20,
          paddingHorizontal: 20,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontFamily: "appFont",
    color: Colors.WHITE,
  },
});
