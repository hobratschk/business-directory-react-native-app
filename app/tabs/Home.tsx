import Category from "@/components/HomeScreen/Category";
import Header from "@/components/HomeScreen/Header";
import Sliders from "@/components/HomeScreen/Sliders";
import React from "react";
import { View } from "react-native";
import Colors from "../services/Colors";

export default function Home() {
  return (
    <View style={{ paddingTop: 25, padding: 20 }}>
      <View
        style={{
          height: 300,
          width: "200%",
          backgroundColor: Colors.PRIMARY,
          position: "absolute",
        }}
      ></View>
      <Header />
      <Sliders />
      <Category />
      {/* popular businesses */}
    </View>
  );
}
