import Colors from "@/app/services/Colors";
import React from "react";
import { Image, Text, View } from "react-native";
import { BusinessType } from "../HomeScreen/PopularBusinessList";

type Props = {
  business: BusinessType;
};

export default function BusinessListCard({ business }: Props) {
  return (
    <View
      style={{
        marginTop: 10,
        padding: 7,
        borderRadius: 15,
        backgroundColor: Colors.WHITE,
        display: "flex",
        flexDirection: "row",
        gap: 10,
      }}
    >
      <Image
        source={{ uri: business?.images[0].url }}
        style={{ width: 120, height: 120, borderRadius: 15 }}
      />
      <View style={{ display: "flex", gap: 5 }}>
        <Text style={{ fontFamily: "appFontBold", fontSize: 18 }}>
          {business?.name}
        </Text>
        <Text
          style={{ fontFamily: "appFont", fontSize: 15, color: Colors.GRAY }}
        >
          {business?.address}
        </Text>
        <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
          <Image
            source={require("./../../assets/images/star.png")}
            style={{ width: 20, height: 20 }}
          />
          <Text>4.3/5</Text>
        </View>
      </View>
    </View>
  );
}
