import BusinessListCard from "@/components/BusinessListScreen/BusinessListCard";
import { BusinessType } from "@/components/HomeScreen/PopularBusinessList";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    FlatList,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Colors from "../services/Colors";
import { axiosClient } from "../services/GlobalApi";

export default function BusinessList() {
  const { categoryName } = useLocalSearchParams();
  const [businessList, setBusinessList] = useState<BusinessType[]>([]);
  const [loading, setLoading] = useState(false);
  const [originalBusinessList, setOriginalBusinessList] = useState<
    BusinessType[]
  >([]);
  const router = useRouter();

  useEffect(() => {
    GetBusinessListByCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryName]);

  const GetBusinessListByCategory = async () => {
    setLoading(true);
    const result = await axiosClient.get(
      "/business-lists?filters[category][name][$eq]=" +
        categoryName +
        "&populate=*",
    );
    setBusinessList(result?.data?.data);
    setOriginalBusinessList(result?.data?.data);
    setLoading(false);
  };

  const OnSearchFilter = (searchInput: string) => {
    if (!searchInput) {
      setBusinessList(originalBusinessList);
      return;
    }
    const filterList = originalBusinessList.filter((item) =>
      item.name.toLowerCase().includes(searchInput.toLowerCase()),
    );
    setBusinessList(filterList);
  };

  return (
    <View style={{ paddingTop: 30 }}>
      <View
        style={{
          height: 300,
          backgroundColor: Colors.PRIMARY,
          position: "absolute",
          width: "200%",
        }}
      ></View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          marginLeft: 15,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
        >
          <Ionicons name="arrow-back-outline" size={30} color={Colors.WHITE} />
        </TouchableOpacity>
        <Text
          style={{
            marginTop: 20,
            marginBottom: 10,
            fontFamily: "appFontBold",
            fontSize: 25,
            color: Colors.WHITE,
          }}
        >
          {categoryName} Business List
        </Text>
      </View>
      <View style={{ marginLeft: 20, marginRight: 20 }}>
        <TextInput
          placeholder="Search businesses..."
          style={{
            padding: 15,
            borderRadius: 99,
            backgroundColor: Colors.WHITE,
            paddingHorizontal: 20,
            fontSize: 16,
          }}
          onChangeText={(value) => OnSearchFilter(value)}
        />
      </View>

      <FlatList
        data={businessList}
        onRefresh={() => GetBusinessListByCategory()}
        refreshing={loading}
        renderItem={({ item, index }) => (
          <BusinessListCard key={index} business={item} />
        )}
      />
    </View>
  );
}
