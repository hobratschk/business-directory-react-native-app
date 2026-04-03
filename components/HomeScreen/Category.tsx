import Colors from "@/app/services/Colors";
import { axiosClient } from "@/app/services/GlobalApi";
import React, { useEffect } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

type categoryType = {
  name: string;
  premium: boolean;
  icon: { url: string };
};

export default function Category() {
  const [categoryList, setCategoryList] = React.useState<categoryType[]>([]);

  useEffect(() => {
    GetCategories();
  }, []);

  const GetCategories = async () => {
    const result = await axiosClient.get(
      "/categories?filters[premium][$eq]=true&populate=*",
    );
    console.log(JSON.stringify(result.data.data));
    setCategoryList(result?.data?.data);
  };
  return (
    <View
      style={{
        marginTop: 15,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontFamily: "appFontBold", fontSize: 20 }}>
          Category
        </Text>
        <Text style={{ fontFamily: "appFont", color: Colors.PRIMARY }}>
          View All
        </Text>
      </View>
      <FlatList
        data={categoryList}
        numColumns={4}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: "center",
              padding: 5,
              margin: 3,
              backgroundColor: Colors.WHITE,
              borderRadius: 10,
              height: 105,
              justifyContent: "center",
            }}
            key={index}
          >
            <Image
              source={{ uri: item?.icon.url }}
              style={{ width: 60, height: 60 }}
            />
            <Text
              style={{
                textAlign: "center",
                marginTop: 3,
                fontFamily: "appFont",
              }}
            >
              {item?.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
